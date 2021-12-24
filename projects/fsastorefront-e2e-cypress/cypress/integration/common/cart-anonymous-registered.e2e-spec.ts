import * as register from '../../helpers/register';
import * as travelCheckout from '../../helpers/checkout/insurance/travel-checkout';
import { registrationUser } from '../../sample-data/users';
import * as checkout from '../../helpers/checkout/checkout-steps';
import testFilters from '../../support/filters';
import * as homepage from '../../helpers/homepage';
import * as banking from '../../helpers/checkout/banking/checkout-banking';
import * as ftd from '../../helpers/checkout/banking/fixed-term-deposit';
import * as quotes from '../../helpers/my-account/quotes-and-applications';
import { retrieveQuote } from '../../helpers/my-account/my-account';

testFilters([''], () => {
  context('Anonymous vs Registered Card', () => {
    before(() => {
      cy.visit('/');
    });

    it('Should create travel anonymous quote', () => {
      checkout.startInsuranceCheckout('Travel');
      checkout.checkCheckoutStep('Your Travel Insurance', '7');
      checkout.checkProgressBarInsurance();
      travelCheckout.populateTripInformation();
      checkout.clickContinueButton();
      travelCheckout.checkBackpackersTravelComparisonTable();
      travelCheckout.selectBackpackersGold();
      travelCheckout.checkBackpackersOptionalProducts();
      checkout.clickContinueButton();
      cy.get('.SiteLogo').should('be.visible').click();
      homepage.checkPageElements();
    });

    it('Should register a new user', () => {
      register.registerUser(registrationUser);
      register.login(registrationUser.email, registrationUser.password);
      checkout.waitConsent();
    });

    it('Should start FTD checkout', () => {
      banking.startBankingCheckout('Fixed Term Deposit');
      banking.checkProgressBarLoanAndFTD();
      checkout.checkCheckoutStep('Your Fixed Term Deposit Application', '6');
      banking.checkConfigureStep();
      ftd.configureAProduct();
      cy.get('.action-button').click();
      checkout.clickContinueButton();
      checkout.checkCheckoutStep('Your Fixed Term Deposit Application', '6');
      ftd.checkOptionalProducts();
      ftd.checkMiniCart();
      checkout.clickContinueButton();
    });

    it('Should leave checkout and check application', () => {
      quotes.checkMyQuotesPage();
      //TODO:Bug - should be only one quote
      quotes.checkTwoQuotes('Travel', 'Fixed Term Deposit');
    });

    it('Should logout and login again', () => {
      register.logout();
      homepage.checkPageElements();
      cy.get('cx-login').click();
      register.login(registrationUser.email, registrationUser.password);
      quotes.checkMyQuotesPage();
      retrieveQuote('2', 'Fixed Term Deposit');
      checkout.waitForAddOptions();
      cy.get('h2').contains('Add Options');
      ftd.checkMiniCart();
      checkout.clickContinueButton();
    });
  });
});
