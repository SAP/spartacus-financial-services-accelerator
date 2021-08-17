import * as register from '../../helpers/register';
import { registrationUser } from '../../sample-data/users';
import * as checkout from '../../helpers/checkout/checkout-steps';
import * as banking from '../../helpers/checkout/banking/checkout-banking';
import * as creditCard from '../../helpers/checkout/banking/credit-card';
import * as userIdentification from '../../helpers/checkout/banking/user-identification';
import testFilters from '../../support/filters';

testFilters([''], () => {
  context('Banking Checkout Steps Reload', () => {
    before(() => {
      cy.visit('/');
      register.registerUser(registrationUser);
      register.login(registrationUser.email, registrationUser.password);
    });

    it('Should register a new user and start Credit Card checkout', () => {
      checkout.waitConsent();
      banking.startBankingCheckout('Credit Card');
      //comparison table
      checkout.checkCheckoutStep('Your Credit Card Application', '7');
      banking.checkBankingProgressBar();
      cy.reload();
      checkout.checkCheckoutStep('Your Credit Card Application', '7');
      banking.checkBankingComparisonPage();
      creditCard.checkCreditCardComparisonTable();
      creditCard.selectPremiumCard();
      //Configure a Product
      checkout.checkCheckoutStep('Your Credit Card Application', '7');
      banking.checkConfigureStep();
      cy.get('.cx-cart-coupon-container').should('not.exist');
      cy.reload();
      checkout.checkCheckoutStep('Your Credit Card Application', '7');
      banking.checkConfigureStep();
      creditCard.populateConfigureStep();
      cy.get('.cx-cart-coupon-container').should('not.exist');
      checkout.clickContinueButton();
      //Add Options
      checkout.checkCheckoutStep('Your Credit Card Application', '7');
      creditCard.checkOptionalProducts();
      checkout.checkCouponsFields();
      cy.reload();
      checkout.checkCheckoutStep('Your Credit Card Application', '7');
      creditCard.checkOptionalProducts();
      creditCard.checkMiniCartCreditCard();
      checkout.checkCouponsFields();
      checkout.checkBackAndContinueButtons();
      checkout.clickContinueButton();
      //Personal Details
      checkout.checkCheckoutStep('Your Credit Card Application', '7');
      checkout.checkPersonalDetailsPage();
      checkout.checkCouponsFields();
      cy.reload();
      checkout.checkCheckoutStep('Your Credit Card Application', '7');
      checkout.checkPersonalDetailsPage();
      checkout.checkCouponsFields();
      banking.populateAddressInfo();
      banking.populatePersonalDetailsCCandLoan();
      banking.populateAdditionalApplicantCCandLoan();
      checkout.clickContinueButton();
      //Quote Review
      banking.checkBankingProgressBar();
      checkout.checkAccordions('quoteReviewWithoutOptional');
      creditCard.checkMiniCartCreditCard();
      checkout.checkCouponsFields();
      cy.reload();
      banking.checkBankingProgressBar();
      checkout.checkAccordions('quoteReviewWithoutOptional');
      creditCard.checkMiniCartCreditCard();
      checkout.checkCouponsFields();
      checkout.checkBackAndContinueButtons();
      checkout.clickContinueButton();
      checkout.ConfirmBindQuote();
      //Legal Information
      checkout.checkCheckoutStep('Your Credit Card Application', '7');
      banking.checkLegalInformationPage();
      cy.reload();
      checkout.checkCheckoutStep('Your Credit Card Application', '7');
      banking.checkLegalInformationPage();
      checkout.clickContinueButton();
      //User Identification
      checkout.checkCheckoutStep('Your Credit Card Application', '7');
      userIdentification.checkUserIdentificationPage();
      cy.reload();
      checkout.checkCheckoutStep('Your Credit Card Application', '7');
      userIdentification.checkUserIdentificationPage();
      userIdentification.selectUserIdentification('At the Nearest Branch');
      //Order Confirmation
      checkout.checkOrderConfirmation();
      checkout.checkAccordions('creditCardConfirmation');
      cy.reload();
      //User is redirected to homepage
      cy.get('.SiteLogo').should('be.visible');
      cy.get('cx-fs-enriched-responsive-banner').should('be.visible');
    });
  });
});
