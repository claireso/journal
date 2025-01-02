import path from 'path'
import { InjectManifest } from 'workbox-webpack-plugin'
import CompressionPlugin from 'compression-webpack-plugin'
import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin'

import type { NextConfig } from 'next'

const IS_NOTIFICATIONS_ENABLED = !!(
  process.env.NEXT_PUBLIC_NOTIFICATIONS_PUBLIC_KEY && process.env.NOTIFICATIONS_PRIVATE_KEY
)

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
  // experimental: {
  //   staleTimes: {
  //     dynamic: 30,
  //     static: 180
  //   }
  // },
  async redirects() {
    return [
      {
        source: '/admin',
        destination: '/admin/photos',
        permanent: true
      }
    ]
  },
  env: {
    NEXT_PUBLIC_IS_NOTIFICATIONS_ENABLED: String(IS_NOTIFICATIONS_ENABLED)
  },
  webpack: (config, { dev, isServer }) => {
    if (!isServer) {
      // enable service worker
      config.plugins.push(
        new InjectManifest({
          swSrc: path.resolve(__dirname, 'src', 'interface', 'web', 'services', 'serviceworker', 'sw.js'),
          swDest: path.resolve(__dirname, 'public', 'sw.js'),
          exclude: [
            'build-manifest.json',
            'react-loadable-manifest.json',
            /middleware-manifest\.json$/,
            /\/pages\/admin/,
            /\.map$/
          ]
        })
      )
    }

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
