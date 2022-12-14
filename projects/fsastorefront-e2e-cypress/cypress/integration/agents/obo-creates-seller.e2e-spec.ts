import * as register from '../../helpers/register';
import {
  createSeller,
  rootAdmin,
  newSeller,
  createOboCustomer,
} from '../../sample-data/users';
import * as groupPolicy from '../../helpers/checkout/group-policy';
import testFilters from '../../support/filters';
import * as obo from '../../helpers/checkout/obo';
import * as homepage from '../../helpers/homepage';
import * as checkout from '../../helpers/checkout/checkout-steps';
import * as event from '../../helpers/checkout/insurance/event-checkout';
import { checkEmptyMyQuotesPage } from '../../helpers/my-account/quotes-and-applications';

testFilters([''], () => {
  context('Newly created seller creates insurance quote', () => {
    before(() => {
      cy.visit('/login');
    });

    it('Should login as root admin and creates a new seller', () => {
      register.loginUser(rootAdmin.email, rootAdmin.password);
      cy.get('cx-category-navigation').should('contain.text', 'Insurance');
      cy.get('cx-category-navigation').should('contain.text', 'Banking');
      cy.get('cx-fs-dashboard-link').contains('Dashboard');
      groupPolicy.checkGroupPolicyMainPage();
      groupPolicy.checkMembersPage();
      groupPolicy.createNewMember();
      register.createB2bCustomer(createSeller, '2', 'SAP');
      groupPolicy.checkGroupPolicyMainPage();
      groupPolicy.checkMembersPage();
      groupPolicy.enableSeller();
      obo.changePassword();
      cy.get('.SiteLogo').should('be.visible').click();
      cy.visit(
        'https://fsastorefrontapp.c5qs19f9s2-financial1-s4-public.model-t.myhybris.cloud/financial/en/EUR/user-profile/stephen.bailey@sapfsa.com'
      );
      cy.contains('No sufficient permissions to access this page');
      obo.checkDashboard('Dashboard Overview', 'Thomas Schmidt');
      register.logout();
      homepage.checkPageElements();
    });

    it('Should check dashoboard as newly created seller', () => {
      cy.get('cx-login').should('be.visible').click();
      register.loginUser(newSeller.email, newSeller.password);
      homepage.checkPageElements();
      obo.goToDashboard();
      cy.get('h5').contains('Your Profile');
      obo.checkDashboard('Dashboard Overview', 'Jones');
      obo.checkDashboardOverview();
      cy.get('.asset-text').contains('Check Customer List').click();
      cy.get('h3')
        .should('be.visible')
        .contains("You haven't assigned any customers yet");
      cy.get('.asset-text').contains('Add a Customer').click();
      register.createOBOUser(createOboCustomer);
    });

    it('Should check customer dashboard', () => {
      cy.get('.SiteLogo').should('be.visible').click();
      homepage.checkPageElements();
      obo.goToDashboard();
      obo.checkCustomerList('Jenise Moore', 'user_jenise');
      obo.goToCustomerDashboard('Jenise');
      obo.checkDashboard('Customer Profile', 'Jenise');
      obo.checkCustomerOverview();
      obo.checkCustomerProducts();
    });

    it('Should create saving quote', () => {
      obo.selectProduct('Insurances (7)', 'Event', '7');
      checkout.checkCheckoutStep('Your Event Insurance', '6');
      event.checkProgressBarEvent();
      checkout.checkInsuranceComparisonPage('4');
      event.checkEventComparisonTable();
      event.selectMainProductEvent('Five Star Event Plan', '3');
      event.checkOptionalProductsFiveStar();
      checkout.clickContinueButton();
      checkout.checkPersonalDetailsPage();
      checkout.populateCustomerDetails('mrs', 'Jenise', 'Moore');
      cy.get('[name="email"]').type('jenise@moore.com');
      event.populatePersonalDetails();
      checkout.populatePersonalDetailsPage();
      checkout.clickContinueButton();
      checkout.checkAccordions('eventAccordionsNoOptional');
      checkout.clickContinueButton();
      checkout.ConfirmBindQuote();
      cy.contains(
        'Insurance Quote/Application is successfully prepared for the customer'
      );
      checkEmptyMyQuotesPage();
    });
  });
});
