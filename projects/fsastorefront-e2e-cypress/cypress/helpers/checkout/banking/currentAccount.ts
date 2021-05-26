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

export function checkOptionalFamilyAccountAddTransactionChest() {
  const addOptionsContent: addOptionsPage.AddOptions = {
    title: 'Your Current Account Application',
    items: [
      {
        name: 'Expense Tracker',
        available: false,
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
    price: ' €9.99 ',
    products: [
      {
        title: 'Number of Applicants:',
        value: ' 1 ',
      },
      {
        title: 'Debit Card:',
        value: ' yes ',
      },
      {
        title: 'Debit Card Design:',
        value: ' black ',
      },
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
  cy.get('[name="maritalStatus"]').select('married');
  cy.get('[name="numberOfFinancialDependants"]').select('4');
  cy.get('[name="isResidentOfBanksCountry"]').eq(0).click();
  cy.get('[name="isUsCitizen"]').eq(1).click();
  cy.get('[name="residentialStatus"]').select('living-with-parent-relative');
  cy.get('[name="street"]').eq(0).type('Omladinskih Brigada');
  cy.get('[name="streetNumber"]').eq(0).type('90g');
  cy.get('[name="city"]').eq(0).type('Belgrade');
  cy.get('[name="postcode"]').eq(0).type('11010');
  cy.get('[name="country"]').eq(0).select('RS');
  cy.get('[name="movingInDateToResidentialAddress"]').type('2002-01-01');
  cy.get('[name="isPostalSameAsResidential"]').eq(0).click();
  cy.get('[name="employmentStatus"]').select('part-time');
  cy.get('[name="employersName"]').type('global digital');
  cy.get('[name="jobTitle"]').type('Manager');
  cy.get('[name="employmentStartDate"]').type('2005-01-01');
  cy.get('[name="incomeFrequency"]').select('monthly');
  cy.get('[name="netIncomeAmount"]').type('7800');
}

export function populateConfigureStep() {
  cy.get('[name=accountType]').select('1');
  cy.get('[name=apply-for-debit-card]').select('yes');
  cy.get('[name=debit-card-design]').select('black');
}
