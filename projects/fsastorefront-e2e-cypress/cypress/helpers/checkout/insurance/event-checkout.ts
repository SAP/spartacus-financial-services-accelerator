import * as shared from '../shared-checkout';

export function checkProgressBarEvent() {
  cy.get('p.label')
    .should('have.length', 6)
    .eq(0)
    .contains("What's Included");
  cy.get('p.label')
    .eq(1)
    .contains('Add Options');
  cy.get('p.label')
    .eq(2)
    .contains('Personal Details');
  cy.get('p.label')
    .eq(3)
    .contains('Quote Review');
  cy.get('p.label')
    .eq(4)
    .contains('Payment Details');
  cy.get('p.label')
    .eq(5)
    .contains('Final Review');
}

export function checkEventComparisonTable() {
  const comparisonTableContent: addOptionsPage.ComparisonTable = {
    mainProducts: [
      {
        name: 'Two Star Event Plan',
        price: '€18.99',
      },
      {
        name: 'Three Star Event Plan',
        price: '€39.99',
      },
      {
        name: 'Four Star Event Plan',
        price: '€79.99',
      },
      {
        name: 'Five Star Event Plan',
        price: '€139.99',
      },
    ],
  };
  shared.checkComparisonTable(comparisonTableContent);
}

export function selectTwoStarEvent() {
  cy.get('cx-fs-comparison-table-panel-item')
    .eq(0)
    .within(() => {
      cy.get('.table-header-title').should('have.text', 'Two Star Event Plan');
      cy.get('.primary-button').click();
    });
}

export function checkOptionalProducts() {
  const addOptionsContent: addOptionsPage.AddOptions = {
    title: 'Your Event Insurance',
    items: [
      {
        name: 'Excess Waiver',
        available: true,
        shouldAdd: true,
      },
      {
        name: 'Increase supplier failure and public liability',
        available: false,
      },
      {
        name: 'Venue Cover',
        available: true,
        shouldAdd: true,
      },
    ],
  };
  shared.checkAddOptionsPageContent(addOptionsContent);
}

export function populatePersonalDetails() {
  cy.get('cx-dynamic-form').within(() => {
    cy.get('[name="eventCountry"]').select('UK');
    cy.get('[name="eventDate"]').type('2020-12-12');
    cy.get('[name="eventVenue"]').type('my Birthday party');
    cy.get('[name="eventVenueAddress"]').type('Oxford Street 23b');
    cy.get('[name="eventVenueCity"]').type('London');
    cy.get('[name="address1"]').type('Omladinskih Brigada');
    cy.get('[name="postcode"]').type('111111');
    cy.get('[name=city]').type('Belgrade');
  });
}

export function checkEventPolicy() {
  cy.get('.title').contains('Event Insurance');
  cy.get('.value').contains('Two Star Event Plan');

  cy.get('.label').contains('Premium');
  cy.get('.value').contains('€47.99');
}

export function checkCheckoutPage() {
  cy.get('h2').contains('Your Event Insurance');
  cy.get('.progress-inner-wrapper').should('have.length', '6');
}
