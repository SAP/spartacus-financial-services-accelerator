export function checkComponents() {
  cy.get('cx-fs-enriched-responsive-banner').should('be.visible');
  cy.get('.enriched-banner-title').should(
    'contain',
    'Apply online and save your valuable time'
  );
  cy.get('cx-fs-cms-custom-container').should('have.length', '3');
  cy.get('cx-fs-cms-custom-container')
    .eq(0)
    .should('contain.text', 'Pick up from where you left off!');
  cy.get('p.title').should('be.visible');
}

export function checkCategoryBannerButtons(buttonText) {
  cy.get('.enriched-banner-styled-text').contains(buttonText[0]);
  cy.get('.Section2').within(() => {
    cy.get('cx-generic-link a').contains(buttonText[1]);
  });
}

export function checkCategoryProductHeadings(...headings: string[]) {
  cy.get('.product-feature-wrapper').should('have.length', headings.length);
  headings.forEach(element => {
    cy.get('.section-header-heading').should('contain.text', element);
  });
  cy.get('.item-details').should('have.length', headings.length);
}
