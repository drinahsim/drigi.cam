"use client";

import { useCallback, useState } from "react";
import type { CategoryGallery } from "@/lib/types";
import { Masonry } from "./masonry";
import { Lightbox } from "./lightbox";

type OpenState = { category: number; index: number } | null;

export function Gallery({ galleries }: { galleries: CategoryGallery[] }) {
  const [open, setOpen] = useState<OpenState>(null);

  const navigate = useCallback(
    (delta: number) => {
      setOpen((current) => {
        if (!current) return current;
        const count = galleries[current.category].photos.length;
        return { ...current, index: (current.index + delta + count) % count };
      });
    },
    [galleries]
  );

  const active = open ? galleries[open.category] : null;

  return (
    <>
      {galleries.map((gallery, categoryIndex) => (
        <section
          key={gallery.slug}
          id={gallery.slug}
          className="mx-auto w-full max-w-6xl scroll-mt-16 px-6 py-10 sm:px-8 sm:py-12"
        >
          <div className="mb-6 flex items-baseline justify-between border-t border-[color:var(--border)] pt-4">
            <h2 className="text-sm lowercase">{gallery.title}</h2>
            {gallery.photos.length > 0 && (
              <span className="text-xs text-[color:var(--muted)]">{gallery.photos.length}</span>
            )}
          </div>

          {gallery.photos.length > 0 ? (
            <Masonry
              photos={gallery.photos}
              onOpen={(index) => setOpen({ category: categoryIndex, index })}
            />
          ) : (
            <p className="py-8 text-sm lowercase text-[color:var(--muted)]">
              no photos here yet — add some to public/photos/{gallery.slug}/
            </p>
          )}
        </section>
      ))}

      {open && active && (
        <Lightbox
          photos={active.photos}
          index={open.index}
          onClose={() => setOpen(null)}
          onNavigate={navigate}
        />
      )}
    </>
  );
}
