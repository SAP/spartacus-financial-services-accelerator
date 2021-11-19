import * as life from '../../helpers/checkout/insurance/life-checkout';
import * as register from '../../helpers/register';
import { registrationUser } from '../../sample-data/users';
import * as checkout from '../../helpers/checkout/checkout-steps';
import { checkMyQuotesPage } from '../../helpers/my-account/quotes-and-applications';
import testFilters from '../../support/filters';

testFilters([''], () => {
  context('Life Insurance Checkout', () => {
    before(() => {
      cy.visit('/');
    });

    it('Should open life category page', () => {
      checkout.startInsuranceCheckout('Life');
    });

    it('Should check progress bar', () => {
      checkout.checkCheckoutStep('Your Life Insurance', '7');
      checkout.checkProgressBarInsurance();
    });

    it('Should select main and optional products', () => {
      life.populateFirstStep();
      checkout.clickContinueButton();
      cy.get('cx-fs-sync-pilot-connection-component').should('not.exist');
      life.checkLifeComparisonTable();
      life.selectBasicLifeProduct();
      //check and add optional products
      life.checkOptionalProductsAddRenewalOption();
      life.checkLifeBasicMiniCart();
      checkout.clickContinueButton();
    });

    it('Should register user in checkout and add second person', () => {
      register.registerUser(registrationUser);
      register.login(registrationUser.email, registrationUser.password);
      //BUG: CXFSA-303 workaround
      checkout.startInsuranceCheckout('Life');
      life.addSecondPerson();
      life.populateSecondPerson();
    });

    it('Should select main product', () => {
      checkout.clickContinueButton();
      checkout.checkSyncPilotComparisonTable();
      life.checkLifeComparisonTableSecondPerson();
      life.selectBasicLifeProduct();
    });

    it('Should check optional products', () => {
      life.checkOptionalProductsSecond();
      life.checkLifeBasicMiniCartSecondPerson();
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
      life.checkLifeBasicMiniCartSecondPerson();
      checkout.checkAccordions('quoteReviewWithoutOptional');
      cy.get('.primary-button').contains('Continue').should('not.exist');
    });

    it('Should check quote review step', () => {
      checkMyQuotesPage();
      life.checkLifeQuote();
    });
  });
});
