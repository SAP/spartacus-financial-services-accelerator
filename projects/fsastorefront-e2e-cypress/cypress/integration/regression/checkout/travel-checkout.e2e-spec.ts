import * as register from '../../../helpers/register';
import { donnaMooreUser } from '../../../sample-data/users';
import * as travelCheckout from '../../../helpers/checkout/travel/travel-checkout';

context('Travel Insurance Checkout', () => {
  before(() => {
    register.login(donnaMooreUser.email, donnaMooreUser.password);
    cy.wait(1000);
    cy.visit('/');
  });

  describe('Checkout', () => {
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
  });
});
