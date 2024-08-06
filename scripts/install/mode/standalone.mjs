import { log, confirm, secretQuestion } from '../helpers.mjs'

async function install() {
  log.info('4 - Create database')
  await createDatabase()

  log.info('5 - Create admin user')
  await createAdminUser()
}

export default install

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
      const confirmed = await confirm('Do you want to continue? (If yes your database will be deleted) [y/n] ')
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
    await $`PGPASSWORD=${POSTGRES_PASSWORD} psql -h ${POSTGRES_HOST} -p ${POSTGRES_PORT} -U ${POSTGRES_USER} -d ${POSTGRES_DB} -f ${path.resolve(__dirname, 'setup-database.sql')}`
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
