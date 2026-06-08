import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root so Next doesn't mis-detect it from stray lockfiles.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
