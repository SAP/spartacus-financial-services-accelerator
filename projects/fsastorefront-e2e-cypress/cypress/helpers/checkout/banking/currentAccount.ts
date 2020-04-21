import * as shared from '../shared-checkout';

export function openCategoryPage() {
  cy.selectOptionFromDropdown({
    menuOption: 'Banking',
    dropdownItem: 'Current Account',
  });
  cy.get('cx-fs-enriched-responsive-banner')
    .should('be.visible')
    .findByText('Request a product')
    .click({ force: true });
}

export function checkCurrentAccountComparisonTable() {
  const comparisonTableContent: addOptionsPage.ComparisonTable = {
    mainProducts: [
      {
        name: 'Basic Account',
        price: '€0.00',
      },
      {
        name: 'Family Account',
        price: '€4.99',
      },
      {
        name: 'Premium Account',
        price: '€9.99',
      },
    ],
  };
  shared.checkComparisonTable(comparisonTableContent);
}

export function selectFamilyAccount() {
  cy.get('cx-fs-comparison-table-panel-item')
    .eq(1)
    .within(() => {
      cy.get('.table-header-title').should('have.text', 'Family Account');
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
  shared.checkAddOptionsPageContent(addOptionsContent);
  cy.get('.primary-button')
    .should('be.visible')
    .click();
}

export function checkMiniCartCurrentAccount() {
  const miniCartContent: addOptionsPage.MiniCart = {
    price: ' €9.99 ',
    products: [
      {
        title: ' Family Account: ',
        value: ' €4.99 ',
      },
      {
        title: ' Transaction Chest: ',
        value: ' €5.00 ',
      },
    ],
  };
  shared.checkMiniCart(miniCartContent);
}
