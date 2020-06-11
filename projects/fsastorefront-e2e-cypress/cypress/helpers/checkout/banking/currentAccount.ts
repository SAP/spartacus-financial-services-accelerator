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
  cy.get('.primary-button').should('be.visible').click();
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

export function populatePersonalDetails() {
  cy.get('[name="title"]').select('mr');
  cy.get('[name="firstName"]').type('Ben');
  cy.get('[name="lastName"]').type('Moore');
  cy.get('[name="dateOfBirth"]').type('1987-01-01');
  cy.get('[name="maritalStatus"]').select('married');
  cy.get('[name="numberOfFinancialDependants"]').select('4');
  cy.get('[name="isResidentOfBanksCountry"]').eq(0).click();
  cy.get('[name="isUsCitizen"]').eq(1).click();
  cy.get('[name="residentialStatus"]').select('living-with-parent-relative');
  cy.get('[name="residentialAddress"]').type('Omladinskih Brigada');
  cy.get('[name="movingInDateToResidentialAddress"]').type('2002-01-01');
  cy.get('[name="isPostalSameAsResidential"]').eq(0).click();
  cy.get('[name="employmentStatus"]').select('unemployed');
  cy.get('[name="employmentStartDate"]').type('2005-01-01');
  cy.get('[name="incomeFrequency"]').select('monthly');
  cy.get('[name="netIncomeAmount"]').type('7800');
}
