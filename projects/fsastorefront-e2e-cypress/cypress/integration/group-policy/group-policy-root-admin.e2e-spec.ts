import * as register from '../../helpers/register';
import { rootAdmin, createCustomer } from '../../sample-data/users';
import * as groupPolicy from '../../helpers/checkout/group-policy';
import testFilters from '../../support/filters';

testFilters([''], () => {
  context('Group Policy Rood Admin Checks', () => {
    before(() => {
      cy.visit('/login');
    });

    it('Should login as root admin', () => {
      register.loginInUser(rootAdmin.email, rootAdmin.password);
      cy.get('cx-category-navigation').should('contain.text', 'Insurance');
      cy.get('cx-category-navigation').should('contain.text', 'Banking');
    });

    it('Should create a new group', () => {
      groupPolicy.checkGroupPolicyMainPage();
      groupPolicy.checkUnitsPage();
      groupPolicy.checkCreateUnitPage();
      groupPolicy.populateNewUnitDetails();
      cy.visit('/');
    });

    it('Should create a new member', () => {
      groupPolicy.checkGroupPolicyMainPage();
      groupPolicy.checkUnitsPage();
      cy.visit('/');
      groupPolicy.checkGroupPolicyMainPage();
      groupPolicy.checkMembersPage();
      groupPolicy.createNewMember();
      groupPolicy.checkGroupPolicyMainPage();
      groupPolicy.checkMembersPage();
      groupPolicy.checkMemberIsDisabled();
    });
  });
});
