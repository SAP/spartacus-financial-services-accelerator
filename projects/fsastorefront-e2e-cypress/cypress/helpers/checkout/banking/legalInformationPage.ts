export function checkLegalInformationPage() {
  cy.get('.progress-inner-wrapper').should('have.length', 5);
  cy.get('.section-header-heading').should('have.text', 'Legal information');
  cy.get('fsa-legal-documents > .border-color-3')
    .should('be.visible')
    .within(() => {
      cy.get('li.pb-1').should('have.length', 4);
    });
  cy.get('input[name="readAndAgree"]').click({ force: true });
  cy.get('input[name="actOnMyBehalf"]').click({ force: true });
  cy.get('input[name="usePersonalData"]').click({ force: true });
  cy.get('input[name="authorizedToAccept"]').click({ force: true });
}
