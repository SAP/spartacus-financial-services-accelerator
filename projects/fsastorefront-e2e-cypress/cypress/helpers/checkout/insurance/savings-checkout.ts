import * as shared from '../shared-checkout';

export function checkComparisonPage() {
  cy.get('cx-fs-comparison-table-panel').should('be.visible');
  cy.get('.fixed-column').should('have.length', 1);
  cy.get('.primary-button')
    .should('contain', 'Select')
    .should('have.length', '3');
}

export function checkSavingsComparisonTable() {
  const comparisonTableContent: addOptionsPage.ComparisonTable = {
    mainProducts: [
      {
        name: 'Safe and Steady',
        price: '€199.39',
      },
      {
        name: 'Balanced Deal',
        price: '€270.39',
      },
      {
        name: 'Flexi-Max',
        price: '€488.71',
      },
    ],
  };
  shared.checkComparisonTable(comparisonTableContent);
}

export function selecBalancedDeal() {
  cy.get('cx-fs-comparison-table-panel-item')
    .eq(1)
    .within(() => {
      cy.get('.table-header-title').should('have.text', 'Balanced Deal');
      cy.get('.primary-button').click();
    });
}

export function checkOptionalProducts() {
  const addOptionsContent: addOptionsPage.AddOptions = {
    title: 'Your Savings Insurance',
    items: [
      {
        name: 'Survivor Pension',
        available: true,
        shouldAdd: true,
      },
      {
        name: 'Dependent Children Pension',
        available: true,
        shouldAdd: true,
      },
      {
        name: 'Disability Premium Waiver',
        available: true,
      },
    ],
  };
  shared.checkAddOptionsPageContent(addOptionsContent);
}

export function populateSavingsSpecific() {
  cy.get('[name="partnerName"]').type('Leo');
  cy.get('[name="partnerDateOfBirth"]').type('1985-12-12');
  cy.get('[name="numberOfChildren"]').type('3');
}

export function checkSavingsPolicy() {
  cy.get('.title').contains('Savings Insurance');
  cy.get('.label').contains('Contribution');
  cy.get('.value').contains('779');
  cy.get('.label').contains('Premium');
  cy.get('.value').contains('€781.99');
}

export function populateCoverageInformation() {
  cy.get('[name=contributionFrequency]').select('Half_Yearly');
  cy.get('[name=contribution]').type('779');
  cy.get('[name=annualContributionIncrease]').select('1');
  cy.get('[name=startDate]').type('2020-12-12');
  cy.get('[name=retirementAge]').type('67');
  cy.get('[name=dateOfBirth]').type('1981-11-12');
}

export function checkInvestmentDetails() {
  cy.get('h6')
    .contains(' Investment Details ')
    .click()
    .parent()
    .within(() => {
      cy.get('.col-12').contains('Jakomini Investment Group: 50%');
      cy.get('.col-12').contains('Single Capital Company: 50%');
    });
}
