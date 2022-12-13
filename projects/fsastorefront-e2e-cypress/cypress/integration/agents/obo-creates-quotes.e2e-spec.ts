import * as register from '../../helpers/register';
import { sellerIndira, stephenCustomer } from '../../sample-data/users';
import testFilters from '../../support/filters';
import * as homepage from '../../helpers/homepage';
import * as obo from '../../helpers/checkout/obo';
import * as checkout from '../../helpers/checkout/checkout-steps';
import * as banking from '../../helpers/checkout/banking/checkout-banking';
import * as currentAccount from '../../helpers/checkout/banking/current-account';
import * as quotes from '../../helpers/my-account/quotes-and-applications';
import { selectPaymentMethodInvoice } from '../../helpers/checkout/insurance/payment';
import * as userIdentification from '../../helpers/checkout/banking/user-identification';
import * as homeowners from '../../helpers/checkout/insurance/homeowners-checkout';
import { checkEmptyMyQuotesPage } from '../../helpers/my-account/quotes-and-applications';

testFilters([''], () => {
  context('Check sample data and create quotes', () => {
    before(() => {
      cy.visit('/login');
    });

    it('Should create homeowners quote as seller', () => {
      register.loginUser(sellerIndira.email, sellerIndira.password);
      cy.get('.SiteLogo').should('be.visible').click();
      obo.goToDashboard();
      cy.get('h5').contains('Your Profile');
      obo.checkDashboard('Dashboard Overview', 'Indira');
      obo.checkDashboardOverview();
      obo.checkCustomerList('Stephen', 'stephen.bailey@sapfsa.com');
      obo.goToCustomerDashboard('Stephen');
      obo.checkDashboard('Customer Profile', 'Stephen');
      obo.checkCustomerOverview();
      obo.checkCustomerProducts();
      obo.selectProduct('Insurances (7)', 'Homeowners', '7');
      checkout.checkCheckoutStep('Your Homeowners Insurance', '7');
      checkout.checkProgressBarInsurance();
      checkout.checkFirstCheckoutStep('Homeowners');
      homeowners.populateHomeownersSpecific();
      checkout.populatePropertyDetails();
      checkout.populateContentsCover();
      checkout.populatePropertyAddress();
      homeowners.populateBuildingCover();
      checkout.clickContinueButton();
      checkout.checkCheckoutStep('Your Homeowners Insurance', '7');
      checkout.checkProgressBarInsurance();
      checkout.checkInsuranceComparisonPage('2');
      homeowners.checkHomeownersComparisonTable();
      homeowners.selectHomeownersMainProduct('Homeowners Monthly', '0');
      homeowners.checkOptionalProducts();
      checkout.clickContinueButton();
      checkout.populateCustomerDetails('mr', 'Stephen', 'Bailey');
      cy.get('[name="email"]').type('stephen.bailey@sapfsa.com');
      checkout.checkPersonalDetailsPage();
      checkout.populatePersonalDetailsPage();
      checkout.clickContinueButton();
      checkout.checkCheckoutStep('Your Homeowners Insurance', '7');
      checkout.checkProgressBarInsurance();
      checkout.checkAccordions('generalQuoteAccordions');
      checkout.clickContinueButton();
      checkout.ConfirmBindQuote();
      cy.contains(
        'Insurance Quote/Application is successfully prepared for the customer stephen.bailey@sapfsa.com.'
      );
    });

    it('Should create currect account application as seller', () => {
      obo.goToDashboard();
      obo.checkCustomerList('Stephen', 'stephen.bailey@sapfsa.com');
      obo.goToCustomerDashboard('Stephen');
      obo.checkDashboard('Customer Profile', 'Stephen');
      obo.checkCustomerOverview();
      obo.checkCustomerProducts();
      obo.selectProduct('Banking (4)', 'Current Account', '4');
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
      checkout.populateCustomerDetails('mr', 'Stephen', 'Bailey');
      cy.get('[name="dateOfBirth"]').type('1978-03-13');
      banking.populatePersonalDetailsLoanAndCA();
      banking.populateEmploymentData();
      checkout.clickContinueButton();
      banking.checkBankingProgressBar();
      checkout.checkAccordions('generalQuoteAccordions');
      checkout.clickContinueButton();
      checkout.ConfirmBindQuote();
      cy.contains(
        'Insurance Quote/Application is successfully prepared for the customer stephen.bailey@sapfsa.com.'
      );
      homepage.checkPageElements();
      checkEmptyMyQuotesPage();
      register.logout();
      homepage.checkPageElements();
    });

    it('Should check that customer can complete event checkout', () => {
      cy.get('cx-login').click();
      register.loginUser(stephenCustomer.email, stephenCustomer.password);
      quotes.checkMyQuotesPage();
      quotes.checkQuote('Homeowners', 'Approved', '€51.03 / Monthly');
      checkout.checkCheckoutStep('Your Homeowners Insurance', '7');
      checkout.checkProgressBarInsurance();
      cy.get('p.label')
        .contains('Personal Details')
        .parents('.d-flex.progress-node.is-disabled');
      checkout.checkAccordions('generalQuoteAccordions');
      checkout.clickContinueButton();
      selectPaymentMethodInvoice();
      checkout.checkBackAndContinueButtons;
      cy.get('.primary-button').contains('Continue').click();
      checkout.placeOrderOnFinalReview();
      checkout.checkOrderConfirmation();
      cy.get('.cx-login-greet').should('be.visible');
      cy.visit(
        'https://fsastorefrontapp.c5qs19f9s2-financial1-s4-public.model-t.myhybris.cloud/financial/en/EUR/user-profile/margaret.richards@sapfsa.com'
      );
      cy.contains('No sufficient permissions to access this page');
      obo.checkDashboard('Dashboard Overview', 'Stephen Bailey');
      obo.checkDashboard('Your Profile', 'Stephen');
    });

    it('Should check that customer can complete current account checkout', () => {
      quotes.checkMyQuotesPage();
      quotes.checkQuote('Current', 'ACCEPTED', '€9.99 / Monthly');
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
      //checkout.checkOrderConfirmationBanking();
      //checkout.checkAccordions('confirmationCurrentAccount');
    });
  });
});
