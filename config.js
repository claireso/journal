const path = require('path')

/**
 * Config shared beetween storybook / jest
 * Note: nextjs load jsconfig.json file to resolve paths
 */
module.exports = {
  alias: {
    '@utils': path.resolve(__dirname, 'src', 'utils'),
    '@components': path.resolve(__dirname, 'src', 'components'),
    '@services': path.resolve(__dirname, 'src', 'services'),
    '@features': path.resolve(__dirname, 'src', 'features'),
    '@hooks': path.resolve(__dirname, 'src', 'hooks'),
    '@types': path.resolve(__dirname, 'src', 'types')
  }
}
