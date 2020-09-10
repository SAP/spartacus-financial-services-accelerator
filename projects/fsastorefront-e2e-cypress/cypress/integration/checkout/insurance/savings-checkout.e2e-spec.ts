import * as checkout from '../../../helpers/checkout/checkoutSteps';
import * as savings from '../../../helpers/checkout/insurance/savings-checkout';
import { registrationUserWithoutPhone } from '../../../sample-data/users';
import * as register from '../../../helpers/register';
import {
  addPaymentMethod,
  selectPaymentMethod,
} from '../../../helpers/checkout/insurance/payment';
import * as policies from '../../../helpers/my-account/policies';
import * as premiumCalendar from '../../../helpers/my-account/myAccountPages';
import { waitForCreateAsset } from '../../../helpers/generalHelpers';

let cartId;
context('Savings Insurance Checkout', () => {
  before(() => {
    cy.visit('/');
  });

  it('Should be able to register user without phone number', () => {
    register.registerUser(registrationUserWithoutPhone);
    register.login(
      registrationUserWithoutPhone.email,
      registrationUserWithoutPhone.password
    );
  });

  it('Should start Savings checkout', () => {
    checkout.startInsuranceCheckout('Savings');
  });

  it('Should populate first step', () => {
    checkout.checkCheckoutStep('Your Savings Insurance', '7');
    checkout.checkProgressBarInsurance();
    checkout.checkFirstCheckoutStep('Coverage');
    savings.populateCoverageInformation();
    checkout.clickContinueButton();
  });

  it('Should check comparison table', () => {
    checkout.checkCheckoutStep('Your Savings Insurance', '7');
    savings.checkComparisonPage();
    savings.checkSavingsComparisonTable();
    const addToCart = waitForCreateAsset('carts', 'addToCart');
    savings.selecBalancedDeal();
    cy.wait(`@${addToCart}`).then(result => {
      cartId = (<any>result.response.body).code;
    });
  });

  it('Should check add options page', () => {
    checkout.checkCheckoutStep('Your Savings Insurance', '7');
    savings.checkOptionalProducts();
    //TODO: check mini cart
    checkout.clickContinueButton();
  });

  it('Should populate personal details page', () => {
    checkout.checkCheckoutStep('Your Savings Insurance', '7');
    checkout.checkPersonalDetailsPage();
    checkout.populatePersonalDetailsPage();
    savings.populateSavingsSpecific();
    checkout.clickContinueButton();
  });

  it('Should check quote review page', () => {
    checkout.checkCheckoutStep('Your Savings Insurance', '7');
    checkout.checkProgressBarInsurance();
    //TODO: check mini cart
    checkout.checkAccordions('savingsQuoteReview');
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
    checkout.checkAccordions('savingsFinalReview');
    checkout.checkOrderConfirmation();
  });

  it('Check my policies page', () => {
    policies.checkMyPoliciesPage();
    savings.checkSavingsPolicy();
  });

  it('Check policy details page', () => {
    policies.clickOnPolicyDetails();
    checkout.checkAccordions('savingsPolicyDetails');
    savings.checkInvestmentDetails();
  });

  it('Check premium calendar', () => {
    cy.selectOptionFromDropdown({
      menuOption: 'My Account',
      dropdownItem: 'Premium Calendar',
    });
    premiumCalendar.checkPageContent();
    premiumCalendar.checkPremiumCalendarTable();
    premiumCalendar.checkSavingsData();
  });
});
