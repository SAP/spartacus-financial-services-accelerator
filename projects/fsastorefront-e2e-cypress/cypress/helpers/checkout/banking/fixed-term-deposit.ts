import * as shared from '../shared-checkout';

export function checkOptionalProducts() {
  const addOptionsContent: addOptionsPage.AddOptions = {
    title: 'Your Fixed Term Deposit Application',
    items: [
      {
        name: 'Flexi Deposit',
        available: true,
        shouldAdd: true,
      },
      {
        name: 'Offset Account',
        available: true,
        shouldAdd: true,
      },
    ],
  };
  shared.checkAddOptionsPageContent(addOptionsContent);
}

export function checkMiniCartFirstStep() {
  const miniCartContent: addOptionsPage.MiniCart = {
    price: ' €503,125.00 ',
    products: [
      {
        title: 'Term Amount:',
        value: ' 500000 ',
      },
      {
        title: 'Deposit Term:',
        value: ' 3 ',
      },
      {
        title: 'Maturity Option:',
        value: ' termination ',
      },
      {
        title: 'Start Date:',
        value: ' 2023-12-12 ',
      },
    ],
  };
  shared.checkMiniCart(miniCartContent);
}

export function checkMiniCart() {
  const miniCartContent: addOptionsPage.MiniCart = {
    price: ' €503,125.00 ',
    products: [
      {
        title: ' Start Date: ',
        value: ' 12 Dec 2023 ',
      },
      {
        title: 'Deposit Term:',
        value: ' 3 ',
      },
      {
        title: 'Maturity Option:',
        value: ' termination ',
      },
      {
        title: 'Investment Amount:',
        value: ' 500,000.00 ',
      },
      {
        title: ' Fixed Term Deposit: ',
        value: ' €503,125.00 ',
      },
      {
        title: ' Flexi Deposit: ',
        value: ' €0.00 ',
      },
      {
        title: ' Offset Account: ',
        value: ' €0.00 ',
      },
    ],
  };
  shared.checkMiniCart(miniCartContent);
}

export function configureAProduct() {
  cy.get('[name=term-amount]').type('500000');
  cy.get('[name=deposit-term]').select('3');
  cy.get('[name=maturity-option]').select('termination');
  cy.get('[name=startDate]').type('2023-12-12');
}

export function checkFtdApplication() {
  cy.get('cx-fs-quotes').within(() => {
    cy.get('.info-card').should('have.length', 1);
    cy.get('h6').should('have.text', ' Fixed Term Deposit ');
    cy.get('.label').contains('Fixed Term Deposit');
    cy.get('.label').contains('Quote status');
    cy.get('.value').contains('Pending');
    cy.get('.value').contains('€503,125.00');
  });
}
