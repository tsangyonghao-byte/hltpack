import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@prisma/client", ".prisma/client"],
  turbopack: {
    root: process.cwd(),
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "20mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.szhltbz.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.myxypt.com',
      },
    ],
  },
};

export default nextConfig;
