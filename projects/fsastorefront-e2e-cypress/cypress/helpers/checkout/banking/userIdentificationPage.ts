export function checkUserIdentificationPage() {
  cy.get('.progress-inner-wrapper').should('have.length', 5);
  cy.get('.section-header-heading').should('have.text', 'User Identification');
  cy.get('fsa-select-identification > .d-flex')
    .should('be.visible')
    .within(() => {
      cy.get('.position-relative')
        .eq(0)
        .contains(' At the Nearest Branch ');
      cy.get('.position-relative')
        .eq(1)
        .contains(' Legal Identification ');
      cy.get('.position-relative')
        .eq(2)
        .contains(' Video Identification ');
    });
}

export function selectAtTheNearestBranch() {
  cy.get('fsa-select-identification > .d-flex')
    .should('be.visible')
    .within(() => {
      cy.get('.position-relative')
        .eq(0)
        .contains(' At the Nearest Branch ')
        .click();
    });
}

export function selectVideoIdentification() {
  cy.get('fsa-select-identification > .d-flex')
    .should('be.visible')
    .within(() => {
      cy.get('.position-relative')
        .eq(2)
        .contains(' Video Identification ')
        .click();
    });
}
