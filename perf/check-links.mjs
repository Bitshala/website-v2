// Lists local URLs referenced by the built site that don't exist in dist/:
// src/href/srcset/poster attributes, CSS url(), and preload links.
//
//   pnpm build && node perf/check-links.mjs
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const DIST = "dist";
const walk = (d) =>
  readdirSync(d, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(join(d, e.name)) : [join(d, e.name)],
  );

const exists = (url) => {
  const path = decodeURIComponent(url.split(/[?#]/)[0]);
  if (path === "/" || path === "") return true;
  const f = join(DIST, path);
  return (
    existsSync(f) ||
    existsSync(join(f, "index.html")) ||
    existsSync(f + ".html")
  );
};

const missing = new Map();
for (const file of walk(DIST).filter((f) => /\.(html|css)$/.test(f))) {
  const text = readFileSync(file, "utf8");
  const urls = [
    ...[...text.matchAll(/\s(?:src|href|poster)="(\/[^"]*)"/g)].map((m) => m[1]),
    ...[...text.matchAll(/\ssrcset="([^"]*)"/g)].flatMap((m) =>
      m[1].split(",").map((s) => s.trim().split(/\s+/)[0]),
    ),
    ...[...text.matchAll(/url\((?:&quot;|["'])?(\/[^)"'&]+)/g)].map((m) => m[1]),
  ].filter((u) => u.startsWith("/") && !u.startsWith("//"));
  for (const u of urls) {
    if (!exists(u)) {
      if (!missing.has(u)) missing.set(u, new Set());
      missing.get(u).add(file.slice(DIST.length));
    }
  }
}
if (!missing.size) console.log("No missing local URLs.");
for (const [u, files] of missing)
  console.log(`${u}  (in ${[...files].slice(0, 3).join(", ")}${files.size > 3 ? ", …" : ""})`);
process.exitCode = missing.size ? 1 : 0;
