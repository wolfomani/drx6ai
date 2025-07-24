/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'cosmic-consciousness.vercel.app',
      },
      {
        protocol: 'https',
        hostname: 'universe-cdn.com',
      },
    ],
    formats: ['image/webp', 'image/avif'],
  },
  experimental: {
    serverActions: true,
    optimizePackageImports: ['@t3-oss/env-nextjs'],
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  }
};

export default nextConfig;
