import * as register from '../../../helpers/register';
import { registrationUser } from '../../../sample-data/users';
import * as productCategory from '../../../helpers/productCategoryPage';
import * as creditCard from '../../../helpers/checkout/banking/creditCard';
import * as checkout from '../../../helpers/checkout/checkoutSteps';
import * as userIdentification from '../../../helpers/checkout/banking/userIdentificationPage';
import {
  checkInboxComponets,
  checkPendingMessage,
} from '../../../helpers/my-account/inbox';
import * as banking from '../../../helpers/checkout/banking/checkoutBankingSteps';

context('Credit Card Checkout', () => {
  before(() => {
    cy.visit('/');
  });

  it('Should register a new user and start Credit Card checkout', () => {
    register.registerUser(registrationUser);
    register.login(registrationUser.email, registrationUser.password);
    cy.wait(500);
    cy.selectOptionFromDropdown({
      menuOption: 'Banking',
      dropdownItem: 'Credit Card',
    });
  });

  it('Should start checkout for Credit Card', () => {
    productCategory.startCheckoutForBanking();
  });

  it('Should check comparison page', () => {
    banking.checkBankingComparisonPage('Your Credit Card Insurance');
    banking.checkBankingProgressBar();
  });

  it('Should check prices in comparison table and select Premium Card', () => {
    creditCard.checkCreditCardComparisonTable();
    creditCard.selectPremiumCard();
  });

  it('Should check optional products for Credit Card', () => {
    cy.get('.progress-node').should('have.length', 6);
    creditCard.checkOptionalProducts();
  });

  it('Should check Mini Cart and continue in checkout', () => {
    creditCard.checkMiniCartCreditCard();
    checkout.clickContinueButton();
  });

  it('Should populate Personal Details page', () => {
    cy.get('h2').contains('Your Credit Card Insurance');
    banking.checkPersonalDetailsPage();
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
    banking.checkLegalInformationPage('Your Credit Card Insurance');
    checkout.clickContinueButton();
  });

  it('Should complete User Identification page', () => {
    userIdentification.checkUserIdentificationPage(
      'Your Credit Card Insurance'
    );
    userIdentification.selectUserIdentification('At the Nearest Branch');
    checkout.clickContinueButton();
  });

  it('Should check order confirmation', () => {
    checkout.checkOrderConfirmationBanking();
    checkout.checkAccordions('creditCard');
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
