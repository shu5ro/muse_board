import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: `export`,
  reactStrictMode: true,
  images: {
    unoptimized: true,
    domains: [
      "source.unsplash.com",
      "pbs.twimg.com",
      "waujtfrtdrmkrnnsnvtb.supabase.co",
      "muse-board.pages.dev"
    ],
  },
};

export default nextConfig;
