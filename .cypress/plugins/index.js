require('dotenv').config({
  path: process.env.CONFIG_FILE || './.env.test.local'
})

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  config.env = config.env || {}

  config.env.CYPRESS_USER_USERNAME = process.env.CYPRESS_USER_USERNAME
  config.env.CYPRESS_USER_PASSWORD = process.env.CYPRESS_USER_PASSWORD

  return config
}
