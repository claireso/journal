import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin'

import type { NextConfig } from 'next'

const IS_NOTIFICATIONS_ENABLED = !!(
  process.env.NEXT_PUBLIC_NOTIFICATIONS_PUBLIC_KEY && process.env.NOTIFICATIONS_PRIVATE_KEY
)

const websiteUrl = new URL(process.env.WEBSITE_URL ?? 'http://localhost')

const withVanillaExtract = createVanillaExtractPlugin({
  unstable_turbopack: { mode: 'auto' }
})

const nextConfig: NextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  poweredByHeader: false,
  cacheComponents: true,
  compiler: {
    reactRemoveProperties: true
  },
  compress: process.env.COMPRESSION === 'enabled',
  serverExternalPackages: ['pino', 'pino-pretty', 'pino-abstract-transport', '@logtail/node'],
  outputFileTracingIncludes: {
    '/**': ['./logtail.transport.js']
  },
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
    dangerouslyAllowLocalIP: process.env.NODE_ENV === 'development',
    unoptimized: process.env.MODE === 'docker',
    qualities: [75, 80],
    remotePatterns: [
      {
        protocol: websiteUrl.protocol.replace(':', '') as 'http' | 'https',
        hostname: websiteUrl.hostname,
        port: websiteUrl.port,
        pathname: '/uploads/**'
      }
    ]
  }
}

module.exports = withVanillaExtract(nextConfig)
