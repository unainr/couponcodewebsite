import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images:{
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
      },
    ],
  },
   eslint: {
       ignoreDuringBuilds: true, // Ignore ESLint errors during builds
     },
};

export default nextConfig;
