import { registrationUserWithoutPhone } from '../../../sample-data/users';
import * as register from '../../../helpers/register';
import * as renters from '../../../helpers/checkout/insurance/renters-checkout';
import * as checkout from '../../../helpers/checkout/checkoutSteps';
import {
  addPaymentMethod,
  selectPaymentMethod,
} from '../../../helpers/checkout/insurance/payment';
import { checkMyPoliciesPage } from '../../../helpers/my-account/policies';

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
    checkout.checkProgressBarInsurance('Your Renters Insurance');
    checkout.checkFirstCheckoutStep('Renters');
    checkout.populatePropertyDetails();
    checkout.populateContentsCover();
    checkout.populatePropertyAddress();
    checkout.clickContinueButton();
  });

  it('Should check comparison table', () => {
    checkout.checkInsuranceComparisonPage('Your Renters Insurance', '2');
    renters.checkRentersComparisonTable();
    renters.selectRentersMonthly();
  });

  it('Should check add options page', () => {
    renters.checkOptionalProducts();
    renters.checkMiniCartRenters();
    checkout.removeOptionalProduct('Bicycles Cover');
    renters.checkMiniCartRentersRemovedProduct();
    checkout.clickContinueButton();
  });

  it('Should populate personal details page', () => {
    checkout.checkPersonalDetailsPageInsurance();
    checkout.populatePersonalDetailsPage();
  });

  it('Should check quote review page', () => {
    checkout.checkProgressBarInsurance('Renters');
    renters.checkMiniCartRentersRemovedProduct();
    checkout.clickContinueButton();
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
    checkout.checkAccordions('rentersFinalReview');
    checkout.checkOrderConfirmation();
  });

  it('Check my policies page', () => {
    checkMyPoliciesPage();
    renters.checkRentersPolicy();
  });

  it('Should validate phone number', () => {
    register.validatePhoneNumber('');
    checkout.checkMyAccountEmptyPages('Claims', 'You have no Claims!');
    checkout.checkMyAccountEmptyPages(
      'Quotes & Applications',
      'You have no Quotes and Applications!'
    );
  });
});
