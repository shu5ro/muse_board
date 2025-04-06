import { ImageLoader } from 'next/image';

const cloudflareLoader: ImageLoader = ({ src }) => {
  // 絶対URLの場合はそのまま返す
  if (src.startsWith('http')) {
    return src;
  }
  // 相対パスの場合は直接パスを返す
  return src;
};

export default cloudflareLoader;