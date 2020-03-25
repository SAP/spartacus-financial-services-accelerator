import * as register from '../../../helpers/register';
import * as travelCheckout from '../../../helpers/checkout/insurance/travel-checkout';
import { registrationUser } from '../../../sample-data/users';
import * as checkout from '../../../helpers/checkout/checkoutSteps';
import {
  addPaymentMethod,
  selectPaymentMethod,
} from '../../../helpers/checkout/insurance/payment';

context('Travel Insurance Checkout', () => {
  before(() => {
    cy.visit('/');
    register.registerUser(registrationUser);
    register.login(registrationUser.email, registrationUser.password);
  });

  describe('Travel Checkout', () => {
    it('Should open travel category page', () => {
      travelCheckout.openCategoryPage();
    });
    it('Should populate insurance information form', () => {
      travelCheckout.populateInsuranceInfoForm();
    });

    it('Add main product to the cart', () => {
      travelCheckout.checkComparisonAndAddProduct();
    });

    it('Add payment method for user', () => {
      addPaymentMethod(registrationUser.email);
    });

    it('Add optional product to the cart', () => {
      travelCheckout.checkOptionalProductsAndPick();
    });

    it('Populate personal details', () => {
      checkout.populatePersonalDetailsPage();
      travelCheckout.populateAgeOnPersonalDetails();
    });

    it('Check mini cart on quote review page', () => {
      checkout.checkQuoteReviewAccordions('travel');
      travelCheckout.checkQuoteReview();
    });

    it('Select default payment details', () => {
      selectPaymentMethod();
    });

    it('Place order on final review pages', () => {
      checkout.placeOrderOnFinalReview();
    });

    it('Check order confirmation', () => {
      checkout.checkOrderConfirmation();
    });

    it('Check my policies page', () => {
      checkout.checkMyPoliciesPage();
      cy.get('.info-card-caption').contains('Travel Insurance');
    });
  });
});
