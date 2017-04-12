const pg = require('pg');
const config = require('../config.json')

const pool = new pg.Pool(config.db)

pool.on('error', function (err, client) {
  console.error('idle client error', err.message, err.stack)
})

module.exports.query = (text, values, callback) => {
  console.log('query:', text, values)
  return pool.query(text, values, callback)
}
