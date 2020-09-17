import { registrationUserWithoutPhone } from '../../../sample-data/users';
import * as register from '../../../helpers/register';
import * as renters from '../../../helpers/checkout/insurance/renters-checkout';
import * as checkout from '../../../helpers/checkout/checkoutSteps';
import {
  addPaymentMethod,
  selectPaymentMethod,
} from '../../../helpers/checkout/insurance/payment';
import { checkMyPoliciesPage } from '../../../helpers/my-account/policies';
import { waitForCreateAsset } from '../../../helpers/generalHelpers';

let cartId;
context('Renters Checkout', () => {
  before(() => {
    cy.visit('/');
  });

  it('Should be able to register user without phone number', () => {
    register.registerUser(registrationUserWithoutPhone);
    register.loginInUser(
      registrationUserWithoutPhone.email,
      registrationUserWithoutPhone.password
    );
  });

  it('Should open renters category page', () => {
    checkout.startInsuranceCheckout('Renters');
  });

  it('Should populate first page in checkout', () => {
    checkout.checkCheckoutStep('Your Renters Insurance', '7');
    checkout.checkProgressBarInsurance();
    checkout.checkFirstCheckoutStep('Renters');
    checkout.populatePropertyDetails();
    checkout.populateContentsCover();
    checkout.populatePropertyAddress();
    checkout.clickContinueButton();
  });

  it('Should check comparison table', () => {
    checkout.checkCheckoutStep('Your Renters Insurance', '7');
    checkout.checkInsuranceComparisonPage('2');
    renters.checkRentersComparisonTable();
    const addToCart = waitForCreateAsset('carts', 'addToCart');
    renters.selectRentersMonthly();
    cy.wait(`@${addToCart}`).then(result => {
      cartId = (<any>result.response.body).code;
    });
  });

  it('Should check add options page', () => {
    renters.checkOptionalProducts();
    //renters.checkMiniCartRenters();
    checkout.removeOptionalProduct('Bicycles Cover');
    //renters.checkMiniCartRentersRemovedProduct();
    checkout.clickContinueButton();
  });

  it('Should populate personal details page', () => {
    checkout.checkPersonalDetailsPage();
    checkout.populatePersonalDetailsPage();
  });

  it('Should check quote review page', () => {
    checkout.checkCheckoutStep('Your Renters Insurance', '7');
    checkout.checkProgressBarInsurance();
    //renters.checkMiniCartRentersRemovedProduct();
    checkout.clickContinueButton();
    checkout.checkAccordions('generalQuoteAccordions');
    addPaymentMethod(registrationUserWithoutPhone.email, cartId);
    checkout.clickContinueButton();
    checkout.ConfirmBindQuote();
    checkout.clickContinueButton();
  });

  it('Select default payment details', () => {
    selectPaymentMethod();
  });

  it('Place order on final review page', () => {
    checkout.placeOrderOnFinalReview();
  });

  it('Check order confirmation', () => {
    checkout.checkAccordions('rentersFinalReview');
    checkout.checkOrderConfirmation();
  });

  it('Check my policies page', () => {
    checkMyPoliciesPage();
    renters.checkRentersPolicy();
  });

  it('Should validate phone number and check empty my account pages', () => {
    register.validatePhoneNumber('');
    checkout.checkMyAccountEmptyPages('Claims', 'You have no Claims!');
    checkout.checkMyAccountEmptyPages(
      'Quotes & Applications',
      'You have no Quotes or Applications!'
    );
  });
});
