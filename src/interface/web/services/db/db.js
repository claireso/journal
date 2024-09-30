import pg from 'pg'
import logger from '@web/services/logger'

const pool = new pg.Pool({
  user: process.env.POSTGRES_USER,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  max: 10,
  idleTimeoutMillis: 30000
})

pool.on('error', (err) => {
  /* eslint-disable */
  console.error('idle client error', err.message, err.stack)
})

export default {
  query(text, values, callback) {
    // log queries in dev environment
    const log = {
      query: text
    }

    if (values) {
      log.values = values
    }

    logger.info(log)

    return pool.query(text, values, callback)
  },
  connect(fn) {
    return pool.connect(fn)
  },
  end() {
    return pool.end()
  }
}
