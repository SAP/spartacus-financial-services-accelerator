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
    cy.visit('http://10.27.241.80/financial/en/EUR/');
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
    autoIntegration.checkAutoComparisonTableGolf();
    autoIntegration.selectAutoGold();
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
    autoIntegration.checkReplicatedGoldPolicyAndStartFnol();
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
    const filePath = 'fsaImageTest.png';
    cy.get('[name=howAccidentOccurred]').type(
      'while buying tesla coils, my tesla model s was stolen while buying tesla coils, my tesla model s was stolen'
    );
    cy.get('.custom-file-input').attachFile(filePath);
    cy.get('.btn-primary')
      .should('contain.text', 'Upload')
      .eq(0)
      .click({ force: true });
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
    cy.wait(2000);
  });

  it('Should check claim replication', () => {
    cy.selectOptionFromDropdown({
      menuOption: 'My Account',
      dropdownItem: 'Claims',
    });
    fnol.checkClaimReplication();
  });
});
