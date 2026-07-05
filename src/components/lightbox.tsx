"use client";

import Image from "next/image";
import { useEffect } from "react";
import type { MouseEvent } from "react";
import type { Photo } from "@/lib/types";

const DEVICE_SIZES = [640, 750, 828, 1080, 1200, 1920, 2048, 3840];

function pickWidth(): number {
  if (typeof window === "undefined") return 1920;
  const target = Math.min(window.innerWidth * (window.devicePixelRatio || 1), 3840);
  return DEVICE_SIZES.find((size) => size >= target) ?? 3840;
}

function MetaRow({ label, value }: { label: string; value?: string | number }) {
  if (value === undefined || value === null || value === "") return null;
  return (
    <div className="flex items-baseline justify-between gap-6 border-t border-[color:var(--border)] py-2">
      <dt className="text-[color:var(--muted)]">{label}</dt>
      <dd className="text-right">{value}</dd>
    </div>
  );
}

export function Lightbox({
  photos,
  index,
  onClose,
  onNavigate,
}: {
  photos: Photo[];
  index: number;
  onClose: () => void;
  onNavigate: (delta: number) => void;
}) {
  const photo = photos[index];

  // keyboard controls + lock the page behind the lightbox
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      else if (event.key === "ArrowRight") onNavigate(1);
      else if (event.key === "ArrowLeft") onNavigate(-1);
    };
    window.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose, onNavigate]);

  // preload the neighbours so left/right feels instant
  useEffect(() => {
    if (photos.length < 2) return;
    const width = pickWidth();
    for (const delta of [1, -1]) {
      const neighbour = photos[(index + delta + photos.length) % photos.length];
      if (!neighbour) continue;
      const img = new window.Image();
      img.src = `/_next/image?url=${encodeURIComponent(neighbour.src)}&w=${width}&q=75`;
    }
  }, [index, photos]);

  if (!photo) return null;

  const stop = (event: MouseEvent) => event.stopPropagation();
  const date = [photo.month, photo.year].filter(Boolean).join(" ");
  const hasMeta = Boolean(
    photo.title ||
      photo.location ||
      date ||
      photo.camera ||
      photo.lens ||
      photo.focalLength ||
      photo.aperture ||
      photo.shutter ||
      photo.iso !== undefined ||
      photo.caption
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={photo.title || "photo"}
      onClick={onClose}
      className="fixed inset-0 z-50 overflow-y-auto bg-white"
    >
      <button
        type="button"
        aria-label="close"
        onClick={(event) => {
          stop(event);
          onClose();
        }}
        className="fixed right-4 top-4 z-10 flex h-10 w-10 items-center justify-center text-[color:var(--muted)] transition-colors hover:text-[color:var(--text)] sm:right-6 sm:top-6"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4">
          <path d="M2 2l14 14M16 2L2 16" />
        </svg>
      </button>

      {photos.length > 1 && (
        <>
          <button
            type="button"
            aria-label="previous photo"
            onClick={(event) => {
              stop(event);
              onNavigate(-1);
            }}
            className="fixed left-2 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center text-[color:var(--muted)] transition-colors hover:text-[color:var(--text)] sm:left-4"
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d="M14 4l-7 7 7 7" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="next photo"
            onClick={(event) => {
              stop(event);
              onNavigate(1);
            }}
            className="fixed right-2 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center text-[color:var(--muted)] transition-colors hover:text-[color:var(--text)] sm:right-4"
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d="M8 4l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      <div className="flex min-h-full flex-col items-center justify-center gap-8 px-6 py-16 sm:px-16">
        <div className="flex flex-col items-center" onClick={stop}>
          <Image
            key={photo.id}
            src={photo.src}
            alt={photo.title || photo.caption || photo.location || "photo"}
            width={photo.width}
            height={photo.height}
            sizes="(max-width: 1024px) 100vw, 80vw"
            placeholder={photo.blurDataURL ? "blur" : "empty"}
            blurDataURL={photo.blurDataURL}
            priority
            className="h-auto max-h-[82vh] w-auto max-w-full rounded-[2px] object-contain ring-1 ring-[color:var(--border)]"
          />

          {hasMeta && (
            <div className="mt-6 w-full max-w-md text-sm lowercase">
              {photo.title && <p className="mb-3 text-base">{photo.title}</p>}
              <dl>
                <MetaRow label="location" value={photo.location} />
                <MetaRow label="date" value={date} />
                <MetaRow label="camera" value={photo.camera} />
                <MetaRow label="lens" value={photo.lens} />
                <MetaRow label="focal length" value={photo.focalLength} />
                <MetaRow label="aperture" value={photo.aperture} />
                <MetaRow label="shutter" value={photo.shutter} />
                <MetaRow label="iso" value={photo.iso} />
              </dl>
              {photo.caption && <p className="mt-4 text-[color:var(--muted)]">{photo.caption}</p>}
            </div>
          )}

          {photos.length > 1 && (
            <p className="mt-6 text-xs text-[color:var(--muted)]">
              {index + 1} / {photos.length}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
