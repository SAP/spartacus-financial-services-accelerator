import * as register from '../../../helpers/register';
import {
  amosAgent,
  registrationUserWithoutPhone,
} from '../../../sample-data/users';
import * as asm from '../../../helpers/asm';

context('ASM', () => {
  before(() => {
    cy.visit('/?asm=true');
  });

  it('should open asm mode and check asm header', () => {
    asm.checkAsmHeader();
  });

  it('should register a new user', () => {
    register.registerUser(registrationUserWithoutPhone);
    cy.wait(1500);
    register.login(
      registrationUserWithoutPhone.email,
      registrationUserWithoutPhone.password
    );
    cy.wait(1500);
  });

  it('should login as agent', () => {
    register.loginInUser(amosAgent.email, amosAgent.password);
    cy.contains('End Session').should('be.visible');
  });

  it('should end the session for user', () => {
    cy.contains('End Session')
      .should('be.visible')
      .click();
    cy.contains('Start Session').should('be.disabled');
  });
});
