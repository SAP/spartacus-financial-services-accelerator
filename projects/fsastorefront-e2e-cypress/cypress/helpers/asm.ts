export function checkAsmHeader() {
  cy.get('.asm-bar')
    .should('be.visible')
    .should('contain', 'Assisted Service Mode');
  cy.get('[formcontrolname=userId]').should('be.visible');
  cy.get('[formcontrolname=password]').should('be.visible');
  cy.get('[type=submit]').should('be.visible');
  cy.get('cx-generic-link')
    .should('contain', 'Find an Agent')
    .should('be.visible');
}
