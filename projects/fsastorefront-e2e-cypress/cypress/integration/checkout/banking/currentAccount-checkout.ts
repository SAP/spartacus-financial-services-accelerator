import * as currentAccount from '../../../helpers/checkout/banking/currentAccount';
import * as legalInformationPage from '../../../helpers/checkout/banking/legalInformationPage';
import * as userIdentificationPage from '../../../helpers/checkout/banking/userIdentificationPage';
import * as comparisonPage from '../../../helpers/comparisonTable';
import * as productCategory from '../../../helpers/productCategoryPage';
import * as register from '../../../helpers/register';
import { registrationUser } from '../../../sample-data/users';
import * as checkout from '../../../helpers/checkout/checkoutSteps';

context('Current Account Checkout', () => {
  before(() => {
    cy.visit('/');
  });

  it('Should open current account category page from footer', () => {
    cy.get(
      'cx-footer-navigation > cx-navigation-ui > :nth-child(2) > .wrapper > .childs > :nth-child(1) > cx-generic-link > a'
    ).click({ force: true });
  });

  it('Should start checkout for current account', () => {
    productCategory.startCheckoutForBanking();
  });

  it('Should check comparison page', () => {
    cy.get('.heading-headline').contains('Your Current Account Insurance');
    comparisonPage.checkBankingComparisonPage();
  });

  it('Should check prices in comparison table and select Family Account', () => {
    currentAccount.checkCurrentAccountComparisonTable();
    currentAccount.selectFamilyAccount();
  });

  it('Should check optional products for Current Account', () => {
    cy.wait(3000);
    cy.get('.progress-node').should('have.length', 5);
    currentAccount.checkOptionalProductsAddTransactionChest();
  });

  it('Should register user in checkout', () => {
    register.populateRegistrationForm(registrationUser);
    cy.wait(3000);
    register.loginInUser(registrationUser.email, registrationUser.password);
    cy.wait(1500);
  });

  it('Should check Mini Cart', () => {
    currentAccount.checkMiniCartCurrentAccount();
  });

  it('Should check Quote Review page', () => {
    cy.get('.progress-inner-wrapper').should('have.length', 5);
    checkout.checkQuoteReviewAccordions('currentAccount');
  });

  it('Should bind Quote', () => {
    checkout.bindQuotePopup();
  });

  it('Should check Legal Information page', () => {
    cy.get('.heading-headline').contains('Your Current Account Insurance');
    legalInformationPage.checkLegalInformationPage();
  });

  it('Should click Next in checkout', () => {
    checkout.clickContinueButton();
  });

  it('Should check User Identification page', () => {
    cy.get('.heading-headline').contains('Your Current Account Insurance');
    userIdentificationPage.checkUserIdentificationPage();
  });

  it('Should select Video for user identification', () => {
    userIdentificationPage.selectVideoIdentification();
  });

  it('Should click Next in checkout', () => {
    checkout.clickContinueButton();
  });
});
