export function checkBankingComparisonPage(mainProduct) {
  cy.get('.heading-headline').contains(mainProduct);
  cy.get('.progress-inner-wrapper').should('have.length', 6);
  cy.get('cx-fs-comparison-table-panel').should('be.visible');
  cy.get('.fixed-column').should('have.length', 1);
  cy.get('.primary-button')
    .should('contain', 'Select')
    .should('have.length', 3);
  cy.get('a.link')
    .should('contain', 'More Info')
    .should('have.length', 3);
}

export function checkBankingProgressBar() {
  cy.get('.progress-inner-wrapper').should('have.length', 6);
  cy.get('p.label')
    .should('have.length', 6)
    .eq(0)
    .contains("What's Included");
  cy.get('p.label')
    .eq(1)
    .contains('Add Options');
  cy.get('p.label')
    .eq(2)
    .contains('Personal Details');
  cy.get('p.label')
    .eq(3)
    .contains('Quote Review');
  cy.get('p.label')
    .eq(4)
    .contains('Legal Information');
  cy.get('p.label')
    .eq(5)
    .contains('User Identification');
}

export function checkLegalInformationPage(mainProduct) {
  cy.get('.heading-headline').contains(mainProduct);
  cy.get('.progress-inner-wrapper').should('have.length', 6);
  cy.get('.section-header-heading').should('have.text', 'Legal information');
  cy.get('cx-fs-legal-documents > .border-color-3')
    .should('be.visible')
    .within(() => {
      cy.get('li.pb-1').should('have.length', 4);
    });
  cy.get('cx-fs-legal-checkboxes').within(() => {
    cy.get('input[type="checkbox"]').click({ multiple: true, force: true });
  });
}

export function checkPersonalDetailsPage() {
  cy.get('.progress-node').should('have.length', 6);
  cy.get('cx-fs-cms-custom-container').should('be.visible');
  cy.get('cx-fs-mini-cart').should('be.visible');
  cy.get('cx-footer-navigation').should('be.visible');
}
