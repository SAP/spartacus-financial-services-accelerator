///<reference path="../../../helpers/checkout/checkoutSteps.ts"/>
import { donnaMooreUser, registrationUser } from '../../../sample-data/users';
import * as register from '../../../helpers/register';
import * as fnol from '../../../helpers/fnolCheckout';
import * as auto from '../../../helpers/checkout/insurance/auto';

import { importAutoPolicy } from '../../../helpers/payloads';
import {
  checkBackAndContinueButtons,
  clickContinueButton,
  importAutoPolicyID,
} from '../../../helpers/checkout/checkoutSteps';
import {
  addPaymentMethod,
  selectPaymentMethod,
} from '../../../helpers/checkout/insurance/payment';
import * as travelCheckout from '../../../helpers/checkout/insurance/travel-checkout';
import * as checkout from '../../../helpers/checkout/checkoutSteps';

context('FNOL for sample data user', () => {
  before(() => {
    cy.visit('/login');
  });

  //to be added - status on claims page

  it('Should check anonymous user cannot access claims', () => {
    cy.visit('/');
    cy.get('.Section4 cx-banner')
      .eq(1)
      .click();
    cy.get('.heading-headline').should('have.text', 'Login');
    this.baba = 'teeeeeest';
  });

  it('Should check no policies page for new user', () => {
    cy.visit('/login');
    register.registerUser(registrationUser);
    register.login(registrationUser.email, registrationUser.password);
    fnol.startClaimFromHomepage();
    cy.get('.heading-headline').should('have.text', 'Make a Claim Online');
    cy.get('.notice.py-4').contains('You have no valid policies!');
  });

  it('Should complete auto checkout', () => {
    auto.openCategoryPage();
    auto.populateAutoInformation();
    auto.populateMainDriverInfo();
    auto.selectNoAdditionalDrivers();
    cy.wait(500);
    clickContinueButton();
  });
  it('Should complete auto checkout', () => {
    auto.checkPricesOnComparisonTable();
    //on add options page
    clickContinueButton();
    //on quote review page
    clickContinueButton();
  });

  it('Add payment method for user', () => {
    addPaymentMethod(registrationUser.email);
  });

  it('Check mini cart on quote review page', () => {
    //checkout.checkQuoteReviewAccordions('auto');
    //auto.checkMiniCart();
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

  it('Should remember Policy ID', () => {
    checkout.checkMyPoliciesPage();
    checkout.rememberPolicyId();
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
