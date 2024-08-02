#!/usr/bin/env zx

import { createInterface } from 'node:readline'
const webpush = require('web-push')

// Parse command-line arguments
const argv = minimist(process.argv.slice(2), {
  string: ['env-file'],
  default: {
    'env-file': ['.env.local', '.env']
  }
})

// Logging functions
const log = {
  info: (message) => echo(chalk.bold.blue(`${message}\n`)),
  success: (message) => echo(chalk.green(`${message}\n`)),
  error: (message) => echo(chalk.red(`${message}\n`)),
  warn: (message) => echo(chalk.yellow(`/!\\ ${message}\n`))
}
// Prompts for confirmation; returns true for "yes", false otherwise.
const confirm = async (message) => {
  const result = await question(message)
  return ['y', 'yes', 'Y'].includes(result)
}

/**
 * Prompts the user to enter a password with input hidden.
 *
 * Uses the `readline` module to read input from the terminal,
 * masking the input with asterisks (*). Returns a promise that
 * resolves with the entered password.
 */
function secretQuestion(query) {
  return new Promise((resolve) => {
    const rl = createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: true
    })

    rl.stdoutMuted = true
    rl.question(query, (answer) => {
      rl.history = rl.history.slice(1)
      rl.close()
      resolve(answer)
      echo('\n')
    })

    rl._writeToOutput = function _writeToOutput(stringToWrite) {
      if (rl.stdoutMuted) {
        rl.output.write('*')
      } else {
        rl.output.write(stringToWrite)
      }
    }
  })
}

// Main execution flow
const main = async () => {
  echo(`///////////////////////////////////////////\n
    Welcome to JOURNAL, your own website to publish your beautiful photos\n
    You are about to install your site.\n
    Before continuing, check that you have defined the connection parameters to your psql server in your configuration file.
  ///////////////////////////////////////////\n\n`)

  log.info('1 - Check required node version')
  await checkRequiredNodeVersion()

  log.info('2 - Load environment variables')
  await loadEnvFiles()

  log.info('3 - Create folder "uploads"')
  await createFolder('uploads')

  log.info('4 - Create database')
  await createDatabase()

  log.info('5 - Create admin user')
  await createAdminUser()

  log.info('6 - Enable notifications')
  await enableNotification()
}

await main()

////////////////////////////////////////////////////////////////
// Step 1: check required node version
// Checks if the current Node.js version matches the required version in .nvmrc.
// Exits with an error message if versions do not match.
////////////////////////////////////////////////////////////////
async function checkRequiredNodeVersion() {
  const node = (await $`node --version`).text().trim()
  const nodeRequired = (await $`cat .nvmrc`).text().trim()

  if (node !== `v${nodeRequired}`) {
    log.error(`Wrong node version. Current node version: ${node}`)
    echo(`You need to use version ${nodeRequired}`)
    echo('Please install this version and run again the installation')
    process.exit(1)
  }

  log.success(`Current node version verified (${node})`)
}

////////////////////////////////////////////////////////////////
// Step 2: Load environment variables
// Loads environment files specified by --env-file argument.
// Warns and asks for confirmation if any file does not exist.
// Exits if the user chooses not to continue.
////////////////////////////////////////////////////////////////
async function loadEnvFiles() {
  let envFiles = argv['env-file']

  if (!envFiles) {
    log.error('Missing --env-file in your command')
    process.exit(0)
  }

  if (!Array.isArray(envFiles)) {
    envFiles = [envFiles]
  }

  for (const envFile of envFiles) {
    if (!fs.existsSync(envFile)) {
      log.warn(`File ${envFile} does not exist.`)
      if (!(await confirm('Do you want to continue the installation? (y/n [n]) '))) {
        process.exit(0)
      }
      continue
    }

    process.loadEnvFile(envFile)
    log.success(`Loaded ${envFile}`)
  }
}

////////////////////////////////////////////////////////////////
// Step 3: Create folder if it doesn't exist
////////////////////////////////////////////////////////////////
async function createFolder(folder) {
  if (!folder) {
    log.error('Missing folder name')
    process.exit(0)
  }

  fs.ensureDirSync(folder)
  log.success(`Folder created`)
}

////////////////////////////////////////////////////////////////
// Step 4: Create database
// Creates a database, dropping it if it already exists (with user confirmation),
// and sets up necessary tables and extensions.
////////////////////////////////////////////////////////////////
async function createDatabase() {
  const { POSTGRES_USER, POSTGRES_DB, POSTGRES_PASSWORD, POSTGRES_HOST, POSTGRES_PORT } = $.env

  try {
    const result =
      await $`PGPASSWORD=${POSTGRES_PASSWORD} psql -h ${POSTGRES_HOST} -p ${POSTGRES_PORT} -U ${POSTGRES_USER} -lqt | cut -d '|' -f 1 | grep -w ${POSTGRES_DB} | wc -l`.nothrow()
    const existingDatabase = result.text().trim() === '1'

    if (existingDatabase) {
      log.warn(`Database ${POSTGRES_DB} already exists.`)
      const confirmed = await confirm('Do you want to continue? (If yes your database will be deleted) (y/n [n]) ')
      if (!confirmed) {
        process.exit(0)
      }
      // drop existing database
      await $`PGPASSWORD=${POSTGRES_PASSWORD} dropdb -h ${POSTGRES_HOST} -p ${POSTGRES_PORT} -U ${POSTGRES_USER} ${POSTGRES_DB}`
      log.success(`Old database ${POSTGRES_DB} succcessfully deleted`)
    }

    // create database
    await $`PGPASSWORD=${POSTGRES_PASSWORD} createdb -h ${POSTGRES_HOST} -p ${POSTGRES_PORT} -U ${POSTGRES_USER} ${POSTGRES_DB}`

    // create tables
    await $`PGPASSWORD=${POSTGRES_PASSWORD} psql -h ${POSTGRES_HOST} -p ${POSTGRES_PORT} -U ${POSTGRES_USER} -d ${POSTGRES_DB} -c "
    CREATE EXTENSION IF NOT EXISTS pgcrypto;
    CREATE EXTENSION IF NOT EXISTS \\"uuid-ossp\\";
    CREATE TYPE POSITION_TYPE AS ENUM ('left', 'center', 'right');
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
    );
    CREATE TABLE subscriptions (
      ID SERIAL PRIMARY KEY,
      subscription JSON NOT NULL,
      created_at TIMESTAMP with time zone DEFAULT NOW(),
      updated_at TIMESTAMP with time zone DEFAULT NOW()
    );
    CREATE TABLE users (
      ID SERIAL PRIMARY KEY,
      cid UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
      username VARCHAR NOT NULL UNIQUE,
      password VARCHAR NOT NULL,
      created_at TIMESTAMP with time zone DEFAULT NOW(),
      updated_at TIMESTAMP with time zone DEFAULT NOW()
    );
    "`
    log.success(`Database ${POSTGRES_DB} succcessfully created`)
  } catch (err) {
    log.error(`An error occured during the database creation`)
    console.log(err)
    process.exit(1)
  }
}

////////////////////////////////////////////////////////////////
// Step 5: Create admin user
// Prompts for a username and password, then creates an admin user in the database.
////////////////////////////////////////////////////////////////
async function createAdminUser() {
  const { POSTGRES_USER, POSTGRES_DB, POSTGRES_PASSWORD, POSTGRES_HOST, POSTGRES_PORT } = $.env

  try {
    const username = await question('Enter a username: ')
    const password = await secretQuestion('Enter a password: ')

    await $`PGPASSWORD=${POSTGRES_PASSWORD} psql -h ${POSTGRES_HOST} -p ${POSTGRES_PORT} -U ${POSTGRES_USER} -d ${POSTGRES_DB} -c "
    INSERT INTO users (username, password) VALUES (
      '${username}',
      crypt('${password}', gen_salt('md5'))
    )
  "`
    log.success(`Admin user successfully created`)
  } catch (err) {
    log.error(`An error occured during the admin user creation`)
    console.log(err)
    process.exit(1)
  }
}

////////////////////////////////////////////////////////////////
// Step 6: Enable notifications
// Prompts to enable notifications and adds or updates VAPID keys in all specified .env files if confirmed.
////////////////////////////////////////////////////////////////
async function enableNotification() {
  if (!(await confirm('Do you want to enable notifications when you publish a new photo? (y/n [y]) '))) {
    return
  }

  const vapidKeys = webpush.generateVAPIDKeys()

  let envFiles = argv['env-file']

  if (!envFiles) {
    log.error('Missing --env-file in your command')
    process.exit(0)
  }

  if (!Array.isArray(envFiles)) {
    envFiles = [envFiles]
  }

  for (const envFile of envFiles) {
    if (!fs.existsSync(envFile)) {
      log.warn(`File ${envFile} does not exist.`)
      continue
    }

    let content = fs.readFileSync(envFile, 'utf8')
    const publicKeyLine = `NEXT_PUBLIC_NOTIFICATIONS_PUBLIC_KEY="${vapidKeys.publicKey}"`
    const privateKeyLine = `NOTIFICATIONS_PRIVATE_KEY="${vapidKeys.privateKey}"`
    const subjectKeyLine = `NOTIFICATIONS_SUBJECT="${$.env.WEBSITE_URL}"`

    // Update or add VAPID keys
    content = content
      .replace(/NEXT_PUBLIC_NOTIFICATIONS_PUBLIC_KEY=.*/, publicKeyLine)
      .replace(/NOTIFICATIONS_PRIVATE_KEY=.*/, privateKeyLine)
      .replace(/NOTIFICATIONS_SUBJECT=.*/, subjectKeyLine)

    if (!content.includes('NEXT_PUBLIC_NOTIFICATIONS_PUBLIC_KEY=')) {
      content += `\n${publicKeyLine}`
    }
    if (!content.includes('NOTIFICATIONS_PRIVATE_KEY=')) {
      content += `\n${privateKeyLine}`
    }
    if (!content.includes('NOTIFICATIONS_SUBJECT=')) {
      content += `\n${subjectKeyLine}`
    }

    fs.writeFileSync(envFile, content, 'utf8')
    log.success(`Updated ${envFile} with new VAPID keys`)
  }
}
