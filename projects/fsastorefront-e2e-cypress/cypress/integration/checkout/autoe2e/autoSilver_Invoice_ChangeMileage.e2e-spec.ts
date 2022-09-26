import { registrationUser } from '../../../sample-data/users';
import * as register from '../../../helpers/register';
import * as auto from '../../../helpers/checkout/insurance/auto';
import * as autoIntegration from '../../../helpers/checkout/insurance/autoIntegration';
import * as checkout from '../../../helpers/checkout/checkoutSteps';
import { selectPaymentMethodInvoice } from '../../../helpers/checkout/insurance/payment';
import * as myPolicies from '../../../helpers/my-account/policies';
import * as changeRequest from '../../../helpers/changeRequest';
import {
  checkChangedMileagePremium,
  enterNewMileage,
} from '../../../helpers/checkout/insurance/policyChange_integration';

Cypress.config('defaultCommandTimeout', 500000);

context('Auto Silver Checkout with change mileage', () => {
  before(() => {
    cy.visit('http://10.27.241.80/financial/en/EUR/');
  });

  it('Should register a new user', () => {
    register.registerUser(registrationUser);
    register.login(registrationUser.email, registrationUser.password);
    checkout.waitForHomepage();
  });

  it('Should complete first auto step with additional driver', () => {
    checkout.startInsuranceCheckout('Auto');
    auto.populateAutoMonthlyAudi();
    auto.populateMainDriverInfo();
    cy.get('[name=noOfDrivers]').select('1');
    auto.populateAdditionalDriverInfo();
    checkout.clickContinueButton();
  });

  it('Should check comparison table and select main product', () => {
    autoIntegration.checkAutoComparisonTableAudi();
    autoIntegration.selectAutoSilver();
    autoIntegration.checkAutoSilverMiniCart();
    auto.checkOptionalProductsSilver();
    checkout.clickContinueButton();
  });

  it('Should populate personal details page', () => {
    checkout.checkPersonalDetailsPage();
    auto.populatePersonalDetails();
    auto.populateVehicleDetails();
    auto.populateMainDriverData();
    auto.populateAdditionalData();
    autoIntegration.checkAutoSilverMiniCart();
    checkout.clickContinueButton();
  });

  it('Should bound a quote', () => {
    checkout.checkCheckoutStep('Your Auto Insurance', '7');
    checkout.checkProgressBarInsurance();
    autoIntegration.checkAutoSilverMiniCart();
    checkout.checkAccordions('quoteReviewWithoutOptional');
    checkout.clickContinueButton();
    checkout.ConfirmBindQuote();
    checkout.clickContinueButton();
  });

  it('Select default payment details and place an order', () => {
    selectPaymentMethodInvoice();
    checkout.clickContinueButton();
    checkout.placeOrderOnFinalReview();
    checkout.checkOrderConfirmation();
  });

  it('Should check my policies and policy details page', () => {
    //waiting for replication process to be completed
    cy.wait(35000);
    myPolicies.checkMyPoliciesPage();
    autoIntegration.checkReplicatedSilverPolicy();
    cy.get('.overview-section-title').contains(' Auto Insurance Policy ');
    checkout.checkAccordions('integrationPolicyDetails');
  });

  it('Should complete change mileage checkout', () => {
    changeRequest.startChangeMileage();
    checkout.waitForChangeMileage();
    //check change car details - first step
    changeRequest.checkChangeMileageSteps();
    enterNewMileage();
    checkout.clickContinueButton();
    //check change preview - second step
    changeRequest.checkChangeMileageSteps();
    checkChangedMileagePremium();
    cy.get('.primary-button').should('contain', 'Submit').click();
    changeRequest.checkChangeRequestConfirmation();
  });
});
