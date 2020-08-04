import * as shared from '../shared-checkout';
import * as sharedCheckout from '../shared-checkout.interface';

export function populateFirstStep() {
  cy.get('.form-title').contains('Coverage Information');
  cy.get('[name=lifeWhoCovered]').eq(0).click();
  cy.get('[name="lifeCoverageRequire"]').type('30000');
  cy.get('[name="lifeCoverageLast"]').type('24');
  cy.get('[name="lifeCoverageStartDate"]').type('2022-09-25');
  cy.get('[name="lifeMainDob"]').type('1987-09-25');
  cy.get('[name=lifeMainSmoke]').eq(1).click();
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
  const addOptionsContent: sharedCheckout.AddOptions = {
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
  const miniCartContent: sharedCheckout.MiniCart = {
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
  const comparisonTableContent: sharedCheckout.ComparisonTable = {
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

export function populateSecondPerson() {
  cy.get('[name="lifeSecondDob"]').type('1981-09-25');
  cy.get('[name=lifeSecondSmoke]').eq(0).click();
  cy.get('[name="lifeRelationship"]').select('Civil Partner');
}

export function checkLifeComparisonTableSecondPerson() {
  const comparisonTableContent: sharedCheckout.ComparisonTable = {
    mainProducts: [
      {
        name: 'Basic Life Insurance',
        price: '€22.15',
      },
      {
        name: 'Premium Life Insurance',
        price: '€27.69',
      },
    ],
  };
  shared.checkComparisonTable(comparisonTableContent);
}

export function checkLifeBasicMiniCartSecondPerson() {
  const miniCartContent: sharedCheckout.MiniCart = {
    price: ' €28.10 ',
    products: [
      {
        title: ' Basic Life Insurance: ',
        value: ' €22.15 ',
      },
      {
        title: ' Renewal Option: ',
        value: ' €5.95 ',
      },
    ],
  };
  shared.checkMiniCart(miniCartContent);
}

export function checkLifeQuote() {
  cy.get('cx-fs-quotes').within(() => {
    cy.get('.info-card').should('have.length', 1);
    cy.get('h6').should('have.text', ' Life Insurance ');
    cy.get('.label').contains('Basic Life Insurance');
    cy.get('.label').contains('Quote status');
    cy.get('.value').contains('Unfinished');
    cy.get('.value').contains('€28.10');
  });
}
