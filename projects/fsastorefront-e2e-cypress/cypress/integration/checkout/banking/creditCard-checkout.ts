import * as register from '../../../helpers/register';
import { registrationUser } from '../../../sample-data/users';
import * as productCategory from '../../../helpers/productCategoryPage';
import * as comparisonPage from '../../../helpers/comparisonTable';
import * as creditCard from '../../../helpers/checkout/banking/creditCard';
import * as checkout from '../../../helpers/checkout/checkoutSteps';
import * as legalInformationPage from '../../../helpers/checkout/banking/legalInformationPage';
import * as userIdentificationPage from '../../../helpers/checkout/banking/userIdentificationPage';
import {
  checkInboxComponets,
  checkPendingMessage,
} from '../../../helpers/my-account/inbox';

context('Credit Card Checkout', () => {
  before(() => {
    cy.visit('/');
  });

  it('Should register a new user and start Credit Card checkout', () => {
    register.registerUser(registrationUser);
    register.login(registrationUser.email, registrationUser.password);
    cy.selectOptionFromDropdown({
      menuOption: 'Banking',
      dropdownItem: 'Credit Card',
    });
  });

  it('Should start checkout for Credit Card', () => {
    productCategory.startCheckoutForBanking();
  });

  it('Should check comparison page', () => {
    cy.get('.heading-headline').contains('Your Credit Card Insurance');
    comparisonPage.checkBankingComparisonPage();
  });

  it('Should check prices in comparison table and select Premium Card', () => {
    cy.get('fsa-comparison-table-panel-item').should('have.length', 3);
    cy.get('fsa-comparison-table-panel-item')
      .eq(0)
      .within(() => {
        cy.get('h3').should('have.text', 'Basic Card');
        cy.get('h4').should('have.text', '€49.00');
      });
    cy.get('fsa-comparison-table-panel-item')
      .eq(1)
      .within(() => {
        cy.get('h3').should('have.text', 'Premium Card');
        cy.get('h4').should('have.text', '€89.00');
      });
    cy.get('fsa-comparison-table-panel-item')
      .eq(2)
      .within(() => {
        cy.get('h3').should('have.text', 'Exclusive Card');
        cy.get('h4').should('have.text', '€169.00');
      });
    cy.get('fsa-comparison-table-panel-item')
      .eq(1)
      .within(() => {
        cy.get('h3').should('have.text', 'Premium Card');
        cy.get('.primary-button').click();
      });
  });

  it('Should check optional products for Credit Card', () => {
    cy.get('.d-flex.progress-node').should('have.length', 5);
    creditCard.checkOptionalProducts();
  });

  it('Should check Mini Cart and continue in checkout', () => {
    creditCard.checkMiniCartCreditCard();
    checkout.clickContinueButton();
  });

  it('Should check Quote Review page', () => {
    cy.get('.progress-inner-wrapper').should('have.length', 5);
    checkout.checkQuoteReviewAccordions('creditCard');
  });

  it('Should bind Quote', () => {
    checkout.bindQuotePopup();
  });

  it('Should check Legal Information page', () => {
    cy.get('.heading-headline').contains('Your Credit Card Insurance');
    legalInformationPage.checkLegalInformationPage();
  });

  it('Should click Next in checkout', () => {
    checkout.clickContinueButton();
  });

  it('Should check User Identification page', () => {
    cy.get('.heading-headline').contains('Your Credit Card Insurance');
    userIdentificationPage.checkUserIdentificationPage();
  });

  it('Should select At the Nearest Branch for user identification', () => {
    userIdentificationPage.selectAtTheNearestBranch();
    checkout.clickContinueButton();
  });

  it('Should check order confirmation', () => {
    checkout.checkOrderConfirmationBanking();
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
