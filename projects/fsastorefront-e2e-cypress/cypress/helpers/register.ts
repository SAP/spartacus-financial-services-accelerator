export interface RegisterUser {
  titleCode: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  phoneNumber?: string;
  email: string;
  password: string;
}

export function populateRegistrationForm(user: RegisterUser) {
  cy.get('.register').findByText('Register').click({ force: true });
  cy.get('cx-fs-register form').within(() => {
    cy.get('[formcontrolname="titleCode"]').select(user.titleCode);
    cy.get('[formcontrolname="firstName"]').type(user.firstName);
    cy.get('[formcontrolname="lastName"]').type(user.lastName);
    cy.get('[formcontrolname="dateOfBirth"]').type(user.dateOfBirth);
    if (user.phoneNumber) {
      cy.get('[formcontrolname="phoneNumber"]').type(user.phoneNumber);
    }
    cy.get('[formcontrolname="email"]').type(user.email);
    cy.get('[formcontrolname="password"]').type(user.password);
    cy.get('[formcontrolname="passwordconf"]').type(user.password);
    cy.get('[formcontrolname="termsandconditions"]').check();
    cy.get('button[type="submit"]').click();
  });
}

export function registerUser(user: RegisterUser) {
  cy.get('cx-login a').click();
  this.populateRegistrationForm(user);
}

export function validatePhoneNumber(expectedValue: string) {
  cy.selectOptionFromDropdown({
    menuOption: 'My Account',
    dropdownItem: 'Personal Details',
  });
  cy.get('[formcontrolname="phoneNumber"]').should('have.value', expectedValue);
}

export function login(username: string, password: string) {
  cy.get('cx-login-form').should('be.visible');
  cy.get('cx-login-form').within(() => {
    cy.get('[formcontrolname="userId"]').clear().type(username);
    cy.get('[formcontrolname="password"]').clear().type(password);
    cy.get('button[type=submit]').click();
  });
}

export function logout() {
  cy.findByText('Logout').click();
}

export function loginInUser(username: string, password: string) {
  //will be deleted once register user is working correctly
  cy.get('[formcontrolname="userId"]').clear().type(username);
  cy.get('[formcontrolname="password"]').clear().type(password);
  cy.get('button[type=submit]').click();
}
