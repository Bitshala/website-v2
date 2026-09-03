export type BlogPost = {
  title: string;
  description: string;
  link: string;
  tag: string;
  author: string;
  date: string;
  source: string;
  mediaUrl?: string;
  posterUrl?: string;
  durationMs?: number;
};

const TTL_MS = 60 * 60 * 1000; // ponytail: in-memory cache; file cache if rate limits bite
const PODCAST_MIN_DURATION_MS = 10 * 60 * 1000;
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
  return (
    rules.find(([re]) => re.test(title))?.[1] ?? "Article"
  );
}

function cleanPodcastText(text: string): string {
  return text
    .replace(/https:\/\/t\.co\/\S+/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function podcastTitle(text: string): string {
  const directGuest = text.match(
    /Bitcoin Talks\s+with\s+(@\w+)/i,
  )?.[1];
  if (directGuest)
    return `Bitshala Bitcoin Talks with ${directGuest}`;

  const seatedGuest = text.match(
    /Bitshala Bitcoin Talks[\s\S]{0,60}?sit(?:\s+down)?\s+with\s+(@\w+)/i,
  )?.[1];
  if (seatedGuest)
    return `Bitshala Bitcoin Talks with ${seatedGuest}`;

  const cleaned = cleanPodcastText(text);
  return cleaned.length > 110
    ? `${cleaned.slice(0, 107)}...`
    : cleaned;
}

function getPodcastMedia(
  text: string,
  mediaKeys: string[],
  mediaByKey: Map<string, any>,
): any | undefined {
  if (!/\b(?:Bitshala\s+)?Bitcoin Talks\b/i.test(text))
    return undefined;

  return mediaKeys
    .map((key) => mediaByKey.get(key))
    .find((media) => {
      return (
        media?.type === "video" &&
        (media.duration_ms ?? 0) >= PODCAST_MIN_DURATION_MS
      );
    });
}

function getPlaybackUrl(media: any): string | undefined {
  const mp4Variants = (media?.variants ?? [])
    .filter(
      (variant: any) =>
        variant.content_type === "video/mp4",
    )
    .sort(
      (a: any, b: any) =>
        (a.bit_rate ?? 0) - (b.bit_rate ?? 0),
    );

  const webOptimized = mp4Variants.filter(
    (variant: any) => (variant.bit_rate ?? 0) <= 3_000_000,
  );

  return (webOptimized.at(-1) ?? mp4Variants.at(0))?.url;
}

async function fetchAllContent(
  bearer: string,
  username: string,
): Promise<BlogPost[]> {
  const headers = { Authorization: `Bearer ${bearer}` };

  const userRes = await fetch(
    `https://api.twitter.com/2/users/by/username/${username}`,
    { headers },
  );
  if (!userRes.ok) {
    console.error(
      "X user lookup failed:",
      userRes.status,
      await userRes.text(),
    );
    return [];
  }
  const userId = (await userRes.json()).data?.id as
    | string
    | undefined;
  if (!userId) return [];

  const posts: BlogPost[] = [];
  let paginationToken: string | undefined;

  for (let page = 0; page < 10; page++) {
    const url = new URL(
      `https://api.twitter.com/2/users/${userId}/tweets`,
    );
    url.searchParams.set("max_results", "100");
    url.searchParams.set("exclude", "retweets,replies");
    url.searchParams.set(
      "tweet.fields",
      "created_at,article,text,attachments,note_tweet",
    );
    url.searchParams.set(
      "expansions",
      "attachments.media_keys",
    );
    url.searchParams.set(
      "media.fields",
      "type,duration_ms,preview_image_url,variants",
    );
    if (paginationToken) {
      url.searchParams.set(
        "pagination_token",
        paginationToken,
      );
    }

    const res = await fetch(url, { headers });
    if (!res.ok) {
      console.error(
        "X timeline failed:",
        res.status,
        await res.text(),
      );
      break;
    }
    const data = await res.json();
    const mediaByKey = new Map<string, any>(
      (data.includes?.media ?? []).map((media: any) => [
        media.media_key,
        media,
      ]),
    );

    for (const t of data.data ?? []) {
      const a = t.article;
      if (a?.title) {
        const description = (
          a.preview_text ||
          a.plain_text ||
          ""
        )
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
        continue;
      }

      const text = t.note_tweet?.text || t.text || "";
      const mediaKeys = t.attachments?.media_keys ?? [];
      const podcastMedia = getPodcastMedia(
        text,
        mediaKeys,
        mediaByKey,
      );
      if (!podcastMedia) continue;

      posts.push({
        title: podcastTitle(text),
        description: cleanPodcastText(text).slice(0, 280),
        link: `https://x.com/${username}/status/${t.id}`,
        tag: "Podcast",
        author: "Bitshala",
        date: formatDate(t.created_at),
        source: "X",
        mediaUrl: getPlaybackUrl(podcastMedia),
        posterUrl: podcastMedia.preview_image_url,
        durationMs: podcastMedia.duration_ms,
      });
    }

    paginationToken = data.meta?.next_token;
    if (!paginationToken) break;
  }

  return posts;
}

/** Live X Articles and Bitcoin Talks podcast episodes for @bitshala_org. */
export async function getXContent(): Promise<BlogPost[]> {
  if (cache && Date.now() - cache.at < TTL_MS)
    return cache.posts;

  const bearer = import.meta.env.X_BEARER_TOKEN as
    | string
    | undefined;
  const username =
    (import.meta.env.X_USERNAME as string | undefined) ||
    "bitshala_org";

  if (!bearer) {
    console.warn(
      "X_BEARER_TOKEN missing — skipping live X content",
    );
    return [];
  }

  try {
    const posts = await fetchAllContent(bearer, username);
    cache = { at: Date.now(), posts };
    return posts;
  } catch (err) {
    console.error("getXContent failed:", err);
    return cache?.posts ?? [];
  }
}
