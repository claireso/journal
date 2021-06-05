import pg from 'pg'

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
    if (process.env.NODE_ENV !== 'production') {
      /* eslint-disable */
      console.log('query: ', text)
      if (values) {
        console.log('query with values: ', values)
      }
    }

    return pool.query(text, values, callback)
  },
  connect(fn) {
    return pool.connect(fn)
  },
  end() {
    return pool.end()
  }
}
