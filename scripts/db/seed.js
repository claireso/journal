const chalk = require('chalk')
require('dotenv').config({
  path: process.env.CONFIG_FILE || './.env.test.local'
})

const db = require('../../services/db')
const data = require('./data')

const pool = db.pool

const seed = async () => {
  console.log(chalk.green('Seed database...'))

  const photosQuery = pool.query(
    `INSERT INTO photos (title, description, name, position, portrait, square)
     SELECT title, description, name, position, portrait, square FROM jsonb_to_recordset($1::jsonb) AS t (title text, description text, name text, position position_type, portrait bool, square bool)`,
    [JSON.stringify(data.photos)]
  )

  const subscriptionsQuery = pool.query(
    `INSERT
      INTO subscriptions
      (subscription)
      SELECT * FROM unnest ($1::json[])
    `,
    [data.subscriptions]
  )

  const results = await Promise.allSettled([photosQuery, subscriptionsQuery])

  const rejected = results.filter((res) => res.status === 'rejected')

  if (rejected?.length) {
    console.log(chalk.red('db:seed : An error occured, please retry'))

    rejected.map((r) => console.log(chalk.yellow(r.reason)))
  }

  process.exit()
}

seed()
