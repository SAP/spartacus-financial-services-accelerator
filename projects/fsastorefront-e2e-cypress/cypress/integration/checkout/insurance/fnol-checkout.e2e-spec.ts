import { donnaMooreUser } from '../../../sample-data/users';
import * as register from '../../../helpers/register';
import * as fnol from '../../../helpers/fnolCheckout';
import * as buttons from '../../../helpers/checkout/buttons';
import { importAutoPolicy } from '../../../helpers/payloads';

context('FNOL for sample data user', () => {
  before(() => {
    cy.visit('/');
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
    buttons.clickContinueButton();
  });

  it('Should check claim is created', () => {
    cy.wait(1000);
    cy.selectOptionFromDropdown({
      menuOption: 'My Account',
      dropdownItem: 'Claims',
    });
    fnol.checkClaimsPage();
    cy.get('.info-card')
      .last()
      .within(() => {
        fnol.checkOpenClaimContent();
        buttons.clickResumeButton();
      });
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
  });

  it('Should start a claim checkout from homepage', () => {
    cy.get('cx-page-slot.SiteLogo').click();

    fnol.startClaimFromHomepage();
    fnol.checkFnolEntryPage();
    fnol.selectPolicyOnEntryPage();
    buttons.clickContinueButton();
    fnol.checkFNOLCheckoutPage();
  });
});
