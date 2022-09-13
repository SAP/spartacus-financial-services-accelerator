import { registrationUser } from '../../sample-data/users';
import * as register from '../../helpers/register';
import * as auto from '../../helpers/checkout/insurance/auto';
import * as autoIntegration from '../../helpers/checkout/insurance/auto-integrations';
import * as checkout from '../../helpers/checkout/checkout-steps';
import { selectPaymentMethodInvoice } from '../../helpers/checkout/insurance/payment';
import * as myPolicies from '../../helpers/my-account/policies';
import * as fnol from '../../helpers/fnol';
import testFilters from '../../support/filters';

Cypress.config('defaultCommandTimeout', 500000);

testFilters([''], () => {
  context('Auto Gold Checkout with FNOL', () => {
    before(() => {
      cy.visit('/');
    });

    it('Should register a new user', () => {
      register.registerUser(registrationUser);
      register.login(registrationUser.email, registrationUser.password);
    });

    it('Should complete first auto step without additional drivers', () => {
      checkout.waitConsent();
      checkout.startInsuranceCheckout('Auto');
      auto.populateAutoAnnuallyBMW();
      auto.populateMainDriverInfo();
      cy.get('[name=noOfDrivers]').select('0');
      checkout.clickContinueButton();
    });

    it('Should check comparison table and select Gold Product', () => {
      autoIntegration.selectAutoGold();
      auto.checkOptionalProductsGold();
      checkout.clickContinueButton();
    });

    it('Should populate personal details page', () => {
      checkout.checkPersonalDetailsPage();
      auto.populatePersonalDetails();
      auto.populateVehicleDetails();
      auto.populateMainDriverData();
      checkout.clickContinueButton();
    });

    it('Should bound a quote', () => {
      checkout.checkCheckoutStep('Your Auto Insurance', '7');
      checkout.checkProgressBarInsurance();
      checkout.checkAccordions('quoteReviewWithoutOptional');
      checkout.clickContinueButton();
      checkout.ConfirmBindQuote();
      checkout.checkAccordions('quoteReviewWithoutOptional');
      checkout.clickContinueButton();
    });

    it('Should select default payment details and place an order', () => {
      selectPaymentMethodInvoice();
      checkout.clickContinueButton();
      checkout.placeOrderOnFinalReview();
      checkout.checkOrderConfirmation();
    });

    it('Should check my policies and policy details page', () => {
      //waiting for replication process to be completed
      cy.wait(200000);
      myPolicies.checkMyPoliciesPage();
      autoIntegration.startFnolCheckout('Gold');
    });

    it('Should check and populate Incident Information page', () => {
      autoIntegration.waitForIncidentInfoForm();
      fnol.checkFNOLCheckoutPage();
      fnol.checkFNOLSteps();
      fnol.populateIncidentInformationStep('Collision');
      checkout.clickContinueButton();
    });

    it('Should check and populate Incident Report page', () => {
      fnol.populateIncidentReportStep();
      fnol.checkDownloadButton();
      checkout.checkBackAndContinueButtons();
      checkout.clickContinueButton();
      autoIntegration.waitForGeneralInfoForm();
    });

    it('Should check and populate General Information page', () => {
      fnol.checkFNOLCheckoutPage();
      fnol.populateGeneralInformationStep();
      checkout.clickContinueButton();
    });

    it('Should check summary page', () => {
      fnol.checkFNOLCheckoutPage();
      fnol.checkSummaryPage();
      cy.get('.action-button').should('contain.text', 'Back');
      cy.get('.primary-button').should('contain.text', 'Submit');
    });

    it('Should check information in accordions on summary page', () => {
      autoIntegration.checkIncidentInformationAccordion('AutoCollision');
      fnol.checkIncidentReportAccordion('3');
      fnol.checkGeneralInformationAccordion();
      cy.get('.primary-button').should('be.visible');
      cy.get('.primary-button').contains('Submit').click({ force: true });
    });

    it('Should check claim confirmation page', () => {
      fnol.checkConfirmationPage();
      //replication proces to be completed
      cy.wait(3000);
    });

    it('Should check claim replication', () => {
      cy.selectOptionFromMyAccount({
        dropdownItem: 'Claims',
      });
      fnol.checkClaimReplication('Collision');
    });
  });
});
