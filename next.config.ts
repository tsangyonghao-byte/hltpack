import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

if (process.env.NODE_ENV === "development") {
  initOpenNextCloudflareForDev();
}

const nextConfig: NextConfig = {
  serverExternalPackages: ["@prisma/client", ".prisma/client"],
  turbopack: {
    root: process.cwd(),
  },
  outputFileTracingIncludes: {
    '**/*': [
      './node_modules/.prisma/client/wasm.js',
      './node_modules/.prisma/client/query_engine_bg.js',
      './node_modules/.prisma/client/query_engine_bg.wasm',
      './node_modules/.prisma/client/query_compiler_fast_bg.js',
      './node_modules/.prisma/client/query_compiler_fast_bg.wasm',
      './node_modules/.prisma/client/wasm-worker-loader.mjs',
      './node_modules/.prisma/client/wasm-edge-light-loader.mjs',
      './node_modules/@prisma/client/runtime/wasm-engine-edge.js',
      './node_modules/@prisma/client/runtime/wasm-compiler-edge.js',
    ],
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
