import * as travelCheckout from '../../../helpers/checkout/insurance/travel-checkout';
import * as register from '../../../helpers/register';
import { registrationUser } from '../../../sample-data/users';
import * as checkout from '../../../helpers/checkout/checkoutSteps';

context('Retrieve Quote', () => {
  before(() => {
    cy.visit('/');
    register.registerUser(registrationUser);
    register.login(registrationUser.email, registrationUser.password);
  });

  describe('Create and Retrieve Travel Quote', () => {
    it('Should open travel category page', () => {
      travelCheckout.openCategoryPage();
    });
    it('Should populate insurance information form', () => {
      travelCheckout.populateInsuranceInfoForm();
    });

    it('Add main product to the cart', () => {
      travelCheckout.checkTravelComparisonTable();
      travelCheckout.selectSingleBudgetPlan();
    });

    it('Add optional product to the cart', () => {
      travelCheckout.checkOptionalProductsAndPick();
    });

    it('Should visit applications page and check if there is one quote created', () => {
      cy.selectOptionFromDropdown({
        menuOption: 'My Account',
        dropdownItem: 'Quotes & Applications',
        nextPageUrlPart: 'my-financial-applications',
      });
      cy.get('cx-fs-quotes').should('have.length', 1);
    });

    it('Should retrieve a quote and check if the user is on the correct page', () => {
      cy.get('.link').contains('Retrieve').click({ force: true });
      cy.wait(1000);
      checkout.checkCheckoutStep('Your Travel Insurance', '7');
      cy.get('h2').contains('Add Options');
    });
  });
});
