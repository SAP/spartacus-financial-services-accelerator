export function checkBankingComparisonPage() {
  cy.get('cx-fs-comparison-table-panel').should('be.visible');
  cy.get('.fixed-column').should('have.length', 1);
  cy.get('.primary-button')
    .should('contain', 'Select')
    .should('have.length', 3);
  cy.get('a.link').should('contain', 'More Info').should('have.length', 3);
}

export function checkBankingProgressBar() {
<<<<<<< HEAD
  cy.get('.progress-inner-wrapper').should('have.length', 6);
  cy.get('p.label').should('have.length', 6).eq(0).contains("What's Included");
  cy.get('p.label').eq(1).contains('Add Options');
  cy.get('p.label').eq(2).contains('Personal Details');
  cy.get('p.label').eq(3).contains('Quote Review');
  cy.get('p.label').eq(4).contains('Legal Information');
  cy.get('p.label').eq(5).contains('User Identification');
=======
  cy.get('.progress-inner-wrapper').should('have.length', 7);
  cy.get('p.label')
    .should('have.length', 7)
    .eq(0)
    .contains("What's Included");
  cy.get('p.label')
    .eq(1)
    .contains('Configure a Product');
  cy.get('p.label')
    .eq(2)
    .contains('Add Options');
  cy.get('p.label')
    .eq(3)
    .contains('Personal Details');
  cy.get('p.label')
    .eq(4)
    .contains('Quote Review');
  cy.get('p.label')
    .eq(5)
    .contains('Legal Information');
  cy.get('p.label')
    .eq(6)
    .contains('User Identification');
>>>>>>> develop
}

export function checkLegalInformationPage() {
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

export function checkConfigureStep() {
  cy.get('cx-fs-product-configuration-form').should('be.visible');
  cy.get('cx-fs-product-configuration-mini-cart').should('be.visible');
  cy.get('h3').contains('Configure a Product');
}
