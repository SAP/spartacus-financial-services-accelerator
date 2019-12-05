import { donnaMooreUser } from '../../sample-data/users';
import * as register from '../../helpers/register';
import * as FNOL from '../../helpers/FNOL';

context('FNOL for sample data user', () => {
  before(() => {
    cy.visit('/');
    register.login(donnaMooreUser.email, donnaMooreUser.password);
    cy.wait(1000);
  });

  describe('Checks FNOL process', () => {
    it('Should start a FNOL checkout', () => {
      FNOL.openMyAccountPolicySection();
      FNOL.selectAutoPolicyForFNOL();
    });

    it('Should check and populate Incident Information page', () => {
      FNOL.checkFNOLCheckoutPage();
      FNOL.checkFNOLSteps();
      FNOL.populateIncidentInformationStep();
      //will be replaced with function once current account test is merged
      cy.get('button.primary-button').click();
      cy.wait(1000);
      cy.reload();
    });

    it('Should check and populate Incident Report page', () => {
      FNOL.checkFNOLCheckoutPage();
      FNOL.populateIncidentReportStep();
    });

    it('Should check and populate General Information page', () => {
      FNOL.populateGeneralInformationStep();
    });
  });
});
