import * as shared from '../shared-checkout';

export function checkRentersComparisonTable() {
  const comparisonTableContent: addOptionsPage.ComparisonTable = {
    mainProducts: [
      {
        name: 'Renters Monthly',
        price: '€31.50',
      },
      {
        name: 'Renters Annually',
        price: '€308.70',
      },
    ],
  };
  shared.checkComparisonTable(comparisonTableContent);
}

export function selectRentersMonthly() {
  cy.get('cx-fs-comparison-table-panel-item')
    .eq(0)
    .within(() => {
      cy.get('.table-header-title').should('have.text', 'Renters Monthly');
      cy.get('.primary-button').click();
    });
}

export function checkOptionalProducts() {
  const addOptionsContent: addOptionsPage.AddOptions = {
    title: 'Your Renters Insurance',
    items: [
      {
        name: 'Temporary Accomodation Cover',
        available: true,
        shouldAdd: true,
      },
      {
        name: 'Jewelry and Watches Cover',
        available: true,
        shouldAdd: true,
      },
      {
        name: 'Bicycles Cover',
        available: true,
        shouldAdd: true,
      },
    ],
  };
  shared.checkAddOptionsPageContent(addOptionsContent);
}

export function checkMiniCartRenters() {
  const miniCartContent: addOptionsPage.MiniCart = {
    price: ' €66.62 ',
    products: [
      {
        title: ' Start Date: ',
        value: ' 12 Dec 2020 ',
      },
      {
        title: 'Property Address:',
        value: ' Omladinskin Brigada ',
      },
      {
        title: 'Property Type:',
        value: ' House ',
      },
      {
        title: ' Renters Monthly: ',
        value: ' €31.50 ',
      },
      {
        title: ' Temporary Accomodation Cover: ',
        value: ' €7.93 ',
      },
      {
        title: ' Jewelry and Watches Cover: ',
        value: ' €15.17 ',
      },
      {
        title: ' Bicycles Cover: ',
        value: ' €12.02 ',
      },
    ],
  };
  shared.checkMiniCart(miniCartContent);
}

export function checkMiniCartRentersRemovedProduct() {
  const miniCartContent: addOptionsPage.MiniCart = {
    price: ' €54.60 ',
    products: [
      {
        title: ' Start Date: ',
        value: ' 12 Dec 2020 ',
      },
      {
        title: 'Property Address:',
        value: ' Omladinskin Brigada ',
      },
      {
        title: 'Property Type:',
        value: ' House ',
      },
      {
        title: ' Renters Monthly: ',
        value: ' €31.50 ',
      },
      {
        title: ' Temporary Accomodation Cover: ',
        value: ' €7.93 ',
      },
      {
        title: ' Jewelry and Watches Cover: ',
        value: ' €15.17 ',
      },
    ],
  };
  shared.checkMiniCart(miniCartContent);
}

export function checkRentersPolicy() {
  cy.get('.title').contains('Renters Insurance');
  cy.get('.label').contains('Premium');
  //TODO: Bug premium missmatch for 0.01
  cy.get('.value').contains('€54.61');
}
