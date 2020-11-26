import { registrationUser } from '../../../sample-data/users';
import * as register from '../../../helpers/register';
import * as auto from '../../../helpers/checkout/insurance/auto';
import * as autoIntegration from '../../../helpers/checkout/insurance/autoIntegration';
import * as checkout from '../../../helpers/checkout/checkoutSteps';
import { selectPaymentMethodInvoice } from '../../../helpers/checkout/insurance/payment';
import * as myPolicies from '../../../helpers/my-account/policies';
import * as changeRequest from '../../../helpers/changeRequest';
import {
  addTrailerLiability,
  checkChangedCoveragePremium,
  checkOptionalExtrasBronze,
} from '../../../helpers/checkout/insurance/policyChange_integration';

Cypress.config('defaultCommandTimeout', 500000);

context('Auto Bronze Checkout with change coverage', () => {
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

  it('Should check comparison table and select main and optional products', () => {
    autoIntegration.checkAutoComparisonTableAudi();
    autoIntegration.selectAutoBronzeAudi();
    auto.checkOptionalProductsBronze();
    checkout.clickContinueButton();
  });

  it('Should populate personal details page', () => {
    checkout.checkPersonalDetailsPage();
    auto.populatePersonalDetails();
    auto.populateVehicleDetails();
    auto.populateMainDriverData();
    auto.populateAdditionalData();
    autoIntegration.checkAutoBrozneAudiMiniCart();
    checkout.clickContinueButton();
  });

  it('Should bound a quote', () => {
    checkout.checkCheckoutStep('Your Auto Insurance', '7');
    checkout.checkProgressBarInsurance();
    autoIntegration.checkAutoBrozneAudiMiniCart();
    checkout.checkAccordions('generalQuoteAccordions');
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
    autoIntegration.checkReplicatedBronzeA5Policy();
    cy.get('.overview-section-title').contains(' Auto Insurance Policy ');
    checkout.checkAccordions('integrationPolicyDetails');
  });

  it('Should complete change coverage checkout', () => {
    changeRequest.startChangeCoverage();
    //check change coverage - first step
    changeRequest.checkChangeCoverageSteps();
    checkOptionalExtrasBronze();
    //check continue button is disabled if coverage is not added
    cy.get('.primary-button').contains('Continue').should('be.disabled');
    addTrailerLiability();
    checkout.clickContinueButton();
    //check change preview - second step
    changeRequest.checkChangeCoverageSteps();
    checkChangedCoveragePremium();
    cy.get('.primary-button').should('contain', 'Submit').click();
    changeRequest.checkChangeRequestConfirmation();
  });
});
