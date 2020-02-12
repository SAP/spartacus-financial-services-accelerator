import * as addOptionsPage from '../../../helpers/checkout/addOptionsPage';

export function populateFirstStep() {
  cy.get('.formTitle').contains('Coverage Information');
  cy.get('[name=lifeWhoCovered]')
    .eq(0)
    .click();
  cy.get('[name="lifeCoverageRequire"]').type('3000');
  cy.get('[name="lifeCoverageLast"]').type('24');
  cy.get('[name="lifeCoverageStartDate"]').type('2022-09-25');
  cy.get('[name=lifeMainSmoke]')
    .eq(1)
    .click();
}

export function checkLifeComparisonTable() {
  cy.get('fsa-comparison-table-panel-item').should('have.length', 2);
  cy.get('fsa-comparison-table-panel-item')
    .eq(1)
    .within(() => {
      cy.get('h3').should('have.text', 'Premium Life Insurance');
      cy.get('h4').should('have.text', '€1.21');
    });
  cy.get('fsa-comparison-table-panel-item')
    .eq(0)
    .within(() => {
      cy.get('.table-header-title').should('have.text', 'Basic Life Insurance');
      cy.get('h4').should('have.text', '€0.97');
    });
}

export function selectBasicLifeProduct() {
  cy.get('fsa-comparison-table-panel-item')
    .eq(0)
    .within(() => {
      cy.get('h3').should('have.text', 'Basic Life Insurance');
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
  addOptionsPage.checkAddOptionsPageContent(addOptionsContent);
}

export function checkMiniCartLifeBasic() {
  cy.get('fsa-mini-cart').within(() => {
    cy.get('.short-overview-item').should('have.length', 2);
    cy.get('.short-overview-item')
      .eq(0)
      .should('have.text', ' Basic Life Insurance:  €0.97 ');
    cy.get('.short-overview-item')
      .eq(1)
      .should('have.text', ' Renewal Option:  €0.26 ');
    cy.get('.highlighted').should('have.text', ' Total price:  €1.23 ');
  });
}
