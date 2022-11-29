import * as shared from '../shared-checkout';
import * as sharedCheckout from '../shared-checkout.interface';
import * as dayjs from 'dayjs';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

const tomorrowsDate = dayjs().add(2, 'day').format('YYYY-MM-DD');
const startDate = dayjs().add(2, 'day').format('DD MMM YYYY');

export function populateFirstStep() {
  cy.get('cx-form-component').should('be.visible');
  cy.get('h3').contains('Coverage Information');
  cy.get('.form-title').contains('Coverage Information');
  cy.get('[name=lifeWhoCovered]').eq(0).click();
  cy.get('[name="lifeCoverageRequire"]').type('30000');
  cy.get('[name="lifeCoverageLast"]').type('24');
  cy.get('[name=lifeCoverageStartDate]').type(tomorrowsDate);
  cy.get('[name="lifeMainDob"]').type('1987-09-25');
  cy.get('[name=lifeMainSmoke]').eq(1).click();
}

export function selectLifeProduct(lifeProduct, number) {
  cy.get('cx-fs-comparison-table-panel-item')
    .eq(number)
    .within(() => {
      cy.get('.table-header-title').should('contain.text', lifeProduct);
      cy.get('.primary-button').click();
    });
}

export function checkOptionalProductsAddRenewalOption() {
  const addOptionsContent: sharedCheckout.AddOptions = {
    title: 'Your Life Insurance',
    items: [
      {
        name: 'Payment Protection Benefit',
        notAvailable: true,
      },
      {
        name: 'Premium Protection',
        available: true,
        shouldAdd: true,
      },
      {
        name: 'Renewal Option',
        notAvailable: true,
      },
    ],
  };
  shared.checkAddOptionsPageContent(addOptionsContent);
}

export function checkOptionalProductsSecond() {
  const addOptionsContent: sharedCheckout.AddOptions = {
    title: 'Your Life Insurance',
    items: [
      {
        name: 'Payment Protection Benefit',
        notAvailable: true,
      },
      {
        name: 'Premium Protection',
        available: true,
      },
      {
        name: 'Renewal Option',
        notAvailable: true,
      },
    ],
  };
  shared.checkAddOptionsPageContent(addOptionsContent);
}

export function checkLifeBasicMiniCart() {
  const miniCartContent: sharedCheckout.MiniCart = {
    price: '€11.54',
    products: [
      {
        title: 'Start Date:',
        value: startDate,
      },
      {
        title: 'Coverage Period:',
        value: '24',
      },
      {
        title: 'Coverage Amount:',
        value: '30,000.00',
      },
      {
        title: 'Insured:',
        value: 'yourself',
      },
      {
        title: 'Basic Life Insurance:',
        value: '€7.69',
      },
      {
        title: 'Premium Protection:',
        value: '€3.85',
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
  cy.get('[name="lifeSecondDob"]').should('be.visible');
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
    price: '€22.15 ',
    products: [
      {
        title: 'Start Date:',
        value: startDate,
      },
      {
        title: 'Coverage Period:',
        value: '24',
      },
      {
        title: 'Coverage Amount:',
        value: '30,000.00',
      },
      {
        title: 'Insured:',
        value: 'yourself and second person',
      },
      {
        title: 'Basic Life Insurance:',
        value: '€22.15 ',
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
    cy.get('.value').contains('Pending');
    cy.get('.value').contains('€22.15');
  });
}

export function addSecondPerson() {
  cy.get('cx-fs-checkout-progress').within(() => {
    cy.get('h2').should('have.text', ' Your Life Insurance ');
  });
  cy.get('p.label').contains('Choose a Cover').click();
  cy.contains('Yourself and Second Person').should('be.visible').click();
}

export function checkPremiumOptionalProducts() {
  const addOptionsContent: sharedCheckout.AddOptions = {
    title: 'Your Life Insurance',
    items: [
      {
        name: 'Payment Protection Benefit',
        available: true,
      },
      {
        name: 'Premium Protection',
        available: true,
      },
      {
        name: 'Renewal Option',
        available: true,
      },
    ],
  };
  shared.checkAddOptionsPageContent(addOptionsContent);
}
