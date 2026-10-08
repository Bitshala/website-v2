#!/usr/bin/env node
// Refreshes data/podcasts-articles.json from the X API. Run by the "Update X
// feed" workflow; the site itself never calls X. Only posts newer than the
// newest one already seen are requested, so each run is billed only for new
// posts. On any failure the existing JSON is left untouched.
import {
  readFile,
  rename,
  writeFile,
} from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "..",
);
const FEED_PATH = resolve(
  ROOT,
  process.env.FEED_PATH || "data/podcasts-articles.json",
);
// Overridable so tests can point at a mock server.
const API_BASE =
  process.env.X_API_BASE || "https://api.x.com/2";
const BEARER = process.env.X_BEARER_TOKEN;
const USERNAME = process.env.X_USERNAME || "bitshala_org";
const MAX_NEW_POSTS = Number(
  process.env.MAX_NEW_POSTS_PER_RUN || 50,
);

// Any video this long is an episode; nothing else @bitshala_org posts comes
// close.
const PODCAST_MIN_DURATION_MS = 10 * 60 * 1000;
// The archive starts at the Jul 2026 episode. Everything earlier is a one-off
// club session recording we don't publish.
const PODCAST_EPOCH = Date.parse("2026-07-01T00:00:00Z");

class ApiError extends Error {
  constructor(status, body) {
    super(
      `X API responded ${status}: ${body.slice(0, 500)}`,
    );
    this.status = status;
  }
}

/** X escapes exactly these three in post text. */
const decode = (text) =>
  text
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&amp;", "&");

/** Post text without t.co links, whitespace collapsed. */
const summarize = (text) =>
  decode(text)
    .replace(/https:\/\/t\.co\/\S+/g, "")
    .replace(/\s+/g, " ")
    .trim();

/** First non-empty line, ignoring t.co links. */
const firstLine = (text) =>
  decode(text)
    .replace(/https:\/\/t\.co\/\S+/g, "")
    .split("\n")
    .map((line) => line.trim())
    .find(Boolean) ?? "";

/** Post IDs are 64-bit; compare as BigInt. */
const newerId = (a, b) => (BigInt(a) > BigInt(b) ? a : b);

async function readFeed() {
  try {
    return JSON.parse(await readFile(FEED_PATH, "utf8"));
  } catch (err) {
    if (err.code === "ENOENT") return null;
    throw err;
  }
}

async function api(path, params = {}) {
  const url = new URL(`${API_BASE}${path}`);
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined)
      url.searchParams.set(key, String(value));
  }
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${BEARER}` },
  });
  if (!res.ok)
    throw new ApiError(res.status, await res.text());
  return res.json();
}

async function lookupUserId() {
  const data = await api(`/users/by/username/${USERNAME}`);
  if (!data.data?.id) {
    throw new Error(`X user @${USERNAME} not found`);
  }
  return data.data.id;
}

/**
 * Posts newer than sinceId, newest first, capped at MAX_NEW_POSTS.
 * Returns the posts and the media they reference.
 */
async function fetchNewPosts(userId, sinceId) {
  const posts = [];
  const media = new Map();
  let paginationToken;

  while (posts.length < MAX_NEW_POSTS) {
    const remaining = MAX_NEW_POSTS - posts.length;
    const data = await api(`/users/${userId}/tweets`, {
      // The endpoint accepts 5–100.
      max_results: Math.min(100, Math.max(5, remaining)),
      since_id: sinceId,
      pagination_token: paginationToken,
      exclude: "retweets,replies",
      "tweet.fields":
        "created_at,entities,attachments,article,note_tweet",
      expansions: "attachments.media_keys",
      "media.fields":
        "media_key,type,preview_image_url,url,duration_ms",
    });

    for (const m of data.includes?.media ?? [])
      media.set(m.media_key, m);
    posts.push(...(data.data ?? []).slice(0, remaining));

    paginationToken = data.meta?.next_token;
    if (!paginationToken) break;
  }

  const capped =
    posts.length >= MAX_NEW_POSTS && paginationToken;
  return { posts, media, capped };
}

/** First link that leaves X — quote posts and our own media don't count. */
function externalLink(urls) {
  return urls.find((u) => {
    const href = u.unwound_url || u.expanded_url || "";
    return (
      href &&
      !/^https?:\/\/(www\.)?(x|twitter)\.com\//.test(href)
    );
  });
}

/** Turns a post into a feed item, or null if it's neither kind. */
function toItem(post, media) {
  const postUrl = `https://x.com/${USERNAME}/status/${post.id}`;
  const rawText = post.note_tweet?.text || post.text || "";
  const urls = [
    ...(post.note_tweet?.entities?.urls ?? []),
    ...(post.entities?.urls ?? []),
  ];
  const attached = (post.attachments?.media_keys ?? [])
    .map((key) => media.get(key))
    .filter(Boolean);
  const photo = attached.find(
    (m) => m.type === "photo",
  )?.url;
  const base = {
    id: post.id,
    date: post.created_at,
    postUrl,
  };

  // Native X Article: the post links to the article on X.
  if (post.article?.title) {
    return {
      ...base,
      type: "article",
      title: decode(post.article.title).trim(),
      text: summarize(post.article.preview_text || rawText),
      thumbnail: photo ?? null,
      articleUrl: postUrl,
    };
  }

  const video = attached.find(
    (m) =>
      m.type === "video" &&
      m.duration_ms >= PODCAST_MIN_DURATION_MS,
  );
  if (
    video &&
    Date.parse(post.created_at) >= PODCAST_EPOCH
  ) {
    return {
      ...base,
      type: "podcast",
      title: firstLine(rawText),
      text: summarize(rawText),
      thumbnail: video.preview_image_url ?? null,
      duration: video.duration_ms,
    };
  }

  const link = externalLink(urls);
  if (link) {
    return {
      ...base,
      type: "article",
      title:
        firstLine(rawText) ||
        link.title ||
        link.display_url,
      text: summarize(rawText) || link.description || "",
      thumbnail: link.images?.[0]?.url ?? photo ?? null,
      articleUrl: link.unwound_url || link.expanded_url,
    };
  }

  return null;
}

async function main() {
  if (!BEARER) {
    console.error(
      "X_BEARER_TOKEN is not set; leaving the feed unchanged.",
    );
    process.exit(1);
  }
  if (
    !Number.isInteger(MAX_NEW_POSTS) ||
    MAX_NEW_POSTS < 1
  ) {
    console.error(
      `Invalid MAX_NEW_POSTS_PER_RUN: ${MAX_NEW_POSTS}`,
    );
    process.exit(1);
  }

  const feed = await readFeed();
  const items = feed?.items ?? [];
  // sinceId tracks the newest post *seen*, not the newest kept, so posts that
  // are neither podcasts nor articles aren't paid for twice.
  const sinceId =
    feed?.sinceId ??
    items.reduce(
      (max, item) =>
        max ? newerId(max, item.id) : item.id,
      null,
    );

  // The user ID never changes; cache it to save a billed lookup per run.
  const userId =
    feed?.username === USERNAME && feed?.userId
      ? feed.userId
      : await lookupUserId();

  const { posts, media, capped } = await fetchNewPosts(
    userId,
    sinceId ?? undefined,
  );
  console.log(
    `Fetched ${posts.length} new post(s) since ${sinceId ?? "the beginning"}.`,
  );
  if (capped) {
    console.log(
      `::warning::Hit MAX_NEW_POSTS_PER_RUN (${MAX_NEW_POSTS}). Older new posts ` +
        "were skipped and will not be fetched later; raise the cap for a backfill.",
    );
  }

  if (posts.length === 0 && feed?.userId === userId) {
    console.log("No new posts; feed unchanged.");
    return;
  }

  const byId = new Map(
    items.map((item) => [item.id, item]),
  );
  let added = 0;
  for (const post of posts) {
    const item = toItem(post, media);
    if (!item) continue;
    if (!byId.has(item.id)) added++;
    byId.set(item.id, item);
  }

  const merged = [...byId.values()].sort((a, b) =>
    BigInt(b.id) > BigInt(a.id)
      ? 1
      : BigInt(b.id) < BigInt(a.id)
        ? -1
        : 0,
  );
  const newSinceId = posts.reduce(
    (max, post) => (max ? newerId(max, post.id) : post.id),
    sinceId,
  );

  const next = {
    updatedAt: new Date().toISOString(),
    username: USERNAME,
    userId,
    sinceId: newSinceId,
    items: merged,
  };
  // Write-then-rename so a crash can't leave a half-written file.
  const tmp = `${FEED_PATH}.tmp`;
  await writeFile(
    tmp,
    `${JSON.stringify(next, null, 2)}\n`,
  );
  await rename(tmp, FEED_PATH);
  console.log(
    `Added ${added} item(s); feed has ${merged.length}.`,
  );
}

main().catch((err) => {
  if (err instanceof ApiError && err.status === 429) {
    // Rate limited: transient, try again next run.
    console.log(`::warning::${err.message}`);
    console.log("Rate limited; feed unchanged.");
    process.exit(0);
  }
  // Auth, credit exhaustion (402/403), network errors: fail the run so it's
  // noticed, but never touch the existing feed.
  console.error(`::error::${err.message}`);
  console.error("Feed unchanged.");
  process.exit(1);
});
