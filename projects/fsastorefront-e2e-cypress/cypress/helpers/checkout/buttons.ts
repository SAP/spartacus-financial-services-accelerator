export function clickNextButton() {
  cy.get('button.primary-button')
    .should('contain', 'Next')
    .click();
}

export function clickContinueButton() {
  cy.get('button.primary-button')
    .should('contain', 'Continue')
    .click();
}
