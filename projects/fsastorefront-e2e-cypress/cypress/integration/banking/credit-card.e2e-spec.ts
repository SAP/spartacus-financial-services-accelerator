import * as register from '../../helpers/register';
import { registrationUser } from '../../sample-data/users';
import * as checkout from '../../helpers/checkout/checkout-steps';
import * as inbox from '../../helpers/my-account/inbox';
import * as banking from '../../helpers/checkout/banking/checkout-banking';
import * as creditCard from '../../helpers/checkout/banking/credit-card';
import * as userIdentification from '../../helpers/checkout/banking/user-identification';
import * as myAccount from '../../helpers/my-account/my-account';
import testFilters from '../../support/filters';
import * as dayjs from 'dayjs';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

const todaysDate = dayjs().format('DD MMM YYYY');

testFilters([''], () => {
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
      checkout.checkSyncPilotComparisonTable();
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
      banking.populateAddressInfo();
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
      cy.wait(22000);
    });

    it('Should check Pending message is received', () => {
      inbox.clickOnInbox();
      inbox.checkInboxComponets();
      inbox.checkBankingTabs();
      inbox.checkGeneralTab();
      inbox.checkPendingMessage();
    });

    it('Should check Order History and Order Status', () => {
      myAccount.orderHistoryPage();
      myAccount.checkOrderHistoryContent('€89.00');
      cy.get('.cx-order-history-status').should('contain.text', 'Pending');
    });
  });
});
