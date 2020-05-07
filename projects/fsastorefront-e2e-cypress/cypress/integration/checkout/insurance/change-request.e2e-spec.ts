import { registrationUser } from '../../../sample-data/users';
import * as register from '../../../helpers/register';
import * as fnol from '../../../helpers/fnolCheckout';
import * as auto from '../../../helpers/checkout/insurance/auto';
import * as checkout from '../../../helpers/checkout/checkoutSteps';
import {
  addPaymentMethod,
  selectPaymentMethod,
} from '../../../helpers/checkout/insurance/payment';
import * as myPolicies from '../../../helpers/my-account/policies';
import * as changeRequest from '../../../helpers/changeRequest';

context('Change Request for new user', () => {
  before(() => {
    cy.visit('/login');
  });

  it('Should register a new user', () => {
    register.registerUser(registrationUser);
    register.login(registrationUser.email, registrationUser.password);
  });

  it('Should complete first auto step with additional driver', () => {
    auto.openCategoryPage();
    auto.populateAutoInformation();
    auto.populateMainDriverInfo();
    cy.get('[name=noOfDrivers]').select('1');
    auto.populateAdditionalDriverInfo();
    checkout.clickContinueButton();
  });

  it('Should complete auto checkout', () => {
    auto.checkAutoComparisonTable();
    auto.selectAutoSilver();
    checkout.clickContinueButton();
    fnol.waitForQuoteReviewPage();
    addPaymentMethod(registrationUser.email);
    auto.checkAutoSilverMiniCart();
    checkout.clickContinueButton();
    checkout.ConfirmBindQuote();
    selectPaymentMethod();
    checkout.placeOrderOnFinalReview();
    checkout.checkOrderConfirmation();
  });

  it('Should check my policies and policy details page', () => {
    myPolicies.checkMyPoliciesPage();
    myPolicies.checkAutoPolicy();
    myPolicies.clickOnDetails();
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
    cy.get('.primary-button')
      .should('contain', 'Submit')
      .click();
    changeRequest.checkChangeRequestConfirmation();
  });

  it('Should complete change coverage checkout', () => {
    myPolicies.checkMyPoliciesPage();
    myPolicies.checkAutoPolicy();
    myPolicies.clickOnDetails();
    changeRequest.startChangeCoverage();
    //check change coverage - first step
    changeRequest.checkChangeCoverageSteps();
    changeRequest.checkOptionalExtras();
    //check continue button is disabled if coverage is not added
    cy.get('.primary-button')
      .contains('Continue')
      .should('be.disabled');
    changeRequest.addRoadsideAssistance();
    checkout.clickContinueButton();
    //check change preview - second step
    changeRequest.checkChangeCoverageSteps();
    changeRequest.checkChangedPolicyPremium();
    cy.get('.primary-button')
      .should('contain', 'Submit')
      .click();
    changeRequest.checkChangeRequestConfirmation();
  });

  it('Should cancel change policy request', () => {
    myPolicies.checkMyPoliciesPage();
    myPolicies.clickOnDetails();
    changeRequest.startChangeMileage();
    //check change car details - first step
    changeRequest.checkChangeMileageSteps();
    cy.get('[name="vehicleAnnualMileage"]').type(80000);
    checkout.clickContinueButton();
    //check change preview - second step
    changeRequest.checkChangeMileageSteps();
    changeRequest.checkChangedPolicyPremium();
    cy.get('.action-button')
      .should('contain', 'Cancel')
      .click();
    //check user is redirected to policy details page
    cy.get('.overview-section-title').contains(' Auto Insurance Policy ');
    checkout.checkAccordions('policyDetails');
  });

  //check inbox messages
});
