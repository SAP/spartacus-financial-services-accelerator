import * as shared from '../shared-checkout';
import * as sharedCheckout from '../shared-checkout.interface';
import * as dayjs from 'dayjs';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

const tomorrowsDate = dayjs().add(2, 'day').format('YYYY-MM-DD');

export function checkProgressBarEvent() {
  cy.get('p.label').should('have.length', 6).eq(0).contains("What's Included");
  cy.get('p.label').eq(1).contains('Add Options');
  cy.get('p.label').eq(2).contains('Personal Details');
  cy.get('p.label').eq(3).contains('Quote Review');
  cy.get('p.label').eq(4).contains('Payment Details');
  cy.get('p.label').eq(5).contains('Final Review');
}

export function checkEventComparisonTable() {
  const comparisonTableContent: sharedCheckout.ComparisonTable = {
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
      cy.get('.table-header-title').should(
        'contain.text',
        'Two Star Event Plan'
      );
      cy.get('.primary-button').click();
    });
}

export function checkOptionalProducts() {
  const addOptionsContent: sharedCheckout.AddOptions = {
    title: 'Your Event Insurance',
    items: [
      {
        name: 'Excess Waiver',
        available: true,
        shouldAdd: true,
      },
      {
        name: 'Increase supplier failure and public liability',
        notAvailable: true,
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
    cy.get('[name="eventCountry"]').select('FR');
    cy.get('[name="eventDate"]').type(tomorrowsDate);
    cy.get('[name="eventVenue"]').type('my Birthday party');
    cy.get('[name="eventVenueAddress"]').type('Champ de Mars');
    cy.get('[name="eventVenueCity"]').type('Paris');
  });
}

export function checkEventPolicy() {
  cy.get('.title').contains('Event Insurance');
  cy.get('.value').contains('Two Star Event Plan');
  cy.get('.label').contains('Premium');
  cy.get('.value').contains('€47.99');
}

export function checkMiniCart() {
  const miniCartContent: sharedCheckout.MiniCart = {
    price: ' €57.99 ',
    products: [
      {
        title: ' Two Star Event Plan: ',
        value: ' €18.99 ',
      },
      {
        title: ' Excess Waiver: ',
        value: ' €10.00 ',
      },
      {
        title: ' Venue Cover: ',
        value: ' €29.00 ',
      },
    ],
  };
  shared.checkMiniCart(miniCartContent);
}

export function checkMiniCartRemovedProduct() {
  const miniCartContent: sharedCheckout.MiniCart = {
    price: ' €47.99 ',
    products: [
      {
        title: ' Two Star Event Plan: ',
        value: ' €18.99 ',
      },
      {
        title: ' Venue Cover: ',
        value: ' €29.00 ',
      },
    ],
  };
  shared.checkMiniCart(miniCartContent);
}

export function checkEventMiniCart() {
  cy.get('cx-fs-mini-cart')
    .should('be.visible')
    .within(() => {
      cy.get('h2').should('contain.text', 'Event Insurance');
      cy.get('.short-overview-item').should('contain.text', 'Two Star');
      cy.get('.short-overview-value').should('contain.text', '€18.99');
    });
}

export function checkMiniCartWithoutOptional() {
  const miniCartContent: sharedCheckout.MiniCart = {
    price: ' €18.99 ',
    products: [
      {
        title: ' Two Star Event Plan: ',
        value: ' €18.99 ',
      },
    ],
  };
  shared.checkMiniCart(miniCartContent);
}
