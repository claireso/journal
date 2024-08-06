import { log, secretQuestion, confirm } from '../helpers.mjs'

const PG_DATA = 'data'

async function install() {
  log.info('4 - Create database')
  await createDatabase()

  log.info('5 - Create admin user')
  await createAdminUser()

  // stop docker image db
  await $`docker compose down db`

  echo('\n')
  log.info('6 - Create docker services')
  // in fine build all images
  await spinner('Create docker services', () => $`docker compose build --quiet`)
  log.success(`Docker services succcessfully created`)
}

export default install

////////////////////////////////////////////////////////////////
// Step 4: Create database
// Creates a database, dropping it if it already exists (with user confirmation),
// and sets up necessary tables and extensions.
////////////////////////////////////////////////////////////////
async function createDatabase() {
  const { POSTGRES_USER, POSTGRES_DB } = $.env

  try {
    // check if folder 'data' is empty
    // if not, a database already exists, ask confirmation to delete the current database
    if (fs.readdirSync(PG_DATA).length > 0) {
      log.warn(`A Database already exists.`)
      const confirmed = await confirm('Do you want to continue? (If yes your database will be deleted) [y/n] ')
      if (!confirmed) {
        process.exit(0)
      }
      fs.emptyDirSync(PG_DATA)
    }

    // build image journal/db and start a container
    // docker postgres will initialize postgres user and the database
    await spinner('Create image database...', () => $`docker compose up db --build --detach --quiet-pull --wait`)

    // create tables
    await $`docker compose exec db psql -U ${POSTGRES_USER} -d ${POSTGRES_DB} -f /var/tmp/setup-database.sql`

    echo('\n')
    log.success(`Database ${POSTGRES_DB} succcessfully created`)
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}

////////////////////////////////////////////////////////////////
// Step 5: Create admin user
// Prompts for a username and password, then creates an admin user in the database.
////////////////////////////////////////////////////////////////
async function createAdminUser() {
  const { POSTGRES_USER, POSTGRES_DB } = $.env

  try {
    const username = await question('Enter a username: ')
    const password = await secretQuestion('Enter a password: ')

    await $`docker compose exec db psql -U ${POSTGRES_USER} -d ${POSTGRES_DB} -c "
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
