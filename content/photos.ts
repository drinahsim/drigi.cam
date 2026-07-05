/*
  ─────────────────────────────────────────────────────────────
  optional per-photo details.
  ─────────────────────────────────────────────────────────────

  most of the time you don't need this file at all — just drop an
  image into /public/photos/<category>/ and the site reads the
  camera settings straight from the photo's EXIF data.

  use this file only when you want to:
    • add a title, location or caption
    • fill in details a photo is missing
    • correct something the camera got wrong

  anything you write here WINS over the photo's own EXIF data.
  the key is the exact file name.

  the entries below describe the sample photos — delete them
  (and the images in /public/photos) once you add your own.
*/

import type { PhotoMeta } from "@/lib/types";

export const overrides: Record<string, PhotoMeta> = {
  // ── wildlife ──────────────────────────────────────────────
  "sample-wildlife-1.jpg": {
    title: "sample-wildlife",
    location: "location",
    month: "january",
    year: 2026,
    date: "2026-01-01",
    camera: "camera",
    lens: "lens",
    shutter: "shutter",
    aperture: "aperture",
    iso: 0,
    focalLength: "focalLength",
    caption: "caption",
  },

  // ── sports ────────────────────────────────────────────────
  "sample-sports-1.jpg": {
  },

  // ── places ────────────────────────────────────────────────
  "places_1.jpg": {
    location: "cape town",
    month: "june",
    year: 2026,
    date: "2026-06-19",
    camera: "Canon EOS 500D",
    lens: "Canon EF-S 18-200mm f/3.5-5.6 IS",
    shutter: "1/320s",
    aperture: "f/10",
    iso: 160,
    focalLength: "80mm",
  },
};
