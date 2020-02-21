import { donnaMooreUser, registrationUser } from '../../../sample-data/users';
import * as register from '../../../helpers/register';
import * as fnol from '../../../helpers/fnolCheckout';
import { importAutoPolicy } from '../../../helpers/payloads';
import {
  checkBackAndContinueButtons,
  clickContinueButton,
} from '../../../helpers/checkout/checkoutSteps';

context('FNOL for sample data user', () => {
  before(() => {
    cy.visit('/login');
  });

  it('Should check anonymous user cannot access claims', () => {
    cy.visit('/');
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
    cy.window().then(win => win.sessionStorage.clear());
  });

  it('Should import auto policy', () => {
    cy.visit('/login');
    register.login(donnaMooreUser.email, donnaMooreUser.password);
    cy.wait(1000);
    cy.request(importAutoPolicy);
  });

  it('Should start a FNOL checkout', () => {
    cy.selectOptionFromDropdown({
      menuOption: 'My Account',
      dropdownItem: 'Policies',
    });
    fnol.selectAutoPolicyForFNOL();
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
