import * as shared from '../shared-checkout';

export function populateFirstStep() {
  cy.get('.form-title').contains('Coverage Information');
  cy.get('[name=lifeWhoCovered]').eq(0).click();
  cy.get('[name="lifeCoverageRequire"]').type('30000');
  cy.get('[name="lifeCoverageLast"]').type('24');
  cy.get('[name="lifeCoverageStartDate"]').type('2022-09-25');
  cy.get('[name="lifeMainDob"]').type('1987-09-25');
  cy.get('[name=lifeMainSmoke]').eq(1).click();
  cy.get('[name="lifeSecondDob"]').type('1981-09-25');
  cy.get('[name=lifeSecondSmoke]').eq(0).click();
  cy.get('[name="lifeRelationship"]').select('Civil Partner');
}

export function selectBasicLifeProduct() {
  cy.get('cx-fs-comparison-table-panel-item')
    .eq(0)
    .within(() => {
      cy.get('.table-header-title').should('have.text', 'Basic Life Insurance');
      cy.get('.primary-button').click();
    });
}

export function checkOptionalProductsAddRenewalOption() {
  const addOptionsContent: addOptionsPage.AddOptions = {
    title: 'Your Life Insurance',
    items: [
      {
        name: 'Premium Protection',
        available: true,
      },
      {
        name: 'Renewal Option',
        available: true,
        shouldAdd: true,
      },
      {
        name: 'Payment Protection Benefit',
        available: false,
      },
    ],
  };
  shared.checkAddOptionsPageContent(addOptionsContent);
}

export function checkLifeBasicMiniCart() {
  const miniCartContent: addOptionsPage.MiniCart = {
    price: ' €9.75 ',
    products: [
      {
        title: ' Basic Life Insurance: ',
        value: ' €7.69 ',
      },
      {
        title: ' Renewal Option: ',
        value: ' €2.06 ',
      },
    ],
  };
  shared.checkMiniCart(miniCartContent);
}

export function checkLifeComparisonTable() {
  const comparisonTableContent: addOptionsPage.ComparisonTable = {
    mainProducts: [
      {
        name: 'Basic Life Insurance',
        price: '€7.69',
      },
      {
        name: 'Premium Life Insurance',
        price: '€9.62',
      },
    ],
  };
  shared.checkComparisonTable(comparisonTableContent);
}
