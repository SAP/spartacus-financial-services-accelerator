import * as asm from '../../../helpers/asm';
import * as register from '../../../helpers/register';
import {
  amosAgent,
  registrationUserWithoutPhone,
} from '../../../sample-data/users';

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
    cy.get('cx-asm-session-timer').should('be.visible');
  });

  it('should end the session for user', () => {
    cy.get('.logout').should('be.visible').click();
    asm.checkAsmHeader();
  });
});
