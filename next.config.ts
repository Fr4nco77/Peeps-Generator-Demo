import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    outputFileTracingIncludes: {
      "/api/**": [
        "node_modules/peeps-generator/dist/assets/**/*",
      ],
    },
  },
};

export default nextConfig;
