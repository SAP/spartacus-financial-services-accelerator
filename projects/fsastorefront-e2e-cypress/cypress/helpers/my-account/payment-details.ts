export const PAYMENT_DETAILS_PAGE = '/my-account/payment-details';

export function accessPaymentDetailsPage() {
  cy.visit(PAYMENT_DETAILS_PAGE);
}

export function checkPaymentDetailsTitle() {
  cy.get('.cx-header').should('contain', 'Payment methods');
}

export function checkPaymentMethod() {
  cy.get('.cx-payment-card');
}

export function shouldHaveCardNumber(cardNumber) {
  cy.get('.cx-card').should('contain', cardNumber);
}
