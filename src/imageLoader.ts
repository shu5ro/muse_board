import { ImageLoader } from 'next/image';

const cloudflareLoader: ImageLoader = ({ src, width, quality }) => {
  return `https://muse-board.pages.dev/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality || 75}`;
};

export default cloudflareLoader;