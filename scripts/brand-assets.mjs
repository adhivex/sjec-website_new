// NOTE: keep these PNGs full-colour (no palette). Next's image optimizer
// emits palette PNGs the browser fetches but never paints — the nav logo
// silently rendered blank.
//
// Regenerates the web brand assets from the client artwork in
// design/brand-source/ (originals; not served).
//
//   node scripts/brand-assets.mjs
//
// Outputs:
//   public/images/brand/logo.png       full lockup (schema.org logo)
//   public/images/brand/logo-nav.png   wheel + SJEC, no tagline line (nav/footer)
//   public/images/brand/logo-icon.png  wheel only
//   public/images/brand/hero.jpg       home hero background
//   src/app/icon.png | apple-icon.png | favicon.ico   wheel on the navy square
//
// Needs sharp: npx --yes sharp-cli@5 >/dev/null 2>&1 || npm i -D sharp
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
let sharp;
try {
  sharp = require("sharp");
} catch {
  console.error("sharp is required: npm i -D sharp");
  process.exit(1);
}

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC = path.join(ROOT, "design/brand-source");
const OUT = path.join(ROOT, "public/images/brand");
const APP = path.join(ROOT, "src/app");
fs.mkdirSync(OUT, { recursive: true });

const logoSrc = path.join(SRC, "SJEC_logo.svg.png");
const iconSrc = path.join(SRC, "SJEC_logo_icon.svg.png");
const heroSrc = path.join(SRC, "SJEC_Hero.png");
const NAVY = { r: 16, g: 24, b: 43, alpha: 1 };

/** Bounding box of the non-transparent pixels. */
async function alphaBox(file) {
  const { data, info } = await sharp(file).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  let minX = info.width, minY = info.height, maxX = -1, maxY = -1;
  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      if (data[(y * info.width + x) * info.channels + 3] > 8) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  return { left: minX, top: minY, width: maxX - minX + 1, height: maxY - minY + 1 };
}

/** Columns/rows that are fully transparent, used to find the lockup's parts. */
async function gaps(buffer, axis, from = 0, to = 1) {
  const { data, info } = await sharp(buffer).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const outer = axis === "x" ? info.width : info.height;
  const inner = axis === "x" ? info.height : info.width;
  const lo = Math.floor((axis === "x" ? info.height : info.width) * from);
  const hi = Math.ceil((axis === "x" ? info.height : info.width) * to);
  const filled = [];
  for (let a = 0; a < outer; a++) {
    let count = 0;
    for (let b = Math.max(0, lo); b < Math.min(inner, hi); b++) {
      const x = axis === "x" ? a : b;
      const y = axis === "x" ? b : a;
      if (data[(y * info.width + x) * info.channels + 3] > 8) count++;
    }
    filled.push(count);
  }
  const bands = [];
  let start = null;
  for (let a = 0; a < outer; a++) {
    if (filled[a] === 0) {
      if (start === null) start = a;
    } else if (start !== null) {
      if (a - start > 5) bands.push([start, a - 1]);
      start = null;
    }
  }
  return bands;
}

const logoBox = await alphaBox(logoSrc);
const lockup = await sharp(logoSrc).extract(logoBox).png().toBuffer();

// Full lockup
await sharp(lockup).resize({ height: 240 }).png({ compressionLevel: 9 }).toFile(path.join(OUT, "logo.png"));

// Nav lockup: keep the wheel at full height, drop the tagline under the wordmark.
const colGaps = await gaps(lockup, "x");
const dividerEnd = colGaps.length > 1 ? colGaps[1][0] - 1 : Math.round(logoBox.width * 0.27);
const wordStart = colGaps.length > 1 ? colGaps[1][1] + 1 : Math.round(logoBox.width * 0.3);
const rowGaps = await gaps(lockup, "y", 0.45, 1); // text side only
const taglineTop = rowGaps.length ? rowGaps[rowGaps.length - 1][1] + 1 : logoBox.height;
const left = await sharp(lockup).extract({ left: 0, top: 0, width: dividerEnd + 1, height: logoBox.height }).png().toBuffer();
const right = await sharp(lockup)
  .extract({ left: wordStart, top: 0, width: logoBox.width - wordStart, height: taglineTop })
  .png()
  .toBuffer();
const navLockup = await sharp({ create: { width: logoBox.width, height: logoBox.height, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
  .composite([{ input: left, left: 0, top: 0 }, { input: right, left: wordStart, top: 0 }])
  .png()
  .toBuffer();
await sharp(navLockup).resize({ height: 220 }).png({ compressionLevel: 9 }).toFile(path.join(OUT, "logo-nav.png"));

// Wheel on its own
const iconBox = await alphaBox(iconSrc);
await sharp(iconSrc).extract(iconBox).resize({ height: 256 }).png({ compressionLevel: 9 }).toFile(path.join(OUT, "logo-icon.png"));

// App icons: wheel centred on the navy square
async function appIcon(size, pad, radiusPct) {
  const inner = Math.round(size * (1 - pad * 2));
  const wheel = await sharp(iconSrc)
    .extract(iconBox)
    .resize({ width: inner, height: inner, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();
  let out = await sharp({ create: { width: size, height: size, channels: 4, background: NAVY } })
    .composite([{ input: wheel, gravity: "center" }])
    .png()
    .toBuffer();
  if (radiusPct > 0) {
    const r = Math.round(size * radiusPct);
    const mask = Buffer.from(`<svg width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${r}" ry="${r}" fill="#fff"/></svg>`);
    out = await sharp(out).composite([{ input: mask, blend: "dest-in" }]).png().toBuffer();
  }
  return out;
}

fs.writeFileSync(path.join(APP, "icon.png"), await appIcon(512, 0.14, 0.16));
fs.writeFileSync(path.join(APP, "apple-icon.png"), await appIcon(180, 0.14, 0)); // iOS rounds corners itself

const sizes = [32, 48];
const pngs = [];
for (const s of sizes) pngs.push(await appIcon(s, 0.1, 0.16));
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);
let offset = 6 + 16 * sizes.length;
const dir = sizes.map((s, i) => {
  const e = Buffer.alloc(16);
  e.writeUInt8(s, 0);
  e.writeUInt8(s, 1);
  e.writeUInt16LE(1, 4);
  e.writeUInt16LE(32, 6);
  e.writeUInt32LE(pngs[i].length, 8);
  e.writeUInt32LE(offset, 12);
  offset += pngs[i].length;
  return e;
});
fs.writeFileSync(path.join(APP, "favicon.ico"), Buffer.concat([header, ...dir, ...pngs]));

// Hero photo (no upscaling)
const heroMeta = await sharp(heroSrc).metadata();
await sharp(heroSrc)
  .resize({ width: Math.min(heroMeta.width, 2000), withoutEnlargement: true })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(path.join(OUT, "hero.jpg"));

for (const f of [...fs.readdirSync(OUT).map((n) => path.join(OUT, n)), path.join(APP, "icon.png"), path.join(APP, "apple-icon.png"), path.join(APP, "favicon.ico")]) {
  console.log(path.relative(ROOT, f).padEnd(36), Math.round(fs.statSync(f).size / 1024) + "KB");
}
