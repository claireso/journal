import CompressionPlugin from 'compression-webpack-plugin'
import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin'

import type { NextConfig } from 'next'

const IS_NOTIFICATIONS_ENABLED = !!(
  process.env.NEXT_PUBLIC_NOTIFICATIONS_PUBLIC_KEY && process.env.NOTIFICATIONS_PRIVATE_KEY
)
const websiteUrl = new URL(process.env.WEBSITE_URL ?? '')

const withVanillaExtract = createVanillaExtractPlugin()

const nextConfig: NextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  poweredByHeader: false,
  compiler: {
    reactRemoveProperties: true
  },
  compress: process.env.COMPRESSION === 'enabled',
  serverExternalPackages: ['pino', 'pino-pretty'],
  async redirects() {
    return [
      {
        source: '/admin',
        destination: '/admin/photos',
        permanent: true
      }
    ]
  },
  async headers() {
    return [
      {
        source: '/sw.js',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/javascript; charset=utf-8'
          },
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate'
          }
        ]
      }
    ]
  },
  env: {
    NEXT_PUBLIC_IS_NOTIFICATIONS_ENABLED: String(IS_NOTIFICATIONS_ENABLED),
    NEXT_PUBLIC_WEBSITE_URL: String(process.env.WEBSITE_URL)
  },
  images: {
    remotePatterns: [
      {
        protocol: websiteUrl.protocol.replace(':', '') as 'http' | 'https',
        hostname: websiteUrl.hostname,
        port: websiteUrl.port,
        pathname: '/uploads/**'
      }
    ]
  },
  webpack: (config, { dev, isServer }) => {
    if (!isServer && !dev) {
      // gzip assets in production environment
      config.plugins.push(
        new CompressionPlugin({
          algorithm: 'gzip',
          test: /\.js(\?.*)?$/i
        })
      )
    }

    return config
  }
}

module.exports = withVanillaExtract(nextConfig)
