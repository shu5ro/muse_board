import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: `export`,
  reactStrictMode: true,
  images: {
    loader: 'custom',
    loaderFile: './imageLoader.js',
    domains: ["source.unsplash.com", "pbs.twimg.com", "waujtfrtdrmkrnnsnvtb.supabase.co"],
  },
};

export default nextConfig;
