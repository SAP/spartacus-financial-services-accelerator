import * as life from '../../../helpers/checkout/insurance/life-checkout';
import * as register from '../../../helpers/register';
import { registrationUser } from '../../../sample-data/users';
import * as checkout from '../../../helpers/checkout/checkoutSteps';
import * as policies from '../../../helpers/my-account/policies';

context('Life Insurance Checkout', () => {
  before(() => {
    cy.visit('/');
  });

  it('Should open life category page', () => {
    checkout.waitForHomepage();
    checkout.startInsuranceCheckout('Life');
  });

  it('Should check progress bar', () => {
    checkout.checkCheckoutStep('Your Life Insurance', '7');
    checkout.checkProgressBarInsurance();
  });

  it('Should complete life checkout', () => {
    //populate first step
    cy.get('cx-form-component').should('be.visible');
    cy.get('h3').contains('Coverage Information');
    life.populateFirstStep();
    checkout.clickContinueButton();
    //check comparison table
    life.checkLifeComparisonTable();
    life.selectBasicLifeProduct();
    //check and add optional products
    life.checkOptionalProductsAddRenewalOption();
    //life.checkLifeBasicMiniCart();
    checkout.clickContinueButton();
    //register new user in checkout
    register.registerUser(registrationUser);
    register.login(registrationUser.email, registrationUser.password);
    cy.get('.SiteLogo')
      .should('be.visible')
      .click();
    checkout.startInsuranceCheckout('Life');
    cy.wait(500);
    cy.get('[name=lifeWhoCovered]')
      .eq(1)
      .click();
    life.populateSecondPerson();
    checkout.clickContinueButton();
    //check comparison table when second person is added
    life.checkLifeComparisonTableSecondPerson();
    life.selectBasicLifeProduct();
  });

  it('Should check optional products', () => {
    life.checkOptionalProductsAddRenewalOption();
    //life.checkLifeBasicMiniCartSecondPerson();
    checkout.clickContinueButton();
  });

  it('Should check and populate personal details step', () => {
    checkout.checkPersonalDetailsPage();
    checkout.populatePersonalDetailsPage();
    checkout.clickContinueButton();
  });

  it('Should check quote review step', () => {
    checkout.checkCheckoutStep('Your Life Insurance', '7');
    checkout.checkProgressBarInsurance();
    //life.checkLifeBasicMiniCartSecondPerson();
    checkout.checkAccordions('generalQuoteAccordions');
    cy.get('.primary-button').should('not.be.visible');
  });

  it('Should check quote review step', () => {
    policies.checkMyQuotesPage();
    life.checkLifeQuote();
  });
});
