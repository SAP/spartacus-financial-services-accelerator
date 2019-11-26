import * as addOptionsPage from '../../../helpers/checkout/addOptionsPage';

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

export function checkOptionalProductsAddTransactionChest() {
  const addOptionsContent: addOptionsPage.AddOptions = {
    title: 'Your Current Account Insurance',
    items: [
      {
        name: 'Expense Tracker',
        available: false,
      },
      {
        name: 'Transaction Pouch',
        available: true,
      },
      {
        name: 'Transaction Chest',
        available: true,
        shouldAdd: true,
      },
    ],
  };

  addOptionsPage.checkAddOptionsPageContent(addOptionsContent);

  cy.get('.primary-button')
    .should('be.visible')
    .click();
}

export function checkminiCartCurrentAccount() {
  cy.get('fsa-mini-cart').within(() => {
    cy.get('.short-overview-item').should('have.length', 2);
    cy.get('.short-overview-item')
      .eq(0)
      .should('have.text', ' Family Account:  €4.99 ');
    /*      cy.get('short-overview-item')
            .eq(1)
            .should('have.text', ' Transaction Chest:  €5.00 ');*/
    cy.get('.highlighted').should('have.text', ' Total price:  €9.99 ');
  });
}




