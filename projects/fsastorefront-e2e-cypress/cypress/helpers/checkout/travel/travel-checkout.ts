export function openCategoryPage() {
  cy.get('cx-category-navigation')
    .should('be.visible')
    .findByText('Travel')
    .click({ force: true });
  cy.get('fsa-enriched-responsive-banner')
    .should('be.visible')
    .findByText('Get a quote')
    .click({ force: true });
}

export function populateInsuranceInfoForm() {
  cy.get('cx-dynamic-form').within(() => {
    cy.get('[name=tripDestination]').select('Europe');
    cy.get('[name="NoOfDays"]').type('9');
    cy.get('[name="tripStartDate"]').type('2020-01-01');
    cy.get('[name="tripEndDate"]').type('2020-01-10');
    cy.get('[name="costOfTrip"]').type('3000');
    cy.get('[name="Travellers"]').select('1');
    cy.get('[name="tripDetailsTravellerAges"]').type('20');
    cy.get('[name="submit"]')
      .findByText('Find Prices')
      .click();
  });
}

export function checkComparisonAndAddProduct() {
  cy.get('fsa-comparison-table-panel-item').should('have.length', 3);
  cy.get('fsa-comparison-table-panel-item')
    .eq(2)
    .within(() => {
      cy.get('h3').should('have.text', 'Single - Gold Plan');
      cy.get('h4').should('have.text', '€150.00');
    });
  cy.get('fsa-comparison-table-panel-item')
    .eq(1)
    .within(() => {
      cy.get('h3').should('have.text', 'Single - Silver Plan');
      cy.get('h4').should('have.text', '€120.00');
    });
  cy.get('fsa-comparison-table-panel-item')
    .eq(0)
    .within(() => {
      cy.get('h3').should('have.text', 'Single - Budget Plan');
      cy.get('h4').should('have.text', '€90.00');
      cy.get('.primary-button').click();
    });
}

export function checkOptionalProductsAndPick() {
  cy.get('fsa-add-options').should('be.visible')
  .within(() => {
    cy.get('h3').should('have.length', 6);
    cy.get('h3')
      .eq(0)
      .should('have.text', 'Winter Sports Cover');
    cy.get('h3')
      .eq(1)
      .should('have.text', 'Golf Cover');
    cy.get('h3')
      .eq(2)
      .should('have.text', 'Business Cover');
    cy.get('h3')
      .eq(3)
      .should('have.text', 'Valuables Extension');
    cy.get('h3')
      .eq(4)
      .should('have.text', 'Hazardous Activities');
    cy.get('h3')
      .eq(5)
      .should('have.text', 'Excess waiver');
    cy.get('.disabled-option').should('have.length', 3);
    cy.get('.secondary-button').should('have.length', 6)
      .eq(0)
      .click();
    cy.wait(1000);
  });
  cy.get('.primary-button').should('be.visible').click();
}

export function checkQuoteReview() {
  cy.get('fsa-mini-cart').within(() => {
    cy.get('.short-overview-item').should('have.length', 2);
    cy.get('.short-overview-item')
      .eq(0)
      .should('have.text', ' Single - Budget Plan:  €90.00 ');
    cy.get('.short-overview-item')
      .eq(1)
      .should('have.text', ' Winter Sports Cover:  €9.00 ');
    cy.get('.highlighted').should('have.text', ' Total price:  €99.00 ');
  });
  cy.get('.primary-button').click();
}

export function checkPaymentPage() {
  cy.get('cx-payment-method').within(() => {
    cy.get('.btn-primary').click();
  });
}

export function placeOrderOnFinalReivew() {
  cy.get('fsa-final-review').within(() => {
    cy.get('.form-check-input').click();
    cy.get('.primary-button').click();
  });
}

export function checkOrderConfirmation() {
  cy.get('fsa-order-confirmation').within(() => {
    cy.get('h2')
      .eq(0)
      .should(
        'have.text',
        ' Thank you! Your policy request has been submitted '
      );
  });
}
