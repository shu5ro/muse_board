import { ImageLoader } from 'next/image';

const cloudflareLoader: ImageLoader = ({ src, width, quality }) => {
  // 絶対URLの場合はそのまま返す
  if (src.startsWith('http')) {
    return src;
  }
  // 相対パスの場合はCloudflare PagesのURLに変換
  return `https://muse-board.pages.dev/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality || 75}`;
};

export default cloudflareLoader;