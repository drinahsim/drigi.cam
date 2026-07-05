import { site } from "@content/site";

export function Hero() {
  return (
    <header
      id="top"
      className="mx-auto w-full max-w-6xl px-6 pt-24 pb-14 sm:px-8 sm:pt-32 sm:pb-16"
    >
      <h1 className="text-2xl font-medium lowercase tracking-tight sm:text-[28px]">
        {site.hero.title}
      </h1>
      <p className="mt-3 text-[15px] lowercase text-[color:var(--muted)]">
        {site.hero.subtitle}
      </p>
      <nav aria-label="categories" className="mt-8 flex gap-6 text-sm lowercase">
        {site.categories.map((category) => (
          <a
            key={category.slug}
            href={`#${category.slug}`}
            className="border-b border-transparent pb-1 transition-colors duration-300 hover:border-[color:var(--text)]"
          >
            {category.title}
          </a>
        ))}
      </nav>
    </header>
  );
}
