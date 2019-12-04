import * as register from '../../../helpers/register';
import * as travelCheckout from '../../../helpers/checkout/travel/travel-checkout';
import { registrationUser } from './../../../sample-data/users';

context('Travel Insurance Checkout', () => {
  before(() => {
    cy.visit('/');
    register.registerUser(registrationUser);
    cy.wait(3000);
    register.login(registrationUser.email, registrationUser.password);
    cy.wait(1500);
  });

  describe('Retrieve Travel Quote', () => {
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
      cy.wait(1000);
    });

    it('Populate personal detials', () => {
      travelCheckout.populatePersonalDetailsForm();
      cy.wait(1000);
    });

    it('Check mini cart on quote review page', () => {
      travelCheckout.checkQuoteReview();
    });

    it('Select default payment details', () => {
      travelCheckout.checkPaymentPage();
    });

    it('Place order on final review page', () => {
      travelCheckout.placeOrderOnFinalReivew();
    });

    it('Check order confirmation', () => {
      travelCheckout.checkOrderConfirmation();
    });

    it('Check my policies page', () => {
      travelCheckout.checkMyPoliciesPage();
    });
  });
});
