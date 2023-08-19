const path = require('path')

const directory = process.cwd()

module.exports = {
  framework: {
    name: '@storybook/react-webpack5',
    options: {
      builder: {
        useSWC: true
      }
    }
  },

  stories: [path.resolve(directory, 'src/**/*.stories.js')],

  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-actions'],

  webpackFinal: async (webpackConfig) => {
    webpackConfig.resolve.alias = {
      ...webpackConfig.resolve.alias,
      '@utils': path.resolve(directory, 'src', 'utils'),
      '@components': path.resolve(directory, 'src', 'components'),
      '@services': path.resolve(directory, 'src', 'services'),
      '@features': path.resolve(directory, 'src', 'features'),
      '@hooks': path.resolve(directory, 'src', 'hooks'),
      '@types': path.resolve(directory, 'src', 'types'),
      '@theme': path.resolve(directory, 'src', 'theme')
    }

    return webpackConfig
  },

  docs: {
    autodocs: true
  }
}
