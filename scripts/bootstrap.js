import pgtools from 'pgtools'
import chalk from 'chalk'
import promptly from 'promptly'
import { exec } from 'child_process'

import config from '../config'
import db from '../server/db/db'

// create database
const createDatabase = async (databaseName) => {
  if (!databaseName)
    throw new Error('Missing database name in config')

  console.log(chalk.cyan(`Step 1/3 : Creating database "${ databaseName }"...`))

  try {
    await pgtools.createdb(
      {
        user: config.db.user,
        password: config.db.password,
        port: config.db.port,
        host: config.db.host,
      },
      databaseName
    )

    console.log(chalk.green(`Database has been created successfully`))
  } catch(err) {
    console.log(chalk.red('Failed: an error has occurred during the creation of the database'))
    throw err
  }
}

const dropDatabase = async (databaseName) => {
  try {
    await pgtools.dropdb(
      {
        user: config.db.user,
        password: config.db.password,
        port: config.db.port,
        host: config.db.host,
      },
      databaseName
    )
  } catch (err) {
    console.log(chalk.red('Failed: an error has occurred during the drop of the database'))
    throw err
  }
}

// create table
const createTable = async (client) => {
  console.log(chalk.cyan(`Step 2/3 : Setup database...`))

  try {
    await client.query(`CREATE TYPE POSITION_TYPE AS ENUM ('left', 'center', 'right')`)
    await client.query(`
      CREATE TABLE photos (
        ID SERIAL PRIMARY KEY,
        title VARCHAR,
        description TEXT,
        name VARCHAR,
        position POSITION_TYPE DEFAULT 'left',
        portrait BOOLEAN DEFAULT False,
        square BOOLEAN DEFAULT False
      )
    `)
    await client.query(`
      CREATE TABLE subscriptions (
        ID SERIAL PRIMARY KEY,
        subscription JSON NOT NULL
      )
    `)
    console.log(chalk.green(`Table has been created successfully`))
  } catch (err) {
    console.log(chalk.red('An error has occured during database table creation'))
    throw err
  }
}

const createHtpasswd = async (username, password) => {
  return new Promise((resolve, reject) => {
    exec(`npx htpasswd -b -c htpasswd ${username} ${password}`, function(err, stdout, stderr) {
      if (err) {
        reject(err)
        return
      }
      resolve()
    })
  })
}

// create admin user
const createAdminUser = async () => {
  console.log(chalk.cyan(`Step 3/3 : Create admin user...`))

  try {
    const username = await promptly.prompt('Enter the username: ')
    const password = await promptly.password('Enter a password: ')

    await createHtpasswd(username, password)

    console.log(
      chalk.green('Admin user has been created successfully.')
    )
  } catch(err) {
    console.log(chalk.red('An error has occured during the admin user creation'))
    throw err
  }
}

// start install
const bootstrap = (restart) => {
  const databaseName = config.db.database
  db.connect(async (err, client, release) => {
    try {
      if (err) {
        if (err.code === '3D000') {
          // create database
          await createDatabase(databaseName)
          // restart bootstrap
          bootstrap(true)
          return
        }

        console.log(chalk.red('An error has occured during the connection of the database'))
        console.log(err.stack)
        throw err
        return

      } else {
        if (restart !== true) {
          // ask to drop database
          const answer = await promptly.confirm(`Database ${ databaseName } already exists. Do you want do continue?(y/n)`);

          if (answer === false) {
            process.exit()
            return
          }

          // drop database
          await client.end()
          await dropDatabase(databaseName)
          // restart bootstrap
          bootstrap(true)
          return
        }
      }

      //create table photo
      await createTable(client)

      //create admin user
      await createAdminUser()

      console.log(
        chalk.green('Installation has been completed successfully. You can now run your application.')
      )

      process.exit()
    } catch (err) {
      console.log(chalk.red('An error has occured during the installation'))
      console.log(err)
      process.exit()
    }
  })
}

// RUN SCRIPT
bootstrap()
