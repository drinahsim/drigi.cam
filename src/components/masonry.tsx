"use client";

import { useEffect, useState } from "react";
import type { Photo } from "@/lib/types";
import { PhotoCard } from "./photo-card";

function useColumnCount() {
  const [cols, setCols] = useState(3);

  useEffect(() => {
    const small = window.matchMedia("(max-width: 640px)");
    const medium = window.matchMedia("(max-width: 1024px)");
    const update = () => setCols(small.matches ? 1 : medium.matches ? 2 : 3);
    update();
    small.addEventListener("change", update);
    medium.addEventListener("change", update);
    return () => {
      small.removeEventListener("change", update);
      medium.removeEventListener("change", update);
    };
  }, []);

  return cols;
}

// shortest-column packing: keeps the newest photos near the top while
// balancing the column heights. aspect ratios are known ahead of time,
// so nothing is ever cropped and there is no layout jump.
function distribute(photos: Photo[], cols: number): Photo[][] {
  const columns: Photo[][] = Array.from({ length: cols }, () => []);
  const heights = new Array(cols).fill(0);

  for (const photo of photos) {
    let target = 0;
    for (let i = 1; i < cols; i++) {
      if (heights[i] < heights[target]) target = i;
    }
    columns[target].push(photo);
    heights[target] += 1 / photo.aspectRatio; // relative height at unit width
  }

  return columns;
}

export function Masonry({
  photos,
  onOpen,
}: {
  photos: Photo[];
  onOpen: (index: number) => void;
}) {
  const cols = useColumnCount();
  const columns = distribute(photos, cols);
  const indexById = new Map(photos.map((photo, i) => [photo.id, i]));

  return (
    <div className="flex gap-3 sm:gap-4">
      {columns.map((column, columnIndex) => (
        <div key={columnIndex} className="flex min-w-0 flex-1 flex-col gap-3 sm:gap-4">
          {column.map((photo) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              onOpen={() => onOpen(indexById.get(photo.id) ?? 0)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
