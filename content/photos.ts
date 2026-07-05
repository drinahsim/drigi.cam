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
    title: "still heron",
    location: "richmond park, london",
    month: "may",
    year: 2025,
    date: "2025-05-18",
    camera: "fujifilm x100v",
    lens: "23mm f/2",
    shutter: "1/500s",
    aperture: "f/4",
    iso: 400,
    focalLength: "23mm",
    caption: "stood very still for this one.",
  },
  "sample-wildlife-2.jpg": {
    title: "at dusk",
    location: "the new forest",
    month: "november",
    year: 2024,
    date: "2024-11-02",
    camera: "sony a6400",
    lens: "70–350mm",
    shutter: "1/800s",
    aperture: "f/6.3",
    iso: 1600,
    focalLength: "300mm",
    caption: "they watched me as much as i watched them.",
  },
  "sample-wildlife-3.jpg": {
    title: "little visitor",
    location: "my back garden",
    month: "june",
    year: 2024,
    date: "2024-06-21",
    camera: "canon powershot g7x",
    lens: "8.8–36.8mm",
    shutter: "1/250s",
    aperture: "f/2.8",
    iso: 200,
    focalLength: "36mm",
  },

  // ── sports ────────────────────────────────────────────────
  "sample-sports-1.jpg": {
    title: "the finish",
    location: "hampden park, glasgow",
    month: "june",
    year: 2025,
    date: "2025-06-10",
    camera: "nikon zf",
    lens: "100–400mm",
    shutter: "1/1000s",
    aperture: "f/5.6",
    iso: 800,
    focalLength: "280mm",
    caption: "caught it right on the line.",
  },
  "sample-sports-2.jpg": {
    title: "midway up",
    location: "the climbing works",
    month: "january",
    year: 2025,
    date: "2025-01-27",
    camera: "ricoh gr iii",
    lens: "18.3mm f/2.8",
    shutter: "1/320s",
    aperture: "f/2.8",
    iso: 1250,
    focalLength: "18mm",
  },
  "sample-sports-3.jpg": {
    title: "last wave",
    location: "fistral beach, newquay",
    month: "august",
    year: 2024,
    date: "2024-08-14",
    camera: "olympus tough tg-6",
    lens: "4.5–18mm",
    shutter: "1/1250s",
    aperture: "f/4.9",
    iso: 200,
    focalLength: "18mm",
    caption: "salt on the lens, worth it.",
  },

  // ── places ────────────────────────────────────────────────
  "sample-places-1.jpg": {
    title: "rooftops",
    location: "alfama, lisbon",
    month: "april",
    year: 2025,
    date: "2025-04-05",
    camera: "fujifilm x100v",
    lens: "23mm f/2",
    shutter: "1/1000s",
    aperture: "f/8",
    iso: 160,
    focalLength: "23mm",
    caption: "got a little lost up here.",
  },
  "sample-places-2.jpg": {
    title: "quiet lane",
    location: "gion, kyoto",
    month: "october",
    year: 2024,
    date: "2024-10-19",
    camera: "contax t2",
    lens: "38mm f/2.8",
    shutter: "1/125s",
    aperture: "f/5.6",
    iso: 400,
    focalLength: "38mm",
  },
  "sample-places-3.jpg": {
    title: "the long way down",
    location: "the dolomites",
    month: "july",
    year: 2024,
    date: "2024-07-30",
    camera: "olympus mju ii",
    lens: "35mm f/2.8",
    shutter: "1/500s",
    aperture: "f/8",
    iso: 200,
    focalLength: "35mm",
    caption: "legs tired, very happy.",
  },
};
