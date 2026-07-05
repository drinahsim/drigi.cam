import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import { site } from "@content/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// used to turn the open-graph image into an absolute url when the site is
// shared. on vercel this is filled in automatically; locally it falls back
// to localhost. you can also set NEXT_PUBLIC_SITE_URL yourself.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: site.meta.title,
  description: site.meta.description,
  openGraph: {
    title: site.meta.title,
    description: site.meta.description,
    type: "website",
    images: site.meta.ogImage ? [{ url: site.meta.ogImage }] : undefined,
  },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
