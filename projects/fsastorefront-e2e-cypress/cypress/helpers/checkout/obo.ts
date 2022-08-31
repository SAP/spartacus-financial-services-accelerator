import * as checkout from './checkout-steps';

export function changePassword() {
  cy.contains('Change password').click();
  cy.get('h3').contains('Change password');
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

export function checkDashboard(Name, CustomerName) {
  cy.get('h5').should('contain.text', 'Dashboard Overview');
  cy.get('.user-profile')
    .should('be.visible')
    .within(() => {
      cy.get('.user-image').should('be.visible');
      cy.get('h6').contains(Name);
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
        cy.get('.asset-text').contains('Add a Customer');
        cy.get('.asset-text').contains('Check Customer List');
      });
  });
}

export function checkCustomerList() {
  cy.get('.asset-text').contains('Check Customer List').click();
  cy.get('cx-fs-seller-dashboard-list')
    .should('be.visible')
    .within(() => {
      cy.get('cx-sorting').should('be.visible');
      cy.get('table.box-shadow')
        .should('be.visible')
        .within(() => {
          cy.get('.d-none').contains('Name Status Email');
          cy.contains('Stephen Bailey')
            .parents('tr.position-relative')
            .within(() => {
              cy.contains('Active');
              cy.contains('stephen.bailey@sapfsa.com');
            });
        });
    });
}

export function goToCustomerDashboard(customerName) {
  cy.contains(customerName).click();
  cy.get('.heading-headline').should('contain.text', 'Customer Dashboard');
  cy.get('span.fas.fa-arrow-left').should('be.visible');
}

export function checkCustomerOverview() {
  cy.get('h5').should('contain.text', 'Dashboard Overview');
  cy.get('span.description').contains('Claims');
  cy.get('span.description').contains('Policies');
  cy.get('span.description').contains('Quotes & Applications');
  cy.get('.asset-text').contains("Check Customer's Claims").click();
  cy.get('.asset-text').contains("Check Customer's Policies");
  cy.get('.asset-text').contains("Check Customer's Quotes & Applications");
  cy.get('h3').contains('There are no claims');
}

export function selectCustomer(Customer) {
  cy.get('span.col-12')
    .contains(Customer)
    .parents('.accordion-list-item')
    .within(() => {
      cy.contains('Select').click();
    });
}
