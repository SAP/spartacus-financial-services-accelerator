import * as asm from '../../helpers/asm';
import * as register from '../../helpers/register';
import {
  amosAgent,
  registrationUserWithoutPhone,
} from '../../sample-data/users';
import testFilters from '../../support/filters';

testFilters([''], () => {
  context('ASM', () => {
    before(() => {
      cy.visit('/?asm=true');
    });

    it('Should open asm mode and register a new user', () => {
      asm.checkAsmHeader();
      register.registerUser(registrationUserWithoutPhone);
      register.login(
        registrationUserWithoutPhone.email,
        registrationUserWithoutPhone.password
      );
    });

    it('Should open login as agent', () => {
      register.loginAgent(amosAgent.email, amosAgent.password);
      cy.get('cx-asm-session-timer').should('be.visible');
      cy.get('.logout').should('be.visible').click();
      asm.checkAsmHeader();
    });
  });
});
