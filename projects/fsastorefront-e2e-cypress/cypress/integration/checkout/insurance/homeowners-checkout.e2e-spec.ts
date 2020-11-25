import { registrationUserWithoutPhone } from '../../../sample-data/users';
import * as register from '../../../helpers/register';
import * as homeowners from '../../../helpers/checkout/insurance/homeowners-checkout';
import * as checkout from '../../../helpers/checkout/checkoutSteps';
import * as payment from '../../../helpers/checkout/insurance/payment';
import { checkMyPoliciesPage } from '../../../helpers/my-account/policies';
import { waitForCreateAsset } from '../../../helpers/generalHelpers';

let cartId;
context('Homeowners Checkout', () => {
  before(() => {
    cy.visit('/login');
  });

  it('Should be able to register user without phone number', () => {
    register.registerUser(registrationUserWithoutPhone);
    register.login(
      registrationUserWithoutPhone.email,
      registrationUserWithoutPhone.password
    );
  });

  it('Should empty my account policies page', () => {
    checkout.checkMyAccountEmptyPages('Policies', 'You have no Policies!');
  });

  it('Should open homeowners category page', () => {
    checkout.startInsuranceCheckout('Homeowners');
  });

  it('Should populate first page in checkout', () => {
    checkout.checkCheckoutStep('Your Homeowners Insurance', '7');
    checkout.checkProgressBarInsurance();
    //check page content - first step
    checkout.checkFirstCheckoutStep('Homeowners');
    homeowners.populateHomeownersSpecific();
    checkout.populatePropertyDetails();
    checkout.populateContentsCover();
    checkout.populatePropertyAddress();
    homeowners.populateBuildingCover();
    checkout.clickContinueButton();
  });

  it('Should check comparison table', () => {
    checkout.checkCheckoutStep('Your Homeowners Insurance', '7');
    checkout.checkInsuranceComparisonPage('2');
    homeowners.checkHomeownersComparisonTable();
    const addToCart = waitForCreateAsset('carts', 'addToCart');
    homeowners.selectHomeownersAnnually();
    cy.wait(`@${addToCart}`).then(result => {
      cartId = (<any>result.response.body).code;
    });
  });

  it('Should check add options page', () => {
    homeowners.checkOptionalProducts();
    homeowners.checkMiniCartHomeowners();
    checkout.clickContinueButton();
  });

  it('Should populate personal details page', () => {
    checkout.checkPersonalDetailsPage();
    checkout.populatePersonalDetailsPage();
    checkout.clickContinueButton();
  });

  it('Should check quote review page', () => {
    checkout.checkCheckoutStep('Your Homeowners Insurance', '7');
    checkout.checkProgressBarInsurance();
    homeowners.checkMiniCartHomeowners();
    checkout.checkAccordions('generalQuoteAccordions');
    checkout.clickContinueButton();
    checkout.ConfirmBindQuote();
    checkout.clickContinueButton();
  });

  it('Select default payment details', () => {
    payment.selectPaymentMethodInvoice();
    checkout.clickContinueButton();
  });

  it('Place order on final review page', () => {
    checkout.placeOrderOnFinalReview();
  });

  it('Check order confirmation', () => {
    checkout.checkAccordions('homeownersFinalReview');
    checkout.checkOrderConfirmation();
  });

  it('Check my policies page', () => {
    checkMyPoliciesPage();
    homeowners.checkHomeownersPolicy();
  });

  it('Should validate phone number', () => {
    register.validatePhoneNumber('');
    checkout.checkMyAccountEmptyPages(
      'Quotes & Applications',
      'You have no Quotes or Applications!'
    );
  });
});
