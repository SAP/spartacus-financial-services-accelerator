export interface AddOptionItem {
  name: string;
  available?: boolean;
  shouldAdd?: boolean;
}

export interface AddOptions {
  title: string;
  items: AddOptionItem[];
}

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
            if (!item.available) {
              cy.get('span').should('contain', 'Not available');
            }
            if (item.shouldAdd) {
              cy.get('.secondary-button').click();
            }
          });
      });
    });
}

export interface MiniCart {
  price: string;
  products: ProductItem[];
}

export interface ProductItem {
  title: string;
  value: string;
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

export interface ComparisonTable {
  mainProducts: MainProductItem[];
}

export interface MainProductItem {
  name: string;
  price: string;
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
        cy.get('.table-header-title').should('have.text', mainProductItem.name);
        cy.get('.table-header-value').should(
          'have.text',
          mainProductItem.price
        );
      });
  });
}
