const path = require('path')
const config = require('../config')

const directory = process.cwd()

module.exports = {
  stories: [
    path.resolve(directory, 'src/**/*.stories.js'),
  ],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-actions'],
  core: {
    builder: 'webpack5'
  },
  webpackFinal: async (webpackConfig) => {
    for (const [alias, directory] of Object.entries(config.alias)) {
      webpackConfig.resolve.alias[alias] = directory
    }

    return webpackConfig
  }
}
