import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root so Next doesn't mis-detect it from stray lockfiles.
  turbopack: {
    root: __dirname,
  },
  // Three standard safety headers the SEO audit (jev-seo) found missing on every page:
  // don't guess file types, don't hand our full URLs to other sites, and don't let another
  // site show aevinite.com inside a frame. (HTTPS-only / HSTS is already sent by Vercel.)
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};

export default nextConfig;
