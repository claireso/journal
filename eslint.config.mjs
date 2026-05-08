// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from 'eslint-plugin-storybook'
import nextConfig from 'eslint-config-next/core-web-vitals'
import nextTypescript from 'eslint-config-next/typescript'
import prettierPlugin from 'eslint-plugin-prettier/recommended'

const eslintConfig = [
  {
    ignores: [
      'coverage/**',
      'public/sw.js',
      '.cypress/**',
      'scripts/**',
      'server.js',
      'jest.config.js',
      'jest.node.config.js',
      'jest.base.config.js',
      'logtail.transport.js'
    ]
  },
  ...nextConfig,
  ...nextTypescript,
  prettierPlugin,
  ...storybook.configs['flat/recommended'],
  {
    rules: {
      '@next/next/no-img-element': 'off',
      'prettier/prettier': 'error'
    }
  }
]

export default eslintConfig
