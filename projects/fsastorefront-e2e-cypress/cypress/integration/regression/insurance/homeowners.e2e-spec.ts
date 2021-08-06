import { registrationUserWithoutPhone } from '../../../sample-data/users';
import * as register from '../../../helpers/register';
import * as homeowners from '../../../helpers/checkout/insurance/homeowners-checkout';
import * as checkout from '../../../helpers/checkout/checkout-steps';
import * as payment from '../../../helpers/checkout/insurance/payment';
import * as myAccount from '../../../helpers/my-account/my-account';

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

  it('Should open homeowners category page', () => {
    checkout.waitConsent();
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
    checkout.checkProgressBarInsurance();
    checkout.checkInsuranceComparisonPage('2');
    homeowners.checkHomeownersComparisonTable();
    homeowners.selectHomeownersAnnually();
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

  it('Should validate phone number', () => {
    register.validatePhoneNumber('');
    checkout.checkMyAccountEmptyPages(
      'Quotes & Applications',
      'You have no Quotes or Applications!'
    );
  });

  it('Should empty my account policies and order history page', () => {
    checkout.checkMyAccountEmptyPages('Policies', 'You have no Policies!');
    myAccount.orderHistoryPage();
    myAccount.checkOrderHistoryContent('€491.25');
  });
});
