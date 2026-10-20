// Static size report for a built site in dist/. For each page it follows the
// JS that page loads (island component/renderer URLs and module scripts, plus
// their static imports) and lists the local images its HTML references.
//
//   node perf/measure.mjs [page ...]      e.g. node perf/measure.mjs / /talks
//
// "eager" images are <img> tags without loading="lazy" plus inline CSS
// backgrounds: these are fetched on load regardless of viewport or display.
import { readFileSync, existsSync, statSync } from "node:fs";
import { join } from "node:path";
import { gzipSync } from "node:zlib";

const DIST = "dist";
const pages = process.argv.slice(2).length
  ? process.argv.slice(2)
  : ["/", "/talks", "/boss", "/blogs", "/cohorts/ln"];

const kb = (n) => (n / 1024).toFixed(1);
const mb = (n) => (n / 1024 / 1024).toFixed(2);

function htmlFor(page) {
  const p = page === "/" ? "index.html" : join(page, "index.html");
  return readFileSync(join(DIST, p), "utf8");
}

function jsGraph(entries) {
  const seen = new Set();
  const queue = [...entries];
  while (queue.length) {
    const url = queue.pop();
    if (seen.has(url)) continue;
    const file = join(DIST, url);
    if (!existsSync(file)) continue;
    seen.add(url);
    const src = readFileSync(file, "utf8");
    for (const m of src.matchAll(/(?:import|from)\s*["'](\.\/[^"']+\.js)["']/g)) {
      queue.push("/_astro/" + m[1].slice(2));
    }
  }
  let raw = 0;
  let gz = 0;
  for (const url of seen) {
    const buf = readFileSync(join(DIST, url));
    raw += buf.length;
    gz += gzipSync(buf).length;
  }
  return { files: [...seen], raw, gz };
}

function images(html) {
  const out = new Map();
  for (const m of html.matchAll(/<img\b[^>]*>/g)) {
    const tag = m[0];
    const src = tag.match(/\ssrc="([^"]+)"/)?.[1];
    if (!src || !src.startsWith("/")) continue;
    const lazy = /loading="lazy"/.test(tag);
    const prev = out.get(src);
    out.set(src, { eager: (prev?.eager ?? false) || !lazy });
  }
  for (const m of html.matchAll(/url\((?:&quot;|["'])?(\/[^)"'&]+)/g)) {
    if (/\.(png|jpe?g|webp|avif|gif|svg)$/i.test(m[1])) out.set(m[1], { eager: true });
  }
  let all = 0;
  let eager = 0;
  let eagerCount = 0;
  const missing = [];
  for (const [src, { eager: e }] of out) {
    const file = join(DIST, decodeURIComponent(src.split("?")[0]));
    if (!existsSync(file)) {
      missing.push(src);
      continue;
    }
    const size = statSync(file).size;
    all += size;
    if (e) {
      eager += size;
      eagerCount++;
    }
  }
  return { count: out.size, all, eagerCount, eager, missing };
}

console.log(
  "| Page | HTML (gz KB) | JS files | JS (KB raw / gz) | Images (count / MB) | Eager images (count / MB) |",
);
console.log("|---|---|---|---|---|---|");
const missingAll = [];
for (const page of pages) {
  const html = htmlFor(page);
  const entries = new Set();
  for (const m of html.matchAll(/(?:component-url|renderer-url)="([^"]+)"/g))
    entries.add(m[1]);
  for (const m of html.matchAll(/<script[^>]*type="module"[^>]*src="([^"]+)"/g))
    entries.add(m[1]);
  const js = jsGraph([...entries]);
  const img = images(html);
  missingAll.push(...img.missing.map((s) => `${page}: ${s}`));
  console.log(
    `| ${page} | ${kb(gzipSync(html).length)} | ${js.files.length} | ${kb(js.raw)} / ${kb(js.gz)} | ${img.count} / ${mb(img.all)} | ${img.eagerCount} / ${mb(img.eager)} |`,
  );
}
if (missingAll.length) {
  console.log("\nReferenced images missing from dist/:");
  for (const m of missingAll) console.log("- " + m);
}
