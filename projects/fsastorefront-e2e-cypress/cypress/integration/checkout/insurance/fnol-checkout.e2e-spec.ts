import { registrationUser } from '../../../sample-data/users';
import * as register from '../../../helpers/register';
import * as fnol from '../../../helpers/fnolCheckout';
import * as auto from '../../../helpers/checkout/insurance/auto';
import * as checkout from '../../../helpers/checkout/checkoutSteps';
import {
  checkBackAndContinueButtons,
  clickContinueButton,
} from '../../../helpers/checkout/checkoutSteps';
import {
  addPaymentMethod,
  selectPaymentMethod,
} from '../../../helpers/checkout/insurance/payment';
import {
  checkMyPoliciesPage,
  updatePolicyEffectiveAndStartDate,
} from '../../../helpers/my-account/policies';
import {
  waitForPage,
  waitForCreateCart,
} from '../../../helpers/generalHelpers';

let cartId;
context('FNOL for sample data user', () => {
  before(() => {
    cy.visit('/');
  });

  it('Should check anonymous user cannot access claims', () => {
    cy.get('.Section4 cx-banner')
      .eq(1)
      .click();
    cy.get('.heading-headline').should('have.text', 'Login');
  });

  it('Should check no policies page for new user', () => {
    cy.visit('/login');
    register.registerUser(registrationUser);
    register.login(registrationUser.email, registrationUser.password);
    fnol.startClaimFromHomepage();
    cy.get('.heading-headline').should('have.text', 'Make a Claim Online');
    cy.get('.notice.py-4').contains('You have no valid policies!');
  });

  it('Should complete first step auto checkout', () => {
    auto.openCategoryPage();
    auto.populateAutoInformation();
    auto.populateMainDriverInfo();
    cy.get('[name=noOfDrivers]').select('0');
    clickContinueButton();
  });

  it('Should continue in add options and quote review pages', () => {
    const addToCart = waitForCreateCart('carts', 'addToCart');
    auto.checkAutoComparisonTable();
    auto.selectAutoBronze();
    cy.wait(`@${addToCart}`).then(response => {
      const body = <any>response.response.body;
      cartId = body.code;
    });
    //add options page
    const personalDetails = waitForPage('personal-details', 'personalDetails');
    clickContinueButton();
    cy.wait(`@${personalDetails}`)
      .its('status')
      .should('eq', 200);
  });

  it('Should populate personal details page', () => {
    checkout.checkPersonalDetailsPage();
    auto.populatePersonalDetails();
    auto.populateVehicleDetails();
    auto.populateMainDriverData();
    const quoteReview = waitForPage('quote-review', 'quoteReview');
    checkout.clickContinueButton();
    cy.wait(`@${quoteReview}`)
      .its('status')
      .should('eq', 200);
  });

  it('Should add new payment and bind quote', () => {
    addPaymentMethod(registrationUser.email, cartId);
    clickContinueButton();
    checkout.ConfirmBindQuote();
  });

  it('Select default payment details', () => {
    selectPaymentMethod();
  });

  it('Place order on final review page', () => {
    checkout.placeOrderOnFinalReview();
  });

  it('Check order confirmation', () => {
    checkout.checkOrderConfirmation();
  });

  it('Should update policy details', () => {
    checkMyPoliciesPage();
    updatePolicyEffectiveAndStartDate();
  });

  it('Should check and populate Incident Information page', () => {
    fnol.checkFNOLCheckoutPage();
    fnol.checkFNOLSteps();
    fnol.populateIncidentInformationStep();
    clickContinueButton();
    fnol.waitForIncidentReportStep();
  });

  it('Should check claim is created', () => {
    fnol.checkAndResumeSpecificClaim();
  });

  it('Should check user is navigated to first FNOL page', () => {
    fnol.checkFNOLCheckoutPage();
    fnol.checkFNOLSteps();
    fnol.populateIncidentInformationStep();
    clickContinueButton();
    fnol.checkFNOLCheckoutPage();
  });

  it('Should check and populate Incident Report page', () => {
    fnol.populateIncidentReportStep();
    checkBackAndContinueButtons();
    clickContinueButton();
  });

  it('Should check and populate General Information page', () => {
    fnol.checkFNOLCheckoutPage();
    fnol.populateGeneralInformationStep();
    clickContinueButton();
  });

  it('Should check summary page', () => {
    fnol.checkFNOLCheckoutPage();
    fnol.checkSummaryPage();
    checkBackAndContinueButtons();
  });

  it('Should check information in accordions on summary page', () => {
    fnol.checkIncidentInformationAccordion();
    fnol.checkIncidentReportAccordion();
    fnol.checkGeneralInformationAccordion();
    clickContinueButton();
  });

  it('Should check claim confirmation page', () => {
    fnol.checkConfirmationPage();
  });

  it('Should start a claim checkout from homepage', () => {
    cy.get('.SiteLogo').click();
    fnol.startClaimFromHomepage();
    fnol.checkFnolEntryPage();
    fnol.selectPolicyOnEntryPage();
    fnol.clickContinueAndGetNewClaimID();
    fnol.checkFNOLSteps();
  });

  it('Should delete started claim', () => {
    fnol.deleteClaimFromDialog();
  });
});
