import { ImageLoader } from 'next/image';

const cloudflareLoader: ImageLoader = ({ src, width, quality }) => {
  const params = [`width=${width}`];
  if (quality) {
    params.push(`quality=${quality}`);
  }
  const paramsString = params.join(',');
  return `https://muse-board.pages.dev/cdn-cgi/image/${paramsString}${src}`;
};

export default cloudflareLoader;