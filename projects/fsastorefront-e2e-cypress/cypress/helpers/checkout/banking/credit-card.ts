import * as shared from '../shared-checkout';
import * as sharedCheckout from '../shared-checkout.interface';

export function checkOptionalProducts() {
  const addOptionsContent: sharedCheckout.AddOptions = {
    title: 'Your Credit Card Application',
    items: [
      {
        name: 'Credit Card Protection',
        available: true,
      },
      {
        name: 'Overseas Insurance',
        notAvailable: true,
      },
      {
        name: 'Special Support',
        available: true,
      },
    ],
  };
  shared.checkAddOptionsPageContent(addOptionsContent);
}

export function checkMiniCartCreditCard() {
  const miniCartContent: sharedCheckout.MiniCart = {
    price: ' €89.00 ',
    products: [
      {
        title: 'Debit Card Design:',
        value: ' black ',
      },
      {
        title: 'Minimum Card Limit:',
        value: ' no ',
      },
      {
        title: ' Premium Card: ',
        value: ' €89.00 ',
      },
    ],
  };
  shared.checkMiniCart(miniCartContent);
}

export function checkCreditCardComparisonTable() {
  const comparisonTableContent: sharedCheckout.ComparisonTable = {
    mainProducts: [
      {
        name: 'Basic Card',
        price: '€49.00',
      },
      {
        name: 'Premium Card',
        price: '€89.00',
      },
      {
        name: 'Exclusive Card',
        price: '€169.00',
      },
    ],
  };
  shared.checkComparisonTable(comparisonTableContent);
}

export function selectPremiumCard() {
  cy.get('cx-fs-comparison-table-panel-item')
    .eq(1)
    .within(() => {
      cy.get('.table-header-title').should('contain.text', 'Premium Card');
      cy.get('.primary-button').click();
    });
}

export function populateConfigureStep() {
  cy.get('[name=debit-card-design]').select('black');
  cy.get('[name=minimum-card-limit]').select('no');
  cy.get('[name=minimum-card-amount]').type('45000');
  cy.get('[name=numberOfApplicants]').select('2');
}
