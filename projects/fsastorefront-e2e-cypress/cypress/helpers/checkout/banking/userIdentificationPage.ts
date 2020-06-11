export function checkUserIdentificationPage(product) {
  cy.get('.heading-headline').contains(product);
  cy.get('.progress-inner-wrapper').should('have.length', 6);
  cy.get('.section-header-heading').should('have.text', 'User Identification');
  cy.get('cx-fs-select-identification > .d-flex')
    .should('be.visible')
    .within(() => {
      cy.get('.position-relative').eq(0).contains('At the Nearest Branch');
      cy.get('.position-relative').eq(1).contains('Legal Identification');
      cy.get('.position-relative').eq(2).contains('Video Identification');
    });
}

export function selectUserIdentification(identification) {
  cy.get('cx-fs-select-identification > .d-flex')
    .should('be.visible')
    .within(() => {
      cy.get('.position-relative').contains(identification).click();
    });
}
