import * as register from '../../../helpers/register';
import { registrationUser } from '../../../sample-data/users';
import * as checkout from '../../../helpers/checkout/checkoutSteps';
import * as banking from '../../../helpers/checkout/banking/checkoutBankingSteps';
import * as userIdentification from '../../../helpers/checkout/banking/userIdentificationPage';
import * as ftd from '../../../helpers/checkout/banking/fixedTermDeposit';
import * as currentAccount from '../../../helpers/checkout/banking/currentAccount';
import * as life from '../../../helpers/checkout/insurance/life-checkout';
import * as policies from '../../../helpers/my-account/policies';

context('Fixed Term Deposit Checkout', () => {
  before(() => {
    cy.visit('/');
  });

  it('Should register a new user and start FTD checkout', () => {
    register.registerUser(registrationUser);
    register.login(registrationUser.email, registrationUser.password);
    checkout.waitForHomepage();
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
    checkout.waitForAddOptions();
  });

  it('Should check optional products', () => {
    checkout.checkCheckoutStep('Your Fixed Term Deposit Application', '6');
    ftd.checkOptionalProducts();
    checkout.clickContinueButton();
  });

  it('Should populate Personal Details page and go to quotes page', () => {
    checkout.checkCheckoutStep('Your Fixed Term Deposit Application', '6');
    checkout.checkPersonalDetailsPage();
    policies.checkMyQuotesPage();
    ftd.checkFtdApplication();
  });

  it('Should retrieve not bind quote', () => {
    cy.get('.link').contains('Retrieve').click({ force: true });
    checkout.waitForAddOptions();
    checkout.checkCheckoutStep('Your Fixed Term Deposit Application', '6');
    cy.get('h2').contains('Add Options');
    checkout.clickContinueButton();
  });

  it('Should populate Personal Details page', () => {
    checkout.checkCheckoutStep('Your Fixed Term Deposit Application', '6');
    checkout.checkPersonalDetailsPage();
    banking.populatePersonalDetailsLoanAndCA();
    currentAccount.populatePersonalDetails();
    checkout.clickContinueButton();
  });

  it('Should check Quote Review page', () => {
    checkout.checkCheckoutStep('Your Fixed Term Deposit Application', '6');
    banking.checkProgressBarLoanAndFTD();
    ftd.checkMiniCart();
    checkout.checkAccordions('generalQuoteAccordions');
    checkout.bindQuotePopup();
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
    checkout.clickContinueButton();
    checkout.waitForConfirmation();
  });

  it('Should check order confirmation', () => {
    checkout.checkOrderConfirmation();
    banking.checkOrderTotal('€503,125.00');
    cy.get('.short-overview-title')
      .contains('Order total')
      .parent()
      .contains('€503,125.00');
    checkout.checkAccordions('FTDConfirmation');
  });
});
