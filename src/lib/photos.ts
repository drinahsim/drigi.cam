/*
  the engine that builds the gallery from your files.

  for every category in content/site.ts it looks in
  /public/photos/<slug>, and for each image it:
    • measures the real dimensions (so nothing is ever cropped)
    • reads the camera EXIF data
    • makes a tiny blurred placeholder
    • merges in any overrides from content/photos.ts
    • works out the date, for "newest first" ordering

  this runs on the server at build time. you never need to edit it.
*/

import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import sharp from "sharp";
import exifr from "exifr";
import { site } from "@content/site";
import { overrides } from "@content/photos";
import { metaFromExif } from "./exif";
import type { CategoryGallery, Photo } from "./types";

const PHOTOS_ROOT = path.join(process.cwd(), "public", "photos");
const IMAGE_RE = /\.(jpe?g|png|webp|avif|tiff?)$/i;

async function buildPhoto(slug: string, filename: string): Promise<Photo> {
  const absolute = path.join(PHOTOS_ROOT, slug, filename);
  const buffer = await fs.readFile(absolute);

  const [meta, exif, stat] = await Promise.all([
    sharp(buffer).metadata(),
    exifr.parse(buffer).catch(() => undefined),
    fs.stat(absolute),
  ]);

  // account for EXIF orientation so portrait/landscape is always correct
  let width = meta.width ?? 1600;
  let height = meta.height ?? 1200;
  if ((meta.orientation ?? 1) >= 5) {
    [width, height] = [height, width];
  }

  let blurDataURL: string | undefined;
  try {
    const blur = await sharp(buffer)
      .resize(16, 16, { fit: "inside" })
      .jpeg({ quality: 40 })
      .toBuffer();
    blurDataURL = `data:image/jpeg;base64,${blur.toString("base64")}`;
  } catch {
    blurDataURL = undefined;
  }

  const fromExif = metaFromExif(exif as Record<string, unknown> | undefined);
  const override = overrides[filename] ?? {};

  // precedence: manual override  >  EXIF  >  nothing
  const merged = { ...fromExif, ...override };

  const overrideDate = override.date ? Date.parse(override.date) : Number.NaN;
  const takenAt = Number.isFinite(overrideDate)
    ? overrideDate
    : fromExif.takenAt ?? stat.mtimeMs;

  return {
    id: `${slug}/${filename}`,
    category: slug,
    filename,
    src: `/photos/${slug}/${filename}`,
    width,
    height,
    aspectRatio: width / height,
    blurDataURL,
    takenAt,
    title: merged.title,
    location: merged.location,
    month: merged.month,
    year: merged.year,
    camera: merged.camera,
    lens: merged.lens,
    shutter: merged.shutter,
    aperture: merged.aperture,
    iso: merged.iso,
    focalLength: merged.focalLength,
    caption: merged.caption,
    tags: merged.tags,
    collection: merged.collection,
  };
}

async function readCategory(slug: string, title: string): Promise<CategoryGallery> {
  const dir = path.join(PHOTOS_ROOT, slug);

  let files: string[] = [];
  try {
    files = (await fs.readdir(dir)).filter((f) => IMAGE_RE.test(f) && !f.startsWith("."));
  } catch {
    files = []; // folder doesn't exist yet — that's fine
  }

  const photos = await Promise.all(files.map((f) => buildPhoto(slug, f)));
  photos.sort((a, b) => b.takenAt - a.takenAt); // newest first

  return { slug, title, photos };
}

// read each file only once per build
let cache: Promise<CategoryGallery[]> | null = null;

export function getGalleries(): Promise<CategoryGallery[]> {
  if (!cache) {
    cache = Promise.all(site.categories.map((c) => readCategory(c.slug, c.title)));
  }
  return cache;
}
