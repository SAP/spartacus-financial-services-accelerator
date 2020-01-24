import * as register from '../../../helpers/register';
import registrationUser, {
  registrationUserWithoutPhone,
} from '../../../sample-data/users';
import * as consentManagement from '../../../helpers/consentManagement';

context('Consent Management', () => {
  before(() => {
    cy.visit('/');
  });

  it('should check anonymous consent', () => {
    consentManagement.checkAnonymousConsent();
  });

  it('should check anonymous consent in registration form', () => {
    cy.get('cx-login a').click();
    cy.get('.register')
      .findByText('Register')
      .click({ force: true });
    cy.get('input[type="checkbox"]')
      .first()
      .should('be.checked');
  });

  it('should register a new user', () => {
    register.registerUser(registrationUserWithoutPhone);
    cy.wait(3000);
    register.login(
      registrationUserWithoutPhone.email,
      registrationUserWithoutPhone.password
    );
    cy.wait(1500);
  });

  it('should check consent management page', () => {
    cy.selectOptionFromDropdown({
      menuOption: 'My Account',
      dropdownItem: 'Consent Management',
    });
    cy.get('input[type="checkbox"]')
      .first()
      .should('be.checked');
  });
});
