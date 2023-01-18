import * as register from '../../helpers/register';
import * as travelCheckout from '../../helpers/checkout/insurance/travel-checkout';
import { registrationUser } from '../../sample-data/users';
import * as checkout from '../../helpers/checkout/checkout-steps';
import * as payment from '../../helpers/checkout/insurance/payment';
import * as inbox from '../../helpers/my-account/inbox';
import testFilters from '../../support/filters';

testFilters(['smoke'], () => {
  context('Travel Insurance Checkout', () => {
    before(() => {
      cy.visit('/');
      register.registerUser(registrationUser);
      register.login(registrationUser.email, registrationUser.password);
      checkout.checkMyAccountEmptyPages(
        'Premium Calendar',
        'You have no premiums awaiting payment'
      );
    });

    it('Should open travel category page', () => {
      checkout.startInsuranceCheckout('Travel');
    });

    it('Should populate insurance information form', () => {
      checkout.checkCheckoutStep('Your Travel Insurance', '7');
      checkout.checkProgressBarInsurance();
      travelCheckout.populateTripInformation();
      checkout.clickContinueButton();
    });

    it('Should add main product to the cart', () => {
      travelCheckout.checkSingleTravelComparisonTable();
      travelCheckout.selectSingleBudgetPlan();
    });

    it('Should add optional product to the cart', () => {
      travelCheckout.checkSingleOptionalProductsAndPick();
      checkout.clickContinueButton();
    });

    it('Should populate personal details', () => {
      checkout.populatePersonalDetailsPage();
      cy.wait(7000);
      travelCheckout.checkTravelMiniCart();
      checkout.clickContinueButton();
    });

    it('Should bound a quote', () => {
      checkout.checkCheckoutStep('Your Travel Insurance', '7');
      checkout.checkProgressBarInsurance();
      travelCheckout.checkTravelMiniCart();
      checkout.checkAccordions('generalQuoteAccordions');
      checkout.clickContinueButton();
      checkout.ConfirmBindQuote();
      checkout.checkAccordions('generalQuoteAccordions');
      checkout.clickContinueButton();
    });

    it('Should select default payment details', () => {
      payment.selectPaymentMethodInvoice();
      checkout.clickContinueButton();
    });

    it('Should place an order on final review pages', () => {
      checkout.placeOrderOnFinalReview();
    });

    it('Should check order confirmation', () => {
      checkout.checkOrderConfirmation();
      cy.get('.enriched-banner-title')
        .should('be.visible')
        .contains(
          "Don't worry while you're gone, secure your home too and enjoy your trip! Your coupon code for Homeowners insurance FSA-HOME-COUPON."
        );
      cy.get('.enriched-banner-styled-text')
        .should('be.visible')
        .contains('Get a Quote for Home insurance');
      checkout.checkAccordions('travelFinalReview');
    });

    it('Should check inbox', () => {
      cy.get('cx-fs-message-notification').within(() => {
        cy.get('.icon-envelope').click();
      });
      travelCheckout.checkInboxMessages();
    });
  });
});
