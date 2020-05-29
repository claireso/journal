const path = require('path')
const { InjectManifest } = require('workbox-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')

const config = require('./config')()

const IS_NOTIFICATIONS_ENABLED = !!(
  config.notifications &&
  config.notifications.publicKey &&
  config.notifications.privateKey
)

module.exports = {
  poweredByHeader: false,
  env: {
    isProduction: process.env.NODE_ENV === 'production',
    website: config.website,
    isNotificationsEnabled: IS_NOTIFICATIONS_ENABLED,
    notificationsPublicKey:
      IS_NOTIFICATIONS_ENABLED && config.notifications.publicKey,
    notificationsPrivateKey:
      IS_NOTIFICATIONS_ENABLED && config.notifications.privateKey
  },
  webpack: (config, { dev, isServer }) => {
    if (!isServer) {
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

    // gzip assets in production environment
    if (!isServer && !dev) {
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
