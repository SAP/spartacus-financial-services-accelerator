import * as register from '../../../helpers/register';
import * as travelCheckout from '../../../helpers/checkout/insurance/travel-checkout';
import { registrationUser } from '../../../sample-data/users';
import * as checkout from '../../../helpers/checkout/checkoutSteps';
import * as payment from '../../../helpers/checkout/insurance/payment';
import * as inbox from '../../../helpers/my-account/inbox';

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
    travelCheckout.populateInsuranceInfoForm();
    checkout.clickContinueButton();
  });

  it('Add main product to the cart', () => {
    travelCheckout.checkTravelComparisonTable();
    travelCheckout.selectSingleBudgetPlan();
  });

  it('Add optional product to the cart', () => {
    travelCheckout.checkOptionalProductsAndPick();
    checkout.clickContinueButton();
  });

  it('Populate personal details', () => {
    checkout.populatePersonalDetailsPage();
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
  });

  it('Select default payment details', () => {
    payment.selectPaymentMethodInvoice();
    checkout.clickContinueButton();
  });

  it('Place order on final review pages', () => {
    checkout.placeOrderOnFinalReview();
  });

  it('Check order confirmation', () => {
    checkout.checkOrderConfirmation();
    checkout.checkAccordions('travelFinalReview');
  });

  it('Check inbox', () => {
    cy.selectOptionFromDropdown({
      menuOption: 'My Account',
      dropdownItem: 'Inbox',
    });
    inbox.checkInboxComponets();
    inbox.checkGeneralTab();
  });
});
