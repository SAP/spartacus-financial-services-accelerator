export function checkProgressBarInsurance() {
  cy.get('div.d-flex.progress-node').should('have.length', 7);
  cy.get('h2.heading-headline').should('have.text', ' Your Life Insurance ');
}

export function populatePersonalDetailsPage() {
  cy.get('cx-dynamic-form').within(() => {
    cy.get('[name=title]').select('Mr.');
    cy.get('[name="firstName"]').type('Sophie');
    cy.get('[name="lastName"]').type('Moore');
    cy.get('[name="phoneNumber"]').type('111111');
    cy.get('[name="email"]').type('sophie@moore.com');
    cy.get('[name="address1"]').type('Test address');
    cy.get('[name="city"]').type('Test city');
    cy.get('[name="postcode"]').type('111111');
    cy.get('[name=country]').select('Serbia');
  });
}

export function checkQuoteReviewAccordions() {
  cy.get('fsa-accordion-item')
    .should('have.length', 4)
    .eq(0)
    .should('contain', 'General Details');
  cy.get('.accordion-heading')
    .eq(1)
    .should('contain', "What's Included");
  cy.get('.accordion-heading')
    .eq(2)
    .should('contain', 'Added by you');
  cy.get('.accordion-heading')
    .eq(3)
    .should('contain', 'Personal Details');
}

export function ConfirmBindQuote() {
  cy.get('fsa-bind-quote-dialog').within(() => {
    cy.get('.primary-button').click();
  });
}

export function bindQuotePopup() {
  cy.get('button.primary-button')
    .should('contain', 'Continue')
    .click();
  cy.get('fsa-bind-quote-dialog').within(() => {
    cy.get('.primary-button').click();
  });
  cy.wait(1000);
}

export function clickContinueButton() {
  cy.get('button.primary-button')
    .should('contain', 'Continue')
    .click();
}

export function checkBackAndContinueButtons() {
  cy.get('button.action-button').should('contain', 'Back');
  cy.get('button.primary-button').should('contain', 'Continue');
}

export function clickResumeButton() {
  cy.get('.secondary-button')
    .contains('Resume')
    .click();
  cy.wait(1000);
}

export function checkOrderConfirmationBanking() {
  cy.get('fsa-order-confirmation-message').within(() => {
    cy.get('h5')
      .eq(0)
      .should('have.text', ' Thank you for your order! ');
  });
}
