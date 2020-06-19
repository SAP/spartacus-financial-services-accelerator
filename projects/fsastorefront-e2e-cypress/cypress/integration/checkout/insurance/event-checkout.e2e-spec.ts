import * as register from '../../../helpers/register';
import {
  registrationUser,
  registrationUserWithoutPhone,
} from '../../../sample-data/users';
import * as checkout from '../../../helpers/checkout/checkoutSteps';
import * as renters from '../../../helpers/checkout/insurance/renters-checkout';
import * as event from '../../../helpers/checkout/insurance/event-checkout';
import { clickContinueButton } from '../../../helpers/checkout/checkoutSteps';
import {
  addPaymentMethod,
  selectPaymentMethod,
} from '../../../helpers/checkout/insurance/payment';
import { checkMyPoliciesPage } from '../../../helpers/my-account/policies';

context('Event Checkout', () => {
  before(() => {
    cy.visit('/');
  });

  it('Should register a new user', () => {
    register.registerUser(registrationUser);
    register.login(registrationUser.email, registrationUser.password);
  });

  it('Should open event category page', () => {
    checkout.waitForHomepage();
    checkout.startInsuranceCheckout('Event');
  });

  it('Should check comparison table', () => {
    cy.get('h2').contains('Your Event Insurance');
    cy.get('.progress-inner-wrapper').should('have.length', '6');
    event.checkProgressBarEvent();
    checkout.checkInsuranceComparisonPage('4');
    event.checkEventComparisonTable();
    event.selectTwoStarEvent();
  });

  it('Should check add options page', () => {
    cy.get('h2').contains('Your Event Insurance');
    cy.get('.progress-inner-wrapper').should('have.length', '6');
    event.checkOptionalProducts();
    //event.checkMiniCartEvent();
    checkout.removeOptionalProduct('Excess Waiver');
    //event.checkMiniCartEventRemovedProduct();
    checkout.clickContinueButton();
  });

  it('Should populate personal details page', () => {
    cy.get('h2').contains('Your Event Insurance');
    cy.get('.progress-inner-wrapper').should('have.length', '6');
    checkout.checkPersonalDetailsPage();
    event.populatePersonalDetails();
    clickContinueButton();
  });
  it('Should check quote review page', () => {
    cy.get('h2').contains('Your Event Insurance');
    cy.get('.progress-inner-wrapper').should('have.length', '6');
    event.checkProgressBarEvent();
    //renters.checkMiniCartRentersRemovedProduct();
    checkout.clickContinueButton();
    //TODO: should be general accordion
    checkout.checkAccordions('currentAccount');
    addPaymentMethod(registrationUser.email);
    checkout.clickContinueButton();
    checkout.ConfirmBindQuote();
  });

  it('Select default payment details', () => {
    selectPaymentMethod();
  });

  it('Place order on final review page', () => {
    checkout.placeOrderOnFinalReview();
  });

  it('Check order confirmation', () => {
    checkout.checkAccordions('currentAccount');
    checkout.checkOrderConfirmation();
  });

  it('Check my policies page', () => {
    checkMyPoliciesPage();
    event.checkEventPolicy();
  });
});
