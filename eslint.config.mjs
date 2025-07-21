// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat({})

const eslintConfig = [...compat.config({
  extends: ['next/core-web-vitals', 'next/typescript', 'prettier', 'plugin:prettier/recommended'],
  rules: {
    '@next/next/no-img-element': 'off',
    'prettier/prettier': 'error'
  }
}), ...storybook.configs["flat/recommended"]]
export default eslintConfig
