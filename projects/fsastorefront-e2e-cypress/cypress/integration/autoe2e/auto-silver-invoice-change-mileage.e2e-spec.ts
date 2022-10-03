import { registrationUser } from '../../sample-data/users';
import * as register from '../../helpers/register';
import * as auto from '../../helpers/checkout/insurance/auto';
import * as autoIntegration from '../../helpers/checkout/insurance/auto-integrations';
import * as checkout from '../../helpers/checkout/checkout-steps';
import { selectPaymentMethodInvoice } from '../../helpers/checkout/insurance/payment';
import * as myPolicies from '../../helpers/my-account/policies';
import * as changeRequest from '../../helpers/change-requests';
import testFilters from '../../support/filters';

Cypress.config('defaultCommandTimeout', 500000);

testFilters([''], () => {
  context('Auto Silver Checkout with change mileage', () => {
    before(() => {
      cy.visit('/');
    });

    it('Should register a new user', () => {
      register.registerUser(registrationUser);
      register.login(registrationUser.email, registrationUser.password);
    });

    it('Should complete first auto step with additional driver', () => {
      checkout.waitConsent();
      checkout.startInsuranceCheckout('Auto');
      auto.populateAutoMonthlyAudi();
      auto.populateMainDriverInfo();
      cy.get('[name=noOfDrivers]').select('1');
      auto.populateAdditionalDriverInfo();
      checkout.clickContinueButton();
    });

    it('Should check comparison table and select main product', () => {
      autoIntegration.selectAutoSilver();
      auto.checkOptionalProductsSilver();
      checkout.clickContinueButton();
    });

    it('Should populate personal details page', () => {
      checkout.checkPersonalDetailsPage();
      auto.populatePersonalDetails();
      auto.populateVehicleDetails();
      auto.populateMainDriverData();
      auto.populateAdditionalData();
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
      autoIntegration.checkReplicatedPolicy('Silver');
      cy.get('.heading-headline').should('contain.text', 'Auto Silver Policy');
    });

    it('Should complete change mileage checkout', () => {
      changeRequest.startChangeMileage();
      checkout.waitForChangeMileage();
      //check change car details - first step
      changeRequest.checkChangeMileageSteps();
      changeRequest.enterNewMileage();
      checkout.clickContinueButton();
      //check change preview - second step
      changeRequest.checkChangeMileageSteps();
      cy.get('.primary-button').should('contain', 'Submit').click();
      changeRequest.checkChangeRequestConfirmation();
    });
  });
});
