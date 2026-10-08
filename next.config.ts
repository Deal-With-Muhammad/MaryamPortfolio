import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // Keep links to the old static site working
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/gallery.html", destination: "/#art", permanent: true },
    ];
  },
};

export default nextConfig;
