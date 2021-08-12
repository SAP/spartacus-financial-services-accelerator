import * as consentManagement from '../../../helpers/consent-management';
import * as register from '../../../helpers/register';
import { registrationUserWithoutPhone } from '../../../sample-data/users';
import * as myAccount from '../../../helpers/my-account/my-account';
import testFilters from '../../../support/filters';

testFilters([''], () => {
  context('Consent Management', () => {
    before(() => {
      cy.visit('/');
    });

    it('Should check anonymous consent', () => {
      consentManagement.checkAnonymousConsent();
    });

    it('Should check anonymous consent in registration form', () => {
      cy.get('cx-login a').click();
      cy.get('.register').contains('Register').click({ force: true });
      cy.get('input[type="checkbox"]').first().should('be.checked');
    });

    it('Should register a new user', () => {
      register.registerUser(registrationUserWithoutPhone);
      register.login(
        registrationUserWithoutPhone.email,
        registrationUserWithoutPhone.password
      );
    });

    it('Should check Personal Details page', () => {
      cy.selectOptionFromDropdown({
        menuOption: 'My Account',
        dropdownItem: 'Personal Details',
      });
      myAccount.checkPersonalDetails();
    });

    it('Should check consent management page', () => {
      cy.selectOptionFromDropdown({
        menuOption: 'My Account',
        dropdownItem: 'Consent Management',
      });
      cy.get('input[type="checkbox"]').first().should('be.checked');
    });
  });
});
