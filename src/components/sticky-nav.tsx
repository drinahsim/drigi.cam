"use client";

import { useEffect, useState } from "react";
import { site } from "@content/site";

export function StickyNav() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 320);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 top-0 z-40 border-b border-[color:var(--border)] bg-white/85 backdrop-blur transition-opacity duration-500 ${
        show ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-center px-6 py-3 text-sm lowercase sm:justify-between sm:px-8">
        <a
          href="#top"
          className="hidden text-[color:var(--muted)] transition-colors hover:text-[color:var(--text)] sm:block"
        >
          drinah&apos;s digicams
        </a>
        <div className="flex gap-6">
          {site.categories.map((category) => (
            <a
              key={category.slug}
              href={`#${category.slug}`}
              className="text-[color:var(--muted)] transition-colors hover:text-[color:var(--text)]"
            >
              {category.title}
            </a>
          ))}
        </div>
      </nav>
    </div>
  );
}
