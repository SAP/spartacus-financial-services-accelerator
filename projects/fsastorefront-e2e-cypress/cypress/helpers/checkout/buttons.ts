export function clickNextButton() {
  cy.get('button.primary-button')
    .should('contain', 'Next')
    .click();
}

export function clickContinueButton() {
  cy.get('button.primary-button')
    .should('contain', 'Continue')
    .click();
  cy.wait(500);
}

export function checkBackAndContinueButtons() {
  cy.get('button.secondary-button').should('contain', 'Back');
  cy.get('button.primary-button').should('contain', 'Continue');
}

export function clickResumeButton() {
  cy.get('.secondary-button')
    .contains('Resume')
    .click();
  cy.wait(500);
}
