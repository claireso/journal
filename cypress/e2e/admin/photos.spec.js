/* eslint-disable cypress/no-unnecessary-waiting */

/**
 * @TODO: test api error (401, 500, 404)
 * // https://github.com/cypress-io/cypress/issues/95
 *
 */
describe('Admin photos', () => {
  before(() => {
    cy.exec('npm run db:reset')
  })

  beforeEach(() => {
    cy.login()
    cy.visit('/admin/photos')
  })

  describe('Empty list', () => {
    it('should show list header', () => {
      cy.get('[data-testid="list-heading"]').contains('Your photos (0)')
    })

    it('should not show list and pager', () => {
      cy.get('[data-testid="photo"]').should('have.length', 0)
      cy.get('[data-testid="first-page"]').should('have.length', 0)
      cy.get('[data-testid="previous-page"]').should('have.length', 0)
      cy.get('[data-testid="next-page"]').should('have.length', 0)
      cy.get('[data-testid="last-page"]').should('have.length', 0)
    })

    it('should open / close create modal', () => {
      cy.get('[data-testid="button-create"]').click()

      cy.get('[data-testid="modal"]').as('modal')
      cy.get('@modal').should('have.length', 1)
      cy.get('@modal').find('> div > button').click()

      cy.get('@modal').should('have.length', 0)
    })

    it('should create / edit / delete a photo', () => {
      // create
      cy.get('[data-testid="button-create"]').click()

      cy.get('[data-testid="modal"]').as('modal')

      cy.get('[data-testid="title"]').type('Photo title')
      cy.get('[data-testid="description"]').type('Photo description')

      cy.get('@modal')
        .find('input[type="file"]')
        .attachFile('/uploads/01d6098cjk0csdp0626fx23a99.jpg')
      cy.get('@modal').find('img').should('have.length', 1)

      cy.get('[data-testid="submit"]').click()

      cy.wait(3000)

      cy.get('[data-testid="list-heading"]').contains('Your photos (1)')
      cy.get('[data-testid="photo"]').should('have.length', 1)
      cy.get('[data-testid="first-page"]').should('have.length', 0)
      cy.get('[data-testid="previous-page"]').should('have.length', 0)
      cy.get('[data-testid="next-page"]').should('have.length', 0)
      cy.get('[data-testid="last-page"]').should('have.length', 0)
      cy.contains('Your photo has been created successfully').should(
        'be.visible'
      )

      // edit
      cy.get('[data-testid="button-edit"]').click()

      cy.get('[data-testid="modal"]').as('modal')

      cy.get('[data-testid="title"]').should('have.value', 'Photo title')
      cy.get('[data-testid="description"]').should(
        'have.value',
        'Photo description'
      )
      cy.get('@modal').find('img').should('have.length', 1)

      cy.get('[data-testid="title"]').clear().type('Photo title edit')

      cy.get('[data-testid="submit"]').click()

      cy.get('[data-testid="photo"]').contains('Photo title edit')
      cy.contains('Your photo has been updated successfully').should(
        'be.visible'
      )

      // delete
      cy.get('[data-testid="button-delete"]').click()

      cy.get('[data-testid="modal"]').as('modal')

      cy.get('@modal').contains('Are you sure?')
      cy.get('@modal').find('button').eq(2).click()

      cy.contains('Your photo has been deleted successfully').should(
        'be.visible'
      )
      cy.get('[data-testid="list-heading"]').contains('Your photos (0)')

      cy.get('[data-testid="photo"]').should('have.length', 0)
      cy.get('[data-testid="first-page"]').should('have.length', 0)
      cy.get('[data-testid="previous-page"]').should('have.length', 0)
      cy.get('[data-testid="next-page"]').should('have.length', 0)
      cy.get('[data-testid="last-page"]').should('have.length', 0)
    })
  })

  describe('Full list', () => {
    before(() => {
      cy.exec('npm run db:reset')
      cy.exec('npm run db:seed')
    })

    it('should show list', () => {
      cy.get('[data-testid="list-heading"]').contains('Your photos (50)')
      cy.get('[data-testid="photo"]').should('have.length', 10)
      cy.get('[data-testid="first-page"]').should('have.length', 0)
      cy.get('[data-testid="previous-page"]').should('have.length', 0)
      cy.get('[data-testid="next-page"]').should('have.length', 1)
      cy.get('[data-testid="last-page"]').should('have.length', 1)
    })

    it('should navigate to page 2', () => {
      cy.get('[data-testid="next-page"]').click()

      cy.url().should('include', '?page=2')
      cy.get('[data-testid="photo"]').should('have.length', 10)
      cy.get('[data-testid="first-page"]').should('have.length', 1)
      cy.get('[data-testid="previous-page"]').should('have.length', 1)
      cy.get('[data-testid="next-page"]').should('have.length', 1)
      cy.get('[data-testid="last-page"]').should('have.length', 1)
    })

    it('should create / edit / delete photo', () => {
      // create
      cy.get('[data-testid="button-create"]').click()

      cy.get('[data-testid="modal"]').as('modal')

      cy.get('[data-testid="title"]').type('Photo title')
      cy.get('[data-testid="description"]').type('Photo description')

      cy.get('@modal')
        .find('input[type="file"]')
        .attachFile('/uploads/01d6098cjk0csdp0626fx23a99.jpg')
      cy.get('@modal').find('img').should('have.length', 1)

      cy.get('[data-testid="submit"]').click()

      cy.wait(3000)

      cy.get('[data-testid="list-heading"]').contains('Your photos (51)')
      cy.contains('Your photo has been created successfully').should(
        'be.visible'
      )
      cy.url().should('be', '/admin/photos')

      // edit
      cy.visit('/admin/photos?page=2')

      cy.get('[data-testid="button-edit"]').eq(0).click()

      cy.get('[data-testid="modal"]').as('modal')

      cy.get('[data-testid="title"]').should('have.value', 'Photo 41')
      cy.get('[data-testid="description"]').should(
        'have.value',
        'Description 41'
      )
      cy.get('@modal').find('img').should('have.length', 1)

      cy.get('[data-testid="title"]').clear().type('Photo 41 edit')

      cy.get('[data-testid="submit"]').click()

      cy.get('[data-testid="photo"]').eq(0).contains('Photo 41 edit')
      cy.contains('Your photo has been updated successfully').should(
        'be.visible'
      )
      cy.url().should('be', '/admin/photos?page=2')

      // delete
      cy.get('[data-testid="button-delete"]').eq(0).click()

      cy.get('[data-testid="modal"]').as('modal')

      cy.get('@modal').contains('Are you sure?')
      cy.get('@modal').find('button').eq(2).click()

      cy.contains('Your photo has been deleted successfully').should(
        'be.visible'
      )
      cy.get('[data-testid="list-heading"]').contains('Your photos (50)')

      cy.get('[data-testid="photo"]').should('have.length', 10)
      cy.get('[data-testid="first-page"]').should('have.length', 0)
      cy.get('[data-testid="previous-page"]').should('have.length', 0)
      cy.get('[data-testid="next-page"]').should('have.length', 1)
      cy.get('[data-testid="last-page"]').should('have.length', 1)
      cy.url().should('be', '/admin/photos')
    })
  })
})
