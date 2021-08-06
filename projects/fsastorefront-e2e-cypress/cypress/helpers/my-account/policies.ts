export function checkMyPoliciesPage() {
  cy.selectOptionFromDropdown({
    menuOption: 'My Account',
    dropdownItem: 'Policies',
  });
  cy.get('cx-fs-policies').within(() => {
    cy.get('.info-card').should('have.length', 1);
  });
}

export function checkMyQuotesPage() {
  cy.selectOptionFromDropdown({
    menuOption: 'My Account',
    dropdownItem: 'Quotes & Applications',
  });
}

export function clickOnPolicyDetails() {
  cy.get('.info-card').within(() => {
    cy.get('.info-card-links .link')
      .contains(' Details ')
      .click({ force: true });
  });
}

export function checkAutoReferredQuote() {
  cy.get('.info-card')
    .should('have.length', 1)
    .within(() => {
      cy.get('.info-card-data').within(() => {
        cy.get('.label').contains('Auto Silver');
        cy.get('.label').contains('Quote status');
        cy.get('.value').contains('Referred');
        cy.get('.label').contains('Expiry Date');
        cy.get('.label').contains('Price');
        cy.get('.value').contains('€174.03');
        cy.get('.value').contains('Monthly');
      });
    });
}
