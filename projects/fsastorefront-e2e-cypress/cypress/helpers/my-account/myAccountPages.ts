import { waitForPage } from '../generalHelpers';

export function checkPageContent() {
  cy.get('cx-fs-premium-calendar').should('be.visible');
  cy.get('h2').contains('Premium Calendar');
  cy.get('.container-fluid.d-lg-block').should('be.visible');
  cy.get('cx-footer-navigation').should('be.visible');
}

export function checkPremiumCalendarTable() {
  cy.get('.section-header-heading ').within(() => {
    cy.contains('Policy');
    cy.contains('Payment frequency');
    cy.contains('Due Date');
    cy.contains('Premium');
    cy.contains('Payment method');
  });
}

export function checkSavingsData() {
  cy.get('.premium-data-row').within(() => {
    cy.contains('Savings Insurance');
    cy.contains('Half-yearly');
    cy.contains('€781.99');
  });
  cy.get('.premium-data-row').click();
  cy.get('.container-fluid').should('be.visible');
}

export function checkCloseAccountPage() {
  cy.get('.heading-headline').contains('Close Account');
  cy.get('cx-paragraph').contains('When you close your account, your');
  cy.get('.item-details')
    .should('be.visible')
    .within(() => {
      cy.get('li').should('have.length', 10);
    });
  cy.get('cx-close-account')
    .should('be.visible')
    .within(() => {
      cy.get('.btn-secondary').contains('Cancel');
      cy.get('.btn-primary').contains('CLOSE MY ACCOUNT');
    });
}

export function closeAccount() {
  cy.get('.btn-primary').click();
  cy.get('cx-close-account-modal')
    .should('be.visible')
    .within(() => {
      cy.get('.cx-confirmation').should('be.visible');
      cy.get('.btn-secondary').contains('Cancel');
      cy.get('.btn-primary')
        .contains('CLOSE MY ACCOUNT')
        .click();
    });
}
