const todaysDate = Cypress.moment().format('DD MMM, YYYY');

export function checkInboxComponets() {
  cy.get('.heading-headline').should('have.text', 'Inbox');
  cy.get('fsa-inbox').should('be.visible');
  cy.get('.pagination').should('be.visible');
}

export function checkGeneralTab() {
  cy.get('.fsa-tab')
    .should('be.visible')
    .contains('General');
}

export function checkInboxHeader() {
  cy.get('.m-4').should('be.visible');
  cy.get('.section-header-heading ').within(() => {
    cy.contains('Subject');
    cy.contains('Preview');
    cy.contains('Date');
  });
}

export function checNewDocumentMessage() {
  cy.get('.message')
    .should('be.visible')
    .within(() => {
      cy.contains('New documents received');
      cy.contains('Dear Donna Moore, New documents');
      cy.contains(todaysDate);
      cy.get('.icon-attachment')
        .should('be.visible')
        .click();
    });
}

export function checkAttachmentsInMessage() {
  cy.get('.box-shadow').should('be.visible');
  cy.get('.notification').contains('1 Attachments');
  cy.get('.document-link').should(
    'have.text',
    'New Policy Effective Immediately'
  );
}
