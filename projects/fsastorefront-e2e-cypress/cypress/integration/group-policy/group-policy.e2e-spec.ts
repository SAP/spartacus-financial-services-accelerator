import * as register from '../../helpers/register';
import { carGroupAdmin, carGroupCustomer } from '../../sample-data/users';
import * as groupPolicy from '../../helpers/checkout/group-policy';
import * as checkout from '../../helpers/checkout/checkout-steps';
import * as banking from '../../helpers/checkout/banking/checkout-banking';
import * as loan from '../../helpers/checkout/banking/loan';
import * as userIdentification from '../../helpers/checkout/banking/user-identification';
import * as currentAccount from '../../helpers/checkout/banking/current-account';
import testFilters from '../../support/filters';

testFilters(['smoke'], () => {
  context('Group Policy Group Admin and Customer Checks', () => {
    before(() => {
      cy.visit('/login');
    });

    it('Should login as Car Group admin', () => {
      register.loginInUser(carGroupAdmin.email, carGroupAdmin.password);
      cy.get('cx-category-navigation')
        .contains('Insurance')
        .should('not.exist');
      cy.get('cx-category-navigation').should('contain.text', 'Banking');
    });

    it('Should check Group policy main pages', () => {
      groupPolicy.checkGroupPolicyMainPage();
      groupPolicy.checkUnitsPage();
      groupPolicy.checkGroupPolicyMainPage();
      groupPolicy.checkMembersPage();
    });

    it('Should complete checkout as group admin', () => {
      banking.startBankingCheckout('Loan');
      checkout.checkCheckoutStep('Your Loan Application', '6');
      banking.checkConfigureStep();
      loan.configureLoan('1');
      cy.get('.action-button').click();
      checkout.clickContinueButton();
      loan.checkOptionalProducts();
      checkout.clickContinueButton();
      checkout.checkPersonalDetailsPage();
      banking.populatePersonalDetailsCCandLoan();
      checkout.clickContinueButton();
      banking.checkProgressBarLoanAndFTD();
      checkout.checkAccordions('generalQuoteAccordions');
      checkout.clickContinueButton();
      checkout.ConfirmBindQuote();
      checkout.clickContinueButton();
      loan.checkLegalInformationLoan();
      checkout.clickContinueButton();
      userIdentification.checkUserIdentificationPage();
      banking.checkProgressBarLoanAndFTD();
      userIdentification.selectUserIdentification('Legal Identification');
      checkout.checkOrderConfirmation();
      banking.checkOrderTotal('€140.00');
      checkout.checkAccordions('LoanConfirmation');
      register.logout();
    });

    it('Should login as Car Group Customer', () => {
      cy.visit('/login');
      register.loginInUser(carGroupCustomer.email, carGroupCustomer.password);
      cy.get('cx-category-navigation')
        .contains('Insurance')
        .should('not.exist');
      cy.get('cx-category-navigation').should('contain.text', 'Banking');
      cy.get('cx-link').contains('My Group').should('not.exist');
    });

    it('Should complete checkout for assigned product', () => {
      banking.startBankingCheckout('Current Account');
      checkout.checkCheckoutStep(' Your Current Account Application ', '7');
      groupPolicy.checkCurrentAccountComparisonTable();
      groupPolicy.selectPremiumAccount();
      banking.checkConfigureStep();
      currentAccount.populateConfigureStep();
      checkout.clickContinueButton();
      currentAccount.checkOptionalPremiumAccount();
      checkout.clickContinueButton();
      checkout.checkPersonalDetailsPage();
      banking.populatePersonalDetailsLoanAndCA();
      banking.populateEmploymentData();
      checkout.clickContinueButton();
      checkout.checkAccordions('generalQuoteAccordions');
      checkout.clickContinueButton();
      checkout.ConfirmBindQuote();
      banking.checkLegalInformationPage();
      checkout.clickContinueButton();
      banking.checkBankingProgressBar();
      userIdentification.checkUserIdentificationPage();
      userIdentification.selectUserIdentification(' Video Identification ');
      checkout.checkOrderConfirmationBanking();
      checkout.checkAccordions('confirmationCurrentAccount');
    });
  });
});
