import { site } from "@content/site";

export function About() {
  return (
    <section
      id="about"
      className="mx-auto w-full max-w-6xl scroll-mt-16 border-t border-[color:var(--border)] px-6 py-14 sm:px-8"
    >
      <h2 className="mb-5 text-sm lowercase">{site.about.heading}</h2>
      <div className="max-w-prose space-y-2 text-[15px] leading-relaxed lowercase">
        {site.about.paragraphs.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}
