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
