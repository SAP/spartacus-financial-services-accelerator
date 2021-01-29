import { registrationUser } from '../../../sample-data/users';
import * as register from '../../../helpers/register';
import * as auto from '../../../helpers/checkout/insurance/auto';
import * as autoIntegration from '../../../helpers/checkout/insurance/autoIntegration';
import * as checkout from '../../../helpers/checkout/checkoutSteps';
import { selectPaymentMethodInvoice } from '../../../helpers/checkout/insurance/payment';
import * as myPolicies from '../../../helpers/my-account/policies';
import * as fnol from '../../../helpers/fnolCheckout';

Cypress.config('defaultCommandTimeout', 500000);

context('Auto Gold Checkout with FNOL', () => {
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
    auto.populateAutoAnnuallyBMW();
    auto.populateMainDriverInfo();
    cy.get('[name=noOfDrivers]').select('0');
    checkout.clickContinueButton();
  });

  it('Should check comparison table and select Gold Product', () => {
    autoIntegration.selectAutoGold();
    auto.checkOptionalProductsGold();
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

  it('Select default payment details and place an order', () => {
    selectPaymentMethodInvoice();
    checkout.clickContinueButton();
    checkout.placeOrderOnFinalReview();
    checkout.checkOrderConfirmation();
  });

  it('Should check my policies and policy details page', () => {
    //waiting for replication process to be completed
    cy.wait(200000);
    myPolicies.checkMyPoliciesPage();
    autoIntegration.startFnolCheckout('Gold');
  });

  it('Should check and populate Incident Information page', () => {
    autoIntegration.waitForIncidentInfoForm();
    fnol.checkFNOLCheckoutPage();
    fnol.checkFNOLSteps();
    fnol.populateIncidentInformationStep();
    checkout.clickContinueButton();
    autoIntegration.waitForIncidentReportForm();
  });

  it('Should check and populate Incident Report page', () => {
    fnol.populateIncidentReportStep();
    checkout.checkBackAndContinueButtons();
    cy.get('.primary-button').should('contain.text', 'Continue').click();
    cy.wait(500);
    checkout.clickContinueButton();
    autoIntegration.waitForGeneralInfoForm();
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
    cy.wait(3000);
  });

  it('Should check claim replication', () => {
    cy.selectOptionFromDropdown({
      menuOption: 'My Account',
      dropdownItem: 'Claims',
    });
    fnol.checkClaimReplication();
  });
});
