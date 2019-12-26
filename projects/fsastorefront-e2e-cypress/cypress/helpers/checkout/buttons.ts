export function bindQuotePopup() {
  cy.get('button.primary-button')
    .should('contain', 'Continue')
    .click();
  cy.get('fsa-bind-quote-dialog').within(() => {
    cy.get('.secondary-button').click();
  });
  cy.wait(1000);
}

export function clickContinueButton() {
  cy.get('button.primary-button')
    .should('contain', 'Continue')
    .click();
}

export function checkBackAndContinueButtons() {
  cy.get('button.secondary-button').should('contain', 'Back');
  cy.get('button.primary-button').should('contain', 'Continue');
}

export function clickResumeButton() {
  cy.get('.secondary-button')
    .contains('Resume')
    .click();
  cy.wait(1000);
}
