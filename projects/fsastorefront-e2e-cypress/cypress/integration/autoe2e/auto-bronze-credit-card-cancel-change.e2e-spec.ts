import { registrationUser } from '../../sample-data/users';
import * as register from '../../helpers/register';
import * as auto from '../../helpers/checkout/insurance/auto';
import * as autoIntegration from '../../helpers/checkout/insurance/auto-integrations';
import * as checkout from '../../helpers/checkout/checkout-steps';
import * as myPolicies from '../../helpers/my-account/policies';
import * as changeRequest from '../../helpers/change-requests';
import * as dayjs from 'dayjs';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';
import testFilters from '../../support/filters';

dayjs.extend(customParseFormat);

Cypress.config('defaultCommandTimeout', 500000);
const currentDate = dayjs().format('DD/MM/YYYY');

testFilters([''], () => {
  context('Auto Bronze Checkout with Cancel change', () => {
    before(() => {
      cy.visit('/');
    });

    it('Should register a new user', () => {
      register.registerUser(registrationUser);
      register.login(registrationUser.email, registrationUser.password);
    });

    it('Should complete first auto step with two additional drivers', () => {
      checkout.waitConsent();
      checkout.startInsuranceCheckout('Auto');
      auto.populateAutoAnnuallyTesla();
      auto.populateMainDriverInfo();
      cy.get('[name=noOfDrivers]').select('2');
      auto.populateAdditionalDriverInfo();
      auto.populateSecondAdditionalDriverInfo();
      checkout.clickContinueButton();
    });

    it('Should check comparison table and select main product', () => {
      autoIntegration.selectAutoBronze();
      auto.checkOptionalProductsBronze();
      checkout.clickContinueButton();
    });

    it('Should populate personal details page', () => {
      checkout.checkCheckoutStep('Your Auto Insurance', '7');
      checkout.checkPersonalDetailsPage();
      auto.populatePersonalDetails();
      auto.populateVehicleDetails();
      auto.populateMainDriverData();
      auto.populateAdditionalData();
      auto.populateAdditionalDriver2ata();
      checkout.clickContinueButton();
    });

    it('Should bound a quote', () => {
      checkout.checkCheckoutStep('Your Auto Insurance', '7');
      checkout.checkProgressBarInsurance();
      checkout.checkAccordions('generalQuoteAccordions');
      checkout.clickContinueButton();
      checkout.ConfirmBindQuote();
      checkout.checkAccordions('generalQuoteAccordions');
      checkout.clickContinueButton();
    });

    it('Select default payment details and place an order', () => {
      checkout.populatePaymentCreditCard();
      cy.get('.btn-primary').contains('Continue').click();
      checkout.placeOrderOnFinalReview();
      checkout.checkOrderConfirmation();
    });

    it('Should check my policies and policy details page', () => {
      //waiting for replication process to be completed
      cy.wait(200000);
      myPolicies.checkMyPoliciesPage();
      autoIntegration.checkReplicatedPolicy('Bronze');
      cy.get('.heading-headline').should('contain.text', 'Auto Bronze Policy');
    });

    it('Should cancel change policy request', () => {
      changeRequest.startChangeMileage();
      checkout.waitForChangeMileage();
      //check change car details - first step
      changeRequest.checkChangeMileageSteps();
      cy.get('[name="vehicleAnnualMileage"]').type('80000');
      checkout.clickContinueButton();
      //check change preview - cancel
      changeRequest.checkChangeMileageSteps();
      cy.get('.offset-1').contains(currentDate);
      cy.get('.action-button').should('contain', 'Cancel').click();
      //check user is redirected to policy details page
      cy.get('.heading-headline').should('contain.text', 'Auto Bronze Policy');
    });
  });
});
