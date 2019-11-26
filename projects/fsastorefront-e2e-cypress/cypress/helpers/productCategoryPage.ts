export function checkComponets() {
  cy.get('cx-page-slot.Section1 fsa-enriched-responsive-banner');
  cy.get('span.enriched-banner__title').should(
    'contain',
    'Apply online and save your valuable time'
  );
  cy.get('cx-page-slot.Section2B');
  cy.get('cx-page-slot.Section2B cx-banner').should('be.visible');
  cy.get('cx-page-slot.Section4 fsa-product-feature');
  cy.get('cx-page-slot.Section2B cx-paragraph').should('be.visible');
}

export function checkQuoteButtons() {
  cy.get('a.enriched-banner__styled-text').should('contain', 'Get a Quote');
  cy.get('cx-generic-link a').should('contain', 'Retrieve a Quote');
}

export function checkApplicationButtons() {
  cy.get('a.enriched-banner__styled-text').should(
    'contain',
    ' Request a product'
  );
  cy.get('cx-generic-link a').should('contain', 'Retrieve an Application');
}

export function checksSavingsCategoryPage() {
  cy.get('div.product-feature-wrapper').should('have.length', 3);
  cy.get('h3.section-header-heading').should('contain', 'Safe And Steady');
  cy.get('h3.section-header-heading').should('contain', 'Balanced Deal');
  cy.get('h3.section-header-heading').should('contain', 'Flexi-Max');
  cy.get('ul.item-details').should('have.length', 3);
  cy.go('back');
}
