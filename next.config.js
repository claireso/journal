const path = require('path')
const { InjectManifest } = require('workbox-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')

const IS_NOTIFICATIONS_ENABLED = !!(
  process.env.NEXT_PUBLIC_NOTIFICATIONS_PUBLIC_KEY &&
  process.env.NOTIFICATIONS_PRIVATE_KEY
)

module.exports = {
  poweredByHeader: false,
  compress: process.env.COMPRESSION === 'enabled',
  env: {
    IS_NOTIFICATIONS_ENABLED: IS_NOTIFICATIONS_ENABLED
  },
  webpack: (config, { dev, isServer }) => {
    if (!isServer) {
      // enable service worker
      config.plugins.push(
        new InjectManifest({
          swSrc: path.resolve(__dirname, 'services', 'serviceworker', 'sw.js'),
          swDest: path.resolve(__dirname, 'public', 'sw.js'),
          exclude: [
            'build-manifest.json',
            'react-loadable-manifest.json',
            /\/pages\/admin/,
            /\.map$/
          ],
          modifyURLPrefix: {
            'static/': '_next/static/',
            'public/': '_next/public/'
          }
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

    return {
      ...config
    }
  }
}
