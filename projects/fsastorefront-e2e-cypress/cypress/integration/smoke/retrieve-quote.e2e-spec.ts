import * as register from '../../helpers/register';
import { registrationUser } from '../../sample-data/users';
import * as travelCheckout from '../../helpers/checkout/travel/travel-checkout';

context('Applications Page', () => {
  before(() => {
    cy.visit('/');
    register.registerUser(registrationUser);
    cy.wait(3000);
    register.login(registrationUser.email, registrationUser.password);
    cy.wait(1500);
  });

  describe('Checkout', () => {
    it('Should open travel category page', () => {
      travelCheckout.openCategoryPage();
    });
    it('Should populate insurance information form', () => {
      travelCheckout.populateInsuranceInfoForm();
    });

    it('Add main product to the cart', () => {
      travelCheckout.checkComparisonAndAddProduct();
    });

    it('Add optional product to the cart', () => {
      travelCheckout.checkOptionalProductsAndPick();
      cy.wait(1000);
    });

    it('Should visit applications page and check if there is one quote created', () => {
      cy.selectOptionFromDropdown({
        menuOption: 'My Account',
        dropdownItem: 'Applications',
      });
      cy.wait(1500);
      cy.get('fsa-quotes').should('have.length', 1);
    });

    it('Should retrieve a quote and check if the user is on the correct page', () => {
      cy.get('fsa-quotes').within(() => {
        cy.get('.primary-button').click({ force: true });
      });
      cy.url().should('include', 'add-options');
      cy.get('.is-active').within(() => {
        cy.get('p').contains('Add Options');
      });
    });
  });
});
