import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "xaoqvnenngpqonbdfibw.supabase.co",
      },
      {
        hostname: "cdn.discordapp.com",
      },
    ],
  },
};

export default nextConfig;
