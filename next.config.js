const path = require('path')
const { InjectManifest } = require('workbox-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const IS_NOTIFICATIONS_ENABLED = !!(
  process.env.NEXT_PUBLIC_NOTIFICATIONS_PUBLIC_KEY && process.env.NOTIFICATIONS_PRIVATE_KEY
)

module.exports = {
  poweredByHeader: false,
  compress: process.env.COMPRESSION === 'enabled',
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
    IS_NOTIFICATIONS_ENABLED: IS_NOTIFICATIONS_ENABLED
  },
  webpack: (config, { dev, isServer }) => {
    if (!isServer) {
      // enable service worker
      config.plugins.push(
        new CopyWebpackPlugin({
          patterns: [path.resolve(__dirname, 'public', 'offline.html')]
        }),
        new InjectManifest({
          swSrc: path.resolve(__dirname, 'src', 'services', 'serviceworker', 'sw.js'),
          swDest: path.resolve(__dirname, 'public', 'sw.js'),
          exclude: ['build-manifest.json', 'react-loadable-manifest.json', /\/pages\/admin/, /\.map$/],
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

    ;['utils', 'hooks', 'components', 'services', 'features', 'types'].forEach((directory) => {
      config.resolve.alias[`@${directory}`] = path.resolve(__dirname, 'src', directory)
    })

    return config
  }
}
