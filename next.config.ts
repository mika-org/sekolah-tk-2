import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingExcludes: {
    "*": ["./public/storage/**"],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "smartkids.elevore.web.id",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.elevore.web.id",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;


