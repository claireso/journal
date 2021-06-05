require('dotenv').config({ path: process.env.CONFIG_FILE || './.env.local' })

const fs = require('fs')
const path = require('path')
const pgtools = require('pgtools')
const chalk = require('chalk')
const promptly = require('promptly')
const webpush = require('web-push')

const db = require('../services/db')

const pool = db.pool

/**
 * Create a folder
 * @params {string} folderPath
 * @return Promise
 */
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

/**
 * Create folder for images called `uploads`
 */
const createFolderImg = async () => {
  const dirImg = path.resolve('uploads')

  try {
    await createFolder(dirImg)
  } catch (err) {
    console.log(chalk.red('Failed: uploads folder cannot be created'))
  }
}

/**
 * Create database
 * @param {string} databaseName
 */
const createDatabase = async (databaseName) => {
  if (!databaseName) throw new Error('Missing database name in config')

  console.log(chalk.cyan(`Step 1/4 : Creating database "${databaseName}"...`))

  try {
    await pgtools.createdb(
      {
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        port: process.env.POSTGRES_PORT,
        host: process.env.POSTGRES_HOST
      },
      databaseName
    )

    console.log(chalk.green(`Database has been created successfully`))
  } catch (err) {
    console.log(
      chalk.red(
        'Failed: an error has occurred during the creation of the database'
      )
    )
    throw err
  }
}

/**
 * Drop a database
 * @param {string} databaseName
 */
const dropDatabase = async (databaseName) => {
  try {
    await pgtools.dropdb(
      {
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        port: process.env.POSTGRES_PORT,
        host: process.env.POSTGRES_HOST
      },
      databaseName
    )
  } catch (err) {
    console.log(
      chalk.red('Failed: an error has occurred during the drop of the database')
    )
    throw err
  }
}

/**
 * Create tables for the applications
 * @param {pool} client
 */
const createTables = async (client) => {
  console.log(chalk.cyan(`Step 2/4 : Setup database...`))

  try {
    await client.query(
      `CREATE TYPE POSITION_TYPE AS ENUM ('left', 'center', 'right')`
    )
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
    console.log(chalk.green(`Tables have been created successfully`))
  } catch (err) {
    console.log(
      chalk.red('An error has occured during database tables creation')
    )
    throw err
  }
}

/**
 * Create admin user
 * @param {pool} client
 */
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
    console.log(
      chalk.red('An error has occured during the admin user creation')
    )
    throw err
  }
}

/**
 * Is database empty ? Check if the database has some tables
 */
const isDatabaseEmpty = async (client) => {
  try {
    const response = await client.query(`
    SELECT EXISTS (
      SELECT FROM pg_tables
      WHERE  schemaname = 'public'
      );
  `)

    return response.rows[0].exists === false
  } catch (err) {
    console.log(chalk.red('An error has occured'))
    throw err
  }
}

/**
 * Enable web push notifications
 */
const enableWebPush = async () => {
  console.log(chalk.cyan(`Step 4/4 : Enable web push notification?`))
  //ask to enable
  const answer = await promptly.confirm(
    'Do you want to enable web push notification? (Y/n)'
  )

  if (answer === false) return

  const vapidKeys = webpush.generateVAPIDKeys()

  console.log(
    chalk.gray('Please update your config by adding public and private keys:')
  )

  console.log(`NEXT_PUBLIC_NOTIFICATIONS_PUBLIC_KEY="${vapidKeys.publicKey}"`)
  console.log(`NOTIFICATIONS_PRIVATE_KEY="${vapidKeys.privateKey}"`)
}

/**
 * Start to boostrap the application
 * @param {boolean} restart
 */
const bootstrap = (restart) => {
  const databaseName = process.env.POSTGRES_DB

  pool.connect(async (err, client) => {
    try {
      if (err) {
        // database does not exist
        if (err.code === '3D000') {
          // create database
          await createDatabase(databaseName)
          // restart bootstrap
          bootstrap(true)
          return
        }

        console.log(
          chalk.red(
            'An error has occured during the connection of the database'
          )
        )
        console.log(err.stack)
        throw err
      }

      const isEmpty = await isDatabaseEmpty(client)

      // database already exists
      if (isEmpty === false && restart !== true) {
        // ask to drop database
        const answer = await promptly.confirm(
          `Database ${databaseName} already exists and is not empty. Do you want do continue?(y/N)`
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

      // create tables photo / subcriptions / users
      await createTables(client)

      // create admin user
      await createAdminUser(client)

      // create folder img
      await createFolderImg()

      // enable web push
      await enableWebPush()

      console.log(
        chalk.green(
          'Installation has been completed successfully. You can now run your application.'
        )
      )

      process.exit()
    } catch (err) {
      console.log(chalk.red('An error has occured during the installation'))
      process.exit()
    }
  })
}

// RUN SCRIPT
bootstrap()
