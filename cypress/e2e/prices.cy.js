// cypress/e2e/prices.cy.js

import 'cypress-map'

it('confirms the item with the lowest price', () => {
  cy.visit('/')
  cy.get('[data-test="username"]').type('standard_user')
  cy.get('[data-test="password"]').type('secret_sauce')
  cy.get('[data-test="login-button"]').click()
  cy.location('pathname').should('eq', '/inventory.html')
  // once the inventory loads, grab the item prices
  // https://on.cypress.io/get
  // https://on.cypress.io/find
  //
  cy.get('.inventory_list')
    .should('be.visible')
    .find('.inventory_item_price')
    .should('have.length.greaterThan', 3)
    // from each price element, get its inner text
    // and log it to the DevTools console
    // https://on.cypress.io/then
    // Tip: find how using https://cypress.tips/search
    // Tip 2: Cypress._.map is really universal
    //
    .map('innerText')
    .print('strings %o')
    // each price string has "$" character in front
    // remove it using string "substr" method
    //
    .mapInvoke('slice', 1)
    .print('without %o')
    // convert each price string into a Number
    //
    .map(Number)
    .print('numbers %o')
    // find the smallest price number using Cypress._.min
    // and confirm it is 7.99
    //
    .apply(Cypress._.min)
    .should('equal', 7.99)
})
