import * as sharedCheckout from '../shared-checkout.interface';
import * as shared from '../shared-checkout';
import * as dayjs from 'dayjs';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

const tomorrowsDate = dayjs().add(2, 'day').format('YYYY-MM-DD');
const returnDate = dayjs().add(10, 'day').format('YYYY-MM-DD');
const startDate = dayjs().add(2, 'day').format('DD MMM YYYY');

export function populateTripInformation() {
  cy.get('cx-dynamic-form').within(() => {
    cy.get('[name=tripDestination]').select('Europe');
    cy.get('[name="tripStartDate"]').type(tomorrowsDate);
    cy.get('[name="tripEndDate"]').type(returnDate);
    cy.get('[name="costOfTrip"]').type('3000');
    cy.get('[name="Travellers"]').select('1');
    cy.get('[name="tripDetailsTravellerAges"]').type('20');
  });
}

export function checkSingleTravelComparisonTable() {
  cy.get('cx-fs-comparison-table-container').within(() => {
    cy.get('.nav-link').contains('Single Trip').click();
  });
  const comparisonTableContent: sharedCheckout.ComparisonTable = {
    mainProducts: [
      {
        name: 'Single - Budget Plan',
        price: '€90.00',
      },
      {
        name: 'Single - Silver Plan',
        price: '€120.00',
      },
      {
        name: 'Single - Gold Plan',
        price: '€150.00',
      },
    ],
  };
  shared.checkComparisonTable(comparisonTableContent);
}

export function selectSingleBudgetPlan() {
  cy.get('cx-fs-comparison-table-panel-item')
    .eq(0)
    .within(() => {
      cy.get('.table-header-title').should(
        'contain.text',
        'Single - Budget Plan'
      );
      cy.get('.table-header-value').should('contain.text', '€90.00');
      cy.get('.primary-button').click();
    });
}

export function checkSingleOptionalProductsAndPick() {
  const addOptionsContent: sharedCheckout.AddOptions = {
    title: 'Your Travel Insurance',
    items: [
      {
        name: 'Business Cover',
        notAvailable: true,
      },
      {
        name: 'Excess waiver',
        available: true,
      },
      {
        name: 'Golf Cover',
        notAvailable: true,
      },
      {
        name: 'Hazardous Activities',
        notAvailable: true,
      },
      {
        name: 'Valuables Extension',
        available: true,
      },
      {
        name: 'Winter Sports Cover',
        available: true,
        shouldAdd: true,
      },
    ],
  };
  shared.checkAddOptionsPageContent(addOptionsContent);
}

export function checkTravelMiniCart() {
  const miniCartContent: sharedCheckout.MiniCart = {
    price: '€99.00',
    products: [
      {
        title: 'Start Date:',
        value: startDate,
      },
      {
        title: 'Number of Travelers:',
        value: '1',
      },
      {
        title: 'Single - Budget Plan:',
        value: '€90.00',
      },
      {
        title: 'Winter Sports Cover:',
        value: '€9.00',
      },
    ],
  };
  shared.checkMiniCart(miniCartContent);
}

export function checkOptionalProducts() {
  const addOptionsContent: sharedCheckout.AddOptions = {
    title: 'Your Travel Insurance',
    items: [
      {
        name: 'Business Cover',
      },
      {
        name: 'Excess waiver',
      },
      {
        name: 'Golf Cover',
      },
      {
        name: 'Hazardous Activities',
      },
      {
        name: 'Valuables Extension',
      },
      {
        name: 'Winter Sports Cover',
      },
    ],
  };

  shared.checkAddOptionsPageContent(addOptionsContent);
}

export function checkPageComponenth2(checkoutStep) {
  cy.get('.section-header-heading').should('be.visible').contains(checkoutStep);
  cy.get('cx-fs-mini-cart')
    .should('be.visible')
    .within(() => {
      cy.get('.section-header-heading').contains('Travel Insurance');
    });
}

export function checkPageComponenth3(checkoutStep) {
  cy.get('h3').should('be.visible').contains(checkoutStep);
  cy.get('cx-fs-mini-cart')
    .should('be.visible')
    .within(() => {
      cy.get('h2').contains('Travel Insurance');
    });
}

export function checkBackpackersTravelComparisonTable() {
  cy.get('cx-fs-comparison-table-container').within(() => {
    cy.get('.nav-link').contains('Backpacking Trip').click();
  });
  cy.get('.table-header-value').should('contain.text', '€105.00');
  cy.get('.table-header-value').should('contain.text', '€157.00');
  cy.get('.table-header-value').should('contain.text', '€187.00');
}

export function selectBackpackersGold() {
  cy.get('cx-fs-comparison-table-panel-item')
    .eq(2)
    .within(() => {
      cy.get('.table-header-title').should(
        'contain.text',
        'Backpackers - Gold Plan'
      );
      cy.get('.table-header-value').should('contain.text', '€187.00');
      cy.get('.primary-button').click();
    });
}

export function checkBackpackersOptionalProducts() {
  const addOptionsContent: sharedCheckout.AddOptions = {
    title: 'Your Travel Insurance',
    items: [
      {
        name: 'Business Cover',
        notAvailable: true,
      },
      {
        name: 'Excess waiver',
        available: true,
      },
      {
        name: 'Golf Cover',
        notAvailable: true,
      },
      {
        name: 'Hazardous Activities',
        available: true,
      },
      {
        name: 'Valuables Extension',
        available: true,
      },
      {
        name: 'Winter Sports Cover',
        available: true,
      },
    ],
  };
  shared.checkAddOptionsPageContent(addOptionsContent);
}
