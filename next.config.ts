import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: `export`,
  reactStrictMode: true,
  images: {
    loader: 'custom',
    loaderFile: './src/imageLoader.ts',
    domains: ["source.unsplash.com", "pbs.twimg.com", "waujtfrtdrmkrnnsnvtb.supabase.co"],
  },
};

export default nextConfig;
