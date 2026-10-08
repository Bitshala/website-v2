#!/usr/bin/env node
// Refreshes data/podcasts-articles.json from the X API with @bitshala_org's
// native X Articles (x.com/bitshala_org/articles); other posts are skipped.
// Podcasts come from YouTube on the blogs page, not from here. Run by the "Update X
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
      expansions:
        "attachments.media_keys,article.cover_media",
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

/** Native X Article: true when the post publishes an article on X. */
const isArticle = (item) =>
  item.type === "article" &&
  item.articleUrl === item.postUrl;

/** Turns a native X Article post into a feed item; null for anything else. */
function toItem(post, media) {
  if (!post.article?.title) return null;
  const postUrl = `https://x.com/${USERNAME}/status/${post.id}`;
  // The Article's cover image, else the first photo attached to the post.
  const coverKey =
    post.article.cover_media?.media_key ??
    post.article.cover_media;
  const cover = media.get(coverKey);
  const photo =
    cover?.url ??
    cover?.preview_image_url ??
    (post.attachments?.media_keys ?? [])
      .map((key) => media.get(key))
      .find((m) => m?.type === "photo")?.url;
  return {
    id: post.id,
    date: post.created_at,
    postUrl,
    type: "article",
    title: decode(post.article.title).trim(),
    text: summarize(
      post.article.preview_text ||
        post.note_tweet?.text ||
        post.text ||
        "",
    ),
    thumbnail: photo ?? null,
    articleUrl: postUrl,
  };
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
  // Older runs also kept link posts and X videos; drop them.
  const items = (feed?.items ?? []).filter(isArticle);
  const pruned = (feed?.items?.length ?? 0) - items.length;
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

  if (
    posts.length === 0 &&
    feed?.userId === userId &&
    pruned === 0
  ) {
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
