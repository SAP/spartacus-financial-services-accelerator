export function selectPaymentMethod() {
  cy.get('.cx-card-title').should('contain', 'Default Payment Method');
  cy.get('.card-header').should('contain', 'Selected');
  cy.get('cx-payment-method').within(() => {
    cy.get('.btn-primary').click();
  });
}

export function addPaymentMethod(userId: string, cartId: string) {
  cy.get('.short-overview-value')
    .eq(0)
    .then(() => {
      cy.request({
        method: 'POST',
        url: `${Cypress.env(
          'API_URL'
        )}/occ/v2/financial/users/${userId}/carts/${cartId}/paymentdetails`,
        headers: {
          Authorization: `bearer ${
            JSON.parse(localStorage.getItem('spartacus-local-data')).auth
              .userToken.token.access_token
          }`,
        },
        body: {
          accountHolderName: 'Test User',
          cardNumber: '4111111111111111',
          cardType: { code: 'visa' },
          expiryMonth: '01',
          expiryYear: '2125',
          defaultPayment: true,
          saved: true,
          billingAddress: {
            firstName: 'Test',
            lastName: 'User',
            titleCode: 'mr',
            line1: 'Some address',
            line2: '',
            town: 'Town',
            postalCode: 'H4B3L4',
            country: { isocode: 'US' },
          },
        },
      }).then(response => {
        expect(response.status).to.eq(201);
      });
    });
}
