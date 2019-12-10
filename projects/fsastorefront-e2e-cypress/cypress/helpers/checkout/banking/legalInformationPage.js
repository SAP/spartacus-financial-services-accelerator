export function checkLegalInforamtionPage() {
  cy.get('h2.heading-headline').contains('Your Current Account Insurance');
  //checking number checkout steps
  cy.get('div.progress-inner-wrapper').should('have.length', 5);
  cy.get('div.section-header-heading').should('have.text', 'Legal information');
  cy.get('fsa-legal-documents')
    .should('be.visible')
    .within(() => {
      cy.get('.bulleted-list')
        .should('be.visible')
        .within(() => {
          cy.get('li.pb-1').should('have.length', 4);
        });
    });
  cy.get('fsa-legal-checkboxes')
    .should('be.visible')
    .within(() => {
      cy.get('input[name="readAndAgree"]').click({ force: true });
      cy.get('input[name="actOnMyBehalf"]').click({ force: true });
      cy.get('input[name="usePersonalData"]').click({ force: true });
      cy.get('input[name="authorizedToAccept"]').click({ force: true });
    });
}
