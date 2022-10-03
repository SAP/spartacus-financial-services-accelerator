import {
  waitForUserAssets,
  waitForFormDefinition,
} from '../../general-helpers';
import * as dayjs from 'dayjs';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

const currentDate = dayjs().format(' DD MMM YYYY ');

export function selectAutoSilver() {
  cy.get('cx-fs-comparison-table-panel-item')
    .eq(1)
    .within(() => {
      cy.get('.table-header-title').should('contain.text', 'Auto Silver');
      cy.get('.primary-button').click();
    });
}

export function checkReplicatedPolicy(product) {
  cy.get('.info-card')
    .should('have.length', 1)
    .within(() => {
      cy.get('.info-card-data').within(() => {
        cy.get('.value').contains(product);
      });
      cy.get('.info-card-links').contains('Details').click({ force: true });
    });
}

export function checkReplicatedGoldPolicyAndStartFnol() {
  cy.get('.info-card')
    .should('have.length', 1)
    .within(() => {
      cy.get('.info-card-data').within(() => {
        cy.get('.value').contains('Auto Gold');
        cy.get('.label').contains('Premium');
        cy.get('.value').contains('€164.53 ');
      });
      cy.get('a.link').contains('Make a Claim').click({ force: true });
    });
}

export function checkAutoComparisonTableTesla() {
  const comparisonTableContent: addOptionsPage.ComparisonTable = {
    mainProducts: [
      {
        name: 'Auto Bronze',
        price: '€1,869.22',
      },
      {
        name: 'Auto Silver',
        price: '€2,961.97',
      },
      {
        name: 'Auto Gold',
        price: '€5,296.03',
      },
    ],
  };
  shared.checkComparisonTable(comparisonTableContent);
}

export function selectAutoBronze() {
  cy.get('cx-fs-comparison-table-panel-item')
    .eq(0)
    .within(() => {
      cy.get('.table-header-title').should('contain.text', 'Auto Bronze');
      cy.get('.primary-button').click();
    });
}

export function checkAutoBronzeMiniCart() {
  const miniCartContent: addOptionsPage.MiniCart = {
    price: ' €1,869.22 ',
    products: [
      {
        title: ' Start Date: ',
        value: currentDate,
      },
      {
        title: 'Vehicle Make:',
        value: ' Tesla ',
      },
      {
        title: 'Vehicle Model:',
        value: ' Tesla S ',
      },
      {
        title: 'Vehicle Type:',
        value: ' S ',
      },
      {
        title: 'Vehicle Value:',
        value: ' 27000 ',
      },
      {
        title: 'Vehicle Year:',
        value: ' 2018 ',
      },
      {
        title: ' Third Party Liability: ',
        value: ' €1,869.22 ',
      },
    ],
  };
  shared.checkMiniCart(miniCartContent);
}

export function checkAutoBronzeMiniCartBug() {
  const miniCartContent: addOptionsPage.MiniCart = {
    price: ' €849.01 ',
    products: [
      {
        title: ' Start Date: ',
        value: currentDate,
      },
      {
        title: 'Vehicle Make:',
        value: ' Tesla ',
      },
      {
        title: 'Vehicle Model:',
        value: ' Tesla S ',
      },
      {
        title: 'Vehicle Type:',
        value: ' S ',
      },
      {
        title: 'Vehicle Value:',
        value: ' 27000 ',
      },
      {
        title: 'Vehicle Year:',
        value: ' 2018 ',
      },
      {
        title: ' Third Party Liability: ',
        value: ' €693.82 ',
      },
      {
        title: ' Collision Coverage: ',
        value: ' €95.19 ',
      },
      {
        title: ' Uninsured Coverage: ',
        value: ' €60.00 ',
      },
    ],
  };
  shared.checkMiniCart(miniCartContent);
}

export function checkAutoComparisonTableGolf() {
  const comparisonTableContent: addOptionsPage.ComparisonTable = {
    mainProducts: [
      {
        name: 'Auto Bronze',
        price: '€65.57',
      },
      {
        name: 'Auto Silver',
        price: '€101.58',
      },
      {
        name: 'Auto Gold',
        price: '€164.53',
      },
    ],
  };
  shared.checkComparisonTable(comparisonTableContent);
}

export function selectAutoGold() {
  cy.get('cx-fs-comparison-table-panel-item')
    .eq(2)
    .within(() => {
      cy.get('.table-header-title').should('contain.text', 'Auto Gold');
      cy.get('.primary-button').click();
    });
}

export function checkAutoGoldMiniCart() {
  const miniCartContent: addOptionsPage.MiniCart = {
    price: ' €164.53 ',
    products: [
      {
        title: ' Start Date: ',
        value: currentDate,
      },
      {
        title: 'Vehicle Make:',
        value: ' Volkswagen ',
      },
      {
        title: 'Vehicle Model:',
        value: ' Golf ',
      },
      {
        title: 'Vehicle Type:',
        value: ' Golf C Diesel ',
      },
      {
        title: 'Vehicle Value:',
        value: ' 7000 ',
      },
      {
        title: 'Vehicle Year:',
        value: ' 2014 ',
      },
      {
        title: ' Third Party Liability: ',
        value: ' €147.71 ',
      },
      {
        title: ' Collision Coverage: ',
        value: ' €1.17 ',
      },
      {
        title: ' Comprehensive Coverage: ',
        value: ' €5.65 ',
      },
      {
        title: ' Uninsured Coverage: ',
        value: ' €5.00 ',
      },
      {
        title: ' Roadside Assistance: ',
        value: ' €5.00 ',
      },
    ],
  };
  shared.checkMiniCart(miniCartContent);
}

export function waitForIncidentInfoForm() {
  const incidentInfo = waitForFormDefinition(
    'auto_claim_incident_info_form',
    'incidentInfo'
  );
  cy.wait(`@${incidentInfo}`).then(({ response }) => {
    expect(response.statusCode).to.eq(200);
  });
}

export function waitForIncidentReportForm() {
  const incidentReport = waitForFormDefinition(
    'auto_claim_incident_report_form',
    'incidentReport'
  );
  cy.wait(`@${incidentReport}`).then(({ response }) => {
    expect(response.statusCode).to.eq(200);
  });
}

export function waitForGeneralInfoForm() {
  const generalInfo = waitForFormDefinition(
    'auto_claim_general_form',
    'generalInfo'
  );
  cy.wait(`@${generalInfo}`).then(({ response }) => {
    expect(response.statusCode).to.eq(200);
  });
}

export function checkIncidentInformationAccordion(incidentType) {
  cy.get('.accordion-heading')
    .eq(0)
    .should('contain.text', 'Incident Information');
  cy.get('.accordion-item-wrapper')
    .eq(0)
    .within(() => {
      cy.get('.accordion-list-item').should('have.length', '8');
    });
  cy.get('.accordion-list-item').contains(incidentType);
}

export function checkAutoComparisonTableOpel() {
  const comparisonTableContent: addOptionsPage.ComparisonTable = {
    mainProducts: [
      {
        name: 'Auto Bronze',
        price: '€112.48',
      },
      {
        name: 'Auto Silver',
        price: '€174.03',
      },
      {
        name: 'Auto Gold',
        price: '€271.78',
      },
    ],
  };
  shared.checkComparisonTable(comparisonTableContent);
}

export function selectAutoSilverReferred() {
  cy.get('cx-fs-comparison-table-panel-item')
    .eq(1)
    .within(() => {
      cy.get('.table-header-title').should('have.text', 'Auto Silver');
      cy.get('.table-header-value').should('have.text', '€174.03');
      cy.get('.primary-button').click();
    });
}

export function checkAutoSilverReferredMiniCart() {
  const miniCartContent: addOptionsPage.MiniCart = {
    price: ' €174.03 ',
    products: [
      {
        title: ' Start Date: ',
        value: currentDate,
      },
      {
        title: 'Vehicle Make:',
        value: ' Opel ',
      },
      {
        title: 'Vehicle Model:',
        value: ' GT ',
      },
      {
        title: 'Vehicle Type:',
        value: ' OPEL GT 2008 ',
      },
      {
        title: 'Vehicle Value:',
        value: ' 5000 ',
      },
      {
        title: 'Vehicle Year:',
        value: ' 2007 ',
      },
      {
        title: ' Third Party Liability: ',
        value: ' €172.35 ',
      },
      {
        title: ' Collision Coverage: ',
        value: ' €1.68 ',
      },
    ],
  };
  shared.checkMiniCart(miniCartContent);
}

export function checkReferredQuotePopup() {
  cy.get('cx-fs-referred-quote-dialog')
    .should('be.visible')
    .within(() => {
      cy.get('h3').should('contain.text', 'Customer Info');
      cy.get('.action-button').should('contain.text', 'Cancel');
      cy.get('.primary-button').contains('Contact Agent');
      cy.get('.primary-button').eq(1).click();
    });
}

export function selectAutoBronzeAudi() {
  cy.get('cx-fs-comparison-table-panel-item')
    .eq(0)
    .within(() => {
      cy.get('.table-header-title').should('have.text', 'Auto Bronze');
      cy.get('.table-header-value').should('have.text', '€213.06');
      cy.get('.primary-button').click();
    });
}

export function checkAutoBrozneAudiMiniCart() {
  const miniCartContent: addOptionsPage.MiniCart = {
    price: ' €120.58 ',
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
        value: ' €112.48 ',
      },
      {
        title: ' Collision Coverage: ',
        value: ' €3.10 ',
      },
      {
        title: ' Uninsured Coverage: ',
        value: ' €5.00 ',
      },
    ],
  };
  shared.checkMiniCart(miniCartContent);
}
