import 'cypress-file-upload'

Cypress.Commands.add('login', () => {
  cy.request('POST', '/api/login', {
    username: Cypress.env('CYPRESS_USER_USERNAME'),
    password: Cypress.env('CYPRESS_USER_PASSWORD')
  })
})
