import * as register from '../../helpers/register';
import { createSeller, rootAdmin, newSeller } from '../../sample-data/users';
import * as groupPolicy from '../../helpers/checkout/group-policy';
import testFilters from '../../support/filters';
import {
  changePassword,
  checkCustomerList,
  checkDashboard,
  checkDashboardOverview,
  goToCustomerDashboard,
  goToDashboard,
} from '../../helpers/checkout/obo';
import * as homepage from '../../helpers/homepage';
import { sellerIndira } from '../../sample-data/users';

testFilters([''], () => {
  context('Seller creates banking and insurance quote', () => {
    before(() => {
      cy.visit('/login');
    });

    it('Should login as root admin and creates a new seller', () => {
      register.loginInUser(rootAdmin.email, rootAdmin.password);
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
      changePassword();
      cy.get('.SiteLogo').should('be.visible').click();
      register.logout();
    });

    it('Should login as seller and check seller dashboard', () => {
      cy.get('cx-login').should('be.visible').click();
      register.loginInUser(sellerIndira.email, sellerIndira.password);
      homepage.checkPageElements();
      goToDashboard();
      cy.get('h5').contains('Your Profile');
      checkDashboard('Name', 'Indira Duffy');
      checkDashboardOverview();
    });

    it('Should check customer dashboard', () => {
      checkCustomerList();
      goToCustomerDashboard('Stephen Bailey');
      cy.get('span.semi-bold').contains('Address Info:');
      cy.get('span.link').contains('Add address');
    });

    it('Should login as seller and creates new customer', () => {
      register.logout();
      homepage.checkPageElements();
      cy.get('cx-login').click();
      register.loginInUser(newSeller.email, newSeller.password);
    });
  });
});
