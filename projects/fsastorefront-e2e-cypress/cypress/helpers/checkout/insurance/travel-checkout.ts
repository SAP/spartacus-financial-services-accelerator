import * as addOptionsPage from '../../../helpers/checkout/addOptionsPage';

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
    cy.get('[name="NoOfDays"]').type('9');
    cy.get('[name="tripStartDate"]').type('2021-01-01');
    cy.get('[name="tripEndDate"]').type('2021-01-10');
    cy.get('[name="costOfTrip"]').type('3000');
    cy.get('[name="Travellers"]').select('1');
    cy.get('[name="tripDetailsTravellerAges"]').type('20');
  });
  cy.get('fsa-choose-cover-navigation')
    .findByText('Continue')
    .click();
}

export function checkComparisonAndAddProduct() {
  cy.get('fsa-comparison-table-panel-item').should('have.length', 3);
  cy.get('fsa-comparison-table-panel-item')
    .eq(2)
    .within(() => {
      cy.get('.table-header-title').should('have.text', 'Single - Gold Plan');
      cy.get('.table-header-value').should('have.text', '€150.00');
    });
  cy.get('fsa-comparison-table-panel-item')
    .eq(1)
    .within(() => {
      cy.get('.table-header-title').should('have.text', 'Single - Silver Plan');
      cy.get('.table-header-value').should('have.text', '€120.00');
    });
  cy.get('fsa-comparison-table-panel-item')
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

  addOptionsPage.checkAddOptionsPageContent(addOptionsContent);

  cy.get('.primary-button')
    .should('be.visible')
    .click();
}

export function populateAgeOnPersonalDetails() {
  cy.get('[name="age"]').type('30');
  cy.get('fsa-personal-details-navigation')
    .findByText('Continue')
    .click();
}

export function checkQuoteReview() {
  cy.get('fsa-mini-cart').within(() => {
    cy.get('.short-overview-item').should('have.length', 2);
    cy.get('.short-overview-item')
      .eq(0)
      .should('have.text', ' Single - Budget Plan:  €90.00 ');
    cy.get('.short-overview-item')
      .eq(1)
      .should('have.text', ' Winter Sports Cover:  €9.00 ');
    cy.get('.highlighted').should('have.text', ' Total price:  €99.00 ');
  });
  cy.get('.primary-button').click();
  cy.get('fsa-bind-quote-dialog').within(() => {
    cy.get('.primary-button').click();
  });
}
