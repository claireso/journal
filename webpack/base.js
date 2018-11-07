const ReactLoadablePlugin = require('react-loadable/webpack').ReactLoadablePlugin
const path = require('path')

const ROOT = process.cwd()

module.exports = {
  context: path.resolve(ROOT, 'src'),
  entry: {
    admin: ['@babel/polyfill', './static/js/admin.js'],
    journal: ['@babel/polyfill', './static/js/journal.js'],
    polyfills: './static/js/polyfills.js',
    banner: './static/js/banner.js'
  },
  output: {
    filename: `js/[name].js`,
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
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    new ReactLoadablePlugin({
      filename: './dist/react-loadable.json',
    }),
  ],
  optimization: {
		splitChunks: {
      cacheGroups: {
        commons: {
          name: 'vendors',
					chunks: 'initial',
          minChunks: 2,
          test: /[\\/]node_modules[\\/]/
				},
      }
    }
  }
}