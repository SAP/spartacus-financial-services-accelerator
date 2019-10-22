export interface RegisterUser {
  titleCode: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  phoneNumber?: string;
  email: string;
  password: string;
}

export function registerUser(user: RegisterUser) {
  cy.findByText(/Sign in \/ Register/i).click();
  cy.get('cx-page-layout')
    .findByText('Register')
    .click({ force: true });
  cy.get('fsa-register form').within(() => {
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

export function validatePhoneNumber(expectedValue: string) {
  cy.get('[aria-label="My Account"]').invoke('mouseover');
  cy.findByText('Personal Details').click({ force: true });
  cy.get('[formcontrolname="phoneNumber"]').should('have.value', expectedValue);
}

export function login(username: string, password: string) {
  cy.visit('/login');
  cy.get('cx-login-form form').should('be.visible');
  cy.get('cx-login-form form').within(() => {
    cy.get('[formcontrolname="userId"]')
      .clear()
      .type(username);
    cy.get('[formcontrolname="password"]')
      .clear()
      .type(password);
    cy.get('button[type=submit]').click();
  });
}

export function logout() {
  cy.findByText('Logout').click();
}
