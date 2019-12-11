export function checkComparisonPageCurrentAccount() {
  cy.get('h2.heading-headline').contains('Your Current Account Insurance');
  //checking number checkout steps
  cy.get('div.progress-inner-wrapper').should('have.length', 5);
  cy.get('fsa-comparison-table-panel').should('be.visible');
  cy.get('div.fixed-column').should('have.length', 1);
  cy.get('button.primary-button')
    .should('contain', 'Select')
    .should('have.length', 3);
  cy.get('button.secondary-button')
    .should('contain', 'More Info')
    .should('have.length', 3);
}
