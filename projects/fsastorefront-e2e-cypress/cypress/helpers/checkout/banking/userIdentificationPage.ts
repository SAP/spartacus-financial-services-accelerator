export function checkUserIdentificationPage() {
  cy.get('.section-header-heading').should('have.text', 'User Identification');
  cy.get('cx-fs-cms-custom-container')
    .should('be.visible')
    .within(() => {
      cy.get('p').eq(0).should('contain.text', 'At the Nearest Branch');
      cy.get('p').eq(1).should('contain.text', 'Legal Identification');
      cy.get('p').eq(2).should('contain.text', 'Video Identification');
    });
}

export function selectUserIdentification(identification) {
  cy.get('cx-fs-cms-custom-container')
    .should('be.visible')
    .within(() => {
      cy.get('p')
        .contains(identification)
        .should('not.be.disabled')
        .click({ force: true })
        .wait(500);
    });
}
