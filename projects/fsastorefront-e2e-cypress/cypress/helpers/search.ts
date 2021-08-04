export function searchNoResults() {
  cy.get('cx-fs-searchbox')
    .should('be.visible')
    .within(() => {
      cy.get('input').type('notexist{enter}');
    });
  cy.get('cx-breadcrumb').should('contain', '0 results for "notexist"');
}

export function searchInsuranceProducts() {
  cy.get('cx-fs-searchbox')
    .should('be.visible')
    .within(() => {
      cy.get('input').clear().type('insurance{enter}');
    });
  cy.get('cx-breadcrumb').should('contain', '25 results for "insurance"');
}

export function searchBankingProducts() {
  cy.get('cx-fs-searchbox')
    .should('be.visible')
    .within(() => {
      cy.get('input').clear().type('account{enter}');
    });
  cy.get('cx-breadcrumb').should('contain', '3 results for "account"');
}

export function searchTravelProducts() {
  cy.get('cx-fs-searchbox')
    .should('be.visible')
    .within(() => {
      cy.get('input').clear().type('travel{enter}');
    });
  cy.get('cx-breadcrumb').should('contain', '9 results for "travel"');
  cy.reload();
  cy.get('.title.background-color-primary').should(
    'contain',
    ' Backpackers - Gold Plan '
  );
}

export function seachResultsButtons() {
  cy.get('cx-fs-product-list')
    .should('be.visible')
    .within(() => {
      cy.get('cx-media').should('have.length', 9);
      cy.get('button.btn-action')
        .should('contain', 'More Info')
        .should('have.length', 9);
      cy.get('button.primary-button')
        .should('contain', 'Get a Quote')
        .should('have.length', 9);
    });
}

export function clickMoreInfoButton() {
  cy.get('button.btn-action').eq(0).click({ force: true });
}

export function clickGetAQuoteButton() {
  cy.get('button.primary-button').eq(0).click({ force: true });
}
