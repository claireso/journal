const pg = require('pg');

const connectionString = 'postgres://localhost/journal';

pg.connect(connectionString, onConnect);

const onConnect = (err, client, done) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  client.end();
}
