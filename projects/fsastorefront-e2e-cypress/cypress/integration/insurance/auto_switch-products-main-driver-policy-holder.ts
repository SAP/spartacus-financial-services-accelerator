import { registrationUser } from '../../sample-data/users';
import * as register from '../../helpers/register';
import * as auto from '../../helpers/checkout/insurance/auto';
import * as autoIntegration from '../../helpers/checkout/insurance/auto-integrations';
import * as checkout from '../../helpers/checkout/checkout-steps';
import testFilters from '../../support/filters';

testFilters(['smoke'], () => {
  context('Policy Holder is Main Driver with main product switch', () => {
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
      auto.populateAutoAnnuallyBMW();
      auto.populateMainDriverInfo();
      cy.get('[name=noOfDrivers]').select('0');
      cy.get('#customerIdtrue').check();
      checkout.clickContinueButton();
    });

    it('Should check comparison table and select main product', () => {
      autoIntegration.selectAutoSilver();
      auto.addOptionalProductsSilver();
      checkout.clickContinueButton();
    });

    it('Should return to first step and change date of birth', () => {
      cy.get('span').should(
        'contain.text',
        'Please return to the first step of checkout: “Choose a cover” and check your Date of birth. Policy holder and main driver should have the same Date of birth.'
      );
      cy.get('cx-fs-enriched-responsive-banner').should('be.visible');
      cy.get('cx-fs-category-carousel').should('be.visible');
      checkout.startInsuranceCheckout('Auto');
      auto.updateDateOfBirth();
      checkout.clickContinueButton();
    });

    it('Change main product from silver to bronze', () => {
      autoIntegration.selectAutoBronze();
      auto.checkOptionalProductsBronze();
      checkout.clickContinueButton();
      auto.populatePersonalDetails();
      auto.populateVehicleDetails();
      cy.get('[name=mainDriverLicenceNumber]').type('BG-234-YU');
      checkout.clickContinueButton();
    });

    it('Should bound a quote', () => {
      checkout.checkCheckoutStep('Your Auto Insurance', '7');
      checkout.checkProgressBarInsurance();
      checkout.checkAccordions('generalQuoteAccordions');
      checkout.checkBackAndContinueButtons();
      checkout.clickContinueButton();
      checkout.ConfirmBindQuote();
      checkout.checkAccordions('generalQuoteAccordions');
      checkout.clickContinueButton();
    });

    it('Select default payment details and place an order', () => {
      checkout.populatePaymentCreditCard();
      checkout.clickContinueButton();
      checkout.placeOrderOnFinalReview();
      checkout.checkOrderConfirmation();
    });
  });
});
