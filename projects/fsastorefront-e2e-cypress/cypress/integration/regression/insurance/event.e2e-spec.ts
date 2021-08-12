import * as register from '../../../helpers/register';
import { registrationUser } from '../../../sample-data/users';
import * as checkout from '../../../helpers/checkout/checkout-steps';
import * as event from '../../../helpers/checkout/insurance/event-checkout';
import * as myAccount from '../../../helpers/my-account/my-account';
import testFilters from '../../../support/filters';

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
      checkout.startInsuranceCheckout('Event');
    });

    it('Should check comparison table', () => {
      checkout.checkCheckoutStep('Your Event Insurance', '6');
      event.checkProgressBarEvent();
      checkout.checkInsuranceComparisonPage('4');
      event.checkEventComparisonTable();
      event.selectTwoStarEvent();
    });

    it('Should check add options page', () => {
      checkout.checkCheckoutStep('Your Event Insurance', '6');
      event.checkOptionalProducts();
      event.checkMiniCart();
      checkout.removeOptionalProduct('Excess Waiver');
      event.checkMiniCartRemovedProduct();
      checkout.clickContinueButton();
    });

    it('Should populate personal details page', () => {
      checkout.checkCheckoutStep('Your Event Insurance', '6');
      checkout.checkPersonalDetailsPage();
      event.populatePersonalDetails();
      checkout.populatePersonalDetailsPage();
      event.checkMiniCartRemovedProduct();
      checkout.clickContinueButton();
    });

    it('Should check quote review page', () => {
      checkout.checkCheckoutStep('Your Event Insurance', '6');
      event.checkProgressBarEvent();
      event.checkMiniCartRemovedProduct();
      checkout.checkAccordions('threeAccordions');
      checkout.clickContinueButton();
      checkout.ConfirmBindQuote();
    });

    it('Select default payment details', () => {
      checkout.populatePaymentCreditCard();
      cy.get('.btn-primary').contains('Continue').click();
    });

    it('Place order on final review page', () => {
      checkout.placeOrderOnFinalReview();
    });

    it('Check order confirmation', () => {
      checkout.checkAccordions('threeAccordions');
      checkout.checkOrderConfirmation();
    });

    it('Close account for user', () => {
      cy.selectOptionFromDropdown({
        menuOption: 'My Account',
        dropdownItem: 'Close Account',
      });
      myAccount.checkCloseAccountPage();
      myAccount.closeAccount();
    });

    it('Closed account user cannot login', () => {
      cy.visit('/login');
      register.login(registrationUser.email, registrationUser.password);
      cy.get('.alert-danger').should(
        'have.text',
        'User is disabled. Please login again.'
      );
    });
  });
});
