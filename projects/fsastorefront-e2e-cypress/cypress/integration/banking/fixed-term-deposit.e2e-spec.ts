import * as register from '../../helpers/register';
import { registrationUser } from '../../sample-data/users';
import * as checkout from '../../helpers/checkout/checkout-steps';
import * as banking from '../../helpers/checkout/banking/checkout-banking';
import * as userIdentification from '../../helpers/checkout/banking/user-identification';
import * as ftd from '../../helpers/checkout/banking/fixed-term-deposit';
import { checkMyQuotesPage } from '../../helpers/my-account/quotes-and-applications';
import * as myAccount from '../../helpers/my-account/my-account';
import testFilters from '../../support/filters';

testFilters([''], () => {
  context('Fixed Term Deposit Checkout', () => {
    before(() => {
      cy.visit('/');
    });

    it('Should register a new user and start FTD checkout', () => {
      register.registerUser(registrationUser);
      register.login(registrationUser.email, registrationUser.password);
      checkout.waitConsent();
      banking.startBankingCheckout('Fixed Term Deposit');
    });

    it('Should configure a FTD product', () => {
      banking.checkProgressBarLoanAndFTD();
      checkout.checkCheckoutStep('Your Fixed Term Deposit Application', '6');
      banking.checkConfigureStep();
      banking.checkConfigurationMiniCart();
      ftd.configureAProduct();
      cy.get('.action-button').click();
      ftd.checkMiniCartFirstStep();
      checkout.clickContinueButton();
    });

    it('Should check optional products', () => {
      checkout.checkCheckoutStep('Your Fixed Term Deposit Application', '6');
      ftd.checkOptionalProducts();
      ftd.checkMiniCart();
      checkout.clickContinueButton();
    });

    it('Should populate Personal Details page and go to quotes page', () => {
      checkout.checkCheckoutStep('Your Fixed Term Deposit Application', '6');
      checkout.checkPersonalDetailsPage();
      checkMyQuotesPage();
      ftd.checkFtdApplication('Pending');
    });

    it('Should retrieve not bind quote', () => {
      cy.get('.link').contains('Retrieve').click({ force: true });
      checkout.waitForAddOptions();
      cy.get('h2').contains('Add Options');
      ftd.checkMiniCart();
      checkout.clickContinueButton();
    });

    it('Should populate Personal Details page', () => {
      checkout.checkCheckoutStep('Your Fixed Term Deposit Application', '6');
      checkout.checkPersonalDetailsPage();
      banking.populatePersonalDetailsLoanAndCA();
      banking.populateEmploymentData();
      cy.wait(3000);
      checkout.clickContinueButton();
    });

    it('Should check Quote Review page', () => {
      checkout.checkCheckoutStep('Your Fixed Term Deposit Application', '6');
      banking.checkProgressBarLoanAndFTD();
      ftd.checkMiniCart();
      checkout.checkAccordions('generalQuoteAccordions');
      checkout.clickContinueButton();
      checkout.ConfirmBindQuote();
      checkout.checkAccordions('generalQuoteAccordions');
      checkMyQuotesPage();
      ftd.checkFtdApplication('Accepted');
      cy.get('.link').contains('Retrieve').click({ force: true });
      checkout.checkAccordions('generalQuoteAccordions');
      checkout.clickContinueButton();
    });

    it('Should check Legal Information page', () => {
      checkout.checkCheckoutStep('Your Fixed Term Deposit Application', '6');
      banking.checkLegalInformationPage();
      checkout.clickContinueButton();
    });

    it('Should complete User Identification page', () => {
      checkout.checkCheckoutStep('Your Fixed Term Deposit Application', '6');
      banking.checkProgressBarLoanAndFTD();
      userIdentification.checkUserIdentificationPage();
      userIdentification.selectUserIdentification('Legal Identification');
      cy.wait(1000);
    });

    it('Should check order confirmation and application', () => {
      banking.checkOrderConfirmation();
      checkMyQuotesPage();
      ftd.checkFtdApplication('Submitted');
    });
  });
});
