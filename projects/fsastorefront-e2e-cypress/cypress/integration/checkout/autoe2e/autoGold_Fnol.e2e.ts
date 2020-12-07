import { registrationUser } from '../../../sample-data/users';
import * as register from '../../../helpers/register';
import * as auto from '../../../helpers/checkout/insurance/auto';
import * as autoIntegration from '../../../helpers/checkout/insurance/autoIntegration';
import * as checkout from '../../../helpers/checkout/checkoutSteps';
import * as myPolicies from '../../../helpers/my-account/policies';
import * as fnol from '../../../helpers/fnolCheckout';
import { waitForCreateAsset } from '../../../helpers/generalHelpers';
import * as payment from '../../../helpers/checkout/insurance/payment';

Cypress.config('defaultCommandTimeout', 500000);

context('Auto Gold Checkout with FNOL', () => {
  before(() => {
    cy.visit(
      'https://fsastorefrontapp.c73z0k1qfh-financial1-s5-public.model-t.cc.commerce.ondemand.com'
    );
  });

  it('Should register a new user', () => {
    register.registerUser(registrationUser);
    register.login(registrationUser.email, registrationUser.password);
    checkout.waitForHomepage();
  });

  it('Should complete first auto step without additional drivers', () => {
    checkout.startInsuranceCheckout('Auto');
    auto.populateAutoAnnuallyBMW();
    auto.populateMainDriverInfo();
    cy.get('[name=noOfDrivers]').select('0');
    checkout.clickContinueButton();
  });

  it('Should check comparison table and select Gold Product', () => {
    const addToCart = waitForCreateAsset('carts', 'addToCart');
    autoIntegration.checkAutoComparisonTableGolf();
    autoIntegration.selectAutoGold();
    cy.wait(`@${addToCart}`).then(result => {
      const body = <any>result.response.body;
      const cartId = body.code;
      autoIntegration.addPaymentMethod(registrationUser.email, cartId);
    });
    autoIntegration.checkAutoGoldMiniCart();
    auto.checkOptionalProductsGold();
    checkout.clickContinueButton();
  });

  it('Should populate personal details page', () => {
    checkout.checkPersonalDetailsPage();
    auto.populatePersonalDetails();
    auto.populateVehicleDetails();
    auto.populateMainDriverData();
    autoIntegration.checkAutoGoldMiniCart();
    checkout.clickContinueButton();
  });

  it('Should bound a quote', () => {
    checkout.checkCheckoutStep('Your Auto Insurance', '7');
    checkout.checkProgressBarInsurance();
    autoIntegration.checkAutoGoldMiniCart();
    checkout.checkAccordions('generalQuoteAccordions');
    checkout.clickContinueButton();
    checkout.ConfirmBindQuote();
    checkout.clickContinueButton();
  });

  it('Select default payment details and place an order', () => {
    payment.selectPaymentMethod();
    checkout.placeOrderOnFinalReview();
    checkout.checkOrderConfirmation();
  });

  it('Should check my policies and policy details page', () => {
    //waiting for replication process to be completed
    cy.wait(35000);
    myPolicies.checkMyPoliciesPage();
    autoIntegration.checkReplicatedGoldPolicyAndStartFnol();
  });

  it('Should check and populate Incident Information page', () => {
    fnol.checkFNOLCheckoutPage();
    fnol.checkFNOLSteps();
    fnol.populateIncidentInformationStep();
    checkout.clickContinueButton();
  });

  it('Should check and populate Incident Report page', () => {
    fnol.populateIncidentReportStep();
    checkout.checkBackAndContinueButtons();
    checkout.clickContinueButton();
  });

  it('Should check and populate General Information page', () => {
    fnol.checkFNOLCheckoutPage();
    fnol.populateGeneralInformationStep();
    checkout.clickContinueButton();
  });

  it('Should check summary page', () => {
    fnol.checkFNOLCheckoutPage();
    fnol.checkSummaryPage();
    checkout.checkBackAndContinueButtons();
  });

  it('Should check information in accordions on summary page', () => {
    autoIntegration.checkIncidentInformationAccordion();
    fnol.checkIncidentReportAccordion();
    fnol.checkGeneralInformationAccordion();
    checkout.clickContinueButton();
  });

  it('Should check claim confirmation page', () => {
    fnol.checkConfirmationPage();
    //replication proces to be completed
    cy.wait(2000);
  });
});
