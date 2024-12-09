const path = require('path')
const { InjectManifest } = require('workbox-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin')

const IS_NOTIFICATIONS_ENABLED = !!(
  process.env.NEXT_PUBLIC_NOTIFICATIONS_PUBLIC_KEY && process.env.NOTIFICATIONS_PRIVATE_KEY
)

const withVanillaExtract = createVanillaExtractPlugin()

const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  poweredByHeader: false,
  swcMinify: true,
  compiler: {
    reactRemoveProperties: true
  },
  compress: process.env.COMPRESSION === 'enabled',
  experimental: {
    serverComponentsExternalPackages: ['pino', 'pino-pretty']
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
