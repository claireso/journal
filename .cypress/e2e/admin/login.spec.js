describe('Login', () => {
  beforeEach(() => {
    cy.visit('/admin/login')
    cy.get('[data-testid="username"]').as('username')
    cy.get('[data-testid="password"]').as('password')
    cy.get('[data-testid="submit"]').as('submit')
  })

  it('should not log in user (bad password)', () => {
    const spy = cy.spy()

    cy.on('window:alert', spy)

    cy.get('@username')
      .type(Cypress.env('CYPRESS_USER_USERNAME'))
      .should('have.value', Cypress.env('CYPRESS_USER_USERNAME'))

    cy.get('@password').type('fakepassword')

    cy.get('@submit')
      .click()
      .then(() => {
        expect(spy).to.be.calledWith(
          'Bad username/password. Please retry'
        )
      })

    cy.url().should('include', '/admin/login')
  })

  it('should not log in user (bad username)', () => {
    const spy = cy.spy()

    cy.on('window:alert', spy)

    cy.get('@username').type('fake username')

    cy.get('@password')
      .type(Cypress.env('CYPRESS_USER_PASSWORD'))
      .should('have.value', Cypress.env('CYPRESS_USER_PASSWORD'))

    cy.get('@submit')
      .click()
      .then(() => {
        expect(spy).to.be.calledWith(
          'Bad username/password. Please retry'
        )
      })

    cy.url().should('include', '/admin/login')
  })

  it('should log in user', () => {
    cy.get('@username')
      .type(Cypress.env('CYPRESS_USER_USERNAME'))
      .should('have.value', Cypress.env('CYPRESS_USER_USERNAME'))

    cy.get('@password')
      .type(Cypress.env('CYPRESS_USER_PASSWORD'))
      .should('have.value', Cypress.env('CYPRESS_USER_PASSWORD'))

    cy.get('@submit').click()

    cy.url().should('include', '/admin/photos')

    cy.getCookie('journal_session').should('exist')
    cy.getCookie('journal_session.sig').should('exist')
  })
})
