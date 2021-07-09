import * as banking from '../../../helpers/checkout/banking/checkout-banking';
import * as checkout from '../../../helpers/checkout/checkout-steps';
import * as currentAccount from '../../../helpers/checkout/banking/current-account';
import * as register from '../../../helpers/register';
import { registrationUser } from '../../../sample-data/users';
import * as userIdentification from '../../../helpers/checkout/banking/user-identification';

context('Current Account Checkout', () => {
  before(() => {
    cy.visit('/');
  });

  it('Start checkout for Current Account ', () => {
    banking.startBankingCheckout('Current Account');
  });

  it('Should check comparison page', () => {
    checkout.checkCheckoutStep(' Your Current Account Application ', '7');
    banking.checkBankingProgressBar();
    banking.checkBankingComparisonPage();
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
    checkout.clickContinueButton();
  });

  it('Should register user in checkout', () => {
    register.populateRegistrationForm(registrationUser);
    register.loginInUser(registrationUser.email, registrationUser.password);
  });

  it('Should complete personal details step', () => {
    checkout.checkCheckoutStep(' Your Current Account Application ', '7');
    checkout.checkPersonalDetailsPage();
    banking.populatePersonalDetailsLoanAndCA();
    currentAccount.populatePersonalDetails();
    currentAccount.checkMiniCartCurrentAccount();
    // Needed for user registration/login to complete in the background
    cy.wait(5000);
    checkout.clickContinueButton();
  });

  it('Should check Quote Review page', () => {
    banking.checkBankingProgressBar();
    checkout.checkAccordions('generalQuoteAccordions');
  });

  it('Should bind Quote', () => {
    checkout.clickContinueButton();
    checkout.ConfirmBindQuote();
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
  });

  it('Should check order confirmation', () => {
    checkout.checkOrderConfirmationBanking();
    checkout.checkAccordions('confirmationCurrentAccount');
  });

  it('Should empty my account policies page', () => {
    checkout.checkMyAccountEmptyPages('Policies', 'You have no Policies!');
  });
});
