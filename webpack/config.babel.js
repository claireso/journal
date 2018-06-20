import path from 'path'

import ManifestPlugin from 'webpack-manifest-plugin'

const ROOT = process.cwd()

const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development'
const hash = mode === 'production' ? '[chunkhash]' : 'dev'

const plugins = [
  new ManifestPlugin({
    fileName: 'asset-manifest.json',
    //publicPath: '/public/',
    //writeToFileEmit: true,
  })
]

module.exports = {
  mode: mode,
  entry: {
    admin: './src/static/js/admin.js',
  },
  output: {
    filename: `[name]-${hash}.js`,
    path: path.resolve(ROOT, 'public', 'js'),
    //publicPath: '/',
  },
  plugins: plugins,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          // options: {
          //   // presets: ['@babel/preset-env']
          // }
        }
      }
    ]
  }
}