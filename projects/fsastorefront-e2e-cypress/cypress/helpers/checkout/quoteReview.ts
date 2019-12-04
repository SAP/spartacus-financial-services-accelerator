export function checkQuoteReviewPage() {
  cy.get('div.progress-inner-wrapper').should('have.length', 5);
  cy.get('fsa-accordion-item')
    .should('have.length', 3)
    .eq(0)
    .should('contain', "What's Included");
  cy.get('h4')
    .eq(1)
    .should('contain', 'Added by you');
  cy.get('h4')
    .eq(2)
    .should('contain', 'Personal Details');
}
