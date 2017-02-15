const pg = require('pg');

const db_path = 'postgres://localhost/journal';

const connect = () => pg.connect(db_path);

module.exports = connect

// TODO
// const onConnect = (err, client, done) => {
//   if (err) {
//     console.error(err);
//     process.exit(1);
//   }
//
//   client.end();
// }
