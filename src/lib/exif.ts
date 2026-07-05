/*
  reads a photo's embedded camera data (EXIF) and tidies it into
  friendly, lowercase-ish strings. used automatically at build time.
*/

import type { PhotoMeta } from "./types";

export function formatShutter(exposureTime?: number): string | undefined {
  if (!exposureTime || exposureTime <= 0) return undefined;
  if (exposureTime >= 1) return `${Math.round(exposureTime * 10) / 10}s`;
  return `1/${Math.round(1 / exposureTime)}s`;
}

export function formatAperture(fNumber?: number): string | undefined {
  if (!fNumber || fNumber <= 0) return undefined;
  const n = Math.round(fNumber * 10) / 10;
  return `f/${Number.isInteger(n) ? n.toFixed(0) : n}`;
}

export function formatFocalLength(focal?: number): string | undefined {
  if (!focal || focal <= 0) return undefined;
  return `${Math.round(focal)}mm`;
}

export function formatCamera(make?: string, model?: string): string | undefined {
  const mk = (make ?? "").trim();
  const m = (model ?? "").trim();
  if (!m && !mk) return undefined;
  // avoid "Canon Canon EOS R6" style duplication
  if (m && mk && m.toLowerCase().startsWith(mk.toLowerCase())) return m;
  return [mk, m].filter(Boolean).join(" ").trim() || undefined;
}

const MONTHS = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

export interface ExifDerived extends PhotoMeta {
  /** when the photo was taken, epoch ms — used for sorting */
  takenAt?: number;
}

/** turn raw exifr output into our PhotoMeta shape. */
export function metaFromExif(exif: Record<string, unknown> | undefined): ExifDerived {
  if (!exif) return {};

  const dateValue = exif.DateTimeOriginal ?? exif.CreateDate ?? exif.ModifyDate;
  const date = dateValue instanceof Date && !Number.isNaN(dateValue.getTime()) ? dateValue : undefined;

  return {
    camera: formatCamera(exif.Make as string, exif.Model as string),
    lens: ((exif.LensModel as string) || (exif.LensMake as string) || "").trim() || undefined,
    shutter: formatShutter(exif.ExposureTime as number),
    aperture: formatAperture(exif.FNumber as number),
    iso: (exif.ISO as number) || undefined,
    focalLength: formatFocalLength(exif.FocalLength as number),
    month: date ? MONTHS[date.getMonth()] : undefined,
    year: date ? date.getFullYear() : undefined,
    takenAt: date ? date.getTime() : undefined,
  };
}
