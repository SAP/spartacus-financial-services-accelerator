import { registrationUser } from '../../../sample-data/users';
import * as register from '../../../helpers/register';
import * as auto from '../../../helpers/checkout/insurance/auto';
import * as autoIntegration from '../../../helpers/checkout/insurance/autoIntegration';
import * as checkout from '../../../helpers/checkout/checkoutSteps';
import { selectPaymentMethodInvoice } from '../../../helpers/checkout/insurance/payment';
import * as myPolicies from '../../../helpers/my-account/policies';
import * as changeRequest from '../../../helpers/changeRequest';
import * as inbox from '../../../helpers/my-account/inbox';

context('Auto Checkout', () => {
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
    auto.populateAutoInformation();
    auto.populateMainDriverInfo();
    cy.get('[name=noOfDrivers]').select('1');
    auto.populateAdditionalDriverInfo();
    checkout.clickContinueButton();
  });

  it('Should check comparison table and select main product', () => {
    autoIntegration.checkAutoComparisonTable();
    autoIntegration.selectAutoSilver();
    autoIntegration.checkAutoSilverMiniCart();
    auto.checkOptionalProducts();
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
    cy.wait(20000);
    checkout.clickContinueButton();
  });

  it('Select default payment details and place an order', () => {
    selectPaymentMethodInvoice();
    checkout.clickContinueButton();
    checkout.placeOrderOnFinalReview();
    cy.wait(18000);
    checkout.checkOrderConfirmation();
  });

  it('Should check my policies and policy details page', () => {
    cy.wait(25000);
    myPolicies.checkMyPoliciesPage();
    myPolicies.checkAutoPolicy();
    cy.get('.overview-section-title').contains(' Auto Insurance Policy ');
    checkout.checkAccordions('policyDetails');
  });

  it('Should complete change mileage checkout', () => {
    changeRequest.startChangeMileage();
    //check change car details - first step
    changeRequest.checkChangeMileageSteps();
    changeRequest.enterNewMileage();
    checkout.clickContinueButton();
    //check change preview - second step
    changeRequest.checkChangeMileageSteps();
    changeRequest.checkChangedPolicyPremium();
    cy.get('.primary-button').should('contain', 'Submit').click();
    changeRequest.checkChangeRequestConfirmation();
  });

  it('Should complete change coverage checkout', () => {
    myPolicies.checkMyPoliciesPage();
    myPolicies.checkAutoPolicy();
    changeRequest.startChangeCoverage();
    //check change coverage - first step
    changeRequest.checkChangeCoverageSteps();
    changeRequest.checkOptionalExtras();
    //check continue button is disabled if coverage is not added
    cy.get('.primary-button').contains('Continue').should('be.disabled');
    changeRequest.addRoadsideAssistance();
    checkout.clickContinueButton();
    //check change preview - second step
    changeRequest.checkChangeCoverageSteps();
    changeRequest.checkChangedPolicyPremium();
    cy.get('.primary-button').should('contain', 'Submit').click();
    changeRequest.checkChangeRequestConfirmation();
  });

  it('Should cancel change policy request', () => {
    myPolicies.checkMyPoliciesPage();
    myPolicies.checkAutoChangedPolicy();
    changeRequest.startChangeMileage();
    //check change car details - first step
    changeRequest.checkChangeMileageSteps();
    cy.get('[name="vehicleAnnualMileage"]').type(80000);
    checkout.clickContinueButton();
    //check change preview - second step
    changeRequest.checkChangeMileageSteps();
    cy.get('.action-button').should('contain', 'Cancel').click();
    //check user is redirected to policy details page
    cy.get('.overview-section-title').contains(' Auto Insurance Policy ');
    checkout.checkAccordions('policyDetails');
  });

  it('Should check inbox messages for change request', () => {
    cy.selectOptionFromDropdown({
      menuOption: 'My Account',
      dropdownItem: 'Inbox',
    });
    inbox.checkInboxComponets();
    inbox.checkGeneralTab();
    inbox.checkInboxHeader();
    changeRequest.checkInboxMessages();
  });
});
