export function checkCompareIsDisabled() {
  cy.get('.row').should('contain.text', 'Product category');
  cy.get('button.bg-transparent').contains('Clear all').should('be.disabled');
  cy.get('.btn-block').contains('Compare quotes').should('be.disabled');
}

export function selectFirstQuoteForCompare(price, productCategory) {
  cy.get('cx-fs-quotes').within(() => {
    cy.get('.info-card').should('have.length', 4);
    cy.get('.value')
      .contains(price)
      .parentsUntil('.col-md-6.d-flex')
      .within(() => {
        cy.get('.label').contains(productCategory);
        cy.get('input[type="checkbox"]').click();
      });
  });
}

export function checkQuotesDifferentProductDisabled(price) {
  cy.get('.value')
    .contains(price)
    .parentsUntil('.col-md-6.d-flex')
    .within(() => {
      cy.get('input[type="checkbox"]').should('be.disabled');
    });
}

export function selectSecondQuoteForComparison(price) {
  cy.get('.value')
    .contains(price)
    .parentsUntil('.col-md-6.d-flex')
    .within(() => {
      cy.get('input[type="checkbox"]').click();
    });
  cy.get('.alert-success').should('contain', 'User successfully selected');
}

export function compareNotDisabled() {
  cy.get('button.bg-transparent')
    .contains('Clear all')
    .should('be.not.disabled');
  cy.get('.btn-block').contains('Compare quotes').should('be.not.disabled');
  cy.contains('Compare quotes').click();
}

export function checkComparePage(product) {
  cy.get('cx-fs-quote-comparison').should('be.visible');
  cy.get('.heading-headline').should('contain', 'Compare ' + product);
}
