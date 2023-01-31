import * as shared from '../shared-checkout';

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
      cy.get('.table-header-title').should('contain.text', 'Family Account');
      cy.get('.primary-button').click();
    });
}

export function checkOptionalFamilyAccountAddTransactionChest() {
  const addOptionsContent: addOptionsPage.AddOptions = {
    title: 'Your Current Account Application',
    items: [
      {
        name: 'Expense Tracker',
        notAvailable: true,
      },
      {
        name: 'Transaction Chest',
        available: true,
        shouldAdd: true,
      },
      {
        name: 'Transaction Pouch',
        available: true,
      },
    ],
  };
  shared.checkAddOptionsPageContent(addOptionsContent);
}

export function checkOptionalPremiumAccount() {
  const addOptionsContent: addOptionsPage.AddOptions = {
    title: 'Your Current Account Application',
    items: [
      {
        name: 'Expense Tracker',
        available: true,
      },
      {
        name: 'Transaction Chest',
        available: true,
        shouldAdd: true,
      },
      {
        name: 'Transaction Pouch',
        available: true,
      },
    ],
  };
  shared.checkAddOptionsPageContent(addOptionsContent);
}

export function checkMiniCartCurrentAccount() {
  const miniCartContent: addOptionsPage.MiniCart = {
    price: '€9.99',
    products: [
      {
        title: 'Number of Applicants:',
        value: '1',
      },
      {
        title: 'Debit Card:',
        value: 'yes',
      },
      {
        title: 'Debit Card Design:',
        value: 'black',
      },
      {
        title: 'Family Account:',
        value: '€4.99',
      },
      {
        title: 'Transaction Chest:',
        value: '€5.00',
      },
    ],
  };
  shared.checkMiniCart(miniCartContent);
}

export function populateConfigureStep() {
  cy.get('[name=accountType]').select('1');
  cy.get('[name=apply-for-debit-card]').select('yes');
  cy.get('[name=debit-card-design]').select('black');
}

export function checkMiniCartWithCoupon() {
  const miniCartContent: addOptionsPage.MiniCart = {
    price: '€9.00',
    products: [
      {
        title: 'Number of Applicants:',
        value: '1',
      },
      {
        title: 'Debit Card:',
        value: 'yes',
      },
      {
        title: 'Debit Card Design:',
        value: 'black',
      },
      {
        title: 'Family Account:',
        value: '€4.50',
      },
      {
        title: 'Transaction Chest:',
        value: '€4.50',
      },
      {
        title: 'You save',
        value: '€0.99',
      },
    ],
  };
  shared.checkMiniCart(miniCartContent);
}
