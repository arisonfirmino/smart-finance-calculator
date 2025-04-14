import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "lh3.googleusercontent.com" },
      { hostname: "is1-ssl.mzstatic.com" },
    ],
  },
};

export default nextConfig;
