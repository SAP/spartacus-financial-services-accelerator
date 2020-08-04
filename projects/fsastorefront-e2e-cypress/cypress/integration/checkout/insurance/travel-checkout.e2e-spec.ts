import * as register from '../../../helpers/register';
import * as travelCheckout from '../../../helpers/checkout/insurance/travel-checkout';
import { registrationUser } from '../../../sample-data/users';
import * as checkout from '../../../helpers/checkout/checkoutSteps';
import {
  addPaymentMethod,
  selectPaymentMethod,
} from '../../../helpers/checkout/insurance/payment';
import { checkMyPoliciesPage } from '../../../helpers/my-account/policies';
import { clickContinueButton } from '../../../helpers/checkout/checkoutSteps';
import * as fnol from '../../../helpers/fnolCheckout';
import { waitForcreateCart } from '../../../helpers/generalHelpers';

let cartId;
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
      checkout.checkCheckoutStep('Your Travel Insurance', '7');
      checkout.checkProgressBarInsurance();
      travelCheckout.populateInsuranceInfoForm();
    });

    it('Add main product to the cart', () => {
      travelCheckout.checkTravelComparisonTable();
      const addToCart = waitForcreateCart('carts', 'addToCart');
      travelCheckout.selectSingleBudgetPlan();
      cy.wait(`@${addToCart}`).then(response => {
        const body = <any>response.response.body;
        cartId = body.code;
      });
    });

    it('Add optional product to the cart', () => {
      travelCheckout.checkOptionalProductsAndPick();
      clickContinueButton();
    });

    it('Populate personal details and add payment method', () => {
      checkout.populatePersonalDetailsPage();
      clickContinueButton();
      fnol.waitForQuoteReviewPage();
      clickContinueButton();
      addPaymentMethod(registrationUser.email, cartId);
      checkout.ConfirmBindQuote();
    });

    it('Check mini cart on quote review page', () => {
      checkout.checkAccordions('generalQuoteAccordions');
      //travelCheckout.checkTravelMiniCart();
    });

    it('Select default payment details', () => {
      selectPaymentMethod();
    });

    it('Place order on final review pages', () => {
      checkout.placeOrderOnFinalReview();
    });

    it('Check order confirmation', () => {
      checkout.checkOrderConfirmation();
      checkout.checkAccordions('travelFinalReview');
    });

    it('Check my policies page', () => {
      checkMyPoliciesPage();
      cy.get('.title').contains('Travel Insurance');
    });
  });
});
