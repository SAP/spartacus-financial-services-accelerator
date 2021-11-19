import * as register from '../../helpers/register';
import * as travel from '../../helpers/checkout/insurance/travel-checkout';
import { registrationUser } from '../../sample-data/users';
import * as checkout from '../../helpers/checkout/checkout-steps';
import * as payment from '../../helpers/checkout/insurance/payment';
import testFilters from '../../support/filters';

testFilters([''], () => {
  context('Insurance Checkout Steps Reload', () => {
    before(() => {
      cy.visit('/');
      register.registerUser(registrationUser);
      register.login(registrationUser.email, registrationUser.password);
    });

    it('Should open travel category page', () => {
      checkout.waitConsent();
      checkout.startInsuranceCheckout('Travel');
      //Choose a cover Step
      checkout.checkCheckoutStep('Your Travel Insurance', '7');
      checkout.checkProgressBarInsurance();
      cy.reload();
      checkout.checkProgressBarInsurance();
      cy.get('h3').contains('Trip Information');
      cy.get('.cx-cart-coupon-container').should('not.exist');
      travel.populateInsuranceInfoForm();
      checkout.clickContinueButton();
      //What's Included Step
      travel.checkTravelComparisonTable();
      cy.reload();
      checkout.checkCheckoutStep('Your Travel Insurance', '7');
      travel.checkTravelComparisonTable();
      travel.selectSingleBudgetPlan();
      //Add Options Step
      travel.checkOptionalProductsAndPick();
      travel.checkPageComponenth2('Add Options');
      checkout.checkCouponsFields();
      cy.reload();
      checkout.checkCheckoutStep('Your Travel Insurance', '7');
      travel.checkPageComponenth2('Add Options');
      checkout.checkCouponsFields();
      checkout.checkBackAndContinueButtons();
      travel.checkOptionalProducts();
      checkout.clickContinueButton();
      //Personal Details Step
      travel.checkPageComponenth3('Personal Details');
      checkout.checkBackAndContinueButtons();
      checkout.checkCouponsFields();
      cy.reload();
      checkout.checkCheckoutStep('Your Travel Insurance', '7');
      checkout.checkBackAndContinueButtons();
      travel.checkPageComponenth3('Personal Details');
      checkout.checkBackAndContinueButtons();
      checkout.checkCouponsFields();
      checkout.populatePersonalDetailsPage();
      travel.checkTravelMiniCart();
      checkout.clickContinueButton();
      //Bound a Quote
      checkout.checkCheckoutStep('Your Travel Insurance', '7');
      checkout.checkProgressBarInsurance();
      checkout.checkAccordions('generalQuoteAccordions');
      checkout.checkCouponsFields();
      cy.reload();
      checkout.checkCheckoutStep('Your Travel Insurance', '7');
      travel.checkPageComponenth2('Travel Insurance');
      travel.checkTravelMiniCart();
      checkout.checkBackAndContinueButtons();
      checkout.checkCouponsFields();
      checkout.clickContinueButton();
      checkout.ConfirmBindQuote();
      checkout.checkAccordions('generalQuoteAccordions');
      checkout.clickContinueButton();
      //Select Payment Method
      travel.checkPageComponenth3('Payment Details');
      cy.get('cx-fs-payment-method').should('be.visible');
      cy.get('.cx-cart-coupon-container').should('not.exist');
      checkout.checkBackAndContinueButtons();
      cy.reload();
      travel.checkPageComponenth3('Payment Details');
      cy.get('cx-fs-payment-method').should('be.visible');
      cy.get('.cx-cart-coupon-container').should('not.exist');
      checkout.checkBackAndContinueButtons();
      payment.selectPaymentMethodInvoice();
      checkout.clickContinueButton();
      //Final Review
      checkout.checkFinalReviewComponents();
      cy.get('.cx-cart-coupon-container').should('not.exist');
      checkout.checkCheckoutStep('Your Travel Insurance', '7');
      cy.reload();
      checkout.checkCheckoutStep('Your Travel Insurance', '7');
      cy.get('.cx-cart-coupon-container').should('not.exist');
      checkout.checkFinalReviewComponents();
      //Place an Order
      checkout.placeOrderOnFinalReview();
      //Order Confirmation
      checkout.checkOrderConfirmation();
      checkout.checkAccordions('travelFinalReview');
      cy.reload();
      //User is redirected to homepage
      cy.get('.SiteLogo').should('be.visible');
      cy.get('cx-fs-enriched-responsive-banner').should('be.visible');
    });
  });
});
