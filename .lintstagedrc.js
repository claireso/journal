// oxlint-disable-next-line
const path = require('path')

const buildLintCommand = (filenames) =>
  `oxlint --fix ${filenames.map((f) => path.relative(process.cwd(), f)).join(' ')}`

module.exports = {
  '*.{js,jsx,ts,tsx}': [buildLintCommand, 'oxfmt']
}
