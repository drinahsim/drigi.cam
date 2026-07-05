import { site } from "@content/site";

export function Footer() {
  return (
    <footer className="mx-auto w-full max-w-6xl border-t border-[color:var(--border)] px-6 py-10 text-xs lowercase text-[color:var(--muted)] sm:px-8">
      {site.footer}
    </footer>
  );
}
