import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  // 外部ドメインの画像を利用するための許可
  images: {
    remotePatterns: [{ hostname: 'i.scdn.co' }, { hostname: 'm.media-amazon.com' }, { hostname: '*.mzstatic.com' }]
  }
};

export default nextConfig;
