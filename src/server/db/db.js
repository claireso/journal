const pg = require('pg')
const config = require('../../../config.json')

const pool = new pg.Pool(config.db)

pool.on('error', err => {
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
