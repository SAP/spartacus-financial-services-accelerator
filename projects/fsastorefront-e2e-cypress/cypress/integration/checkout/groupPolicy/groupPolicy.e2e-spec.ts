import * as register from '../../../helpers/register';
import { carGroupAdmin, carGroupCustomer } from '../../../sample-data/users';
import * as groupPolicy from '../../../helpers/checkout/groupPolicy';
import * as checkout from '../../../helpers/checkout/checkoutSteps';
import * as banking from '../../../helpers/checkout/banking/checkoutBankingSteps';
import * as loan from '../../../helpers/checkout/banking/loan';
import * as userIdentification from '../../../helpers/checkout/banking/userIdentificationPage';
import * as currentAccount from '../../../helpers/checkout/banking/currentAccount';

context('Group Policy Group Admin and Customer Checks', () => {
  before(() => {
    cy.visit('/login');
  });

  it('Should login as Car Group admin', () => {
    register.loginInUser(carGroupAdmin.email, carGroupAdmin.password);
    cy.get('cx-category-navigation').contains('Insurance').should('not.exist');
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
    loan.configureLoan();
    cy.get('.action-button').click();
    checkout.clickContinueButton();
    loan.checkOptionalProducts();
    checkout.clickContinueButton();
    checkout.checkPersonalDetailsPage();
    banking.populatePersonalDetailsCCandLoan();
    banking.populateAdditionalApplicantCCandLoan();
    checkout.clickContinueButton();
    banking.checkProgressBarLoanAndFTD();
    checkout.checkAccordions('generalQuoteAccordions');
    checkout.clickContinueButton();
    checkout.ConfirmBindQuote();
    checkout.clickContinueButton();
    loan.checkLegalInformationLoan();
    checkout.clickContinueButton();
    userIdentification.checkUserIdentificationPage();
    userIdentification.selectUserIdentification('Legal Identification');
    checkout.checkOrderConfirmation();
    banking.checkOrderTotal('€140.00');
    checkout.checkAccordions('LoanConfirmation');
    register.logout();
  });

  it('Should login as Car Group Customer', () => {
    cy.visit('/login');
    register.loginInUser(carGroupCustomer.email, carGroupCustomer.password);
    cy.get('cx-category-navigation').contains('Insurance').should('not.exist');
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
    currentAccount.populatePersonalDetails();
    checkout.clickContinueButton();
    checkout.checkAccordions('generalQuoteAccordions');
    checkout.clickContinueButton();
    checkout.ConfirmBindQuote();
    banking.checkLegalInformationPage();
    checkout.clickContinueButton();
    userIdentification.checkUserIdentificationPage();
    userIdentification.selectUserIdentification(' Video Identification ');
    checkout.checkOrderConfirmationBanking();
    checkout.checkAccordions('confirmationCurrentAccount');
  });
});
