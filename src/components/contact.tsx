import { site } from "@content/site";

export function Contact() {
  const { contact } = site;
  return (
    <section
      id="contact"
      className="mx-auto w-full max-w-6xl scroll-mt-16 border-t border-[color:var(--border)] px-6 py-14 sm:px-8"
    >
      <h2 className="mb-5 text-sm lowercase">{contact.heading}</h2>
      <ul className="space-y-2 text-[15px] lowercase">
        {contact.instagram && (
          <li className="flex gap-3">
            <span className="w-20 text-[color:var(--muted)]">instagram</span>
            <a
              href={contact.instagram.url}
              target="_blank"
              rel="noreferrer"
              className="border-b border-[color:var(--border)] transition-colors hover:border-[color:var(--text)]"
            >
              {contact.instagram.handle}
            </a>
          </li>
        )}
        <li className="flex gap-3">
          <span className="w-20 text-[color:var(--muted)]">email</span>
          <a
            href={`mailto:${contact.email}`}
            className="border-b border-[color:var(--border)] transition-colors hover:border-[color:var(--text)]"
          >
            {contact.email}
          </a>
        </li>
      </ul>
    </section>
  );
}
