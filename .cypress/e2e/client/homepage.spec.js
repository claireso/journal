/* eslint-disable cypress/no-unnecessary-waiting */
/**
 * @TODO: test banner "notifications"
 * @TODO: test banner "offline" (https://github.com/cypress-io/cypress/issues/235)
 */
describe('Homepage', () => {
  before(() => {
    cy.exec('npm run db:reset')
  })

  describe('Welcome', () => {
    it('should show welcome page', () => {
      cy.visit('/')
      cy.get('[data-testid="welcome-title"]').should('have.length', 1)
      cy.get('[data-testid="flash-notifications"]').contains('Enable notifications to be alerted of new publication')

      cy.get('[data-testid="welcome-link-admin"]').click()

      cy.wait(100)

      cy.url().should('include', '/admin/login')
    })
  })

  describe('List photos', () => {
    before(() => {
      cy.exec('npm run db:seed')
    })

    beforeEach(() => {
      cy.visit('/')
    })

    it('should show photos', () => {
      cy.get('[data-testid="photo"]').should('have.length', 10)

      cy.get('[data-testid="first-page"]').should('have.length', 0)
      cy.get('[data-testid="previous-page"]').should('have.length', 0)
      cy.get('[data-testid="next-page"]').should('have.length', 1)
      cy.get('[data-testid="last-page"]').should('have.length', 1)
    })

    it('should navigate to page 2', () => {
      cy.get('[data-testid="next-page"]').click()

      cy.url().should('include', '/?page=2')

      cy.get('[data-testid="photo"]').should('have.length', 10)

      cy.get('[data-testid="first-page"]').should('have.length', 1)
      cy.get('[data-testid="previous-page"]').should('have.length', 1)
      cy.get('[data-testid="next-page"]').should('have.length', 1)
      cy.get('[data-testid="last-page"]').should('have.length', 1)
    })

    it('should navigate to last page', () => {
      cy.get('[data-testid="last-page"]').click()

      cy.url().should('include', '/?page=5')

      cy.get('[data-testid="photo"]').should('have.length', 10)

      cy.get('[data-testid="first-page"]').should('have.length', 1)
      cy.get('[data-testid="previous-page"]').should('have.length', 1)
      cy.get('[data-testid="next-page"]').should('have.length', 0)
      cy.get('[data-testid="last-page"]').should('have.length', 0)
    })
  })
})
