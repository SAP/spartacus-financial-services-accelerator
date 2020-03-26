import * as register from '../../../helpers/register';
import {
  registrationUser,
  registrationUserWithoutPhone,
} from '../../../sample-data/users';

context('Register', () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.visit('/');
  });

  it('should be able to register user with phone number', () => {
    register.registerUser(registrationUser);
    register.login(registrationUser.email, registrationUser.password);
    register.validatePhoneNumber(registrationUser.phoneNumber);
    register.logout();
  });

  it('should be able to register user without phone number', () => {
    cy.window().then(win => win.sessionStorage.clear());
    register.registerUser(registrationUserWithoutPhone);
    register.login(
      registrationUserWithoutPhone.email,
      registrationUserWithoutPhone.password
    );
    register.validatePhoneNumber('');
    register.logout();
  });
});
