import { registrationUser } from '../../../sample-data/users';
import * as register from '../../../helpers/register';
import * as auto from '../../../helpers/checkout/insurance/auto';
import * as autoIntegration from '../../../helpers/checkout/insurance/auto-integrations';
import * as checkout from '../../../helpers/checkout/checkout-steps';
import * as myPolicies from '../../../helpers/my-account/policies';
import * as changeRequest from '../../../helpers/change-requests';
const todaysDate = Cypress.moment().format('YYYY-MM-DD');

Cypress.config('defaultCommandTimeout', 500000);

context('Auto Gold Checkout with Adding Driver and Removing Coverage', () => {
  before(() => {
    cy.visit('/');
  });

  it('Should register a new user', () => {
    register.registerUser(registrationUser);
    register.login(registrationUser.email, registrationUser.password);
  });

  it('Should complete first auto step without additional drivers', () => {
    checkout.waitConsent();
    checkout.startInsuranceCheckout('Auto');
    auto.populateAutoMonthlyAudi();
    auto.populateMainDriverInfo();
    cy.get('[name=noOfDrivers]').select('1');
    auto.populateAdditionalDriverInfo();
    checkout.clickContinueButton();
  });

  it('Should check comparison table and select Gold Product', () => {
    autoIntegration.selectAutoGold();
    auto.checkOptionalProductsGoldAddOptional();
    checkout.clickContinueButton();
  });

  it('Should populate personal details page', () => {
    checkout.checkPersonalDetailsPage();
    auto.populatePersonalDetails();
    auto.populateVehicleDetails();
    auto.populateMainDriverData();
    auto.populateAdditionalData();
    cy.get('.primary-button').should('be.visible');
    checkout.clickContinueButton();
  });

  it('Should bound a quote', () => {
    checkout.checkCheckoutStep('Your Auto Insurance', '7');
    checkout.checkProgressBarInsurance();
    checkout.checkAccordions('generalQuoteAccordions');
    cy.get('.primary-button').should('contain.text', 'Continue');
    checkout.clickContinueButton();
    checkout.ConfirmBindQuote();
    checkout.clickContinueButton();
  });

  it('Select default payment details and place an order', () => {
    //TODO: Will be replaced with credit card once bug is resolved
    checkout.populatePaymentCreditCard();
    cy.get('.btn-primary').contains('Continue').click();
    checkout.placeOrderOnFinalReview();
    checkout.checkOrderConfirmation();
  });

  it('Should check my policies and policy details page', () => {
    //waiting for replication process to be completed
    cy.wait(200000);
    myPolicies.checkMyPoliciesPage();
    autoIntegration.checkReplicatedPolicy('Gold');
  });

  it('Should Add New Driver', () => {
    changeRequest.startAddingDriverCheckout();
    //Driver Information Step
    changeRequest.checkAddDriverSteps();
    changeRequest.checkDriverInformationStep();
    changeRequest.populateAdditionalDriverData();
    cy.get('.primary-button').should('contain.text', 'Continue').click();
    //Change Preview Step
    changeRequest.checkAddDriverSteps();
    changeRequest.checkDrivers();
    cy.get('.primary-button').should('contain', 'Submit').click();
    changeRequest.checkChangeRequestConfirmation();
    cy.wait(200000);
  });

  it('Should new driver is added', () => {
    //waiting for replication process to be completed
    myPolicies.checkMyPoliciesPage();
    autoIntegration.checkReplicatedPolicy('Gold');
    changeRequest.checkAllDrivers();
  });

  it('Should Remove Coverage', () => {
    changeRequest.startChangeCoverage();
    //Check change coverage - first step
    changeRequest.checkChangeCoverageSteps();
    changeRequest.checkOptionalExtrasGold();
    changeRequest.removeCoverage();
    //Check Change Preview step
    changeRequest.checkChangeCoverageSteps();
    cy.get('.primary-button').should('contain', 'Submit').click();
    changeRequest.checkChangeRequestConfirmation();
  });

  it('Should new driver is added', () => {
    myPolicies.checkMyPoliciesPage();
    autoIntegration.checkReplicatedPolicy('Gold');
    changeRequest.checkAllDrivers();
  });
});
