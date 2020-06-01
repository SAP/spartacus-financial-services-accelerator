import { Accordions } from './accordions';
import { waitForPage } from '../generalHelpers';

export function checkProgressBarInsurance(mainProduct) {
  cy.get('.heading-headline').contains(mainProduct);
  cy.get('.progress-node').should('have.length', 7);
  cy.get('p.label')
    .should('have.length', 7)
    .eq(0)
    .contains('Choose a Cover');
  cy.get('p.label')
    .eq(1)
    .contains("What's Included");
  cy.get('p.label')
    .eq(2)
    .contains('Add Options');
  cy.get('p.label')
    .eq(3)
    .contains('Personal Details');
  cy.get('p.label')
    .eq(4)
    .contains('Quote Review');
  cy.get('p.label')
    .eq(5)
    .contains('Payment Details');
  cy.get('p.label')
    .eq(6)
    .contains('Final Review');
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
  cy.get('cx-fs-bind-quote-dialog').within(() => {
    cy.get('.primary-button').click();
  });
}

export function bindQuotePopup() {
  cy.get('.primary-button')
    .should('contain', 'Continue')
    .click();
  cy.wait(500);
  cy.get('cx-fs-bind-quote-dialog').within(() => {
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
  cy.get('cx-fs-order-confirmation-message').within(() => {
    cy.get('h5')
      .eq(0)
      .should('have.text', ' Thank you! ');
  });
}

export function checkAccordions(category) {
  const accordion_item = 'cx-fs-accordion-item';
  const accordion = Accordions.accordions.find(
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
  const confirmationPage = waitForPage(
    'orderConfirmationPage',
    'confirmationPage'
  );
  cy.get('cx-fs-final-review').within(() => {
    cy.get('.form-check-input').click();
    cy.get('.primary-button').click();
  });
  cy.wait(`@${confirmationPage}`)
    .its('status')
    .should('eq', 200);
}

export function checkOrderConfirmation() {
  cy.get('cx-fs-order-confirmation-message').within(() => {
    cy.get('h5')
      .eq(0)
      .should('have.text', ' Thank you! ');
  });
}
