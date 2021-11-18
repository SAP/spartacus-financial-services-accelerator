import * as register from '../../helpers/register';
import { registrationUser } from '../../sample-data/users';
import * as checkout from '../../helpers/checkout/checkout-steps';
import * as banking from '../../helpers/checkout/banking/checkout-banking';
import * as currentAccount from '../../helpers/checkout/banking/current-account';
import * as loan from '../../helpers/checkout/banking/loan';
import * as event from '../../helpers/checkout/insurance/event-checkout';
import * as myAccount from '../../helpers/my-account/my-account';
import testFilters from '../../support/filters';

testFilters([''], () => {
  context('Retrieving Banking and Insurance Quotes ', () => {
    before(() => {
      cy.visit('/');
    });

    it('Should register a new user', () => {
      register.registerUser(registrationUser);
      register.login(registrationUser.email, registrationUser.password);
    });

    it('Create Current Account Application', () => {
      checkout.waitConsent();
      banking.startBankingCheckout('Current Account');
      checkout.checkCheckoutStep(' Your Current Account Application ', '7');
      banking.checkBankingProgressBar();
      banking.checkBankingComparisonPage();
      currentAccount.checkCurrentAccountComparisonTable();
      currentAccount.selectFamilyAccount();
      banking.checkConfigureStep();
      currentAccount.populateConfigureStep();
      checkout.clickContinueButton();
      currentAccount.checkOptionalFamilyAccountAddTransactionChest();
      checkout.clickContinueButton();
    });

    it('Create Event Quote', () => {
      cy.get('.SiteLogo').should('be.visible').click();
      checkout.startInsuranceCheckout('Event');
      checkout.checkCheckoutStep('Your Event Insurance', '6');
      event.checkProgressBarEvent();
      checkout.checkInsuranceComparisonPage('4');
      event.checkEventComparisonTable();
      event.selectTwoStarEvent();
      event.checkEventMiniCart();
      event.checkOptionalProducts();
      checkout.clickContinueButton();
      checkout.checkPersonalDetailsPage();
    });

    it('Create a Loan Application', () => {
      cy.get('.SiteLogo').should('be.visible').click();
      banking.startBankingCheckout('Loan');
      checkout.checkCheckoutStep('Your Loan Application', '6');
      banking.checkProgressBarLoanAndFTD();
      banking.checkConfigureStep();
      banking.checkConfigurationMiniCart();
      loan.configureLoan('2');
      cy.get('.action-button').click();
      checkout.clickContinueButton();
      loan.checkOptionalProducts();
      checkout.clickContinueButton();
    });

    it('Retrieve Quotes and Applications', () => {
      myAccount.retrieveQuote('3', 'Loan');
      cy.get('h2').should('contain.text', 'Your Loan Application');
      banking.checkProgressBarLoanAndFTD();
      myAccount.retrieveQuote('3', 'Event Insurance');
      cy.get('h2').should('contain.text', 'Event Insurance');
      event.checkProgressBarEvent();
      myAccount.retrieveQuote('3', 'Current Account');
      cy.get('h2').should('contain.text', 'Your Current Account Application');
      banking.checkBankingProgressBar();
    });

    it('Retrieve Event and Complete Checkout', () => {
      myAccount.retrieveQuote('3', 'Event Insurance');
      cy.get('h2').should('contain.text', 'Event Insurance');
      event.checkProgressBarEvent();
      checkout.clickContinueButton();
      checkout.checkCheckoutStep('Your Event Insurance', '6');
      checkout.checkPersonalDetailsPage();
      event.populatePersonalDetails();
      checkout.populatePersonalDetailsPage();
      checkout.clickContinueButton();
      checkout.checkCheckoutStep('Your Event Insurance', '6');
      event.checkProgressBarEvent();
      event.checkMiniCart();
      checkout.checkAccordions('threeAccordions');
      checkout.clickContinueButton();
      checkout.ConfirmBindQuote();
      checkout.checkAccordions('threeAccordions');
      checkout.clickContinueButton();
      checkout.populatePaymentCreditCard();
      cy.get('.btn-primary').contains('Continue').click();
      checkout.placeOrderOnFinalReview();
      checkout.checkAccordions('threeAccordions');
      checkout.checkOrderConfirmation();
    });

    it('Check Quotes and Applications page', () => {
      cy.selectOptionFromDropdown({
        menuOption: 'My Account',
        dropdownItem: 'Quotes & Applications',
      });
      cy.get('h2').should('contain.text', 'Quotes & Applications');
      cy.get('.info-card').should('have.length', 2);
    });
  });
});
