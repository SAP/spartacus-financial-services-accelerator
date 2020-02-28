import * as addOptionsPage from '../addOptionsPage';

export function checkOptionalProducts() {
  const addOptionsContent: addOptionsPage.AddOptions = {
    title: 'Your Credit Card Insurance',
    items: [
      {
        name: 'Credit Card Protection',
        available: true,
      },
      {
        name: 'Special Support',
        available: true,
      },
      {
        name: 'Overseas Insurance',
        available: false,
      },
    ],
  };
  addOptionsPage.checkAddOptionsPageContent(addOptionsContent);
}

export function checkMiniCartCreditCard() {
  cy.get('fsa-mini-cart').within(() => {
    cy.get('.short-overview-item').should('have.length', 1);
    cy.get('.short-overview-item')
      .eq(0)
      .should('have.text', ' Premium Card:  €89.00 ');
    cy.get('.highlighted').should('have.text', ' Total price:  €89.00 ');
  });
}

export function checkCreditCardComparisonTable() {
  cy.get('fsa-comparison-table-panel-item').should('have.length', 3);
  cy.get('fsa-comparison-table-panel-item')
    .eq(0)
    .within(() => {
      cy.get('.table-header-title').should('have.text', 'Basic Card');
      cy.get('.table-header-value').should('have.text', '€49.00');
    });
  cy.get('fsa-comparison-table-panel-item')
    .eq(1)
    .within(() => {
      cy.get('.table-header-title').should('have.text', 'Premium Card');
      cy.get('.table-header-value').should('have.text', '€89.00');
    });
  cy.get('fsa-comparison-table-panel-item')
    .eq(2)
    .within(() => {
      cy.get('.table-header-title').should('have.text', 'Exclusive Card');
      cy.get('.table-header-value').should('have.text', '€169.00');
    });
}

export function selectPremiumCard() {
  cy.get('fsa-comparison-table-panel-item')
    .eq(1)
    .within(() => {
      cy.get('.table-header-title').should('have.text', 'Premium Card');
      cy.get('.primary-button').click();
    });
}
