import { registrationUserWithoutPhone } from '../../../sample-data/users';
import * as register from '../../../helpers/register';
import * as homeowners from '../../../helpers/checkout/insurance/homeowners-checkout';
import * as checkout from '../../../helpers/checkout/checkoutSteps';
import {
  addPaymentMethod,
  selectPaymentMethod,
} from '../../../helpers/checkout/insurance/payment';
import { checkMyPoliciesPage } from '../../../helpers/my-account/policies';

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
    checkout.checkProgressBarInsurance('Your Homeowners Insurance');
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
    checkout.checkInsuranceComparisonPage('Your Homeowners Insurance', '2');
    homeowners.checkHomeownersComparisonTable();
    homeowners.selectHomeownersAnnually();
  });

  it('Should check add options page', () => {
    homeowners.checkOptionalProducts();
    homeowners.checkMiniCartHomeowners();
    checkout.clickContinueButton();
  });

  it('Should populate personal details page', () => {
    checkout.checkPersonalDetailsPageInsurance();
    checkout.populatePersonalDetailsPage();
    checkout.clickContinueButton();
  });

  it('Should check quote review page', () => {
    checkout.checkProgressBarInsurance('Homeowners');
    homeowners.checkMiniCartHomeowners();
    checkout.checkAccordions('propertyQuoteReview');
    addPaymentMethod(registrationUserWithoutPhone.email);
    checkout.clickContinueButton();
    checkout.ConfirmBindQuote();
  });

  it('Select default payment details', () => {
    selectPaymentMethod();
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
  });
});
