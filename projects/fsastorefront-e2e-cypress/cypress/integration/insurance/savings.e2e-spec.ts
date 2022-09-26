import * as checkout from '../../helpers/checkout/checkout-steps';
import * as savings from '../../helpers/checkout/insurance/savings-checkout';
import { registrationUserWithoutPhone } from '../../sample-data/users';
import * as register from '../../helpers/register';
import * as policies from '../../helpers/my-account/policies';
import * as premiumCalendar from '../../helpers/my-account/my-account';
import testFilters from '../../support/filters';
import * as inbox from '../../helpers/my-account/inbox';
import * as dayjs from 'dayjs';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

const todaysDate = dayjs().format('DD MMM YYYY');

testFilters([''], () => {
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
      checkout.checkMyAccountEmptyPages(
        'Premium Calendar',
        'You have no premiums awaiting payment'
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
      checkout.checkProgressBarInsurance();
      savings.checkComparisonPage();
      savings.checkSavingsComparisonTable();
      savings.selecBalancedDeal();
    });

    it('Should check add options page', () => {
      checkout.checkCheckoutStep('Your Savings Insurance', '7');
      savings.checkOptionalProductsBalancedDeal();
      savings.checkMiniCart();
      checkout.clickContinueButton();
    });

    it('Should populate personal details page', () => {
      checkout.checkCheckoutStep('Your Savings Insurance', '7');
      checkout.checkPersonalDetailsPage();
      savings.checkMiniCart();
      checkout.populatePersonalDetailsPage();
      savings.populateSavingsSpecific();
      checkout.clickContinueButton();
    });

    it('Should check quote review page', () => {
      checkout.checkCheckoutStep('Your Savings Insurance', '7');
      checkout.checkProgressBarInsurance();
      savings.checkMiniCart();
      checkout.checkAccordions('savingsQuoteReview');
      checkout.clickContinueButton();
      checkout.ConfirmBindQuote();
      checkout.checkAccordions('savingsQuoteReview');
      checkout.clickContinueButton();
    });

    it('Should select default payment details', () => {
      checkout.populatePaymentCreditCard();
      cy.get('.btn-primary').contains('Continue').click();
    });

    it('Should place an order on final review page', () => {
      checkout.placeOrderOnFinalReview();
    });

    it('Should check order confirmation', () => {
      checkout.checkAccordions('savingsFinalReview');
      checkout.checkOrderConfirmation();
      cy.wait(200000);
    });

    it('Should check my policies page', () => {
      policies.checkMyPoliciesPage();
      savings.checkSavingsPolicy();
    });

    it('Should check policy details page', () => {
      policies.clickOnPolicyDetails();
      checkout.checkAccordions('savingsPolicyDetails');
      savings.checkInvestmentDetails();
    });

    it('Check premium calendar', () => {
      cy.selectOptionFromMyAccount({
        dropdownItem: 'Premium Calendar',
      });
      premiumCalendar.checkPageContent();
      premiumCalendar.checkPremiumCalendarTable();
      premiumCalendar.checkSavingsData();
    });

    it('Should check inbox page', () => {
      inbox.clickOnInbox();
      inbox.checkInboxComponets();
      inbox.checkSavingsTabs();
      inbox.checkGeneralTab();
      inbox.checkSavingsMessage();
    });
  });
});
