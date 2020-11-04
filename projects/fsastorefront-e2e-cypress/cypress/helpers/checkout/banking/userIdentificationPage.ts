export function checkUserIdentificationPage() {
  cy.get('.section-header-heading').should('have.text', 'User Identification');
  cy.get('cx-fs-cms-custom-container')
    .should('be.visible')
    .within(() => {
      cy.get('p').eq(0).contains('At the Nearest Branch');
      cy.get('p').eq(1).contains('Legal Identification');
      cy.get('p').eq(2).contains('Video Identification');
    });
}

export function selectUserIdentification(identification) {
  cy.get('cx-fs-cms-custom-container')
    .should('be.visible')
    .within(() => {
      cy.get('p')
        .contains(identification)
        .wait(500)
        .click({ force: true })
        .wait(500);
    });
}
