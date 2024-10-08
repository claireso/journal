const path = require('path')

const directory = process.cwd()

module.exports = {
  framework: {
    name: '@storybook/react-webpack5'
  },
  stories: [path.resolve(directory, 'src/**/*.stories.js')],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-actions',
    '@storybook/addon-webpack5-compiler-swc'
  ],
  webpackFinal: async (webpackConfig) => {
    webpackConfig.resolve.alias = {
      ...webpackConfig.resolve.alias,
      '@utils': path.resolve(directory, 'src', 'utils'),
      '@types': path.resolve(directory, 'src', 'types'),
      '@domain': path.resolve(directory, 'src', 'domain'),
      '@infrastructure': path.resolve(directory, 'src', 'infrastructure'),
      '@application': path.resolve(directory, 'src', 'application'),
      '@dto': path.resolve(directory, 'src', 'dto'),
      '@ioc': path.resolve(directory, 'src', 'ioc'),
      '@web': path.resolve(directory, 'src', 'interface', 'web'),
      '@api': path.resolve(directory, 'src', 'interface', 'api'),
      // https://github.com/storybookjs/storybook/issues/12016
      '@storybook/theming': path.dirname(require.resolve('@storybook/theming/package.json'))
    }

    return webpackConfig
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript'
  }
}
