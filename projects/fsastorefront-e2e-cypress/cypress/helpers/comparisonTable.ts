export function checkComparisonPageCurrentAccount() {
  // checking number checkout steps
  cy.get('fsa-comparison-table-panel').should('be.visible');
  cy.get('div.fixed-column').should('have.length', 1);
  cy.get('button.primary-button')
    .should('contain', 'Select')
    .should('have.length', 3);
  cy.get('a.link')
    .should('contain', 'More Info')
    .should('have.length', 3);
}
