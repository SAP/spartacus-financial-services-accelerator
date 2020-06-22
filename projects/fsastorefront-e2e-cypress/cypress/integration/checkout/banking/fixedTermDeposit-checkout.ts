import * as productCategory from "../../../helpers/productCategoryPage";
import * as register from "../../../helpers/register";
import {registrationUser} from "../../../sample-data/users";
import * as checkout from "../../../helpers/checkout/checkoutSteps";
import * as banking from "../../../helpers/checkout/banking/checkoutBankingSteps";
import * as creditCard from "../../../helpers/checkout/banking/creditCard";
import * as loan from "../../../helpers/checkout/banking/loan";
import * as userIdentification from "../../../helpers/checkout/banking/userIdentificationPage";
import * as ftd from "../../../helpers/checkout/banking/fixedTermDeposit";

context('Fixed Term Deposit Checkout', () => {
  before(() => {
    cy.visit('/');
  });

  it('Should register a new user and start FTD checkout', () => {
    register.registerUser(registrationUser);
    register.login(registrationUser.email, registrationUser.password);
    checkout.waitForHomepage();
    cy.selectOptionFromDropdown({
      menuOption: 'Banking',
      dropdownItem: 'Fixed Term Deposit',
    });
    productCategory.startCheckoutForBanking();
  });

  it('Should configure a Loan product', () => {
    banking.checkProgressBarLoanAndFTD();
    checkout.checkCheckoutStep('Your Fixed Term Deposit Application', '6');
    banking.checkConfigureStep();
    //configure
    cy.get('[name=term-amount]').type('500000');
    cy.get('[name=deposit-term]').select('3');
    cy.get('[name=maturity-option]').select('termination');
    cy.get('[name=startDate]').type('2021-12-12');
    //calculate
    cy.get('.btn-primary').contains('Calculate').click();
    //mini cart
    cy.get('.short-overview-content').should('be.visible')
      .within( ()=> {
        cy.get('.short-overview-value').contains(' €503,125.00 ');
      });
    checkout.clickContinueButton();
    checkout.waitForAddOptions();

  });

  it('Should check optional products', () => {
    checkout.checkCheckoutStep('Your Fixed Term Deposit Application', '6');
    ftd.checkOptionalProducts();
    cy.get('.short-overview-content').should('be.visible')
      .within( ()=> {
        cy.get('.short-overview-value').contains(' €503,125.00 ');
      });
    checkout.clickContinueButton();
  });

  it('Should populate Personal Details page', () => {
    checkout.checkCheckoutStep('Your Fixed Term Deposit Application', '6');
    checkout.checkPersonalDetailsPage();
    cy.get('.short-overview-content').should('be.visible')
      .within( ()=> {
        cy.get('.short-overview-value').contains(' €503,125.00 ');
      });
    banking.populatePersonalDetails();
    checkout.clickContinueButton();
  });

  it('Should check Quote Review page', () => {
    checkout.checkCheckoutStep('Your Fixed Term Deposit Application', '6');
    banking.checkProgressBarLoanAndFTD();
    checkout.checkAccordions('creditCard');
    checkout.bindQuotePopup();
  });

  it('Should check Legal Information page', () => {
    checkout.checkCheckoutStep('Your Fixed Term Deposit Application', '6');
    loan.checkLegalInformationLoan();
    checkout.clickContinueButton();
  });

  it('Should complete User Identification page', () => {
    checkout.checkCheckoutStep('Your Fixed Term Deposit Application', '6');
    banking.checkProgressBarLoanAndFTD();
    userIdentification.checkUserIdentificationPage();
    userIdentification.selectUserIdentification('Legal Identification');
    checkout.clickContinueButton();
    checkout.waitForConfirmation();
  });

  it('Should check order confirmation', () => {
    checkout.checkOrderConfirmation();
    loan.checkMiniCart();
    checkout.checkAccordions('LoanConfirmation');
  });

});
