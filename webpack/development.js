const webpack = require('webpack')
const merge = require('webpack-merge')

const ManifestPlugin = require('webpack-manifest-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const webpackConfig = require('./base')

const ROOT = process.cwd()

module.exports = merge(webpackConfig, {
  mode: 'development',
  output: {
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].bundle.js',
  },
  plugins: [
    CopyWebpackPlugin([
      {
        from: './static/manifest.json',
        to: `${ROOT}/public/[name].[ext]`
      },
      {
        from: './static/icons/*',
        to: `${ROOT}/public/icons/[name].[ext]`
      },
    ]),
    new ManifestPlugin({
      fileName: 'asset-manifest.json'
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development'
    })
  ]
})