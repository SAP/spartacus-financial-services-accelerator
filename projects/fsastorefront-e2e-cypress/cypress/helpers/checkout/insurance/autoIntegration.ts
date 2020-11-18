import * as shared from '../shared-checkout';
import { waitForUserAssets, waitForCalculation } from '../../generalHelpers';

const currentDate = Cypress.moment().format(' DD MMM YYYY ');

export function checkAutoComparisonTable() {
  const comparisonTableContent: addOptionsPage.ComparisonTable = {
    mainProducts: [
      {
        name: 'Auto Bronze',
        price: '€213.06',
      },
      {
        name: 'Auto Silver',
        price: '€329.64',
      },
      {
        name: 'Auto Gold',
        price: '€505.84',
      },
    ],
  };
  shared.checkComparisonTable(comparisonTableContent);
}

export function selectAutoSilver() {
  cy.get('cx-fs-comparison-table-panel-item')
    .eq(1)
    .within(() => {
      cy.get('.table-header-title').should('have.text', 'Auto Silver');
      cy.get('.table-header-value').should('have.text', '€329.64');
      cy.get('.primary-button').click();
    });
}

export function checkAutoSilverMiniCart() {
  const miniCartContent: addOptionsPage.MiniCart = {
    price: ' €329.64 ',
    products: [
      {
        title: ' Start Date: ',
        value: currentDate,
      },
      {
        title: 'Vehicle Make:',
        value: ' Audi ',
      },
      {
        title: 'Vehicle Model:',
        value: ' A5 ',
      },
      {
        title: 'Vehicle Type:',
        value: ' A5 Quattro ',
      },
      {
        title: 'Vehicle Value:',
        value: ' 12000 ',
      },
      {
        title: 'Vehicle Year:',
        value: ' 2017 ',
      },
      {
        title: ' Third Party Liability: ',
        value: ' €326.45 ',
      },
      {
        title: ' Collision Coverage: ',
        value: ' €3.19 ',
      },
    ],
  };
  shared.checkMiniCart(miniCartContent);
}

export function waitForBoundQuote() {
  const boundQuote = waitForUserAssets(
    'potentialProductPromotions',
    'boundQuote'
  );
  cy.wait(`@${boundQuote}`).its('status').should('eq', 200);
}

export function addPaymentMethod(userId: string, cartId: string) {
  cy.get('.short-overview-value')
    .eq(0)
    .then(() => {
      cy.request({
        method: 'POST',
        url: `${Cypress.env(
          'API_URL_INT'
        )}/occ/v2/financial/users/${userId}/carts/${cartId}/paymentdetails`,
        headers: {
          Authorization: `bearer ${
            JSON.parse(localStorage.getItem('spartacus-local-data')).auth
              .userToken.token.access_token
          }`,
        },
        body: {
          accountHolderName: 'Test User',
          cardNumber: '4111111111111111',
          cardType: { code: 'visa' },
          expiryMonth: '01',
          expiryYear: '2125',
          defaultPayment: true,
          saved: true,
          billingAddress: {
            firstName: 'Test',
            lastName: 'User',
            titleCode: 'mr',
            line1: 'Some address',
            line2: '',
            town: 'Town',
            postalCode: 'H4B3L4',
            country: { isocode: 'US' },
          },
        },
      }).then(response => {
        expect(response.status).to.eq(201);
      });
    });
}
