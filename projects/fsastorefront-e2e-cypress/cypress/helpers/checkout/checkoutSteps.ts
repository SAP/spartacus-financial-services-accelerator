import { quoteReviewAccordions } from './accordions';

export function checkProgressBarInsurance() {
  cy.get('.progress-node').should('have.length', 7);
  cy.get('.heading-headline').should('have.text', ' Your Life Insurance ');
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

export function ConfirmBindQuote() {
  cy.get('fsa-bind-quote-dialog').within(() => {
    cy.get('.primary-button').click();
  });
}

export function bindQuotePopup() {
  cy.get('.primary-button')
    .should('contain', 'Continue')
    .click();
  cy.wait(500);
  cy.get('fsa-bind-quote-dialog').within(() => {
    cy.get('.primary-button').click();
  });
  cy.wait(1000);
}

export function clickContinueButton() {
  cy.get('.primary-button')
    .should('contain', 'Continue')
    .click();
}

export function checkBackAndContinueButtons() {
  cy.get('.action-button').should('contain', 'Back');
  cy.get('.primary-button').should('contain', 'Continue');
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

export function checkQuoteReviewAccordions(category) {
  const accordion_item = 'fsa-accordion-item';
  const accordion = quoteReviewAccordions.accordions.find(
    acc => acc.category === category
  );
  cy.get(accordion_item).should('have.length', accordion.accordionItems.length);
  cy.get(accordion_item).each((item, index) => {
    cy.get(accordion_item)
      .eq(index)
      .within(() => {
        cy.get('.accordion-heading').should(
          'contain',
          accordion.accordionItems[index]
        );
      });
  });
}

export function placeOrderOnFinalReview() {
  cy.wait(5000);
  cy.get('fsa-final-review').within(() => {
    cy.get('.form-check-input').click();
    cy.get('.primary-button').click();
  });
}

export function checkOrderConfirmation() {
  cy.get('fsa-order-confirmation-message').within(() => {
    cy.get('h5')
      .eq(0)
      .should('have.text', ' Thank you for your order! ');
  });
}

export function checkMyPoliciesPage() {
  cy.selectOptionFromDropdown({
    menuOption: 'My Account',
    dropdownItem: 'Policies',
  });
  cy.get('fsa-policies').within(() => {
    cy.get('.info-card').should('have.length', 1);
  });
}

export function getPolicyIdFromString(string: string) {
  return string.split(':')[1]
}
