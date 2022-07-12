import pg from 'pg'
import { server as logger } from '@services/logger'

const pool = new pg.Pool({
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
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
      query: text,
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
