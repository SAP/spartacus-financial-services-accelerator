import { registrationUser } from '../../../sample-data/users';
import * as register from '../../../helpers/register';
import * as auto from '../../../helpers/checkout/insurance/auto';
import * as autoIntegration from '../../../helpers/checkout/insurance/autoIntegration';
import * as checkout from '../../../helpers/checkout/checkoutSteps';
import {
  checkAutoReferredQuote,
  checkMyQuotesPage,
} from '../../../helpers/my-account/policies';

Cypress.config('defaultCommandTimeout', 500000);

context('Auto Silver - Referred Quote', () => {
  before(() => {
    cy.visit('/');
  });

  it('Should register a new user', () => {
    register.registerUser(registrationUser);
    register.login(registrationUser.email, registrationUser.password);
  });

  it('Should complete first auto step without additonal driver', () => {
    checkout.waitConsent();
    checkout.startInsuranceCheckout('Auto');
    cy.wait(500);
    auto.populateAutoMonthlyOpel();
    auto.populateMainDriverInfo();
    cy.get('[name=noOfDrivers]').select('0');
    checkout.clickContinueButton();
  });

  it('Should check comparison table and select main product', () => {
    autoIntegration.selectAutoSilver();
    auto.checkOptionalProductsSilver();
    checkout.clickContinueButton();
  });

  it('Should populate personal details page', () => {
    checkout.checkPersonalDetailsPage();
    auto.populatePersonalDetails();
    auto.populateVehicleDetails();
    auto.populateMainDriverData();
    checkout.clickContinueButton();
  });

  it('Should bound a quote', () => {
    checkout.checkCheckoutStep('Your Auto Insurance', '7');
    checkout.checkProgressBarInsurance();
    checkout.checkAccordions('quoteReviewWithoutOptional');
    checkout.clickContinueButton();
    checkout.ConfirmBindQuote();
    checkout.clickContinueButton();
  });

  it('Should check contact agent page ', () => {
    autoIntegration.checkReferredQuotePopup();
    cy.get('.heading-headline').should('contain.text', 'Find an Agent');
  });

  it('Should check referred quote ', () => {
    checkMyQuotesPage();
    checkAutoReferredQuote();
  });
});
