// cypress/e2e/sorted-prices.cy.js

// https://github.com/bahmutov/cypress-map
import 'cypress-map'

chai.use(require('chai-sorted'))

describe('sorting', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()
    cy.location('pathname').should('equal', '/inventory.html')
  })

  function sortByPrice(order) {
    expect(order, 'sort order').to.be.oneOf(['lohi', 'hilo'])
    cy.log(`**sort by price ${order}**`)
    cy.get('[data-test="product_sort_container"]').select(order)
  }

  function getPrices() {
    return cy
      .get('.inventory_item_price')
      .should('have.length.greaterThan', 3)
      .map('innerText')
      .mapInvoke('slice', 1)
      .map(Number)
      .print('sorted prices %o')
  }

  it('by price lowest to highest', () => {
    sortByPrice('lohi')
    getPrices().should('be.ascending')
  })
  it('by price highest to lowest', () => {
    sortByPrice('hilo')
    getPrices().should('be.descending')
  })
})
