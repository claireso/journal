const chalk = require('chalk')
require('dotenv').config({
  path: process.env.CONFIG_FILE || './.env.test.local'
})

const db = require('../../services/db')

const pool = db.pool

const reset = async () => {
  console.log(chalk.green('Seed database...'))

  try {
    await pool.query('TRUNCATE photos, subscriptions RESTART IDENTITY')
  } catch (err) {
    console.log(chalk.red('db:reset : An error occured, please retry'))
    console.log(chalk.yellow(err))
  }

  process.exit()
}

reset()
