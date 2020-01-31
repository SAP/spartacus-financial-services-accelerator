import { donnaMooreUser } from '../../../sample-data/users';
import * as register from '../../../helpers/register';
import * as fnol from '../../../helpers/fnolCheckout';
import * as buttons from '../../../helpers/checkout/buttons';
import { importAutoPolicy } from '../../../helpers/payloads';

context('FNOL for sample data user', () => {
  let claimId;
  before(() => {
    cy.visit('/login');
    register.login(donnaMooreUser.email, donnaMooreUser.password);
    cy.wait(1000);
  });

  it('import auto policy', () => {
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
    buttons.clickContinueButton();
  });

  it('Should check claim is created', () => {
    fnol.checkClaimsPage();
    fnol.checkSpecificClaim(claimId);
  });

  it('Should check user is navigated to first FNOL page', () => {
    fnol.checkFNOLCheckoutPage();
    fnol.checkFNOLSteps();
    cy.get('[name=whatHappened]').select('Breakdown');
    buttons.clickContinueButton();
  });

  it('Should check and populate Incident Report page', () => {
    fnol.checkFNOLCheckoutPage();
    fnol.populateIncidentReportStep();
    buttons.checkBackAndContinueButtons();
    buttons.clickContinueButton();
  });

  it('Should check and populate General Information page', () => {
    fnol.checkFNOLCheckoutPage();
    fnol.populateGeneralInformationStep();
    buttons.clickContinueButton();
  });

  it('Should check summary page', () => {
    fnol.checkFNOLCheckoutPage();
    fnol.checkSummaryPage();
    buttons.checkBackAndContinueButtons();
  });

  it('Should check information in accordions on summary page', () => {
    fnol.checkIncidentInformationAccordion();
    fnol.checkIncidentReportAccordion();
    fnol.checkGeneralInformationAccordion();
    buttons.clickContinueButton();
  });

  it('Should check claim confirmation page', () => {
    fnol.checkConfirmationPage(claimId);
  });

  it('Should start a claim checkout from homepage', () => {
    cy.get('.SiteLogo').click();
    fnol.startClaimFromHomepage();
    fnol.checkFnolEntryPage();
    fnol.selectPolicyOnEntryPage();
    buttons.clickContinueButton();
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
