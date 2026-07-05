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
  "wildlife_1.jpg": {
    location: "boulders beach, cape town",
    caption: "after all, pengiuns technically are birds?",
  },

  // ── sports ────────────────────────────────────────────────
  "sports_1.jpg": {
    location: "national stadium",
    caption: "last dance",
  },
  "sports_2.jpg": {
    location: "sengkang hockey pitch",
    caption: "history made",
  },

  // ── places ────────────────────────────────────────────────
  "places_1.jpg": {
    location: "cape town",
  },
  "places_2.jpg": {
    location: "mount fuji",
  },
};
