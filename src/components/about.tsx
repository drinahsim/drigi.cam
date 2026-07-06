import Image from "next/image";
import { site } from "@content/site";

export function About() {
  return (
    <section
      id="about"
      className="mx-auto w-full max-w-6xl scroll-mt-16 border-t border-[color:var(--border)] px-6 py-14 sm:px-8"
    >
      <h2 className="mb-5 text-sm lowercase">{site.about.heading}</h2>
      <div className="flex flex-col-reverse items-start gap-8 sm:flex-row sm:items-center sm:justify-between sm:gap-12">
        <div className="max-w-prose flex-1 space-y-2 text-[15px] leading-relaxed lowercase">
          {site.about.paragraphs.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
        <Image
          src="/about/me.jpg"
          alt="drinah"
          width={1512}
          height={1002}
          sizes="(max-width: 640px) 100vw, 320px"
          className="w-full rounded-[2px] object-cover ring-1 ring-[color:var(--border)] sm:w-[320px]"
        />
      </div>
    </section>
  );
}
