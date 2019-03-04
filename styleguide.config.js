const path = require('path')

module.exports = {
  title: `Journal styleguide`,
  webpackConfig: require('./webpack/development.js'),
  require: [
    '@babel/polyfill'
  ],
  styleguideComponents: {
    Components: path.join(__dirname, 'src/styleguide/Components'),
    StyleGuideRenderer: path.join(__dirname, 'src/styleguide/StyleGuideRenderer')
  },
  skipComponentsWithoutExample: true,
  sections: [
    {
      name: '',
      content: 'docs/Readme.md'
    },
    {
      name: 'Admin Components',
      content: 'docs/admin/Readme.md',
      components: 'src/apps/admin/components/**/*.js',
      exampleMode: 'collapse',
      usageMode: 'expand',
    },
    {
      name: 'Client Components',
      content: 'docs/client/Readme.md',
      components: 'src/apps/client/components/**/*.js',
      exampleMode: 'collapse',
      usageMode: 'expand'
    },
    {
      name: 'Common Components',
      content: 'docs/common/Readme.md',
      components: 'src/apps/common/components/**/*.js',
      exampleMode: 'collapse',
      usageMode: 'expand'
    }
  ]
}