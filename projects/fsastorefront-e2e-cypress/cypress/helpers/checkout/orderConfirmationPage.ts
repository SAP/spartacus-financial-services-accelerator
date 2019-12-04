export function checkOrderConfirmationBanking() {
  cy.get('fsa-order-confirmation').within(() => {
    cy.get('h2')
      .eq(0)
      .should(
        'have.text',
        ' Thank you! Your application has been successfully saved in our system. An e-mail has been sent to your e-mail address. '
      );
  });
}
