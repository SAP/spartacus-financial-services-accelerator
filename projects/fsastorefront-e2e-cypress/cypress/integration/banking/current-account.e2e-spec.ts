import * as banking from '../../helpers/checkout/banking/checkout-banking';
import * as checkout from '../../helpers/checkout/checkout-steps';
import * as currentAccount from '../../helpers/checkout/banking/current-account';
import * as register from '../../helpers/register';
import { registrationUser } from '../../sample-data/users';
import * as userIdentification from '../../helpers/checkout/banking/user-identification';
import testFilters from '../../support/filters';
import { checkMyQuotesPage } from '../../helpers/my-account/quotes-and-applications';
import { retrieveQuote } from '../../helpers/my-account/my-account';

testFilters(['smoke'], () => {
  context('Current Account Checkout', () => {
    before(() => {
      cy.visit('/');
    });

    it('Should start checkout for Current Account ', () => {
      banking.startBankingCheckout('Current Account');
    });

    it('Should check comparison page', () => {
      checkout.checkCheckoutStep(' Your Current Account Application ', '7');
      banking.checkBankingProgressBar();
      banking.checkBankingComparisonPage();
      //Sync Pilot should not be displayed for anonymous user
      cy.get('cx-fs-cms-sync-pilot').should('not.exist');
      currentAccount.checkCurrentAccountComparisonTable();
      currentAccount.selectFamilyAccount();
    });

    it('Should configure a Current Account', () => {
      checkout.checkCheckoutStep(' Your Current Account Application ', '7');
      banking.checkConfigureStep();
      currentAccount.populateConfigureStep();
      checkout.clickContinueButton();
    });

    it('Should check optional products for Current Account', () => {
      checkout.checkCheckoutStep(' Your Current Account Application ', '7');
      currentAccount.checkOptionalFamilyAccountAddTransactionChest();
      currentAccount.checkMiniCartCurrentAccount();
      checkout.addCoupon('FSA10DISC');
      cy.get('.alert-success').should('be.visible');
      checkout.clickContinueButton();
    });

    it('Should register user in checkout', () => {
      register.populateRegistrationForm(registrationUser);
      register.loginUser(registrationUser.email, registrationUser.password);
    });

    it('Should complete personal details step', () => {
      checkout.checkCheckoutStep(' Your Current Account Application ', '7');
      checkout.checkPersonalDetailsPage();
      banking.populatePersonalDetailsLoanAndCA();
      banking.populateEmploymentData();
      checkout.addCoupon('FSA10DISC');
      cy.get('.alert-danger')
        .should('be.visible')
        .contains('This coupon code is already applied to the current cart.');
      currentAccount.checkMiniCartWithCoupon();
      checkout.appliedCoupon();
      // Needed for user registration/login to complete in the background
      cy.wait(7000);
      checkout.checkBackAndContinueButtons();
      checkout.clickContinueButton();
    });

    it('Should check Quote Review page', () => {
      banking.checkBankingProgressBar();
      checkout.checkAccordions('generalQuoteAccordions');
    });

    it('Should bind Quote', () => {
      checkout.clickContinueButton();
      checkout.ConfirmBindQuote();
      checkout.checkAccordions('generalQuoteAccordions');
      checkout.clickContinueButton();
    });

    it('Should check Legal Information page', () => {
      checkout.checkCheckoutStep('Your Current Account Application', '7');
      banking.checkLegalInformationPage();
      checkout.clickContinueButton();
    });

    it('Should select User Identification page', () => {
      checkout.checkCheckoutStep(' Your Current Account Application ', '7');
      userIdentification.checkUserIdentificationPage();
      userIdentification.selectUserIdentification(' Video Identification ');
      cy.wait(1000);
    });

    it('Should check order confirmation', () => {
      banking.checkOrderConfirmation();
    });

    it('Should empty my account policies page', () => {
      checkout.checkMyAccountEmptyPages('Policies', 'You have no Policies!');
    });
  });
});
