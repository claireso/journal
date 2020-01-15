const path = require('path')
const webpack = require('webpack')
const LoadablePlugin = require('@loadable/webpack-plugin')
const { InjectManifest } = require('workbox-webpack-plugin')

const config = require('../config.js')()

const ROOT = process.cwd()
const notificationConfig = config.website.notification
const IS_PUSH_ENABLED = !!(
  notificationConfig.publicKey && notificationConfig.privateKey
)

module.exports = {
  context: path.resolve(ROOT, 'src'),
  entry: {
    admin: ['@babel/polyfill', './static/js/admin.js'],
    journal: ['@babel/polyfill', './static/js/journal.js'],
    polyfills: './static/js/polyfills.js'
  },
  output: {
    filename: 'js/[name].js',
    path: path.resolve(ROOT, 'public'),
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.css']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            configFile: path.resolve(ROOT, '.babel-client.babelrc')
          }
        }
      }
    ]
  },
  plugins: [
    new LoadablePlugin({
      writeToDisk: {
        filename: './dist/loadable-stats'
      }
    }),
    new InjectManifest({
      swSrc: './src/static/js/sw.js',
      swDest: `${ROOT}/public/sw.js`,
      ...(IS_PUSH_ENABLED ? { importScripts: '/sw-push.js' } : {})
    }),
    new webpack.EnvironmentPlugin({
      IS_PUSH_ENABLED: IS_PUSH_ENABLED
    })
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'vendors',
          chunks: 'initial',
          minChunks: 2,
          test: /[\\/]node_modules[\\/]/
        }
      }
    }
  }
}
