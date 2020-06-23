/* eslint-disable cypress/no-unnecessary-waiting */

/**
 * @TODO: test api error (401, 500, 404)
 * // https://github.com/cypress-io/cypress/issues/95
 *
 */
describe('Admin subscriptions', () => {
  before(() => {
    cy.exec('npm run db:reset')
  })

  beforeEach(() => {
    cy.login()
    cy.visit('/admin/subscriptions')
  })

  describe('Empty list', () => {
    it('should show list header', () => {
      cy.get('[data-testid="list-heading"]').contains('Your subscriptions (0)')
    })

    it('should not show list and pager', () => {
      cy.get('[data-testid="subscription"]').should('have.length', 0)
      cy.get('[data-testid="first-page"]').should('have.length', 0)
      cy.get('[data-testid="previous-page"]').should('have.length', 0)
      cy.get('[data-testid="next-page"]').should('have.length', 0)
      cy.get('[data-testid="last-page"]').should('have.length', 0)
    })
  })

  describe('Full list', () => {
    before(() => {
      cy.exec('npm run db:seed')
    })

    it('should show list', () => {
      cy.get('[data-testid="list-heading"]').contains('Your subscriptions (50)')
      cy.get('[data-testid="subscription"]').should('have.length', 10)
      cy.get('[data-testid="first-page"]').should('have.length', 0)
      cy.get('[data-testid="previous-page"]').should('have.length', 0)
      cy.get('[data-testid="next-page"]').should('have.length', 1)
      cy.get('[data-testid="last-page"]').should('have.length', 1)
    })

    it('should navigate to page 2', () => {
      cy.get('[data-testid="next-page"]').click()

      cy.url().should('include', '?page=2')
      cy.get('[data-testid="subscription"]').should('have.length', 10)
      cy.get('[data-testid="first-page"]').should('have.length', 1)
      cy.get('[data-testid="previous-page"]').should('have.length', 1)
      cy.get('[data-testid="next-page"]').should('have.length', 1)
      cy.get('[data-testid="last-page"]').should('have.length', 1)
    })

    it('should delete subscription', () => {
      cy.get('[data-testid="next-page"]').click()

      cy.get('[data-testid="button-revoke"]').eq(0).click()

      cy.get('[data-testid="modal"]').as('modal')

      cy.get('@modal').contains('Are you sure?')
      cy.get('@modal').find('button').eq(2).click()

      cy.contains('Your subscription has been deleted successfully').should(
        'be.visible'
      )
      cy.get('[data-testid="list-heading"]').contains('Your subscriptions (49)')

      cy.get('[data-testid="subscription"]').should('have.length', 10)
      cy.get('[data-testid="first-page"]').should('have.length', 0)
      cy.get('[data-testid="previous-page"]').should('have.length', 0)
      cy.get('[data-testid="next-page"]').should('have.length', 1)
      cy.get('[data-testid="last-page"]').should('have.length', 1)
      cy.url().should('be', '/admin/subscriptions')
    })
  })
})
