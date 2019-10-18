export function cardShouldContain(text) {
  cy.get('.info-card').should('contain', text);
}
