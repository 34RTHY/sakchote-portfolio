import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    minimumCacheTTL: 2592000, // 30 days — Cloudflare respects this Cache-Control
    deviceSizes: [640, 1080, 1920],    // mobile, desktop, large — down from 8 defaults
    imageSizes: [256],                  // thumbnail only — down from 4 defaults
  },
  experimental: {
    viewTransition: true,
  },
};

export default nextConfig;
