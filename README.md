# Bitshala Website v2

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                    | Action                                           |
| :------------------------- | :----------------------------------------------- |
| `pnpm install`             | Installs dependencies                            |
| `pnpm run dev`             | Starts local dev server at `localhost:4321`      |
| `pnpm run build`           | Build your production site to `./dist/`          |
| `pnpm run preview`         | Preview your build locally, before deploying     |
| `pnpm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `pnpm run astro -- --help` | Get help using the Astro CLI                     |

## 🎙️ Blogs & Podcasts feed (X)

The `/blogs` page lists articles and podcast episodes posted by the X account
in `X_USERNAME`. The site never calls the X API. The **Update X feed** workflow
(`.github/workflows/update-feed.yml`) runs `scripts/fetch-x.js`, which writes
`data/podcasts-articles.json`. If that file changes, the workflow commits it
and starts a deploy. The page reads the file when the site is built.

**Add the secret:** go to repo **Settings → Secrets and variables → Actions →
New repository secret**, then add `X_BEARER_TOKEN` (the app's Bearer Token from
the X developer portal) and, optionally, `X_USERNAME` (default `bitshala_org`).

**Run it manually:** go to **Actions → Update X feed → Run workflow**. The
`max_new_posts` input sets how many posts this run may read (default 50).
Locally: `X_BEARER_TOKEN=... node scripts/fetch-x.js`.

**First run / backfill:** the seed file is empty, so run it manually once with
a higher `max_new_posts` (for example 500) to pull in the history. After that,
each run asks only for posts newer than the newest one it has seen
(`since_id`). If a run hits the cap, older posts from that batch are skipped
for good, and the log shows a warning.

**Change the schedule:** edit the `cron` line in `update-feed.yml` (it's in
UTC; `0 */6 * * *` means every 6 hours).

**Estimate credit usage:** X bills per post read. Every post the account makes
counts (each one has to be read before it can be classified), plus one user
lookup the first time, since the user ID is then cached in the JSON. So:

- Monthly posts read ≈ the number of posts the account publishes per month.
  Running more often doesn't read more posts.
- Worst case per run = `MAX_NEW_POSTS_PER_RUN`, so worst case per month ≈
  cap × runs (50 × 4 × 30 = 6,000 at the defaults).
- Multiply by the per-post read price shown in the X developer console. Check
  the console's usage page after the first few runs to confirm.

Failures (rate limits, auth errors, credits used up) never change the JSON.
Rate limits are logged as a warning; other errors fail the run so GitHub
notifies you.

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
