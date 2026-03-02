import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    minimumCacheTTL: 2592000, // 30 days — Cloudflare respects this Cache-Control
  },
  experimental: {
    viewTransition: true,
  },
};

export default nextConfig;
