// Lighthouse (mobile, simulated throttling) against a running `astro preview`.
// Runs each page RUNS times and reports the median of each metric.
//
//   pnpm build && pnpm preview &      # serves on http://localhost:4321
//   node perf/lighthouse.mjs [page ...]
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const BASE = process.env.BASE_URL ?? "http://localhost:4321";
const RUNS = Number(process.env.RUNS ?? 3);
const pages = process.argv.slice(2).length
  ? process.argv.slice(2)
  : ["/", "/talks", "/boss", "/blogs", "/cohorts/ln"];
const dir = mkdtempSync(join(tmpdir(), "lh-"));

const median = (xs) => [...xs].sort((a, b) => a - b)[Math.floor(xs.length / 2)];

console.log("| Page | Score | LCP (s) | TBT (ms) | CLS | Transfer (MB) | Requests | LCP element |");
console.log("|---|---|---|---|---|---|---|---|");
for (const page of pages) {
  const runs = [];
  for (let i = 0; i < RUNS; i++) {
    const out = join(dir, `${page.replace(/\W/g, "_")}-${i}.json`);
    execFileSync(
      "npx",
      [
        "-y", "lighthouse@12.8.2", BASE + page,
        "--only-categories=performance",
        "--output=json", `--output-path=${out}`,
        "--chrome-flags=--headless=new", "--quiet",
      ],
      { stdio: "inherit" },
    );
    const r = JSON.parse(readFileSync(out, "utf8"));
    const a = r.audits;
    const lcpEl = a["largest-contentful-paint-element"]?.details?.items?.[0]?.items?.[0]?.node;
    runs.push({
      score: r.categories.performance.score * 100,
      lcp: a["largest-contentful-paint"].numericValue / 1000,
      tbt: a["total-blocking-time"].numericValue,
      cls: a["cumulative-layout-shift"].numericValue,
      bytes: a["total-byte-weight"].numericValue / 1024 / 1024,
      reqs: a["network-requests"].details.items.length,
      el: lcpEl ? (lcpEl.selector ?? lcpEl.snippet).slice(0, 60) : "",
    });
  }
  const m = (k) => median(runs.map((r) => r[k]));
  console.log(
    `| ${page} | ${m("score").toFixed(0)} | ${m("lcp").toFixed(1)} | ${m("tbt").toFixed(0)} | ${m("cls").toFixed(3)} | ${m("bytes").toFixed(2)} | ${m("reqs")} | \`${runs[0].el}\` |`,
  );
}
console.error(`raw reports: ${dir}`);
