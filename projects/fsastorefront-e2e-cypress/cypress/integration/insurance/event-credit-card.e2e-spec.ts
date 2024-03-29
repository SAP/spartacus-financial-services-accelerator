import * as register from '../../helpers/register';
import { registrationUser } from '../../sample-data/users';
import * as checkout from '../../helpers/checkout/checkout-steps';
import * as event from '../../helpers/checkout/insurance/event-checkout';
import * as myAccount from '../../helpers/my-account/my-account';
import testFilters from '../../support/filters';

testFilters(['smoke'], () => {
  context('Event Checkout', () => {
    before(() => {
      cy.visit('/');
      cy.get('cx-fs-enriched-responsive-banner').should('be.visible');
    });

    it('Should register a new user', () => {
      register.registerUser(registrationUser);
      register.login(registrationUser.email, registrationUser.password);
    });

    it('Should check empty order history page', () => {
      myAccount.orderHistoryPage();
      myAccount.checkEmptyOrderHistoryPage();
    });

    it('Should open event category page', () => {
      cy.get('.alert-success')
        .should('be.visible')
        .within(() => {
          cy.get('cx-icon').click({ multiple: true });
        });
      checkout.startInsuranceCheckout('Event');
    });

    it('Should check comparison table', () => {
      checkout.checkCheckoutStep('Your Event Insurance', '6');
      event.checkProgressBarEvent();
      checkout.checkInsuranceComparisonPage('4');
      event.checkEventComparisonTable();
      event.selectMainProductEvent('Two Star Event Plan', '0');
    });

    it('Should check add options page', () => {
      checkout.checkCheckoutStep('Your Event Insurance', '6');
      event.checkOptionalProductsTwoStar();
      event.checkMiniCart();
      checkout.removeOptionalProduct('Excess Waiver');
      event.checkMiniCartRemovedProduct();
      checkout.clickContinueButton();
    });

    it('Should populate personal details page', () => {
      checkout.checkCheckoutStep('Your Event Insurance', '6');
      checkout.checkPersonalDetailsPage();
      checkout.addCoupon('notValid');
      cy.get('.alert-danger').should('be.visible');
      event.populatePersonalDetails();
      event.checkMiniCartRemovedProduct();
      checkout.addCoupon('FSA10DISC');
      cy.get('.alert-success').should('be.visible');
      checkout.populatePersonalDetailsPage();
      checkout.appliedCoupon();
      cy.wait(3000);
      checkout.clickContinueButton();
    });

    it('Should check quote review page', () => {
      checkout.checkPageURL(checkout.pages.quoteReview);
      checkout.checkCheckoutStep('Your Event Insurance', '6');
      event.checkProgressBarEvent();
      checkout.checkAccordions('threeAccordions');
      event.checkMiniCartWithCoupon();
      checkout.clickContinueButton();
      checkout.ConfirmBindQuote();
      checkout.checkAccordions('threeAccordions');
      checkout.clickContinueButton();
    });

    it('Should select default payment details', () => {
      checkout.populatePaymentCreditCard();
      cy.get('.btn-primary').contains('Continue').click();
    });

    it('Should place order on final review page', () => {
      checkout.placeOrderOnFinalReview();
    });

    it('Should check order confirmation', () => {
      checkout.checkAccordions('threeAccordions');
      checkout.checkOrderConfirmation();
    });

    it('Close account for user', () => {
      cy.selectOptionFromMyAccount({
        dropdownItem: 'Close Account',
      });
      myAccount.checkCloseAccountPage();
      myAccount.closeAccount();
    });

    it('Should check that user with closed account cannot login', () => {
      cy.visit('/login');
      register.login(registrationUser.email, registrationUser.password);
      cy.get('.alert-danger').should(
        'contain.text',
        'User is disabled. Please login again.'
      );
    });
  });
});
