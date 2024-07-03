require('dotenv').config({ path: process.env.CONFIG_FILE || './.env.local' })

const fs = require('fs')
const path = require('path')
const pgtools = require('pgtools')
const chalk = require('chalk')
const promptly = require('promptly')
const webpush = require('web-push')
const pg = require('pg')

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

// create folder
const createFolder = (folderPath) => {
  return new Promise((resolve, reject) => {
    fs.exists(folderPath, (exists) => {
      if (exists) {
        resolve()
        return
      }

      fs.mkdir(folderPath, (err) => {
        if (err) {
          reject('Folder can not be created')
          return
        }
        resolve()
      })
    })
  })
}

// create folder img
const createFolderImg = async () => {
  const dirImg = path.resolve('uploads')

  try {
    await createFolder(dirImg)
  } catch (err) {
    console.log(chalk.red('Failed: uploads folder cannot be created'))
  }
}

// create database
const createDatabase = async (databaseName) => {
  if (!databaseName) throw new Error('Missing database name in config')

  console.log(chalk.cyan(`Step 1/4 : Creating database "${databaseName}"...`))

  try {
    await pgtools.createdb(
      {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
        host: process.env.DB_HOST
      },
      databaseName
    )

    console.log(chalk.green(`Database has been created successfully`))
  } catch (err) {
    console.log(chalk.red('Failed: an error has occurred during the creation of the database'))
    throw err
  }
}

const dropDatabase = async (databaseName) => {
  try {
    await pgtools.dropdb(
      {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
        host: process.env.DB_HOST
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
  console.log(chalk.cyan(`Step 2/4 : Setup database...`))

  try {
    await client.query(`CREATE TYPE POSITION_TYPE AS ENUM ('left', 'center', 'right')`)
    await client.query(`
      CREATE TABLE photos (
        ID SERIAL PRIMARY KEY,
        title VARCHAR,
        description TEXT,
        name VARCHAR NOT NULL,
        position POSITION_TYPE DEFAULT 'left',
        portrait BOOLEAN DEFAULT False,
        color CHAR (7) CHECK (color ~ '^#[A-Fa-f0-9]{6}$'),
        square BOOLEAN DEFAULT False,
        created_at TIMESTAMP with time zone DEFAULT NOW(),
        updated_at TIMESTAMP with time zone DEFAULT NOW()
      )
    `)
    await client.query(`
      CREATE TABLE subscriptions (
        ID SERIAL PRIMARY KEY,
        subscription JSON NOT NULL,
        created_at TIMESTAMP with time zone DEFAULT NOW(),
        updated_at TIMESTAMP with time zone DEFAULT NOW()
      )
    `)
    await client.query('CREATE EXTENSION IF NOT EXISTS pgcrypto;')
    await client.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
    await client.query(`
      CREATE TABLE users (
        ID SERIAL PRIMARY KEY,
        cid UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
        username VARCHAR NOT NULL UNIQUE,
        password VARCHAR NOT NULL,
        created_at TIMESTAMP with time zone DEFAULT NOW(),
        updated_at TIMESTAMP with time zone DEFAULT NOW()
      )
    `)
    console.log(chalk.green(`Tables has been created successfully`))
  } catch (err) {
    console.log(chalk.red('An error has occured during database table creation'))
    throw err
  }
}

const enableWebPush = async () => {
  console.log(chalk.cyan(`Step 4/4 : Enable web push notification?`))
  //ask to enable
  const answer = await promptly.confirm('Do you want to enable web push notification? (Y/n)')

  if (answer === false) return

  const vapidKeys = webpush.generateVAPIDKeys()

  console.log(chalk.gray('Please update your config by adding public and private keys:'))

  console.log(`NOTIFICATIONS_PUBLIC_KEY="${vapidKeys.publicKey}"`)
  console.log(`NOTIFICATIONS_PRIVATE_KEY="${vapidKeys.privateKey}"`)
}

// create admin user
const createAdminUser = async (client) => {
  console.log(chalk.cyan(`Step 3/4 : Create admin user...`))

  try {
    const username = await promptly.prompt('Enter the username: ')
    const password = await promptly.password('Enter a password: ')

    await client.query(`
      INSERT INTO users (username, password) VALUES (
        '${username}',
        crypt('${password}', gen_salt('md5'))
      )
    `)

    console.log(chalk.green('Admin user has been created successfully.'))
  } catch (err) {
    console.log(chalk.red('An error has occured during the admin user creation'))
    throw err
  }
}

// start install
const bootstrap = (restart) => {
  const databaseName = process.env.DB_NAME

  pool.connect(async (err, client) => {
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
      } else {
        if (restart !== true) {
          // ask to drop database
          const answer = await promptly.confirm(
            `Database ${databaseName} already exists. Do you want do continue?(y/N)`
          )

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

      //create tables photo / subcriptions / users
      await createTable(client)

      //create admin user
      await createAdminUser(client)

      // create folder img
      await createFolderImg()

      // enable web push
      await enableWebPush()

      console.log(chalk.green('Installation has been completed successfully. You can now run your application.'))

      process.exit()
    } catch (err) {
      console.log(chalk.red('An error has occured during the installation'))
      process.exit()
    }
  })
}

// RUN SCRIPT
bootstrap()
