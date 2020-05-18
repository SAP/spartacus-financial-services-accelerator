import * as currentAccount from '../../../helpers/checkout/banking/currentAccount';
import * as productCategory from '../../../helpers/productCategoryPage';
import * as register from '../../../helpers/register';
import { registrationUser } from '../../../sample-data/users';
import * as banking from '../../../helpers/checkout/banking/checkoutBankingSteps';
import * as checkout from '../../../helpers/checkout/checkoutSteps';
import * as userIdentification from '../../../helpers/checkout/banking/userIdentificationPage';

context('Current Account Checkout', () => {
  before(() => {
    cy.visit('/');
  });

  it('Start checkout for Current Account ', () => {
    cy.get('cx-footer-navigation').within(() => {
      cy.get('a')
        .contains('Current Account')
        .click({ force: true });
    });
    productCategory.startCheckoutForBanking();
  });

  it('Should check comparison page', () => {
    banking.checkBankingComparisonPage('Your Current Account Insurance');
    banking.checkBankingProgressBar();
  });

  it('Should check prices in comparison table and select Family Account', () => {
    //currentAccount.checkCurrentAccountComparisonTable();
    currentAccount.selectFamilyAccount();
  });

  it('Should check optional products for Current Account', () => {
    cy.get('.progress-node').should('have.length', 6);
    currentAccount.checkOptionalProductsAddTransactionChest();
  });

  it('Should register user in checkout', () => {
    register.populateRegistrationForm(registrationUser);
    register.loginInUser(registrationUser.email, registrationUser.password);
  });

  it('Should complete personal details step', () => {
    //cy.get('h2').contains(' Your Current Account Insurance ');
    banking.checkPersonalDetailsPage();
    currentAccount.populatePersonalDetails();
    currentAccount.checkMiniCartCurrentAccount();
    checkout.clickContinueButton();
  });

  it('Should check Quote Review page', () => {
    banking.checkBankingProgressBar();
    checkout.checkAccordions('currentAccount');
  });

  it('Should bind Quote', () => {
    checkout.bindQuotePopup();
  });

  it('Should check Legal Information page', () => {
    banking.checkLegalInformationPage('Your Current Account Insurance');
    checkout.clickContinueButton();
  });

  it('Should select User Identification page', () => {
    userIdentification.checkUserIdentificationPage(
      'Your Current Account Insurance'
    );
    userIdentification.selectUserIdentification(' Video Identification ');
    checkout.clickContinueButton();
  });

  it('Should check order confirmation', () => {
    checkout.checkOrderConfirmationBanking();
    checkout.checkAccordions('currentAccount');
  });
});
