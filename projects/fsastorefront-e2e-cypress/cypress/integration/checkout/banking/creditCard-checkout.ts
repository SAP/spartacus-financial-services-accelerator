import * as register from '../../../helpers/register';
import { registrationUser } from '../../../sample-data/users';
import * as checkout from '../../../helpers/checkout/checkoutSteps';
import * as inbox from '../../../helpers/my-account/inbox';
import * as banking from '../../../helpers/checkout/banking/checkoutBankingSteps';
import * as creditCard from '../../../helpers/checkout/banking/creditCard';
import * as userIdentification from '../../../helpers/checkout/banking/userIdentificationPage';

context('Credit Card Checkout', () => {
  before(() => {
    cy.visit('/');
    register.registerUser(registrationUser);
    register.login(registrationUser.email, registrationUser.password);
  });

  it('Should register a new user and start Credit Card checkout', () => {
    checkout.waitConsent();
    banking.startBankingCheckout('Credit Card');
  });

  it('Should check comparison page', () => {
    checkout.checkCheckoutStep('Your Credit Card Application', '7');
    banking.checkBankingProgressBar();
    banking.checkBankingComparisonPage();
  });

  it('Should check prices in comparison table and select Premium Card', () => {
    creditCard.checkCreditCardComparisonTable();
    creditCard.selectPremiumCard();
  });

  it('Should configure a Credit Card', () => {
    checkout.checkCheckoutStep('Your Credit Card Application', '7');
    banking.checkConfigureStep();
    creditCard.populateConfigureStep();
    checkout.clickContinueButton();
  });

  it('Should check optional products for Credit Card', () => {
    checkout.checkCheckoutStep('Your Credit Card Application', '7');
    creditCard.checkOptionalProducts();
    creditCard.checkMiniCartCreditCard();
    checkout.clickContinueButton();
  });

  it('Should populate Personal Details page', () => {
    checkout.checkCheckoutStep('Your Credit Card Application', '7');
    checkout.checkPersonalDetailsPage();
    banking.populatePersonalDetailsCCandLoan();
    banking.populateAdditionalApplicantCCandLoan();
    checkout.clickContinueButton();
  });

  it('Should check Quote Review page', () => {
    banking.checkBankingProgressBar();
    checkout.checkAccordions('quoteReviewWithoutOptional');
    creditCard.checkMiniCartCreditCard();
  });

  it('Should bind Quote', () => {
    checkout.clickContinueButton();
    checkout.ConfirmBindQuote();
  });

  it('Should check Legal Information page', () => {
    checkout.checkCheckoutStep('Your Credit Card Application', '7');
    banking.checkLegalInformationPage();
    checkout.clickContinueButton();
  });

  it('Should complete User Identification page', () => {
    checkout.checkCheckoutStep('Your Credit Card Application', '7');
    userIdentification.checkUserIdentificationPage();
    userIdentification.selectUserIdentification('At the Nearest Branch');
  });

  it('Should check order confirmation', () => {
    checkout.checkOrderConfirmation();
    checkout.checkAccordions('creditCardConfirmation');
  });

  it('Should check Pending message is received', () => {
    cy.wait(22000);
    cy.selectOptionFromDropdown({
      menuOption: 'My Account',
      dropdownItem: 'Inbox',
    });
    inbox.checkInboxComponets();
    inbox.checkBankingTabs();
  });
});
