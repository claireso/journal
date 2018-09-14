const merge = require('webpack-merge')

const ManifestPlugin = require('webpack-manifest-plugin')
const CopyWebpackPlugin =  require('copy-webpack-plugin')

const webpackConfig = require('./base')

const ROOT = process.cwd()

module.exports = merge(webpackConfig, {
  mode: 'development',
  plugins: [
    CopyWebpackPlugin([
      {
        from: './static/js/sw.js',
        to: `${ROOT}/public/[name].[ext]`
      },
      {
        from: './static/manifest.json',
        to: `${ROOT}/public/[name].[ext]`
      }
    ]),
    new ManifestPlugin({
      fileName: 'asset-manifest.json'
    })
  ]
})