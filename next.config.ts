import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Turbopack root configuration (as per Next.js 16)
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
