const chalk = require('chalk')

module.exports = (env = process.env.NODE_ENV || 'development') => {
  const fileName = `config.${env.toLowerCase()}.json`

  try {
    return require(`./${fileName}`)
  } catch (err) {
    console.log(
      chalk.red(
        `Error: your configuration file "${fileName}" does not exist. Please read the documentation for information`
      )
    )
    process.exit(0)
  }
}