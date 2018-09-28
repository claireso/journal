const merge = require('webpack-merge')
const webpack = require('webpack')

const ManifestPlugin = require('webpack-manifest-plugin')
const CopyWebpackPlugin =  require('copy-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')

const webpackConfig = require('./base')

const ROOT = process.cwd()

module.exports = merge(webpackConfig, {
  mode: 'production',
  output: {
    filename: (chunkData) => {
      return chunkData.chunk.name === 'sw' ? '[name].js' : 'js/[name]-[chunkhash:10].js'
    },
  },
  plugins: [
    CopyWebpackPlugin([
      {
        from: './static/manifest.json',
        to: `${ROOT}/public/[name]-[hash:10].[ext]`
      },
      {
        from: './static/icons/*',
        to: `${ROOT}/public/icons/[name].[ext]`
      }
    ]),
    new ManifestPlugin({
      fileName: 'asset-manifest.json',
      map(file) {
        // https://github.com/webpack-contrib/copy-webpack-plugin/issues/104
        // We need to do this until copy-webpack-plugin supports webpack hashing
        file.name =  file.name.replace(/\-[a-f0-9]{10}\./, '.')

        return file
      }
    }),
    new CompressionPlugin({
      algorithm: 'gzip',
      test: /\.js(\?.*)?$/i,
      deleteOriginalAssets: true,
      exclude: 'sw.js'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
})