import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'crimson-bitter-perch-541.mypinata.cloud',
        pathname: '/ipfs/**',
      },
      {
        protocol: 'https',
        hostname: '3u39ha98bi.ufs.sh',
        pathname: '/f/**',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'alt.tailus.io',
        pathname: '/images/**',
      },
      // better-flow.ed7d0f33fb5c1628368d2013a92a2f55.r2.cloudflarestorage.com
      {
        protocol: 'https',
        hostname:
          'better-flow.ed7d0f33fb5c1628368d2013a92a2f55.r2.cloudflarestorage.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
