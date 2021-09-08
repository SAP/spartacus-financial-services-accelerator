import * as shared from '../shared-checkout';
import * as dayjs from 'dayjs';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

const startDate = dayjs().add(2, 'day').format(' DD MMM YYYY ');

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
        price: '€181.10',
      },
      {
        name: 'Balanced Deal',
        price: '€240.22',
      },
      {
        name: 'Flexi-Max',
        price: '€414.40',
      },
    ],
  };
  shared.checkComparisonTable(comparisonTableContent);
}

export function selecBalancedDeal() {
  cy.get('cx-fs-comparison-table-panel-item')
    .eq(1)
    .within(() => {
      cy.get('.table-header-title').should('contain.text', 'Balanced Deal');
      cy.get('.primary-button').click();
    });
}

export function selecSafeAndSteady() {
  cy.get('cx-fs-comparison-table-panel-item')
    .eq(0)
    .within(() => {
      cy.get('.table-header-title').should('contain.text', 'Safe and Steady');
      cy.get('.primary-button').click();
    });
}

export function checkOptionalProductsBalancedDeal() {
  const addOptionsContent: addOptionsPage.AddOptions = {
    title: 'Your Savings Insurance',
    items: [
      {
        name: 'Dependent Children Pension',
        available: true,
        shouldAdd: true,
      },
      {
        name: 'Disability Premium Waiver',
        notAvailable: true,
      },
      {
        name: 'Survivor Pension',
        available: true,
        shouldAdd: true,
      },
    ],
  };
  shared.checkAddOptionsPageContent(addOptionsContent);
}

export function checkOptionalProductsSafeAndSteady() {
  const addOptionsContent: addOptionsPage.AddOptions = {
    title: 'Your Savings Insurance',
    items: [
      {
        name: 'Dependent Children Pension',
        notAvailable: true,
      },
      {
        name: 'Disability Premium Waiver',
        notAvailable: true,
      },
      {
        name: 'Survivor Pension',
        available: true,
        shouldAdd: true,
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
}

export function populateCoverageInformation() {
  cy.get('[name=contributionFrequency]').select('Half_Yearly');
  cy.get('[name=contribution]').type('779');
  cy.get('[name=annualContributionIncrease]').select('1');
  cy.get('[name=startDate]').type('2022-12-12');
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

export function checkMiniCart() {
  const miniCartContent: addOptionsPage.MiniCart = {
    price: ' €822.19 ',
    products: [
      {
        title: ' Start Date: ',
        value: ' 12 Dec 2022 ',
      },
      {
        title: 'Annual Contribution Increase:',
        value: ' 1 ',
      },
      {
        title: 'Retirement Age:',
        value: ' 67 ',
      },
      {
        title: ' Balanced Deal: ',
        value: ' €779.00 ',
      },
      {
        title: ' Dependent Children Pension: ',
        value: ' €2.99 ',
      },
      {
        title: ' Survivor Pension: ',
        value: ' €40.20 ',
      },
    ],
  };
  shared.checkMiniCart(miniCartContent);
}
