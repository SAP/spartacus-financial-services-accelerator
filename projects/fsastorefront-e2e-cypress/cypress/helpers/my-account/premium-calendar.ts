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
