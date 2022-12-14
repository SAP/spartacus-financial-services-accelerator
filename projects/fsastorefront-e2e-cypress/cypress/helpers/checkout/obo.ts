import * as checkout from './checkout-steps';

export function changePassword() {
  cy.contains('Change password').click();
  cy.get('h3').should('be.visible').contains('Change password');
  cy.get('.label-content').contains('New password');
  cy.get('.label-content').contains('Retype new password');
  cy.get('[name="password"]').type('Password1.');
  cy.get('[name="confirmPassword"]').type('Password1.');
  cy.get('button.primary').contains('Save').click();
  cy.contains('password updated successfully');
}

export function goToDashboard() {
  cy.get('cx-fs-dashboard-link').contains('Dashboard').click();
  checkout.checkPageURL(checkout.pages.sellerDashboard);
  cy.get('.heading-headline').contains('Your Dashboard');
  cy.get('cx-fs-seller-dashboard').should('be.visible');
}

export function checkDashboard(dashboardName, CustomerName) {
  cy.get('h5').should('contain.text', dashboardName);
  cy.get('.user-profile')
    .should('be.visible')
    .within(() => {
      cy.get('.user-image').should('be.visible');
      cy.get('h6').contains(CustomerName);
      cy.get('span.semi-bold').contains('Email:');
      cy.get('span.semi-bold').contains('Date of Birth:');
    });
}

export function checkDashboardOverview() {
  cy.get('h5').should('contain.text', 'Dashboard Overview');
  cy.get('.dashboard-overview-wrapper').within(() => {
    cy.get('span.description').contains('Customers');
    cy.get('.dashboard-overview-assets')
      .should('be.visible')
      .within(() => {
        cy.get('.asset-text').should('have.length', '2');
        cy.get('.asset-text').contains('Add a Customer');
        cy.get('.asset-text').contains('Check Customer List');
      });
  });
}

export function checkCustomerList(customer, email) {
  cy.get('.asset-text').contains('Check Customer List').click();
  cy.get('cx-fs-seller-dashboard-list')
    .should('be.visible')
    .within(() => {
      cy.get('cx-sorting').should('be.visible');
      cy.get('table.box-shadow')
        .should('be.visible')
        .within(() => {
          cy.get('.d-none').contains('Name Status Email');
          cy.contains(customer)
            .parents('tr.position-relative')
            .within(() => {
              cy.contains('Active');
              cy.contains(email);
            });
        });
    });
}

export function goToCustomerDashboard(customerName) {
  cy.contains(customerName).click();
  cy.get('.heading-headline').should('contain.text', 'Customer Dashboard');
  cy.get('span.fas.fa-arrow-left').should('be.visible');
  cy.get('h5.text-center').should('have.length', '2');
  cy.get('h5.text-center').contains('Customer Profile');
  cy.get('h5.text-center').contains('Dashboard Overview');
}

export function checkCustomerOverview() {
  cy.get('h5').should('contain.text', 'Dashboard Overview');
  cy.get('span.description').contains('Claims');
  cy.get('span.description').contains('Policies');
  cy.get('span.description').contains('Quotes & Applications');
  cy.get('.asset-text').should('have.length', 4);
  cy.get('.asset-text')
    .contains("Check Customer's Claims")
    .click({ force: true });
  cy.get('.asset-text').contains("Check Customer's Policies");
  cy.get('.asset-text').contains("Check Customer's Quotes & Applications");
  cy.get('.asset-text').contains("Check Customer's Products");
  cy.get('h3').contains('There are no claims');
}

export function checkCustomerProducts() {
  cy.get('.asset-text').contains("Check Customer's Products").click();
  cy.contains('Customer Profile').should('be.visible');
  cy.get('cx-fs-product-overview')
    .should('be.visible')
    .within(() => {
      cy.get('h5').contains('Product Overview');
      cy.get('a.rounded-pill').should('have.length', 3);
      cy.get('.product').should('have.length', 11);
    });
}

export function selectProduct(productCategory, product, numberOfProducts) {
  cy.contains(productCategory).click();
  cy.get('.product').should('have.length', numberOfProducts);
  cy.get('.ml-3')
    .contains('Start Checkout for ' + product)
    .click();
}
