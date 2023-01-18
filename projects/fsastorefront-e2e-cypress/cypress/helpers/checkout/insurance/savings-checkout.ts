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
        price: '€146.58',
      },
      {
        name: 'Balanced Deal',
        price: '€186.11',
      },
      {
        name: 'Flexi-Max',
        price: '€293.20',
      },
    ],
  };
  shared.checkComparisonTable(comparisonTableContent);
}

export function selectMainProduct(mainProduct, product) {
  cy.get('cx-fs-comparison-table-panel-item')
    .eq(product)
    .within(() => {
      cy.get('.table-header-title').should('contain.text', mainProduct);
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
  cy.get('[name=startDate]').type('2024-12-12');
  cy.get('[name=retirementAge]').type('67');
  cy.get('[name=dateOfBirth]').type('1979-11-12');
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
    price: '€833.63',
    products: [
      {
        title: 'Start Date:',
        value: '12 Dec 2024',
      },
      {
        title: 'Annual Contribution Increase:',
        value: '1',
      },
      {
        title: 'Retirement Age:',
        value: '67',
      },
      {
        title: 'Balanced Deal:',
        value: '€779.00',
      },
      {
        title: 'Dependent Children Pension:',
        value: '€2.99',
      },
      {
        title: 'Survivor Pension:',
        value: '€51.64',
      },
    ],
  };
  shared.checkMiniCart(miniCartContent);
}

export function checkOptionalProducts() {
  const addOptionsContent: addOptionsPage.AddOptions = {
    title: 'Your Savings Insurance',
    items: [
      {
        name: 'Dependent Children Pension',
        available: true,
      },
      {
        name: 'Disability Premium Waiver',
        notAvailable: true,
      },
      {
        name: 'Survivor Pension',
        available: true,
      },
    ],
  };
  shared.checkAddOptionsPageContent(addOptionsContent);
}

export function clickMoreInfo(mainProduct) {
  cy.get('.table-header-title')
    .contains(mainProduct)
    .parent()
    .within(() => {
      cy.contains('More Info').click();
    });
}

export function checkSalesIllustrationPage() {
  cy.get('cx-fs-savings-illustration')
    .should('be.visible')
    .within(() => {
      cy.get('.heading-headline').contains(
        'Savings - Balanced Deal Sales Illustration'
      );
      cy.get('cx-fs-accordion-item').contains('Your Savings Details');
      cy.get('.accordion-item-wrapper').contains('Guaranteed Amount');
      cy.get('.accordion-item-wrapper').contains('Expected Amount');
      cy.get('.accordion-item-wrapper').contains('Monthly Annuity');
      cy.get('.d-none').should('have.length', '2');
    });
  cy.get('.tab-content')
    .should('be.visible')
    .within(() => {
      cy.get('.text-center.p-3').contains('Your Savings Progress');
    });
}
