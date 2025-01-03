import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat({})

const eslintConfig = [
  ...compat.config({
    extends: ['next/core-web-vitals', 'next/typescript', 'prettier', 'plugin:prettier/recommended'],
    rules: {
      '@next/next/no-img-element': 'off',
      'prettier/prettier': 'error'
    }
  })
]
export default eslintConfig
