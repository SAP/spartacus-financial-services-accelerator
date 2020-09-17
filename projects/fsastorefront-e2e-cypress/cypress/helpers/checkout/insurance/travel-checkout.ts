import * as shared from '../shared-checkout';

export function openCategoryPage() {
  cy.selectOptionFromDropdown({
    menuOption: 'Insurance',
    dropdownItem: 'Travel',
  });
  cy.get('.enriched-banner-styled-text')
    .invoke('text')
    .then(text => {
      if (text !== ' Get a Quote') {
        openCategoryPage();
      }
    });

  cy.get('.enriched-banner-styled-text')
    .should('be.visible')
    .click({ force: true });
}

export function populateInsuranceInfoForm() {
  cy.get('cx-dynamic-form').within(() => {
    cy.get('[name=tripDestination]').select('Europe');
    cy.get('[name="tripStartDate"]').type('2021-01-01');
    cy.get('[name="tripEndDate"]').type('2021-01-10');
    cy.get('[name="costOfTrip"]').type('3000');
    cy.get('[name="Travellers"]').select('1');
    cy.get('[name="tripDetailsTravellerAges"]').type('20');
  });
  cy.get('cx-fs-choose-cover-navigation').findByText('Continue').click();
}

export function checkTravelComparisonTable() {
  const comparisonTableContent: addOptionsPage.ComparisonTable = {
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
      cy.get('.table-header-title').should('have.text', 'Single - Budget Plan');
      cy.get('.table-header-value').should('have.text', '€90.00');
      cy.get('.primary-button').click();
    });
}

export function checkOptionalProductsAndPick() {
  const addOptionsContent: addOptionsPage.AddOptions = {
    title: 'Your Travel Insurance',
    items: [
      {
        name: 'Winter Sports Cover',
        available: true,
        shouldAdd: true,
      },
      {
        name: 'Golf Cover',
        available: false,
      },
      {
        name: 'Business Cover',
        available: false,
      },
      {
        name: 'Valuables Extension',
        available: true,
      },
      {
        name: 'Hazardous Activities',
        available: false,
      },
      {
        name: 'Excess waiver',
        available: true,
      },
    ],
  };

  shared.checkAddOptionsPageContent(addOptionsContent);

  cy.get('.primary-button').should('be.visible').click();
}

export function checkTravelMiniCart() {
  const miniCartContent: addOptionsPage.MiniCart = {
    price: ' €99.00 ',
    products: [
      {
        title: ' Single - Budget Plan: ',
        value: ' €90.00 ',
      },
      {
        title: ' Winter Sports Cover: ',
        value: ' €9.00 ',
      },
    ],
  };
  shared.checkMiniCart(miniCartContent);
}
