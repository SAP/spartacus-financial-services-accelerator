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

export function checkReplicatedPolicy(Product) {
  cy.get('.info-card')
    .should('have.length', 1)
    .within(() => {
      cy.get('.info-card-data').within(() => {
        cy.get('.value').contains('Auto ' + Product);
      });
      cy.get('.info-card-links .link')
        .contains(' Details ')
        //TODO: When cypress fix issue detached from the DOM remove force true
        .click({ force: true });
    });
}

export function startFnolCheckout(Product) {
  cy.get('.info-card')
    .should('have.length', 1)
    .within(() => {
      cy.get('.info-card-data').within(() => {
        cy.get('.value').contains('Auto ' + Product);
      });
      cy.get('a.link')
        .should('contain.text', 'Make a Claim')
        .eq(1)
        .click({ force: true });
      //TODO: When cypress fix issue detached from the DOM remove force true
    });
}

export function selectAutoBronze() {
  cy.get('cx-fs-comparison-table-panel-item')
    .eq(0)
    .within(() => {
      cy.get('.table-header-title').should('contain.text', 'Auto Bronze');
      cy.get('.primary-button').click();
    });
}

export function selectAutoGold() {
  cy.get('cx-fs-comparison-table-panel-item')
    .eq(2)
    .within(() => {
      cy.get('.table-header-title').should('contain.text', 'Auto Gold');
      cy.get('.primary-button').click();
    });
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
