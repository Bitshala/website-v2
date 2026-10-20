# Performance baseline

Measured on `main` @ `8213a92` on 2026-10-20, before any perf work. Every perf PR compares against this file.

How to reproduce:

```sh
pnpm build
node perf/measure.mjs            # static sizes from dist/
pnpm preview &                   # http://localhost:4321
node perf/lighthouse.mjs         # Lighthouse 12.8.2, mobile, median of 3 runs
```

## Build output

| | Size |
|---|---|
| `dist/` | 177 MB |
| `dist/_astro/` | 1.2 MB |
| `public/` | 175 MB |

Build warnings:
- 5× `/fonts/*.woff2 … didn't resolve at build time`. The woff2 files don't exist.
- `Generated an empty chunk: "Navbar.astro_astro_type_script_index_0_lang"`
- `Some chunks are larger than 500 kB after minification` (`Navbar.B6gYDcOq.js`, 713 KB)

## Static sizes (`perf/measure.mjs`)

JS is everything the page's islands and module scripts load, including their imports. "Eager images" are `<img>` tags without `loading="lazy"` plus inline CSS backgrounds. Browsers fetch these on load, even inside `display:none`.

| Page | HTML (gz KB) | JS files | JS (KB raw / gz) | Images (count / MB) | Eager images (count / MB) |
|---|---|---|---|---|---|
| / | 13.0 | 10 | 932.0 / 249.5 | 43 / 12.86 | 43 / 12.86 |
| /talks | 11.1 | 10 | 932.0 / 249.5 | 24 / 11.60 | 24 / 11.60 |
| /boss | 16.3 | 0 | 0.0 / 0.0 | 46 / 11.90 | 22 / 7.32 |
| /blogs | 7.4 | 9 | 920.1 / 245.7 | 6 / 0.09 | 6 / 0.09 |
| /cohorts/ln | 9.3 | 10 | 1099.9 / 304.9 | 13 / 4.96 | 12 / 4.12 |

Images rendered only by `client:only` React components (navbar logo, etc.) aren't in the HTML, so they're not counted here. Lighthouse below does count them.

## Lighthouse (mobile, simulated throttling, median of 3)

| Page | Score | LCP (s) | TBT (ms) | CLS | Transfer (MB) | Requests | LCP element |
|---|---|---|---|---|---|---|---|
| / | 81 | 4.9 | 0 | 0.002 | 14.10 | 130 | hero subtitle `<p>` (text) |
| /talks | 74 | 8.5 | 0 | 0.000 | 12.36 | 91 | hero subtitle `<p>` (text) |
| /boss | 70 | 9.7 | 0 | 0.008 | 7.69 | 73 | `<img src="/boss/1.webp">` |
| /blogs | 99 | 2.0 | 0 | 0.001 | 0.75 | 66 | hero `<h1>` (text) |
| /cohorts/ln | 75 | 26.3 | 0 | 0.004 | 4.84 | 73 | hero `<div>` with CSS background `/cohort/ln.webp` |

Largest transfers:
- `/` and `/talks`: `cohort/ln.webp` 2.9 MB, `clubs/cards/{kernel,tradfi,reading,optech}.png` about 1.0–1.2 MB each, `bitspace/Gallery/3.webp` 735 KB
- `/boss`: `boss/schedule.png` 3.4 MB, `boss26/boss26schedule.png` 2.0 MB, `boss/schedule_winter.png` 522 KB, all in hidden tabs
- `/cohorts/ln`: `cohort/ln.webp` 2.9 MB (hero), `people/dhruvil.png` 497 KB, `people/btcnoob.png` 396 KB
- every Layout page: `Navbar.B6gYDcOq.js` 169 KB gz, `gtag/js` 176 KB (Partytown, off the main thread)

## Caveats
- Local builds can't reach YouTube (`YouTube feed responded 404`) or Luma (`429`), so `/blogs` has no episodes and `/meetups` has no events. Production `/blogs` is heavier than shown here.
- TBT reads 0 ms on this machine (Apple Silicon with simulated throttling). JS cost shows more clearly in the transfer size and the static JS table.
- LCP on `/` and `/talks` is a text node. It's delayed by bandwidth contention with about 13 MB of images and by web fonts: each `.woff2` 404s before the `.otf` fallback loads.
