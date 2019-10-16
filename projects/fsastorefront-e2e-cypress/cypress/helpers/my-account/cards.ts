export function cardShouldContain(text) {
  cy.get('.info-card').should('contain', text);
}

export function checkNumberOfCards(numberOfCards) {
  cy.get('.info-card').should('have.length', numberOfCards);
}
