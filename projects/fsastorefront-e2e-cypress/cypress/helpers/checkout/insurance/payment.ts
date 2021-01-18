export function selectPaymentMethodInvoice() {
  cy.get('h4').should('be.visible').should('contain.text', 'Payment method');
  cy.get('#paymentType-INVOICE').click();
}

export function selectPaymentMethodCard() {
  cy.get('h4').should('be.visible').should('contain.text', 'Payment method');
  cy.get('#paymentType-CARD').click();
  cy.get('.btn-action').should('contain.text', 'Add New Payment');
  cy.get('.cx-payment-card').should('be.visible');
  cy.get('.cx-card-title').should('contain', 'DEFAULT');
  cy.get('.card-header').should('contain', 'Selected');
}
