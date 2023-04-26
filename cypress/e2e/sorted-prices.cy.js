// cypress/e2e/sorted-prices.cy.js

// https://github.com/bahmutov/cypress-map
import 'cypress-map'

chai.use(require('chai-sorted'))

it('sorts item by price', () => {
  cy.visit('/')
  // Tip: grab the username and the password from the login page
  // It is ok for now to hardcode it in the spec source here
  //
  // get the username field and type the standard user
  // https://on.cypress.io/get
  // https://on.cypress.io/type
  cy.get('[data-test="username"]').type('standard_user')
  // get the password field and type the password
  cy.get('[data-test="password"]').type('secret_sauce')
  // get the login button and click on it
  // https://on.cypress.io/click
  cy.get('[data-test="login-button"]').click()
  // you should transition to the inventory page
  // https://on.cypress.io/location
  // see assertion examples at
  // https://glebbahmutov.com/cypress-examples/commands/location.html
  cy.location('pathname').should('equal', '/inventory.html')
  // find the sort dropdown and select the low to high value
  // https://on.cypress.io/select
  // Tip: inspect the HTML markup around the sort element
  //
  cy.get('[data-test="product_sort_container"]').select('lohi')
  // find all price elements and map them to numbers
  // following the "Lesson 02" solution
  // Tip: use cypress-map queries
  //
  cy.get('.inventory_list')
    .should('be.visible')
    .find('.inventory_item_price')
    .should('have.length.greaterThan', 3)
    .map('innerText')
    .mapInvoke('slice', 1)
    .map(Number)
    // confirm the list of numbers is sorted
    // https://on.cypress.io/should
    // Tip: write a should(callback) function
    // that sorts the list and confirms the passed list
    // and the sorted are the same
    .should('be.ascending')
})
