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
// The archive starts at the Jul 2026 episode. Everything earlier is a one-off
// club session recording we don't publish. Placed in the empty gap between the
// two (2026-05-03 and 2026-07-25) so no timezone edge can move an episode
// across it.
const PODCAST_EPOCH = Date.parse("2026-07-01T00:00:00Z");
const MAX_PLAYBACK_BITRATE = 3_000_000;
let cache: { at: number; posts: BlogPost[] } | null = null;

/** X escapes exactly these three in post text. */
const decode = (text: string) =>
  text
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&amp;", "&");

/** One-line summary of a post: links dropped, whitespace collapsed. */
const summarize = (text: string) =>
  decode(text)
    .replace(/https:\/\/t\.co\/\S+/g, "")
    .replace(/\s+/g, " ")
    .trim();

/**
 * The episode title is the post's first line — writing a good one is the
 * author's job on X, not a parser's job here.
 */
const firstLine = (text: string) =>
  decode(text)
    .split("\n")
    .find((line) => line.trim())
    ?.trim() ?? "";

/** Best mp4 the browser can stream comfortably. */
const playbackUrl = (video: any) =>
  (video.variants ?? [])
    .filter(
      (v: any) =>
        v.content_type === "video/mp4" &&
        v.bit_rate <= MAX_PLAYBACK_BITRATE,
    )
    .sort((a: any, b: any) => b.bit_rate - a.bit_rate)[0]
    ?.url;

// Pinned to IST: without it a UTC CI build and a local build disagree by a day
// on anything posted after 18:30 UTC.
const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    timeZone: "Asia/Kolkata",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

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
      const link = `https://x.com/${username}/status/${t.id}`;
      const a = t.article;

      if (a?.title) {
        const title = decode(a.title).trim();
        posts.push({
          title,
          description: summarize(
            a.preview_text || a.plain_text || "",
          ).slice(0, 280),
          link,
          tag: guessTag(title),
          author: "Bitshala",
          date: formatDate(t.created_at),
          source: "X",
        });
        continue;
      }

      // Any video this long is an episode; nothing else @bitshala_org posts
      // comes close.
      const video = (t.attachments?.media_keys ?? [])
        .map((key: string) => mediaByKey.get(key))
        .find(
          (media: any) =>
            media?.type === "video" &&
            media.duration_ms >= PODCAST_MIN_DURATION_MS,
        );
      if (
        !video ||
        Date.parse(t.created_at) < PODCAST_EPOCH
      )
        continue;

      const text = t.note_tweet?.text || t.text || "";
      posts.push({
        title: firstLine(text),
        description: summarize(text).slice(0, 280),
        link,
        tag: "Podcast",
        author: "Bitshala",
        date: formatDate(t.created_at),
        source: "X",
        mediaUrl: playbackUrl(video),
        posterUrl: video.preview_image_url,
        durationMs: video.duration_ms,
      });
    }

    paginationToken = data.meta?.next_token;
    if (!paginationToken) break;
  }

  return posts;
}

/** Live X Articles and long-form video episodes for @bitshala_org. */
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
