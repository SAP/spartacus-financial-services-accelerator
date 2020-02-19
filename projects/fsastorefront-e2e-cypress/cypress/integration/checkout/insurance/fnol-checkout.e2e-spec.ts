import { donnaMooreUser, registrationUser } from '../../../sample-data/users';
import * as register from '../../../helpers/register';
import * as fnol from '../../../helpers/fnolCheckout';
import { importAutoPolicy } from '../../../helpers/payloads';
import {
  checkBackAndContinueButtons,
  clickContinueButton,
} from '../../../helpers/checkout/checkoutSteps';

context('FNOL for sample data user', () => {
  let claimId;
  before(() => {
    cy.visit('/login');
  });

  it('Should check anonymous user cannot access claims', () => {
    cy.get('.SiteLogo').click();
    fnol.startClaimFromHomepage();
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
    claimId = fnol.getClaimIdFromLocalStorage();
    clickContinueButton();
  });

  it('Should check claim is created', () => {
    fnol.checkClaimsPage();
    fnol.checkAndResumeSpecificClaim(claimId);
  });

  it('Should check user is navigated to first FNOL page', () => {
    fnol.checkFNOLCheckoutPage();
    fnol.checkFNOLSteps();
    cy.get('[name=whatHappened]').select('Breakdown');
    clickContinueButton();
  });

  it('Should check and populate Incident Report page', () => {
    fnol.checkFNOLCheckoutPage();
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
    fnol.checkConfirmationPage(claimId);
  });

  it('Should start a claim checkout from homepage', () => {
    cy.get('.SiteLogo').click();
    fnol.startClaimFromHomepage();
    fnol.checkFnolEntryPage();
    fnol.selectPolicyOnEntryPage();
    clickContinueButton();
    fnol.checkFNOLCheckoutPage();
  });

  it('Should delete started claim', () => {
    cy.selectOptionFromDropdown({
      menuOption: 'My Account',
      dropdownItem: 'Claims',
    });
    claimId = fnol.getClaimIdFromLocalStorage();
    fnol.deleteClaimFromDialog(claimId);
  });
});
