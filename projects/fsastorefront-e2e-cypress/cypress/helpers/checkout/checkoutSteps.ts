import { Accordions } from './accordions';
import { waitForPage } from '../generalHelpers';

export function checkProgressBarInsurance(mainProduct) {
  cy.get('.heading-headline').contains(mainProduct);
  cy.get('.progress-node').should('have.length', 7);
  cy.get('p.label').should('have.length', 7).eq(0).contains('Choose a Cover');
  cy.get('p.label').eq(1).contains("What's Included");
  cy.get('p.label').eq(2).contains('Add Options');
  cy.get('p.label').eq(3).contains('Personal Details');
  cy.get('p.label').eq(4).contains('Quote Review');
  cy.get('p.label').eq(5).contains('Payment Details');
  cy.get('p.label').eq(6).contains('Final Review');
}

export function populatePersonalDetailsPage() {
  cy.get('cx-dynamic-form').within(() => {
    cy.get('[name="phoneNumber"]').type('111111');
    cy.get('[name="address1"]').type('Omladinskih Brigada');
    cy.get('[name="city"]').type('Belgrade');
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
  cy.get('.primary-button').should('contain', 'Continue').click();
  cy.wait(500);
  cy.get('cx-fs-bind-quote-dialog').within(() => {
    cy.get('.primary-button').click();
  });
  cy.wait(1000);
}

export function clickContinueButton() {
  cy.get('.primary-button').should('contain', 'Continue').click();
}

export function checkBackAndContinueButtons() {
  cy.get('.action-button').should('contain', 'Back');
  cy.get('.primary-button').should('contain', 'Continue');
}

export function clickResumeButton() {
  cy.get('.secondary-button').contains('Resume').click();
  cy.wait(1000);
}

export function checkOrderConfirmationBanking() {
  cy.get('cx-fs-order-confirmation-message').within(() => {
    cy.get('h5').eq(0).should('have.text', ' Thank you! ');
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
  cy.wait(`@${confirmationPage}`).its('status').should('eq', 200);
}

export function checkOrderConfirmation() {
  cy.get('cx-fs-order-confirmation-message').within(() => {
    cy.get('h5').eq(0).should('have.text', ' Thank you! ');
  });
}

export function checkInsuranceComparisonPage(mainProduct, numberOfProducts) {
  cy.get('.heading-headline').contains(mainProduct);
  cy.get('.progress-inner-wrapper').should('have.length', 7);
  cy.get('cx-fs-comparison-table-panel').should('be.visible');
  cy.get('.fixed-column').should('have.length', 1);
  cy.get('.primary-button')
    .should('contain', 'Select')
    .should('have.length', numberOfProducts);
  cy.get('a.link')
    .should('contain', 'More Info')
    .should('have.length', numberOfProducts);
}

export function removeOptionalProduct(productName) {
  cy.get('h6')
    .contains(productName)
    .parents('.row.mx-3.py-3')
    .within(() => {
      cy.get('.secondary-button').contains('Remove').click();
    });
  cy.get('h6')
    .contains(productName)
    .parents('.row.mx-3.py-3')
    .within(() => {
      cy.get('.secondary-button').contains('Add').should('be.visible');
    });
}

export function checkMyAccountEmptyPages(myAccountPage, emptyPageMessage) {
  cy.selectOptionFromDropdown({
    menuOption: 'My Account',
    dropdownItem: myAccountPage,
  });
  cy.wait(500);
  cy.get('h2').contains(myAccountPage);
  cy.get('h3').contains(emptyPageMessage);
}

export function checkFirstCheckoutStep(mainProduct) {
  cy.get('cx-form-component').should('be.visible');
  cy.get('h3').contains(mainProduct + ' Information');
}

export function populatePropertyDetails() {
  cy.get('h4').contains('General Information');
  cy.get('[name=propertyDetailsStartDate]').type('2020-12-12');
  cy.get('h4').contains('Property Details');
  cy.get('[name=propertyType]').select('House');
  cy.get('[name=ccaBuiltYear]').type('1983');
  cy.get('[name=numberOfBedrooms]').type('5');
  cy.get('[name=numberOfBathrooms]').type('3');
  cy.get('[name="smoking"]').eq(0).click();
  cy.get('[name=numberOfDaysUnoccupied]').type('43');
  cy.get('[name="normallyOccupied"]').eq(1).click();
  cy.get('[name=wood]').click();
  cy.get('[name=brick]').click();
  cy.get('[name=MultiPointLockingSystem]').click();
}

export function populateContentsCover() {
  cy.get('h4').contains('Your Contents Cover');
  cy.get('[name="propertyIsStandard50000ContentCover"]').eq(1).click();
  cy.get('[name=propertyMultipleOf10000ContentCover]').type('15000');
  cy.get('[name="accidentalDamageCoverContents"]').eq(0).click();
}

export function populatePropertyAddress() {
  cy.get('h4').contains('Your Property Address');
  cy.get('[name=property-address-line-1]').type('Omladinskin Brigada');
  cy.get('[name=property-address-city]').type('Belgrade');
  cy.get('[name=property-address-postcode]').type('11090');
  cy.get('[name=property-address-country]').select('RS');
}

export function startInsuranceCheckout(mainProduct) {
  cy.wait(500);
  cy.selectOptionFromDropdown({
    menuOption: 'Insurance',
    dropdownItem: mainProduct,
    nextPageUrlPart: 'Insurance',
  });
  cy.get('.enriched-banner-styled-text').eq(0).contains(' Get a Quote').click();
}

export function waitForHomepage() {
  const homepage = waitForPage('homepage', 'homepage');
  cy.wait(`@${homepage}`)
    .its('status')
    .should('eq', 200);
}

export function checkCheckoutStep(mainProduct, numberOfCheckoutSteps) {
  cy.get('h2').contains(mainProduct);
  cy.get('.progress-inner-wrapper').should(
    'have.length',
    numberOfCheckoutSteps
  );
}

export function checkPersonalDetailsPage() {
  cy.get('cx-fs-personal-details').should('be.visible');
  cy.get('cx-fs-mini-cart').should('be.visible');
  cy.get('cx-footer-navigation').should('be.visible');
}
