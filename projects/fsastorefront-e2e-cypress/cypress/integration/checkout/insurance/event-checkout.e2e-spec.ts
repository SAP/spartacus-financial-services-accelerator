import * as register from '../../../helpers/register';
import { registrationUser } from '../../../sample-data/users';
import * as checkout from '../../../helpers/checkout/checkoutSteps';
import * as event from '../../../helpers/checkout/insurance/event-checkout';
import * as payment from '../../../helpers/checkout/insurance/payment';
import { checkMyPoliciesPage } from '../../../helpers/my-account/policies';
import * as myAccount from '../../../helpers/my-account/myAccountPages';
import { waitForCreateAsset } from '../../../helpers/generalHelpers';

let cartId;
context('Event Checkout', () => {
  before(() => {
    cy.visit('/');
  });

  it('Should register a new user', () => {
    register.registerUser(registrationUser);
    register.login(registrationUser.email, registrationUser.password);
    checkout.waitForHomepage();
  });

  it('Should open event category page', () => {
    checkout.startInsuranceCheckout('Event');
  });

  it('Should check comparison table', () => {
    event.checkCheckoutPage();
    event.checkProgressBarEvent();
    checkout.checkInsuranceComparisonPage('4');
    event.checkEventComparisonTable();
    const addToCart = waitForCreateAsset('carts', 'addToCart');
    event.selectTwoStarEvent();
    cy.wait(`@${addToCart}`).then(result => {
      cartId = (<any>result.response.body).code;
    });
  });

  it('Should check add options page', () => {
    event.checkCheckoutPage();
    event.checkOptionalProducts();
    event.checkMiniCart();
    checkout.removeOptionalProduct('Excess Waiver');
    event.checkMiniCartRemovedProduct();
    checkout.clickContinueButton();
  });

  it('Should populate personal details page', () => {
    event.checkCheckoutPage();
    checkout.checkPersonalDetailsPage();
    event.populatePersonalDetails();
    //registration process to be completed
    cy.wait(500);
    checkout.clickContinueButton();
  });

  it('Should check quote review page', () => {
    event.checkCheckoutPage();
    event.checkProgressBarEvent();
    event.checkMiniCartRemovedProduct();
    checkout.checkAccordions('threeAccordions');
    payment.addPaymentMethod(registrationUser.email, cartId);
    checkout.clickContinueButton();
    checkout.ConfirmBindQuote();
    checkout.clickContinueButton();
  });

  it('Select default payment details', () => {
    payment.selectPaymentMethodCard();
    checkout.clickContinueButton();
  });

  it('Place order on final review page', () => {
    checkout.placeOrderOnFinalReview();
  });

  it('Check order confirmation', () => {
    checkout.checkAccordions('threeAccordions');
    checkout.checkOrderConfirmation();
  });

  it('Check my policies page', () => {
    checkMyPoliciesPage();
    event.checkEventPolicy();
  });

  it('Close account for user', () => {
    cy.selectOptionFromDropdown({
      menuOption: 'My Account',
      dropdownItem: 'Close Account',
    });
    cy.wait(500);
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
