#!/usr/bin/env zx

import installStandalone from './mode/standalone.mjs'
import { log, confirm, secretQuestion } from './helpers.mjs'

const ENV_FILE = '.env'
const MODE = {
  STANDALONE: 'standalone',
  DOCKER: 'docker'
}

// Main execution flow
const main = async () => {
  echo(
    chalk.magenta.bold(`/**********************************************\n
**********************************************\n
  Welcome to JOURNAL, your own website to publish your beautiful photos\n
  You are about to install and configure your website.\n
**********************************************\n
**********************************************/\n\n`)
  )

  log.info('1 - Check requirements')
  await checkRequirements()

  log.info('2 - Configure your application')
  await createConfiguration()

  await loadEnvFile()

  log.info('3 - Create folder "uploads"')
  await createFolder('uploads')

  if ($.env.MODE === MODE.STANDALONE) {
    await installStandalone()
  }

  log.success(`Congratulation! You have successfully installed your website`)
  echo(`You can start your application and visit the url ${chalk.underline($.env.WEBSITE_URL)}`)
}

await main()

////////////////////////////////////////////////////////////////
// Step 1: check required node version
// Checks if the current Node.js version matches the required version in .nvmrc.
// Exits with an error message if versions do not match.
////////////////////////////////////////////////////////////////
async function checkRequirements() {
  const node = (await $`node --version`).text().trim()
  const nodeRequired = (await $`cat .nvmrc`).text().trim()

  // check node version
  if (node !== `v${nodeRequired}`) {
    log.error(`Wrong node version. Current node version: ${node}`)
    echo(`You need to use version ${nodeRequired}`)
    echo('Please install this version and run again the installation')
    process.exit(1)
  }
  log.success(`Current node version verified (${node})`)

  // check existing .env
  if (fs.existsSync(ENV_FILE)) {
    log.warn(`A configuration file (.env) already exists.`)
    if (!(await confirm('Do you want to continue? (y/n [n]) '))) {
      process.exit(0)
    }
    echo('')
  }
  await fs.copy('.env.sample', ENV_FILE)
}

////////////////////////////////////////////////////////////////
// Step 2: Load environment variables
// Loads environment files specified by --env-file argument.
// Warns and asks for confirmation if any file does not exist.
// Exits if the user chooses not to continue.
////////////////////////////////////////////////////////////////
async function loadEnvFile() {
  process.loadEnvFile(ENV_FILE)
}

////////////////////////////////////////////////////////////////
// Step 3: Create configuration
// Ask user to configure the project (mode, db name, user admin credentials)
// Then update environement variables in the .env file
////////////////////////////////////////////////////////////////
async function createConfiguration() {
  const configuration = {}

  // choose installation mode (standalone or docker)
  if (await confirm('Do you want to use docker to install your website? (y/n) ')) {
    configuration.MODE = MODE.DOCKER
  } else {
    configuration.MODE = MODE.STANDALONE
  }

  // ask info to build all urls (website, api etc)
  configuration.SERVER_NAME = await question(
    `Enter the base url of your website: ${chalk.grey('(ie www.journal.com, localhost)')} `
  )

  if (configuration.MODE === MODE.STANDALONE) {
    const PORT = await question(`Enter the port used by your website: ${chalk.grey('(ie 3000)')} `)
    const PROTOCOLE = (await confirm(`Do you want to use https? (y/n) `)) ? 'https' : 'http'
    configuration.WEBSITE_URL = `${PROTOCOLE}://${configuration.SERVER_NAME}${PORT ? ':' + PORT : ''}`
    configuration.NEXT_PUBLIC_API_URL = configuration.WEBSITE_URL
  }

  // ask metadata as title, description
  configuration.WEBSITE_META_TITLE = await question('Enter the title of your website: ')
  configuration.WEBSITE_META_DESCRIPTION = await question('Enter the description of your website: ')

  // configure package next auth
  if (configuration.WEBSITE_URL) {
    configuration.NEXTAUTH_URL = configuration.WEBSITE_URL
  }
  configuration.NEXTAUTH_SECRET = (await $`openssl rand -base64 32`).text().trim()

  // ask postgres info as postgres user, database, password
  configuration.POSTGRES_DB = await question(`Enter a database name: ${chalk.grey('(ie journal)')} `)
  configuration.POSTGRES_USER = await question(`Enter a database user: ${chalk.grey('(ie postgres)')} `)
  configuration.POSTGRES_PASSWORD = await secretQuestion(`Enter a database password: `)

  if (configuration.MODE === MODE.STANDALONE) {
    configuration.POSTGRES_HOST = await question(`Enter a database host: ${chalk.grey('(ie localhost)')} `)
    configuration.POSTGRES_PORT = await question(`Enter a database port: ${chalk.grey('(ie 5432)')} `)
  }

  // ask to enable webpush notification
  if (await confirm('Do you want to enable push notification ? (y/n) ')) {
    const vapidKeys = (await $`npx --yes web-push generate-vapid-keys --json`).json()
    configuration.NEXT_PUBLIC_NOTIFICATIONS_PUBLIC_KEY = vapidKeys.publicKey
    configuration.NOTIFICATIONS_PRIVATE_KEY = vapidKeys.privateKey
    if (configuration.WEBSITE_URL) {
      configuration.NOTIFICATIONS_SUBJECT = configuration.WEBSITE_URL
    }
  }

  // now update the .env file with the information provided by the user
  let content = fs.readFileSync(ENV_FILE, 'utf8')

  for (const [varName, varValue] of Object.entries(configuration)) {
    const varLine = `${varName}="${varValue}"`
    const reg = new RegExp(`${varName}=.*`)
    content = content.replace(reg, varLine)

    if (!content.includes(`${varName}=`)) {
      content += `\n${varLine}`
    }
  }

  fs.writeFileSync(ENV_FILE, content, 'utf8')

  log.success('Your configuration .env file has been successfully created')
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
