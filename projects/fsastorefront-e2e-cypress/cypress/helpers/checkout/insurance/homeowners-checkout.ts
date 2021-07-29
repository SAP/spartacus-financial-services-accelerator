import * as shared from '../shared-checkout';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(utc);
dayjs.extend(customParseFormat);

const tomorrowsDate = dayjs().add(2, 'day').format(' DD MMM YYYY ');

export function checkHomeownersComparisonTable() {
  const comparisonTableContent: addOptionsPage.ComparisonTable = {
    mainProducts: [
      {
        name: 'Homeowners Monthly',
        price: '€34.50',
      },
      {
        name: 'Homeowners Annually',
        price: '€338.10',
      },
    ],
  };
  shared.checkComparisonTable(comparisonTableContent);
}

export function selectHomeownersAnnually() {
  cy.get('cx-fs-comparison-table-panel-item')
    .eq(1)
    .within(() => {
      cy.get('.table-header-title').should('have.text', 'Homeowners Annually');
      cy.get('.primary-button').click();
    });
}

export function checkOptionalProducts() {
  const addOptionsContent: addOptionsPage.AddOptions = {
    title: 'Your Homeowners Insurance',
    items: [
      {
        name: 'Bicycles Cover',
        available: true,
      },
      {
        name: 'Flood Cover',
        available: true,
      },
      {
        name: 'Jewelry and Watches Cover',
        available: true,
        shouldAdd: true,
      },
      {
        name: 'Temporary Accommodation Cover',
        available: true,
      },
    ],
  };
  shared.checkAddOptionsPageContent(addOptionsContent);
}

export function checkMiniCartHomeowners() {
  const miniCartContent: addOptionsPage.MiniCart = {
    price: ' €491.25 ',
    products: [
      {
        title: ' Start Date: ',
        value: tomorrowsDate,
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
        title: 'Property Value:',
        value: ' 200000 ',
      },
      {
        title: ' Homeowners Annually: ',
        value: ' €338.10 ',
      },
      {
        title: ' Jewelry and Watches Cover: ',
        value: ' €153.15 ',
      },
    ],
  };
  shared.checkMiniCart(miniCartContent);
}

export function populateHomeownersSpecific() {
  cy.get('[name=propertyDetailsCoverRequired]').eq(0).click();
  cy.get('[name=propertyValue]').type('200000');
  cy.get('[name=propertyRebuildCost]').type('25000');
}

export function populateBuildingCover() {
  cy.get('[name=numberOfYearsHoldingInsurance]').type('12');
  cy.get('h4').contains('Your Building Cover');
  cy.get('[name=alreadyHeldInsurance]').select('3');
  cy.get('[name="accidentalDamageCoverBuilding"]').eq(0).click();
}

export function checkHomeownersPolicy() {
  cy.get('.title').contains('Homeowners Insurance');
  cy.get('.label').contains('Property type');
  cy.get('.value').contains('House');
  cy.get('.label').contains('Premium');
  cy.get('.value').contains('€491.25');
}
