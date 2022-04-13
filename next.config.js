const path = require('path')
const { InjectManifest } = require('workbox-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
// const CopyWebpackPlugin = require('copy-webpack-plugin')

const IS_NOTIFICATIONS_ENABLED = !!(
  process.env.NEXT_PUBLIC_NOTIFICATIONS_PUBLIC_KEY && process.env.NOTIFICATIONS_PRIVATE_KEY
)

module.exports = {
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
    IS_NOTIFICATIONS_ENABLED: IS_NOTIFICATIONS_ENABLED
  },
  webpack: (config, { dev, isServer }) => {
    if (!isServer) {
      // enable service worker
      config.plugins.push(
        // @TODO add offline page to precache
        // new CopyWebpackPlugin({
        //   patterns: [
        //     {
        //       from: path.resolve(__dirname, "public/offline.html"),
        //     },
        //   ],
        // }),
        new InjectManifest({
          swSrc: path.resolve(__dirname, 'src', 'services', 'serviceworker', 'sw.js'),
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
