import * as life from '../../../helpers/checkout/insurance/life-checkout';
import * as register from '../../../helpers/register';
import { registrationUser } from '../../../sample-data/users';
import * as checkout from '../../../helpers/checkout/checkoutSteps';
import { clickContinueButton } from '../../../helpers/checkout/checkoutSteps';
import {
  addPaymentMethod,
  selectPaymentMethod,
} from '../../../helpers/checkout/insurance/payment';
import { checkMyPoliciesPage } from '../../../helpers/my-account/policies';

context('Life Insurance Checkout', () => {
  before(() => {
    cy.visit('/');
  });

  describe('Life Checkout', () => {
    it('Should open life category page', () => {
      cy.selectOptionFromDropdown({
        menuOption: 'Insurance',
        dropdownItem: 'Life',
        nextPageUrlPart: 'Insurance',
      });

      cy.get('.enriched-banner-styled-text')
        .eq(0)
        .contains(' Get a Quote')
        .click();
    });

    it('Should check progress bar', () => {
      checkout.checkProgressBarInsurance('Your Life Insurance');
    });

    it('Should populate first checkout step', () => {
      life.populateFirstStep();
      clickContinueButton();
    });

    it('Should check comparison table and select Basic as main product', () => {
      life.checkLifeComparisonTable();
      life.selectBasicLifeProduct();
    });

    it('Should check comparison table and add Payment protection', () => {
      life.checkOptionalProductsAddRenewalOption();
      life.checkLifeBasicMiniCart();
      clickContinueButton();
    });

    it('Should check login page and register a new user', () => {
      register.populateRegistrationForm(registrationUser);
      register.loginInUser(registrationUser.email, registrationUser.password);
    });

    it('Add payment method for user', () => {
      addPaymentMethod(registrationUser.email);
    });

    it('Should populate personal details page and continue', () => {
      checkout.populatePersonalDetailsPage();
      checkout.checkProgressBarInsurance('Your life Insurance');
      clickContinueButton();
    });

    it('Should check quote review page', () => {
      checkout.checkProgressBarInsurance('Your life Insurance');
      life.checkLifeBasicMiniCart();
      checkout.checkAccordions('lifeQuoteReview');
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
      checkout.checkAccordions('lifeFinalReview');
      checkout.checkOrderConfirmation();
    });

    it('Check my policies page', () => {
      checkMyPoliciesPage();
      cy.get('.title').contains('Life Insurance');
    });
  });
});
