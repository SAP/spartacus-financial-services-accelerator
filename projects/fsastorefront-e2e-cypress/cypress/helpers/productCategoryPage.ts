export function checkComponents() {
  cy.get('.Section1 fsa-enriched-responsive-banner');
  cy.get('span.enriched-banner-title').should(
    'contain',
    'Apply online and save your valuable time'
  );
  cy.get('.Section2 fsa-cms-custom-container cx-paragraph p').should(
    'be.visible'
  );
  cy.get('fsa-cms-custom-container cx-generic-link cx-media');
  cy.get('fsa-cms-custom-container .title');
}

export function checkQuoteButtons() {
  cy.get('a.enriched-banner-styled-text').should('contain', 'Get a Quote');
  cy.get('cx-generic-link a').should('contain', 'Retrieve a Quote');
}

export function checkApplicationButtons() {
  cy.get('a.enriched-banner-styled-text').should(
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

export function startCheckoutForBanking() {
  cy.get('a.enriched-banner-styled-text')
    .should('contain', ' Request a product')
    .click();
}
