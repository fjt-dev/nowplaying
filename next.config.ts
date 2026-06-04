import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [{ hostname: 'i.scdn.co' }, { hostname: 'm.media-amazon.com' }, { hostname: '*.mzstatic.com' }]
  }
};

export default nextConfig;
