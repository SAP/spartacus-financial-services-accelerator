import { registrationUser } from '../../sample-data/users';
import * as register from '../../helpers/register';
import * as auto from '../../helpers/checkout/insurance/auto';
import * as autoIntegration from '../../helpers/checkout/insurance/auto-integrations';
import * as checkout from '../../helpers/checkout/checkout-steps';
import testFilters from '../../support/filters';
import { checkPageElements } from '../../helpers/homepage';
import { checkMyQuotesPage } from '../../helpers/my-account/quotes-and-applications';
import { retrieveQuote } from '../../helpers/my-account/my-account';
import * as savings from '../../helpers/checkout/insurance/savings-checkout';

testFilters([''], () => {
  context('Complete checkout not in the same session', () => {
    before(() => {
      cy.visit('/');
    });

    it('Should register a new user', () => {
      register.registerUser(registrationUser);
      register.login(registrationUser.email, registrationUser.password);
    });

    it('Should start auto checkout', () => {
      checkout.waitConsent();
      checkout.startInsuranceCheckout('Auto');
      auto.populateAutoAnnuallyBMW();
      auto.populateMainDriverInfo();
      cy.get('[name=noOfDrivers]').select('0');
      checkout.clickContinueButton();
      autoIntegration.selectAutoSilver();
      auto.addOptionalProductsSilver();
      checkout.clickContinueButton();
      auto.populatePersonalDetails();
      auto.populateVehicleDetails();
      auto.populateMainDriverData();
      checkout.clickContinueButton();
    });

    it('Should logout / login and change main product ', () => {
      cy.get('.SiteLogo').should('be.visible').click();
      register.logout();
      checkPageElements();
      cy.get('cx-login').click();
      register.login(registrationUser.email, registrationUser.password);
      checkMyQuotesPage();
      retrieveQuote('1', 'Auto Insurance');
      //TODO: add changing main product once bug is resolved
      checkout.checkCheckoutStep('Your Auto Insurance', '7');
      checkout.checkProgressBarInsurance();
      checkout.clickContinueButton();
    });

    it('Should bind auto quote', () => {
      checkout.checkPersonalDetailsPage();
      auto.populateMainDriverData();
      checkout.clickContinueButton();
      checkout.checkCheckoutStep('Your Auto Insurance', '7');
      checkout.checkProgressBarInsurance();
      checkout.checkAccordions('generalQuoteAccordions');
      checkout.clickContinueButton();
      checkout.ConfirmBindQuote();
      checkout.checkAccordions('generalQuoteAccordions');
      cy.get('.SiteLogo').should('be.visible').click();
    });

    it('Should start Savings checkout', () => {
      checkout.startInsuranceCheckout('Savings');
      checkout.checkCheckoutStep('Your Savings Insurance', '7');
      checkout.checkProgressBarInsurance();
      checkout.checkFirstCheckoutStep('Coverage');
      savings.populateCoverageInformation();
      checkout.clickContinueButton();
      checkout.checkCheckoutStep('Your Savings Insurance', '7');
      checkout.checkProgressBarInsurance();
      savings.checkComparisonPage();
      savings.checkSavingsComparisonTable();
      savings.selecBalancedDeal();
      checkout.checkCheckoutStep('Your Savings Insurance', '7');
      savings.checkOptionalProductsBalancedDeal();
      savings.checkMiniCart();
      checkout.clickContinueButton();
    });

    it('Should logout / login and retrieve quotes ', () => {
      cy.get('.SiteLogo').should('be.visible').click();
      register.logout();
      checkPageElements();
      cy.get('cx-login').should('be.visible').click();
      register.login(registrationUser.email, registrationUser.password);
      checkMyQuotesPage();
      retrieveQuote('2', 'Savings Insurance');
      cy.get('h2').should('contain.text', 'Savings Insurance');
      checkout.checkCheckoutStep('Your Savings Insurance', '7');
      checkout.checkProgressBarInsurance();
      cy.get('.section-header-heading').should('contain.text', 'Add Options');
      cy.get('.SiteLogo').should('be.visible').click();
      retrieveQuote('2', 'Auto Insurance');
      checkout.checkCheckoutStep('Your Auto Insurance', '7');
      checkout.checkProgressBarInsurance();
      checkout.checkAccordions('generalQuoteAccordions');
    });
  });
});
