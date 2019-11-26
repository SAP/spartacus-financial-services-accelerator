export function searchNoResults() {
  cy.get('cx-searchbox')
    .should('be.visible')
    .within(() => {
      cy.get('input')
        .type('üöäpda{enter}')
        .wait(1500);
    });
  cy.get('cx-breadcrumb').should('contain', '0 results for "üöäpda"');
}

export function searchInsuranceProducts() {
  cy.get('cx-searchbox')
    .should('be.visible')
    .within(() => {
      cy.get('input')
        .clear()
        .type('insurance{enter}')
        .wait(1500);
    });
  cy.get('cx-breadcrumb').should('contain', '25 results for "insurance"');
}

export function searchBankingProducts() {
  cy.get('cx-searchbox')
    .should('be.visible')
    .within(() => {
      cy.get('input')
        .clear()
        .type('account{enter}')
        .wait(1500);
    });
  cy.get('cx-breadcrumb').should('contain', '3 results for "account"');
}

export function searchSavingsProducts() {
  cy.get('cx-searchbox')
    .should('be.visible')
    .within(() => {
      cy.get('input')
        .clear()
        .type('savings{enter}')
        .wait(1500);
    });
  cy.get('cx-breadcrumb').should('contain', '3 results for "savings"');
}

export function seachResultsButtons() {
  cy.get('fsa-product-list')
    .should('be.visible')
    .within(() => {
      cy.get('cx-media').should('have.length', 3);
      cy.get('button.primary-button')
        .should('contain', 'More Info')
        .should('have.length', 3);
      cy.get('button.secondary-button')
        .should('contain', 'Get a Quote')
        .should('have.length', 3);
    });
}

export function clickMoreInfoButton() {
  cy.get('button.primary-button')
    .eq(0)
    .click()
    .wait(1500);
}

export function clickGetAQuoteButton() {
  cy.get('button.secondary-button')
    .eq(0)
    .click()
    .wait(1500);
}
