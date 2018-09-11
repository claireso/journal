const path = require('path')

const ManifestPlugin = require('webpack-manifest-plugin')
const CopyWebpackPlugin =  require('copy-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')

const ROOT = process.cwd()

const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development'
const isProduction = mode === 'production'

const hashes = {
  hash: isProduction ? '[hash:10]' : 'dev',
  chunkhash: isProduction ? '[chunkhash:10]' : 'dev'
}

const getPlugins = () => {
  const plugins = [
    CopyWebpackPlugin([
      {
        from: './static/js/sw.js',
        to: `${ROOT}/public/[name]-${hashes.hash}.[ext]`
      },
      {
        from: './static/manifest.json',
        to: `${ROOT}/public/[name]-${hashes.hash}.[ext]`
      }
    ]),
    new ManifestPlugin({
      fileName: 'asset-manifest.json',
      map(file) {
        // https://github.com/webpack-contrib/copy-webpack-plugin/issues/104
        // We need to do this until copy-webpack-plugin supports webpack hashing
        if (isProduction) {
          file.name =  file.name.replace(/\-[a-f0-9]{10}\./, '.')
        } else {
          file.name =  file.name.replace(/\-dev\./, '.')
        }

        return file
      }
    })
  ]

  if (isProduction) {
    plugins.push(new CompressionPlugin({
      algorithm: 'gzip',
      test: /\.js(\?.*)?$/i,
      deleteOriginalAssets: true
    }))
  }

  return plugins
}

module.exports = {
  context: path.resolve(ROOT, 'src'),
  mode: mode,
  entry: {
    admin: ['@babel/polyfill', './static/js/admin.js'],
    journal: ['@babel/polyfill', './static/js/journal.js'],
  },
  output: {
    filename: `js/[name]-${hashes.chunkhash}.js`,
    path: path.resolve(ROOT, 'public'),
    publicPath: '/'
  },
  plugins: getPlugins(),
  resolve: {
    extensions: ['.js', '.css']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
}