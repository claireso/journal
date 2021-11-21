const path = require('path')

const directory = process.cwd()

module.exports = {
  stories: [path.resolve(directory, 'src/components/**/*.stories.js')],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  core: {
    builder: 'webpack5'
  },
  webpackFinal: async (config, { configType }) => {
    config.resolve.alias['@utils'] = path.resolve(directory, 'src', 'utils')
    config.resolve.alias['@components'] = path.resolve(directory, 'src', 'components')
    config.resolve.alias['@services'] = path.resolve(directory, 'src', 'services')
    config.resolve.alias['@features'] = path.resolve(directory, 'src', 'features')

    return config
  }
}
