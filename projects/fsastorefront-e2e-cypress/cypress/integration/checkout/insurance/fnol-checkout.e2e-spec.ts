import { registrationUser } from '../../../sample-data/users';
import * as register from '../../../helpers/register';
import * as fnol from '../../../helpers/fnolCheckout';
import * as auto from '../../../helpers/checkout/insurance/auto';
import * as checkout from '../../../helpers/checkout/checkoutSteps';
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
  waitForCreateAsset,
} from '../../../helpers/generalHelpers';

let cartId;
context('FNOL for sample data user', () => {
  before(() => {
    cy.visit('/');
  });

  it('Should check anonymous user cannot access claims', () => {
    cy.get('.Section4 cx-banner').eq(1).click();
    cy.get('.heading-headline').should('have.text', 'Login');
  });

  it('Should check on policies page for new user', () => {
    cy.visit('/login');
    register.registerUser(registrationUser);
    register.login(registrationUser.email, registrationUser.password);
    fnol.startClaimFromHomepage();
    cy.get('.heading-headline').should('have.text', 'Make a Claim Online');
    cy.get('.notice.py-4').contains('You have no valid policies!');
  });

  it('Should complete first step auto checkout', () => {
    checkout.startInsuranceCheckout('Auto');
    //auto.openCategoryPage();
    auto.populateAutoInformation();
    auto.populateMainDriverInfo();
    cy.get('[name=noOfDrivers]').select('0');
    checkout.clickContinueButton();
  });

  it('Should continue in add options and quote review pages', () => {
    const addToCart = waitForCreateAsset('carts', 'addToCart');
    auto.checkAutoComparisonTable();
    auto.selectAutoBronze();
    cy.wait(`@${addToCart}`).then(result => {
      cartId = (<any>result.response.body).code;
    });
    //add options page
    const personalDetails = waitForPage('personal-details', 'personalDetails');
    checkout.clickContinueButton();
    cy.wait(`@${personalDetails}`).its('status').should('eq', 200);
  });

  it('Should populate personal details page', () => {
    checkout.checkPersonalDetailsPage();
    auto.populatePersonalDetails();
    auto.populateVehicleDetails();
    auto.populateMainDriverData();
    const quoteReview = waitForPage('quote-review', 'quoteReview');
    checkout.clickContinueButton();
    cy.wait(`@${quoteReview}`).its('status').should('eq', 200);
  });

  it('Should add new payment and bind quote', () => {
    addPaymentMethod(registrationUser.email, cartId);
    checkout.clickContinueButton();
    checkout.ConfirmBindQuote();
  });

  it('Select default payment details', () => {
    checkout.clickContinueButton();
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
    checkout.clickContinueButton();
    fnol.waitForIncidentReportStep();
  });

  it('Should check claim is created', () => {
    fnol.checkAndResumeSpecificClaim();
  });

  it('Should check user is navigated to first FNOL page', () => {
    fnol.checkFNOLCheckoutPage();
    fnol.checkFNOLSteps();
    fnol.updateIncidentType();
    //fnol.populateIncidentInformationStep();
    checkout.clickContinueButton();
    fnol.checkFNOLCheckoutPage();
  });

  it('Should check and populate Incident Report page', () => {
    const filePath = 'fsaImageTest.png';
    //cy.get('.custom-file-input').attachFile(filePath);
    cy.get('[name=howAccidentOccurred]').type(
      'while buying tesla coils, my tesla model s was stolen while buying tesla coils, my tesla model s was stolen'
    );
    cy.get('.custom-file-input').attachFile(filePath);

    cy.get('.btn-primary').click();
    cy.wait(2000);
    //fnol.populateIncidentReportStep();
    checkout.checkBackAndContinueButtons();
    cy.get('.primary-button').should('be.visible').click();
    cy.wait(500);
    checkout.clickContinueButton();
  });

  it('Should check and populate General Information page', () => {
    //fnol.waitForfnolGeneralInformationStep();
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
    fnol.checkIncidentInformationAccordion();
    fnol.checkIncidentReportAccordion();
    fnol.checkGeneralInformationAccordion();
    checkout.clickContinueButton();
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