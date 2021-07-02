export function checkComponents() {
  cy.get('.Section1 cx-fs-enriched-responsive-banner');
  cy.get('span.enriched-banner-title').should(
    'contain',
    'Apply online and save your valuable time'
  );
  cy.get('.Section2 cx-fs-cms-custom-container cx-paragraph p').should(
    'be.visible'
  );
  cy.get('cx-fs-cms-custom-container cx-generic-link cx-media');
  cy.get('cx-fs-cms-custom-container .title');
}

export function checkQuoteButtons(buttonText, linkText) {
  cy.get('.enriched-banner-styled-text').contains(buttonText);
  cy.get('.Section2').within(() => {
    cy.get('cx-generic-link a').contains(linkText);
  });
}

export function checkApplicationButtons() {
  cy.get('a.enriched-banner-styled-text').should(
    'contain',
    ' Request a product'
  );
  cy.get('cx-generic-link a').should('contain', 'Retrieve an Application');
}

export function checkCategoryPage(
  numberOfProducts: number,
  ...headings: string[]
) {
  cy.get('div.product-feature-wrapper').should('have.length', numberOfProducts);
  headings.forEach(element => {
    cy.get('h3.section-header-heading').should('contain', element);
  });
  cy.get('.item-details').should('have.length', numberOfProducts);
  cy.go('back');
}
