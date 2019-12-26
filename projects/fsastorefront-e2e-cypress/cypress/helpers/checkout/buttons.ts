export function clickNextButton() {
  cy.get('button.primary-button')
    .should('contain', 'Next')
    .click();
}

export function bindQuotePopup() {
  cy.get('button.primary-button')
    .should('contain', 'Continue')
    .click();
  cy.get('fsa-bind-quote-dialog').within(() => {
    cy.get('.secondary-button').click();
  });
}
