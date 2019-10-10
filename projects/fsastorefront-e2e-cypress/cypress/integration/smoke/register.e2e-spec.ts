import * as register from '../../helpers/register';
import {
  registrationUser,
  registrationUserWithoutPhone,
} from '../../sample-data/users';

context('Register', () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.visit('/');
  });

  it('should be able to register user with phone number', () => {
    register.registerUser(registrationUser);
    cy.wait(3000);
    cy.visit('/login');
    register.login(registrationUser.email, registrationUser.password);
    cy.wait(1500);
    register.validatePhoneNumber(registrationUser.phoneNumber);
    register.logout();
  });

  it('should be able to register user without phone number', () => {
    cy.window().then(win => win.sessionStorage.clear());
    register.registerUser(registrationUserWithoutPhone);
    cy.wait(3000);
    cy.visit('/login');
    cy.wait(1500);
    register.login(
      registrationUserWithoutPhone.email,
      registrationUserWithoutPhone.password
    );
    register.validatePhoneNumber(registrationUserWithoutPhone.phoneNumber);
    register.logout();
  });
});
