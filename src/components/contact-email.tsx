"use client";

import { useState } from "react";

// copy that works both in modern browsers and in more locked-down contexts
async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // fall through to the legacy approach
  }
  try {
    const field = document.createElement("textarea");
    field.value = text;
    field.setAttribute("readonly", "");
    field.style.position = "absolute";
    field.style.left = "-9999px";
    document.body.appendChild(field);
    field.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(field);
    return ok;
  } catch {
    return false;
  }
}

export function ContactEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  // clicking copies the address to the clipboard, with a quiet confirmation.
  const handleCopy = async () => {
    const ok = await copyText(email);
    if (ok) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    }
  };

  return (
    <span className="inline-flex items-baseline gap-3">
      <button
        type="button"
        onClick={handleCopy}
        aria-label={`copy email address ${email}`}
        className="cursor-pointer border-b border-[color:var(--border)] p-0 transition-colors hover:border-[color:var(--text)]"
      >
        {email}
      </button>
      <span
        aria-live="polite"
        className={`text-xs text-[color:var(--muted)] transition-opacity duration-300 ${
          copied ? "opacity-100" : "opacity-0"
        }`}
      >
        copied :)
      </span>
    </span>
  );
}
