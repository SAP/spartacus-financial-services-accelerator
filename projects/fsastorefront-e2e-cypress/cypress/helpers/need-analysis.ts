export function checkNeedAnalysisElements() {
  cy.get('cx-fs-questionnaire-carousel')
    .should('be.visible')
    .within(() => {
      cy.get('.heading-headline').contains('Suggested Products');
      cy.get('cx-carousel').should('be.visible');
      cy.get('.indicators').should('be.visible');
      cy.get('.container-fluid').should('be.visible');
    });
}

export function selectAnswers(question, answer) {
  cy.get('.heading')
    .contains(question)
    .parent()
    .within(() => {
      cy.get('.label').contains(answer).click({ force: true });
    });
  cy.get('.semi-bold').should('contain.text', question);
}

export function checkNoProductFits() {
  cy.get('h4').should('contain.text', 'Applied filter:');
  cy.get('.container-fluid').should('not.exist');
  cy.get('.notice-text')
    .should('be.visible')
    .contains(
      ' Unfortunately, there is no product that fits all chosen criteria. Please try again with different combination or contact an'
    );
}

export function suggestedProducts(numberOfProducts) {
  cy.get('.container-fluid').within(() => {
    cy.get('.row.border-top').should('have.length', numberOfProducts);
  });
}
