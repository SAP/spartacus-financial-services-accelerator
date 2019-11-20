export function checkminiCartCurrentAccount() {
  cy.get('fsa-mini-cart').within(() => {
    cy.get('.short-overview-item').should('have.length', 2);
    cy.get('.short-overview-item')
      .eq(0)
      .should('have.text', ' Family Account:  €4.99 ');
    /*      cy.get('short-overview-item')
            .eq(1)
            .should('have.text', ' Transaction Chest:  €5.00 ');*/
    cy.get('.highlighted').should('have.text', ' Total price:  €9.99 ');
  });
}
