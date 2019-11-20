export function openCategoryPage() {
  cy.selectOptionFromDropdown({
    menuOption: 'Banking',
    dropdownItem: 'Current Account',
  });
  cy.get('fsa-enriched-responsive-banner')
    .should('be.visible')
    .findByText('Request a product')
    .click({ force: true });
}

export function checkComparisonTable() {
  cy.get('fsa-comparison-table-panel-item').should('have.length', 3);
  cy.get('fsa-comparison-table-panel-item')
    .eq(0)
    .within(() => {
      cy.get('h3').should('have.text', 'Basic Account');
      cy.get('h4').should('have.text', '€0.00');
    });
  cy.get('fsa-comparison-table-panel-item')
    .eq(1)
    .within(() => {
      cy.get('h3').should('have.text', 'Family Account');
      cy.get('h4').should('have.text', '€4.99');
    });
  cy.get('fsa-comparison-table-panel-item')
    .eq(2)
    .within(() => {
      cy.get('h3').should('have.text', 'Premium Account');
      cy.get('h4').should('have.text', '€9.99');
    });
}

export function selectFamilyAccount() {
  cy.get('fsa-comparison-table-panel-item')
    .eq(1)
    .within(() => {
      cy.get('h3').should('have.text', 'Family Account');
      cy.get('.primary-button').click();
    });
}
