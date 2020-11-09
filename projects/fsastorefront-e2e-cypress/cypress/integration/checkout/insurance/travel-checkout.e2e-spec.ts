import * as register from '../../../helpers/register';
import * as travelCheckout from '../../../helpers/checkout/insurance/travel-checkout';
import {
  registrationUser,
  registrationUserWithoutPhone,
} from '../../../sample-data/users';
import * as checkout from '../../../helpers/checkout/checkoutSteps';
import {
  addPaymentMethod,
  selectPaymentMethod,
} from '../../../helpers/checkout/insurance/payment';
import { checkMyPoliciesPage } from '../../../helpers/my-account/policies';
import { waitForCreateAsset } from '../../../helpers/generalHelpers';

let cartId;
context('Travel Insurance Checkout', () => {
  before(() => {
    cy.visit('/');
    register.registerUser(registrationUser);
    register.login(registrationUser.email, registrationUser.password);
    checkout.waitForHomepage();
  });

  it('Should open travel category page', () => {
    checkout.startInsuranceCheckout('Travel');
  });

  it('Should populate insurance information form', () => {
    checkout.checkCheckoutStep('Your Travel Insurance', '7');
    checkout.checkProgressBarInsurance();
    travelCheckout.populateInsuranceInfoForm();
  });

  it('Add main product to the cart', () => {
    const addToCart = waitForCreateAsset('carts', 'addToCart');
    travelCheckout.checkTravelComparisonTable();
    travelCheckout.selectSingleBudgetPlan();
    cy.wait(`@${addToCart}`).then(result => {
      cartId = (<any>result.response.body).code;
      addPaymentMethod(registrationUser.email, cartId);
    });
  });

  it('Add optional product to the cart', () => {
    travelCheckout.checkOptionalProductsAndPick();
    checkout.clickContinueButton();
  });

  it('Populate personal details', () => {
    checkout.populatePersonalDetailsPage();
    travelCheckout.checkTravelMiniCart();
    checkout.clickContinueButton();
  });

  it('Should bound a quote', () => {
    checkout.checkCheckoutStep('Your Travel Insurance', '7');
    checkout.checkProgressBarInsurance();
    travelCheckout.checkTravelMiniCart();
    checkout.checkAccordions('generalQuoteAccordions');
    checkout.clickContinueButton();
    checkout.ConfirmBindQuote();
    checkout.clickContinueButton();
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
