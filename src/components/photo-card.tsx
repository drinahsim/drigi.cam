"use client";

import Image from "next/image";
import type { Photo } from "@/lib/types";

export function PhotoCard({ photo, onOpen }: { photo: Photo; onOpen: () => void }) {
  const alt = photo.title || photo.caption || photo.location || `${photo.category} photo`;
  const hasTitle = Boolean(photo.title);
  const hasLocation = Boolean(photo.location);
  const hasCaption = hasTitle || hasLocation;

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`open ${alt}`}
      style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
      className="group relative block w-full overflow-hidden rounded-[2px] bg-[color:var(--border)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--text)] focus-visible:ring-offset-2"
    >
      <Image
        src={photo.src}
        alt={alt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        placeholder={photo.blurDataURL ? "blur" : "empty"}
        blurDataURL={photo.blurDataURL}
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
      />

      {hasCaption && (
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-[250ms] ease-out group-hover:opacity-100">
          <div className="absolute inset-x-0 bottom-0 h-[30%] bg-linear-to-t from-black/70 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5 text-left">
            {hasTitle && (
              <p className="text-[15px] font-semibold leading-snug text-white">{photo.title}</p>
            )}
            {hasLocation && <p className="mt-0.5 text-[13px] text-white/85">@ {photo.location}</p>}
          </div>
        </div>
      )}
    </button>
  );
}
