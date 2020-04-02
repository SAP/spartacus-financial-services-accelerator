import * as register from '../../../helpers/register';
import * as travelCheckout from '../../../helpers/checkout/insurance/travel-checkout';
import { registrationUser } from '../../../sample-data/users';
import * as checkout from '../../../helpers/checkout/checkoutSteps';
import {
  addPaymentMethod,
  selectPaymentMethod,
} from '../../../helpers/checkout/insurance/payment';
import { checkMyPoliciesPage } from '../../../helpers/my-account/policies';

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

    it('Add optional product to the cart', () => {
      travelCheckout.checkOptionalProductsAndPick();
    });

    it('Populate personal details and add payment method', () => {
      checkout.populatePersonalDetailsPage();
      addPaymentMethod(registrationUser.email);
      travelCheckout.populateAgeOnPersonalDetails();
    });

    it('Check mini cart on quote review page', () => {
      checkout.checkQuoteReviewAccordions('travel');
      travelCheckout.checkQuoteReviewMiniCart();
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
      checkMyPoliciesPage();
      cy.get('.info-card-caption').contains('Travel Insurance');
    });
  });
});
