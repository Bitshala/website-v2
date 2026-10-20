// Resizes and recompresses the images in public/ that the built site uses.
//
//   pnpm build && node scripts/optimize-images.mjs --dry-run   # report only
//   pnpm build && node scripts/optimize-images.mjs             # write files
//
// Only images referenced from dist/ (HTML, CSS, JS) are touched; unused files in
// public/ are left alone. Rules, per file:
// - Downscale to the width cap for its kind (see CAPS); never enlarge.
// - WebP and JPEG are re-encoded in place (WebP q80, mozjpeg q80). Metadata is
//   stripped.
// - Opaque PNG photos over 100 KB become WebP q80 next to the original, and every
//   reference in src/ and data/ is rewritten. The original PNG is kept, for
//   removal after review.
// - PNGs with real transparency stay PNG (lossless), and the script checks the
//   alpha channel survives.
// - A result is kept only if it's smaller, and at least 10% smaller unless it
//   was resized or converted.
//
// Results are recorded in scripts/optimize-images.manifest.json by content
// hash, so re-running skips files it has already processed.
import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const DRY = process.argv.includes("--dry-run");
const PUBLIC = "public";
const MANIFEST = "scripts/optimize-images.manifest.json";

// First match wins. Widths are 2x the largest size the image is displayed at,
// capped at 2400 for full-width heroes.
const SKIP = [/^boss\/og-image\.jpg$/, /^footer\/logo\.png$/];
const CAPS = [
  [/^apprenticeship\/twitter\.png$/, 96],
  [/^(apprenticeship\/(github|discord1?)|people\/(github|twitter)|bitspace\/(whatsapp|email)|logo\/\d)\.png$/, 128],
  [/^home\/\w+-icon\.png$/, 256],
  [/^(people|testimonial)\/|^apprenticeship\/.*\.webp$/, 512],
  [
    /^(header\/|optech\/|review\/|404\/|boss26\/|boss\/schedule|boss\/hero\.|clubs\/header\.|home\/(about|headerbg)\.|cohort\/(ln|lbtcl|bpd|pb|rust|mb|hero)\.|bitspace\/(bitspace_hero|7b58c955|c30c1dca)|meetups\/meetups\.)/,
    2400,
  ],
  [/^(boss\/1\.|journeyGuide\/|home\/|bitspace\/[^/]+$)/, 1600],
  [/./, 1200],
];

const walk = (d) =>
  readdirSync(d, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(join(d, e.name)) : [join(d, e.name)],
  );
const sha1 = (buf) => createHash("sha1").update(buf).digest("hex");
const kb = (n) => `${(n / 1024).toFixed(0)} KB`;

if (!existsSync("dist")) {
  console.error("dist/ not found: run `pnpm build` first.");
  process.exit(1);
}
const built = walk("dist")
  .filter((f) => /\.(html|css|js)$/.test(f))
  .map((f) => readFileSync(f, "utf8"))
  .join("\n");
const manifest = existsSync(MANIFEST) ? JSON.parse(readFileSync(MANIFEST, "utf8")) : {};

const used = walk(PUBLIC)
  .map((f) => f.slice(PUBLIC.length + 1))
  .filter((rel) => /\.(png|jpe?g|webp)$/i.test(rel))
  .filter((rel) => built.includes("/" + rel) || built.includes("/" + encodeURI(rel)))
  .filter((rel) => !SKIP.some((r) => r.test(rel)));

const renames = [];
let before = 0;
let after = 0;
const rows = [];

for (const rel of used) {
  const src = join(PUBLIC, rel);
  const input = readFileSync(src);
  if (manifest[rel]?.sha1 === sha1(input)) continue;
  if (manifest[rel.replace(/\.png$/i, ".webp")]?.from === rel) continue;

  const cap = CAPS.find(([r]) => r.test(rel))[1];
  const meta = await sharp(input).metadata();
  let alpha = false;
  if (meta.hasAlpha) {
    const { channels } = await sharp(input).stats();
    alpha = channels.at(-1).min < 255;
  }
  const resize = meta.width > cap;
  const ext = rel.split(".").pop().toLowerCase();
  const toWebp = ext === "png" && !alpha && input.length > 100 * 1024;

  let pipe = sharp(input).rotate();
  if (resize) pipe = pipe.resize({ width: cap, withoutEnlargement: true });
  if (toWebp || ext === "webp") pipe = pipe.webp({ quality: 80, effort: 6 });
  else if (ext === "png") pipe = pipe.png({ compressionLevel: 9, adaptiveFiltering: true, effort: 10 });
  else pipe = pipe.jpeg({ quality: 80, mozjpeg: true });
  const { data: out, info } = await pipe.toBuffer({ resolveWithObject: true });

  if (alpha) {
    const { channels } = await sharp(out).stats();
    if (info.channels !== 4 || channels.at(-1).min === 255)
      throw new Error(`${rel}: alpha channel lost`);
  }
  const keep = out.length < input.length && (toWebp || resize || out.length < input.length * 0.9);
  const converted = keep && toWebp;
  const outRel = converted ? rel.replace(/\.png$/i, ".webp") : rel;
  if (converted && existsSync(join(PUBLIC, outRel)))
    throw new Error(`${outRel} already exists; not overwriting it with ${rel}`);

  const finalBuf = keep ? out : input;
  const finalW = keep ? info.width : meta.width;
  const finalH = keep ? info.height : meta.height;
  before += input.length;
  after += finalBuf.length;
  rows.push(
    `${converted ? "convert" : keep ? "rewrite" : "keep   "}  ${kb(input.length).padStart(8)} -> ${kb(finalBuf.length).padStart(8)}  ${meta.width}x${meta.height} -> ${finalW}x${finalH}${alpha ? "  alpha" : ""}  ${rel}${converted ? " -> " + outRel : ""}`,
  );
  if (DRY) continue;
  if (keep) writeFileSync(join(PUBLIC, outRel), finalBuf);
  if (converted) renames.push([rel, outRel]);
  manifest[outRel] = {
    sha1: sha1(finalBuf),
    width: finalW,
    height: finalH,
    ...(converted && { from: rel }),
  };
}

for (const r of rows.sort()) console.log(r);
console.log(`\n${rows.length} files: ${kb(before)} -> ${kb(after)}${DRY ? " (dry run, nothing written)" : ""}`);

if (!DRY) {
  // Point every reference at the converted file.
  const sources = [...walk("src"), ...walk("data")].filter((f) =>
    /\.(astro|jsx?|tsx?|mjs|json|md|css)$/.test(f),
  );
  for (const file of sources) {
    const text = readFileSync(file, "utf8");
    let next = text;
    for (const [from, to] of renames) next = next.split("/" + from).join("/" + to);
    if (next !== text) {
      writeFileSync(file, next);
      console.log(`updated references in ${file}`);
    }
  }
  const sorted = Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)));
  writeFileSync(MANIFEST, JSON.stringify(sorted, null, 2) + "\n");
}
