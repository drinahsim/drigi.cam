import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Serve modern, smaller formats where the browser supports them.
    formats: ["image/avif", "image/webp"],
  },
  // read image metadata with the real node builds of these packages
  serverExternalPackages: ["exifr", "sharp"],
};

export default nextConfig;
