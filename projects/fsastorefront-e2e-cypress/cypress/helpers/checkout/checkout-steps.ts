import { Accordions } from './accordions';
import {
  waitForPage,
  waitForCMSComponent,
  waitForUserAssets,
} from '../general-helpers';
import * as dayjs from 'dayjs';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

const tomorrowsDate = dayjs().add(2, 'day').format('YYYY-MM-DD');

export function checkProgressBarInsurance() {
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
    cy.get('[name="street"]').type('Omladinskih Brigada');
    cy.get('[name="streetNumber"]').type('90 G');
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

export function clickContinueButton() {
  cy.get('.primary-button').should('be.visible');
  cy.get('.primary-button').contains('Continue').click({ force: true });
}

export function clickBackButton() {
  cy.get('.action-button').should('contain.text', 'Back').click();
}

export function checkBackAndContinueButtons() {
  cy.get('.action-button').should('contain.text', 'Back');
  cy.get('.primary-button').should('contain.text', 'Continue');
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
  cy.wait(`@${confirmationPage}`).then(({ response }) => {
    expect(response.statusCode).to.eq(200);
  });
}

export function checkOrderConfirmation() {
  cy.get('.heading-headline')
    .should('be.visible')
    .should('contain', 'Confirmation');
  cy.get('cx-fs-order-confirmation').should('be.visible');
  cy.get('cx-fs-order-confirmation-message').should('be.visible');
  cy.get('cx-fs-order-confirmation-message').within(() => {
    cy.get('h5').eq(0).should('have.text', ' Thank you! ');
  });
  cy.get('.short-overview').should('be.visible');
}

export function checkInsuranceComparisonPage(numberOfProducts) {
  cy.get('cx-fs-comparison-table-panel')
    .should('be.visible')
    .within(() => {
      cy.get('.fixed-column').should('have.length', 1);
      cy.get('.primary-button')
        .should('contain', 'Select')
        .should('have.length', numberOfProducts);
      cy.get('a.link')
        .should('contain', 'More Info')
        .should('have.length', numberOfProducts);
    });
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
  cy.get('h2').should('contain.text', myAccountPage);
  cy.get('h3').should('contain.text', emptyPageMessage);
}

export function checkFirstCheckoutStep(mainProduct) {
  cy.get('cx-form-component').should('be.visible');
  cy.get('h3').contains(mainProduct + ' Information');
}

export function populatePropertyDetails() {
  cy.get('h4').contains('General Information');
  cy.get('[name=propertyDetailsStartDate]').type(tomorrowsDate);
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
  //BUG
  cy.get('[name=carRenewalDate]').type('2023-01-01');
}

export function populatePropertyAddress() {
  cy.get('h4').contains('Your Property Address');
  cy.get('[name=property-address-line-1]').type('Omladinskin Brigada');
  cy.get('[name=property-address-line-2]').type('90 g');
  cy.get('[name=property-address-city]').type('Belgrade');
  cy.get('[name=property-address-postcode]').type('11090');
  cy.get('[name=property-address-country]').select('RS');
}

export function startInsuranceCheckout(mainProduct) {
  cy.selectOptionFromDropdown({
    menuOption: 'Insurance',
    dropdownItem: mainProduct,
    nextPageUrlPart: 'Insurance',
  });
  cy.get('.enriched-banner-styled-text')
    .eq(0)
    .should('have.text', ' Get a Quote')
    .click();
}

export function waitForAddOptions() {
  const addOptions = waitForPage('add-options', 'addOptions');
  cy.wait(`@${addOptions}`).then(({ response }) => {
    expect(response.statusCode).to.eq(200);
  });
}

export function checkCheckoutStep(mainProduct, numberOfSteps) {
  cy.get('h2').should('be.visible').should('contain.text', mainProduct);
  cy.get('.progress-inner-wrapper').should('have.length', numberOfSteps);
}

export function checkPersonalDetailsPage() {
  cy.get('cx-fs-personal-details').should('be.visible');
  cy.get('cx-fs-mini-cart').should('be.visible');
  cy.get('cx-footer-navigation').should('be.visible');
}

export function waitForQuoteReviewPage() {
  const quoteReview = waitForPage('quote-review', 'quoteReview');
  cy.wait(`@${quoteReview}`).then(({ response }) => {
    expect(response.statusCode).to.eq(200);
  });
}

export function waitForChangeMileage() {
  const changeCarDetails = waitForCMSComponent(
    'ChangeCarDetailsFormComponent',
    'changeCarDetails'
  );
  cy.wait(`@${changeCarDetails}`).then(({ response }) => {
    expect(response.statusCode).to.eq(200);
  });
}

export function populatePaymentCreditCard() {
  cy.get('h4').should('be.visible').should('contain.text', 'Payment method');
  cy.get('#paymentType-CARD').click();
  cy.get('[formcontrolname=code]').ngSelect('Visa');
  cy.get('[formcontrolname=accountHolderName]').type('Alex More');
  cy.get('[formcontrolname=cardNumber]').type('2349234923492349');
  cy.get('[formcontrolname=expiryMonth]').ngSelect('11');
  cy.get('[formcontrolname=expiryYear]').ngSelect('2029');
  cy.get('[formcontrolname=cvn]').type('4532');
  cy.get('input[type="checkbox"]').eq(0).click();
}

export function waitConsent() {
  const consent = waitForUserAssets('consenttemplates', 'consent');
  cy.wait(`@${consent}`).then(({ response }) => {
    expect(response.statusCode).to.eq(200);
  });
}

export function checkCouponsFields() {
  cy.get('.cx-cart-coupon-container')
    .should('be.visible')
    .within(() => {
      cy.get('.form-control').should('be.visible');
      cy.get('.primary-button').should('contain.text', 'Apply');
    });
}

export function checkFinalReviewComponents() {
  cy.get('cx-fs-final-review').should('be.visible');
  cy.get('.form-check-input').should('be.visible');
  cy.get('cx-fs-mini-cart')
    .should('be.visible')
    .within(() => {
      cy.get('.section-header-heading').contains('Travel Insurance');
    });
}

export function checkSyncPilotComparisonTable() {
  cy.get('cx-fs-comparison-table-sync-pilot')
    .should('be.visible')
    .within(() => {
      cy.get('h3').should('contain.text', 'Need Help?');
      cy.get('p.mb-0').should('contain.text', 'Speak to an Agent');
    });
}

export const categoryPage = {
  homeowners: 'insurance_main_homeowners',
  renters: 'insurance_main_renters',
  auto: 'insurance_main_auto',
  life: 'insurance_main_life',
  travel: 'insurance_main_travel',
  event: 'insurance_main_event',
  savings: 'insurance_main_savings',
  currentAccount: 'banking_main_current_account',
  creditCard: 'banking_main_credit_card',
  loan: 'banking_main_loans',
  ftd: 'banking_main_fixed_term_deposits',
  userIdentification: 'user-identification',
  addressInfo: 'my-account/address-info',
  addOptions: 'checkout/add-options',
};

export function checkPageURL(page: string) {
  cy.location().should(loc => {
    expect(loc.href).to.include(`${page}`);
  });
}

export function checkValidationPopUpAndClose() {
  cy.get('.popup-content-wrapper')
    .should('be.visible')
    .within(() => {
      cy.get('h3').should('contain.text', 'There are validation errors');
      cy.get('.close').click();
    });
}
