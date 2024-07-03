const path = require('path')
const webpack = require('webpack')
const { InjectManifest } = require('workbox-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')

// const IS_NOTIFICATIONS_ENABLED = !!(
//   process.env.NEXT_PUBLIC_NOTIFICATIONS_PUBLIC_KEY && process.env.NOTIFICATIONS_PRIVATE_KEY
// )
const IS_NOTIFICATIONS_ENABLED = false

module.exports = {
  output: 'standalone',
  reactStrictMode: true,
  poweredByHeader: false,
  swcMinify: true,
  compiler: {
    reactRemoveProperties: true
  },
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
    NEXT_PUBLIC_IS_NOTIFICATIONS_ENABLED: String(IS_NOTIFICATIONS_ENABLED)
  },
  webpack: (config, { dev, isServer }) => {
    if (!isServer) {
      // enable service worker
      config.plugins.push(
        new InjectManifest({
          swSrc: path.resolve(__dirname, 'src', 'services', 'serviceworker', 'sw.js'),
          swDest: path.resolve(__dirname, 'public', 'sw.js'),
          exclude: [
            'build-manifest.json',
            'react-loadable-manifest.json',
            /middleware-manifest\.json$/,
            /\/pages\/admin/,
            /\.map$/
          ],
          webpackCompilationPlugins: [
            new webpack.DefinePlugin({
              IS_NOTIFICATIONS_ENABLED: JSON.stringify(IS_NOTIFICATIONS_ENABLED),
              SERVICEWORKER_VERSION: JSON.stringify(process.env.SERVICEWORKER_VERSION),
              NOTIFICATIONS_PUBLIC_KEY: JSON.stringify(process.env.NOTIFICATIONS_PUBLIC_KEY)
            })
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
