/* eslint-disable cypress/no-unnecessary-waiting */
describe('Admin homepage', () => {
  it('should redirect to login', () => {
    cy.visit('/admin')

    cy.wait(500)
    cy.url().should('include', '/admin/login')
  })

  it('should redirect to photos', () => {
    cy.login()

    cy.visit('/admin')

    cy.wait(500)
    cy.url().should('include', '/admin/photos')
  })
})
