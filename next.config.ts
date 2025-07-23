import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  experimental: {
    ppr: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: "avatar.vercel.sh",
      },
    ],
    unoptimized: true,
  },
  env: {
    WEBHOOK_URL: process.env.WEBHOOK_URL,
    VERCEL_DOMAIN: process.env.VERCEL_DOMAIN,
    GITHUB_REPO: process.env.GITHUB_REPO,
  },
}

export default nextConfig
