import {
  ComparisonTable,
  AddOptions,
  MiniCart,
} from './shared-checkout.interface';

export function checkAddOptionsPageContent(addOptions: AddOptions) {
  cy.get('.heading-headline').contains(addOptions.title);
  cy.get('cx-fs-add-options')
    .should('be.visible')
    .within(() => {
      cy.get('h6').should('have.length', addOptions.items.length);
      addOptions.items.forEach((item, index) => {
        cy.get('.row.mx-3.py-3')
          .eq(index)
          .within(() => {
            cy.get('h6').should('have.text', item.name);
            if (item.available === false) {
              cy.get('.col-md-3').should('contain', ' Not available ');
            }
            if (item.shouldAdd) {
              cy.get('.secondary-button').click();
            }
            if (item.mandatory) {
              cy.get('.col-md-3').should('contain', ' Included ');
            }
          });
      });
    });
}

export function checkMiniCart(miniCart: MiniCart) {
  cy.get('.highlighted .short-overview-value').should(
    'have.text',
    miniCart.price
  );
  cy.get('.short-overview-content')
    .should('be.visible')
    .within(() => {
      cy.get('.short-overview-item').should(
        'have.length',
        miniCart.products.length
      );
      miniCart.products.forEach((productItem, index) => {
        cy.get('.short-overview-item')
          .eq(index)
          .within(() => {
            cy.get('.short-overview-title').should(
              'have.text',
              productItem.title
            );
            cy.get('.short-overview-value').should(
              'have.text',
              productItem.value
            );
          });
      });
    });
}

export function checkComparisonTable(comparisonTable: ComparisonTable) {
  cy.get('cx-fs-comparison-table-panel-item').should(
    'have.length',
    comparisonTable.mainProducts.length
  );
  comparisonTable.mainProducts.forEach((mainProductItem, index) => {
    cy.get('cx-fs-comparison-table-panel-item')
      .eq(index)
      .within(() => {
        cy.get('.table-header-title').should(
          'contain.text',
          mainProductItem.name
        );
        cy.get('.table-header-value').should(
          'contain.text',
          mainProductItem.price
        );
      });
  });
}
