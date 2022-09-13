import * as register from '../../helpers/register';
import { sellerIndira, stephenCustomer } from '../../sample-data/users';
import testFilters from '../../support/filters';
import * as homepage from '../../helpers/homepage';
import { selectCustomer } from '../../helpers/checkout/obo';
import * as checkout from '../../helpers/checkout/checkout-steps';
import * as event from '../../helpers/checkout/insurance/event-checkout';
import * as banking from '../../helpers/checkout/banking/checkout-banking';
import * as currentAccount from '../../helpers/checkout/banking/current-account';
import * as quotes from '../../helpers/my-account/quotes-and-applications';
import { selectPaymentMethodInvoice } from '../../helpers/checkout/insurance/payment';
import * as userIdentification from '../../helpers/checkout/banking/user-identification';

testFilters([''], () => {
  context('Check sample data and create quotes', () => {
    before(() => {
      cy.visit('/login');
    });

    it('Should create event quote as seller', () => {
      register.loginInUser(sellerIndira.email, sellerIndira.password);
      cy.get('.SiteLogo').should('be.visible').click();
      checkout.startInsuranceCheckout('Event');
      checkout.checkCheckoutStep('Your Event Insurance', '6');
      event.checkProgressBarEvent();
      event.checkEventComparisonTable();
      event.selectTwoStarEvent();
      event.checkOptionalProducts();
      checkout.clickContinueButton();
      checkout.checkCheckoutStep('Your Event Insurance', '6');
      checkout.checkPersonalDetailsPage();
      event.populatePersonalDetails();
      checkout.populateCustomerDetails();
      cy.get('[name="email"]').type('stephen.bailey@sapfsa.com');
      checkout.populatePersonalDetailsPage();
      checkout.clickContinueButton();
      checkout.checkCheckoutStep('Your Event Insurance', '6');
      event.checkProgressBarEvent();
      checkout.checkAccordions('eventQuoteReviewSeller');
      selectCustomer('Stephen Bailey');
      checkout.clickContinueButton();
      checkout.ConfirmBindQuote();
      cy.get('.alert').contains(
        'Insurance Quote/Application is successfully prepared for the customer Stephen Bailey.'
      );
      homepage.checkPageElements();
    });

    it('Should create current account application as seller', () => {
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
      checkout.checkCheckoutStep(' Your Current Account Application ', '7');
      checkout.checkPersonalDetailsPage();
      checkout.populateCustomerDetails();
      cy.get('[name="dateOfBirth"]').type('1978-03-13');
      banking.populatePersonalDetailsLoanAndCA();
      banking.populateEmploymentData();
      checkout.clickContinueButton();
      banking.checkBankingProgressBar();
      checkout.checkAccordions('currentAccountSeller');
      selectCustomer('Stephen Bailey');
      checkout.clickContinueButton();
      checkout.ConfirmBindQuote();
      cy.get('.alert').contains(
        'Insurance Quote/Application is successfully prepared for the customer Stephen Bailey.'
      );
      homepage.checkPageElements();
      register.logout();
      homepage.checkPageElements();
    });

    it('Should complete event checkout as customer', () => {
      cy.get('cx-login').click();
      register.loginInUser(stephenCustomer.email, stephenCustomer.password);
      cy.get('.cx-login-greet').should('be.visible');
      quotes.checkMyQuotesPage();
      quotes.checkEventQuoteAndRetrieve();
      checkout.checkCheckoutStep('Your Event Insurance', '6');
      event.checkProgressBarEvent();
      cy.get('p.label')
        .contains('Personal Details')
        .parents('.d-flex.progress-node.is-disabled');
      checkout.checkAccordions('threeAccordions');
      checkout.clickContinueButton();
      selectPaymentMethodInvoice();
      checkout.checkBackAndContinueButtons;
      cy.get('.primary-button').contains('Continue').click();
      checkout.placeOrderOnFinalReview();
      checkout.checkOrderConfirmation();
    });

    it('Should complete current account checkout as customer', () => {
      quotes.checkMyQuotesPage();
      quotes.checkCurrentAccountAndRetrieve();
      checkout.checkCheckoutStep('Your Current Account Application', '7');
      cy.get('p.label')
        .contains('Personal Details')
        .parents('.d-flex.progress-node.is-disabled');
      checkout.checkAccordions('generalQuoteAccordions');
      checkout.clickContinueButton();
      checkout.checkCheckoutStep('Your Current Account Application', '7');
      banking.checkLegalInformationPage();
      checkout.clickContinueButton();
      userIdentification.checkUserIdentificationPage();
      userIdentification.selectUserIdentification(' Video Identification ');
      checkout.checkOrderConfirmationBanking();
      checkout.checkAccordions('confirmationCurrentAccount');
    });
  });
});
