export function checkBankingComparisonPage() {
  cy.get('.progress-inner-wrapper').should('have.length', 5);
  cy.get('fsa-comparison-table-panel').should('be.visible');
  cy.get('.fixed-column').should('have.length', 1);
  cy.get('.primary-button')
    .should('contain', 'Select')
    .should('have.length', 3);
  cy.get('a.link')
    .should('contain', 'More Info')
    .should('have.length', 3);
}
