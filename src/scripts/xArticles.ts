export type BlogPost = {
  title: string;
  description: string;
  link: string;
  tag: string;
  author: string;
  date: string;
  source: string;
};

const TTL_MS = 60 * 60 * 1000; // ponytail: in-memory cache; file cache if rate limits bite
let cache: { at: number; posts: BlogPost[] } | null = null;

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function guessTag(title: string): string {
  const rules: [RegExp, string][] = [
    [/silent payment/i, "Silent Payments"],
    [/wallet/i, "Wallets"],
    [/ai agent|nginx/i, "AI Agents"],
    [/braidpool|p2pool|mining/i, "Mining"],
    [/lightning|zeus/i, "Lightning"],
    [/fedimint/i, "Fedimint"],
    [/coinswap/i, "Coinswap"],
    [/btcpay/i, "BTCPay Server"],
    [/boss|summit/i, "Events"],
    [/physics|missing component/i, "Physics"],
    [/hardware|feature phone|cryobrick/i, "Hardware"],
  ];
  return rules.find(([re]) => re.test(title))?.[1] ?? "Article";
}

async function fetchAllArticles(
  bearer: string,
  username: string,
): Promise<BlogPost[]> {
  const headers = { Authorization: `Bearer ${bearer}` };

  const userRes = await fetch(
    `https://api.twitter.com/2/users/by/username/${username}`,
    { headers },
  );
  if (!userRes.ok) {
    console.error("X user lookup failed:", userRes.status, await userRes.text());
    return [];
  }
  const userId = (await userRes.json()).data?.id as string | undefined;
  if (!userId) return [];

  const posts: BlogPost[] = [];
  let paginationToken: string | undefined;

  for (let page = 0; page < 10; page++) {
    const url = new URL(`https://api.twitter.com/2/users/${userId}/tweets`);
    url.searchParams.set("max_results", "100");
    url.searchParams.set("exclude", "retweets,replies");
    url.searchParams.set("tweet.fields", "created_at,article,text");
    if (paginationToken) {
      url.searchParams.set("pagination_token", paginationToken);
    }

    const res = await fetch(url, { headers });
    if (!res.ok) {
      console.error("X timeline failed:", res.status, await res.text());
      break;
    }
    const data = await res.json();

    for (const t of data.data ?? []) {
      const a = t.article;
      if (!a?.title) continue;
      const description = (a.preview_text || a.plain_text || "")
        .trim()
        .replace(/\s+/g, " ")
        .slice(0, 280);
      posts.push({
        title: a.title.trim(),
        description,
        link: `https://x.com/${username}/status/${t.id}`,
        tag: guessTag(a.title),
        author: "Bitshala",
        date: formatDate(t.created_at),
        source: "X",
      });
    }

    paginationToken = data.meta?.next_token;
    if (!paginationToken) break;
  }

  return posts;
}

/** Live X Articles for @bitshala_org (and legacy non-X posts stay in the page). */
export async function getXArticles(): Promise<BlogPost[]> {
  if (cache && Date.now() - cache.at < TTL_MS) return cache.posts;

  const bearer = import.meta.env.X_BEARER_TOKEN as string | undefined;
  const username =
    (import.meta.env.X_USERNAME as string | undefined) || "bitshala_org";

  if (!bearer) {
    console.warn("X_BEARER_TOKEN missing — skipping live X articles");
    return [];
  }

  try {
    const posts = await fetchAllArticles(bearer, username);
    cache = { at: Date.now(), posts };
    return posts;
  } catch (err) {
    console.error("getXArticles failed:", err);
    return cache?.posts ?? [];
  }
}
