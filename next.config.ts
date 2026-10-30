import type { NextConfig } from "next";

// aevinite.com is served as plain files from GitHub Pages (.github/workflows/pages.yml), not from
// Vercel: the site needs no server (the contact form posts straight to Web3Forms), and on Vercel it
// shared a free account with the restaurant app, so when that app used up the account's server
// time (23 Oct 2026) Vercel paused aevinite.com along with it. Plain files can't be paused that way.
//
// Obituary: next.config's headers() (nosniff / referrer / frame) only works on a Next server, so it
// went with Vercel. GitHub Pages sends HTTPS-only itself; it does not let a site add its own headers.
const nextConfig: NextConfig = {
  output: "export",
  // No image server on a static host — next/image serves the file as it is in public/.
  images: { unoptimized: true },
  // Pin the workspace root so Next doesn't mis-detect it from stray lockfiles.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
