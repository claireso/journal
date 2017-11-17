const pg = require('pg')
const config = require('../../config.json')

const pool = new pg.Pool(config.db)

pool.on('error', function (err) {
  /* eslint-disable */
  console.error('idle client error', err.message, err.stack)
})

export default {
  query(text, values, callback){
    /* eslint-disable */
    console.log('query:', text, values)
    return pool.query(text, values, callback)
  }
}
