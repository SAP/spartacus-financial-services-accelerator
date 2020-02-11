export function selectPaymentMethod() {
  cy.get('.cx-card-title').should('contain', 'Default Payment Method');
  cy.get('.card-header').should('contain', 'Selected');
  cy.get('cx-payment-method').within(() => {
    cy.get('button.btn-primary').click();
  });
}

export function addPaymentMethod(userId: string) {
  cy.wait(3000);
  //updated to the selector had is on every page so payment can be imported from everywhere in checkout
  cy.get('div.d-flex.progress-node')
    .first()
    .then(test => {
      const localData = JSON.parse(
        localStorage.getItem('spartacus-local-data')
      );
      const cartId = localData.cart.active.value.content.code;
      cy.request({
        method: 'POST',
        url: `${Cypress.env(
          'API_URL'
        )}/rest/v2/financial/users/${userId}/carts/${cartId}/paymentdetails`,
        headers: {
          Authorization: `bearer ${localData.auth.userToken.token.access_token}`,
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
