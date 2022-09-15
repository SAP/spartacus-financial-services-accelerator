import * as register from '../../helpers/register';
import { registrationUser } from '../../sample-data/users';
import * as checkout from '../../helpers/checkout/checkout-steps';
import * as banking from '../../helpers/checkout/banking/checkout-banking';
import * as loan from '../../helpers/checkout/banking/loan';
import * as userIdentification from '../../helpers/checkout/banking/user-identification';
import { checkMyQuotesPage } from '../../helpers/my-account/quotes-and-applications';
import testFilters from '../../support/filters';

testFilters(['smoke'], () => {
  context('Loan Checkout', () => {
    before(() => {
      cy.visit('/');
    });

    it('Should register a new user and start Loan checkout', () => {
      register.registerUser(registrationUser);
      register.login(registrationUser.email, registrationUser.password);
      checkout.waitConsent();
      banking.startBankingCheckout('Loan');
    });

    it('Should configure a Loan product', () => {
      banking.checkProgressBarLoanAndFTD();
      checkout.checkCheckoutStep('Your Loan Application', '6');
      banking.checkConfigureStep();
      banking.checkConfigurationMiniCart();
      loan.configureLoan('2');
      cy.get('.action-button').click();
      loan.checkMiniCartFirstStep();
      checkout.clickContinueButton();
    });

    it('Should check optional products', () => {
      checkout.checkCheckoutStep('Your Loan Application', '6');
      loan.checkOptionalProducts();
      checkout.clickContinueButton();
    });

    it('Should populate Personal Details page', () => {
      checkout.checkCheckoutStep('Your Loan Application', '6');
      checkout.checkPersonalDetailsPage();
      banking.populateAddressInfo();
      banking.populatePersonalDetailsCCandLoan();
      banking.populateAdditionalApplicantCCandLoan();
      checkout.clickContinueButton();
    });

    it('Should check Quote Review page', () => {
      checkout.checkCheckoutStep('Your Loan Application', '6');
      banking.checkProgressBarLoanAndFTD();
      loan.checkMiniCart();
      checkout.checkAccordions('generalQuoteAccordions');
      checkout.clickContinueButton();
      checkout.ConfirmBindQuote();
    });

    it('Should retrieve bind quote', () => {
      checkMyQuotesPage();
      loan.checkLoanApplication();
      cy.get('.link').contains('Retrieve').click({ force: true });
      checkout.waitForQuoteReviewPage();
      checkout.checkCheckoutStep('Your Loan Application', '6');
      cy.get('h2').contains('Loan Application');
      checkout.checkAccordions('generalQuoteAccordions');
      checkout.clickContinueButton();
    });

    it('Should check Legal Information page', () => {
      checkout.checkCheckoutStep('Your Loan Application', '6');
      loan.checkLegalInformationLoan();
      checkout.clickContinueButton();
    });

    it('Should complete User Identification page', () => {
      checkout.checkCheckoutStep('Your Loan Application', '6');
      userIdentification.checkUserIdentificationPage();
      userIdentification.selectUserIdentification('Legal Identification');
    });

    it('Should check order confirmation', () => {
      checkout.checkOrderConfirmation();
      banking.checkOrderTotal('€140.00');
      checkout.checkAccordions('LoanConfirmation');
    });
  });
});
