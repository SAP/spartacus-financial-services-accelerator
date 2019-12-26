export function checkOrderConfirmationBanking() {
  cy.get('fsa-order-confirmation-message').within(() => {
    cy.get('h5')
      .eq(0)
      .should('have.text', ' Thank you for your order! ');
  });
}
