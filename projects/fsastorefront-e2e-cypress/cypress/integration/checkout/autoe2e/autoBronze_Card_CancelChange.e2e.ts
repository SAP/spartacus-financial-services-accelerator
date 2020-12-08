import { registrationUser } from '../../../sample-data/users';
import * as register from '../../../helpers/register';
import * as auto from '../../../helpers/checkout/insurance/auto';
import * as autoIntegration from '../../../helpers/checkout/insurance/autoIntegration';
import * as checkout from '../../../helpers/checkout/checkoutSteps';
import * as payment from '../../../helpers/checkout/insurance/payment';
import * as myPolicies from '../../../helpers/my-account/policies';
import { waitForCreateAsset } from '../../../helpers/generalHelpers';
import * as changeRequest from '../../../helpers/changeRequest';
import { checkChangedMileagePremiumCancelled } from '../../../helpers/checkout/insurance/policyChange_integration';

Cypress.config('defaultCommandTimeout', 500000);

context('Auto Bronze Checkout with cancel change', () => {
  before(() => {
    cy.visit('http://10.27.241.80/financial/en/EUR/');
  });

  it('Should register a new user', () => {
    register.registerUser(registrationUser);
    register.login(registrationUser.email, registrationUser.password);
    checkout.waitForHomepage();
  });

  it('Should complete first auto step with two additional drivers', () => {
    checkout.startInsuranceCheckout('Auto');
    auto.populateAutoAnnuallyTesla();
    auto.populateMainDriverInfo();
    cy.get('[name=noOfDrivers]').select('2');
    auto.populateAdditionalDriverInfo();
    auto.populateSecondAdditionalDriverInfo();
    checkout.clickContinueButton();
  });

  it('Should check comparison table and select main product', () => {
    const addToCart = waitForCreateAsset('carts', 'addToCart');
    autoIntegration.checkAutoComparisonTableTesla();
    autoIntegration.selectAutoBronze();
    cy.wait(`@${addToCart}`).then(result => {
      const body = <any>result.response.body;
      const cartId = body.code;
      autoIntegration.addPaymentMethod(registrationUser.email, cartId);
    });
    autoIntegration.checkAutoBronzeMiniCart();
    auto.checkOptionalProductsBronze();
    checkout.clickContinueButton();
  });

  it('Should populate personal details page', () => {
    checkout.checkCheckoutStep('Your Auto Insurance', '7');
    checkout.checkPersonalDetailsPage();
    auto.populatePersonalDetails();
    auto.populateVehicleDetails();
    auto.populateMainDriverData();
    auto.populateAdditionalData();
    auto.populateAdditionalDriver2ata();
    autoIntegration.checkAutoBronzeMiniCartBug();
    checkout.clickContinueButton();
  });

  it('Should bound a quote', () => {
    checkout.checkCheckoutStep('Your Auto Insurance', '7');
    checkout.checkProgressBarInsurance();
    autoIntegration.checkAutoBronzeMiniCartBug();
    checkout.checkAccordions('generalQuoteAccordions');
    checkout.clickContinueButton();
    checkout.ConfirmBindQuote();
    cy.get('.section-header-heading').should('be.visible');
    checkout.clickContinueButton();
  });

  it('Select default payment details and place an order', () => {
    payment.selectPaymentMethodCard();
    checkout.clickContinueButton();
    checkout.placeOrderOnFinalReview();
    checkout.checkOrderConfirmation();
  });

  it('Should check my policies and policy details page', () => {
    //waiting for replication process to be completed
    cy.wait(35000);
    myPolicies.checkMyPoliciesPage();
    autoIntegration.checkReplicatedBronzePolicy();
    cy.get('.overview-section-title').contains(' Auto Insurance Policy ');
    checkout.checkAccordions('integrationPolicyDetails');
  });

  it('Should cancel change policy request', () => {
    myPolicies.checkMyPoliciesPage();
    myPolicies.checkAutoChangedPolicy();
    changeRequest.startChangeMileage();
    checkout.waitForChangeMileage();
    //check change car details - first step
    changeRequest.checkChangeMileageSteps();
    cy.get('[name="vehicleAnnualMileage"]').type('80000');
    checkout.clickContinueButton();
    //check change preview - cancel
    changeRequest.checkChangeMileageSteps();
    checkChangedMileagePremiumCancelled();
    cy.get('.action-button').should('contain', 'Cancel').click();
    //check user is redirected to policy details page
    cy.get('.overview-section-title').contains(' Auto Insurance Policy ');
    checkout.checkAccordions('integrationPolicyDetails');
  });
});
