/*
  makes a handful of soft placeholder photos so the gallery has
  something to show before you add your own.

  run it with:  npm run samples

  once you've added real photos you can delete this file and the
  sample-*.jpg images in public/photos — nothing else depends on them.
*/

import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const photosRoot = path.join(here, "..", "public", "photos");

// soft, desaturated tones so the placeholders stay calm.
// [background, accent, horizon]
const palettes = {
  wildlife: ["#c3ccbb", "#9aa98d", "#d7ddcf"],
  sports: ["#b4bec6", "#8b98a3", "#d0d6da"],
  places: ["#d3c1b2", "#b89a86", "#e2d5c9"],
};

// [category, index, width, height] — a natural mix of portrait / landscape / square
const specs = [
  ["wildlife", 1, 1200, 1600],
  ["wildlife", 2, 1600, 1067],
  ["wildlife", 3, 1400, 1400],
  ["sports", 1, 1600, 1067],
  ["sports", 2, 1200, 1600],
  ["sports", 3, 1500, 1000],
  ["places", 1, 1400, 1400],
  ["places", 2, 1600, 1067],
  ["places", 3, 1200, 1600],
];

function svg(width, height, [bg, accent, horizon], index) {
  const cx = width * (index === 3 ? 0.34 : 0.66);
  const cy = height * (index === 2 ? 0.56 : 0.38);
  const r = Math.min(width, height) * 0.3;
  const bandY = height * 0.66;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
  <rect width="100%" height="100%" fill="${bg}"/>
  <rect x="0" y="${bandY}" width="100%" height="${height - bandY}" fill="${horizon}" opacity="0.7"/>
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="${accent}" opacity="0.55"/>
</svg>`;
}

async function run() {
  for (const [category, index, width, height] of specs) {
    const dir = path.join(photosRoot, category);
    await mkdir(dir, { recursive: true });
    const file = path.join(dir, `sample-${category}-${index}.jpg`);
    await sharp(Buffer.from(svg(width, height, palettes[category], index)))
      .jpeg({ quality: 82 })
      .toFile(file);
    console.log("wrote", path.relative(path.join(here, ".."), file));
  }
  console.log(`\ndone — ${specs.length} sample photos created.`);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
