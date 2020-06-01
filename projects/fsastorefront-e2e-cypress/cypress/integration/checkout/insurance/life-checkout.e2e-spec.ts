import * as life from '../../../helpers/checkout/insurance/life-checkout';
import * as register from '../../../helpers/register';
import { registrationUser } from '../../../sample-data/users';
import * as checkout from '../../../helpers/checkout/checkoutSteps';
import { clickContinueButton } from '../../../helpers/checkout/checkoutSteps';
import {
  addPaymentMethod,
  selectPaymentMethod,
} from '../../../helpers/checkout/insurance/payment';
import { checkMyPoliciesPage } from '../../../helpers/my-account/policies';

context('Life Insurance Checkout', () => {
  before(() => {
    cy.visit('/');
  });

  describe('Life Checkout', () => {
    it('Should open life category page', () => {
      //TODO: Can we do this better
      cy.selectOptionFromDropdown({
        menuOption: 'Insurance',
        dropdownItem: 'Life',
        nextPageUrlPart: 'Insurance',
      });
      cy.get('.enriched-banner-styled-text')
        .contains(' Get a Quote')
        .click();
    });

    it('Should check progress bar', () => {
      checkout.checkProgressBarInsurance('Your Life Insurance');
    });

    it('Should populate first checkout step', () => {
      life.populateFirstStep();
      clickContinueButton();
    });

    it('Should check comparison table and select Basic as main product', () => {
      life.checkLifeComparisonTable();
      life.selectBasicLifeProduct();
    });

    it('Should check comparison table and add Payment protection', () => {
      life.checkOptionalProductsAddRenewalOption();
      life.checkLifeBasicMiniCart();
      clickContinueButton();
    });

   it('Should check login page and register a new user', () => {
      register.registerUser(registrationUser);
      register.login(registrationUser.email, registrationUser.password);
      addPaymentMethod(registrationUser.email);
     cy.get('.SiteLogo').should('be.visible').click();
     cy.selectOptionFromDropdown({
       menuOption: 'Insurance',
       dropdownItem: 'Life',
       nextPageUrlPart: 'Insurance',
     });
     cy.get('.enriched-banner-styled-text')
       .contains(' Get a Quote')
       .click();
    cy.get('[name=lifeWhoCovered]')
      .eq(1)
      .click();
    cy.wait(1000);
    life.populateSecondPerson();
    clickContinueButton();

    life.checkLifeComparisonTableSecondPerson();
    life.selectBasicLifeProduct();
    life.checkOptionalProductsAddRenewalOption();
    life.checkLifeBasicMiniCartSecondPerson();
    clickContinueButton();
    checkout.populatePersonalDetailsPage();
    checkout.checkProgressBarInsurance('Your Life Insurance');
    clickContinueButton();
    //checkout.checkProgressBarInsurance();
    life.checkLifeBasicMiniCartSecondPerson();
    checkout.checkAccordions('lifeQuoteReview');
     cy.get('.primary-button').should('not.be.visible');
/*    checkout.ConfirmBindQuote();
    selectPaymentMethod();
    checkout.placeOrderOnFinalReview();
    checkout.checkAccordions('lifeFinalReview');
    checkout.checkOrderConfirmation();*/
     cy.selectOptionFromDropdown({
       menuOption: 'My Account',
       dropdownItem: 'Quotes & Applications',
     });
     cy.get('cx-fs-quotes').within(() => {
       cy.get('.info-card').should('have.length', 1);
       cy.get('h6').should('have.text', ' Life Insurance ');
       cy.get('.label').contains('Basic Life Insurance');
       cy.get('.label').contains('Quote status');
       cy.get('.value').contains('Unfinished');
       cy.get('.value').contains('€28.10');


     });




  });
  });

 /*   it('Should start checkout from start with second person', () => {

    });

    it('Should populate data for second person', () => {
      //TODO;


    });*/

    /*it('Should populate personal details page and continue', () => {

      });*/
/*
    it('Should check quote review page', () => {

        });

    it('Select default payment details', () => {
    });

    it('Place order on final review page', () => {
    });

    it('Check order confirmation', () => {

      });

    it('Check my policies page', () => {
      checkMyPoliciesPage();
      cy.get('.title').contains('Life Insurance');
      register.validatePhoneNumber(registrationUser.phoneNumber);
      });
  });*/
});
