export interface RegisterUser {
  titleCode: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  phoneNumber: string;
  email: string;
  password: string;
}

export function registerUser({
  titleCode,
  firstName,
  lastName,
  password,
  email,
  phoneNumber,
  dateOfBirth,
}: RegisterUser) {
  cy.getByText(/Sign in \/ Register/i).click();
  cy.get('cx-page-layout')
    .getByText('Register')
    .click({ force: true });
  cy.get('fsa-register form').within(() => {
    cy.get('[formcontrolname="titleCode"]').select(titleCode);
    cy.get('[formcontrolname="firstName"]').type(firstName);
    cy.get('[formcontrolname="lastName"]').type(lastName);
    cy.get('[formcontrolname="dateOfBirth"]').type(dateOfBirth);
    if (phoneNumber !== '') {
      cy.get('[formcontrolname="phoneNumber"]').type(phoneNumber);
    }
    cy.get('[formcontrolname="email"]').type(email);
    cy.get('[formcontrolname="password"]').type(password);
    cy.get('[formcontrolname="passwordconf"]').type(password);
    cy.get('[formcontrolname="termsandconditions"]').check();
    cy.get('button[type="submit"]').click();
  });
}

export function validatePhoneNumber(expectedValue: string) {
  cy.get('[aria-label="My Account"]').invoke('mouseover');
  cy.getByText('Personal Details').click({ force: true });
  cy.get('[formcontrolname="phoneNumber"]').should('have.value', expectedValue);
}

export function login(username: string, password: string) {
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
  cy.getByText('Logout').click();
}
