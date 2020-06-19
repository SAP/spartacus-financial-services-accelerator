import * as register from '../../../helpers/register';
import { registrationUser } from '../../../sample-data/users';
import * as productCategory from '../../../helpers/productCategoryPage';
import * as checkout from '../../../helpers/checkout/checkoutSteps';
import { checkPersonalDetailsPage } from '../../../helpers/checkout/checkoutSteps';
import { checkInboxComponets } from '../../../helpers/my-account/inbox';
import * as banking from '../../../helpers/checkout/banking/checkoutBankingSteps';
import * as creditCard from '../../../helpers/checkout/banking/creditCard';
import * as userIdentification from '../../../helpers/checkout/banking/userIdentificationPage';

context('Credit Card Checkout', () => {
  before(() => {
    cy.visit('/');
  });

  it('Should register a new user and start Credit Card checkout', () => {
    register.registerUser(registrationUser);
    register.login(registrationUser.email, registrationUser.password);
    checkout.waitForHomepage();
    banking.startBankingCheckout('Credit Card');
  });

  it('Should check comparison page', () => {
    checkout.checkCheckoutStep('Your Credit Card Application');
    banking.checkBankingProgressBar();
    banking.checkBankingComparisonPage();
  });

  it('Should check prices in comparison table and select Premium Card', () => {
    creditCard.checkCreditCardComparisonTable();
    creditCard.selectPremiumCard();
  });

  it('Should configure a Credit Card', () => {
    checkout.checkCheckoutStep('Your Credit Card Application');
    banking.checkConfigureStep();
    creditCard.populateConfigureStep();
    checkout.clickContinueButton();
  });

  it('Should check optional products for Credit Card', () => {
    checkout.checkCheckoutStep('Your Credit Card Application');
    creditCard.checkOptionalProducts();
    //creditCard.checkMiniCartCreditCard();
    checkout.clickContinueButton();
  });

  it('Should populate Personal Details page', () => {
    checkout.checkCheckoutStep('Your Credit Card Application');
    checkPersonalDetailsPage();
    creditCard.populatePersonalDetails();
    checkout.clickContinueButton();
  });

  it('Should check Quote Review page', () => {
    banking.checkBankingProgressBar();
    checkout.checkAccordions('creditCard');
  });

  it('Should bind Quote', () => {
    checkout.bindQuotePopup();
  });

  it('Should check Legal Information page', () => {
    checkout.checkCheckoutStep('Your Credit Card Application');
    banking.checkLegalInformationPage();
    checkout.clickContinueButton();
  });

  it('Should complete User Identification page', () => {
    checkout.checkCheckoutStep('Your Credit Card Application');
    userIdentification.checkUserIdentificationPage();
    userIdentification.selectUserIdentification('At the Nearest Branch');
    checkout.clickContinueButton();
  });

  it('Should check order confirmation', () => {
    checkout.checkOrderConfirmationBanking();
    checkout.checkAccordions('creditCardConfirmation');
  });

  it('Should check Pending message is received', () => {
    cy.wait(22000);
    cy.selectOptionFromDropdown({
      menuOption: 'My Account',
      dropdownItem: 'Inbox',
    });
    checkInboxComponets();
    cy.get('div.col-6').contains(' Order Pending ');
  });
});
