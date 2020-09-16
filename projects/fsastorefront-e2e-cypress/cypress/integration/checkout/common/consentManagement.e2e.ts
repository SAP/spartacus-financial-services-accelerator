import * as consentManagement from '../../../helpers/consentManagement';
import * as register from '../../../helpers/register';
import { registrationUserWithoutPhone } from '../../../sample-data/users';

context('Consent Management', () => {
  before(() => {
    cy.visit('/');
  });

  it('should check anonymous consent', () => {
    consentManagement.checkAnonymousConsent();
  });

  it('should check anonymous consent in registration form', () => {
    cy.get('cx-login a').click();
    cy.get('.register').findByText('Register').click({ force: true });
    //TODO: Bug FSA-5303
    cy.get('input[type="checkbox"]').first().should('be.checked');
  });

  it('should register a new user', () => {
    register.registerUser(registrationUserWithoutPhone);
    register.login(
      registrationUserWithoutPhone.email,
      registrationUserWithoutPhone.password
    );
  });

  it('should check consent management page', () => {
    cy.selectOptionFromDropdown({
      menuOption: 'My Account',
      dropdownItem: 'Consent Management',
    });
    cy.get('input[type="checkbox"]').first().should('be.checked');
  });
});
