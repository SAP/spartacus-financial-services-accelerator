import {
  waitForCMSComponent,
  waitForPage,
  waitForUserAssets,
} from './generalHelpers';

export function getClaimIdFromLocalStorage() {
  const localData = JSON.parse(localStorage.getItem('spartacus-local-data'));
  if (
    localData &&
    localData.assets &&
    localData.assets.claims &&
    localData.assets.claims.content
  ) {
    return localData.assets.claims.content.claimNumber;
  }
}

let claimNumber;

export function selectAutoPolicyForFNOL() {
  cy.get('.info-card-caption')
    .contains('BULK1T2000000552')
    .parentsUntil('.col-md-4')
    .within(() => {
      cy.get('.info-card-caption').contains('Auto Insurance');
      cy.get('.primary-button')
        .contains(' Make a Claim')
        .click();
    });
}

export function checkFNOLCheckoutPage() {
  cy.get('cx-fs-fnol-progress-bar')
    .should('be.visible')
    .within(() => {
      cy.get('h2').contains('Make a Claim Online');
      cy.get('p.label').should('have.length', '4');
    });
}

export function checkFNOLSteps() {
  cy.get('p.label')
    .eq(0)
    .should('have.text', ' Incident Information ');
  cy.get('p.label')
    .eq(1)
    .should('have.text', ' Incident Report ');
  cy.get('p.label')
    .eq(2)
    .should('have.text', ' General Information ');
  cy.get('p.label')
    .eq(3)
    .should('have.text', ' Summary ');
}

export function populateIncidentInformationStep() {
  cy.get('cx-dynamic-form').within(() => {
    cy.get('[name=whatHappened]')
      .select('Collision')
      .then(() => {
        if (!claimNumber) {
          claimNumber = this.getClaimIdFromLocalStorage();
        }
      });
    cy.get('[name=whenHappened]')
      .clear()
      .type('2018-01-01');
    cy.get('[name=whatTime]')
      .clear()
      .type('12:12:12');
    cy.get('[name=country]').select('Serbia');
    cy.get('[name=city]')
      .clear()
      .type('Belgräde');
    cy.get('[name=postcode]')
      .clear()
      .type('11040');
    cy.get('[name=address]')
      .clear()
      .type('Omladinskih Brigada 90g');
    cy.get('[name=description]')
      .clear()
      .type('my tesla S was stolen while I was in the shopping center');
  });
}
export function updateIncidentType() {
  cy.get('cx-dynamic-form').within(() => {
    cy.get('[name=whatHappened]').select('Glass Damage');
  });
}

export function populateIncidentReportStep() {
  cy.get('[name=howAccidentOccured]')
    .clear()
    .type(
      'while buying tesla coils, my tesla model s was stolen while buying tesla coils, my tesla model s was stolen'
    );
}

export function populateGeneralInformationStep() {
  cy.get('[name=responsibleForAccident]')
    .clear()
    .type('me');
  cy.get('[name=policeInformed]')
    .eq(0)
    .click();
  cy.get('[name=witnesses]')
    .eq(1)
    .click();
}

export function checkSummaryPage() {
  cy.get('cx-fs-fnol-summary').within(() => {
    cy.get('h2').contains('Summary');
  });
  cy.get('.accordion-item').should('have.length', '3');
}

export function checkIncidentInformationAccordion() {
  cy.get('.accordion-heading')
    .eq(0)
    .should('have.text', ' Incident Information ');
  cy.get('.accordion-item-wrapper')
    .eq(0)
    .within(() => {
      cy.get('.accordion-list-item').should('have.length', '8');
    });
  cy.get('.accordion-list-item').contains('AutoCollision');
}

export function checkIncidentReportAccordion() {
  cy.get('.accordion-heading')
    .eq(1)
    .should('have.text', ' Incident Report ');
  cy.get('.accordion-item-wrapper')
    .eq(1)
    .within(() => {
      cy.get('.accordion-list-item').should('have.length', '1');
    });
  cy.get('.accordion-list-item').contains('while buying tesla coils');
}

export function checkGeneralInformationAccordion() {
  cy.get('.accordion-heading')
    .eq(2)
    .should('have.text', ' General Information ');
  cy.get('.accordion-item-wrapper')
    .eq(2)
    .within(() => {
      cy.get('.accordion-list-item').should('have.length', '3');
    });
  cy.get('.accordion-list-item').contains('me');
}

export function checkConfirmationPage() {
  cy.get('.heading-headline').contains('Claim Confirmation');
  cy.get('.notice-text ').contains(
    ' Your processing number is: ' + claimNumber
  );
  cy.get('.content860 p')
    .first()
    .contains(
      'Your claim request has been successfully saved in our system. You can find the confirmation email in the Inbox of your self-service portal and in your mailbox.'
    );
}

export function checkOpenClaimContent() {
  cy.get('.title').contains('Auto Insurance');
  cy.get('.title').contains('Date of Loss');
  cy.get('.value').contains('01 Jan 2018');
  cy.get('.title').contains('Status');
  cy.get('.value').contains('OPEN');
}

export function startClaimFromHomepage() {
  const claimsPage = waitForPage('claimsPage', 'claimsPage');
  cy.get('.Section4 cx-banner')
    .eq(1)
    .click();
  cy.wait(`@${claimsPage}`)
    .its('status')
    .should('eq', 200);
}

export function checkFnolEntryPage() {
  cy.get('.heading-headline').contains('Make a Claim Online');
  cy.get('h3.section-header-heading').contains('Which car has been damaged?');
  cy.get('fsa-cms-custom-container').within(() => {
    cy.get('.cx-payment-card-inner').should('be.visible');
  });
}

export function selectPolicyOnEntryPage() {
  cy.get('.cx-card-link').click();
  cy.get('.cx-payment-card')
    .eq(0)
    .within(() => {
      cy.get('.cx-card-link');
    })
    .click();
}

export function checkAndResumeSpecificClaim() {
  const claims = waitForPage('my-claims', 'claims');
  cy.selectOptionFromDropdown({
    menuOption: 'My Account',
    dropdownItem: 'Claims',
  });
  cy.wait(`@${claims}`)
    .its('status')
    .should('eq', 200);
  cy.get('.info-card').within(() => {
    cy.get('h4.info-card-caption').contains(claimNumber);
    this.checkOpenClaimContent();
    cy.get('.secondary-button')
      .contains('Resume')
      .click();
  });
}

export function deleteClaimFromDialog() {
  const claims = waitForPage('my-claims', 'claims');
  cy.selectOptionFromDropdown({
    menuOption: 'My Account',
    dropdownItem: 'Claims',
  });
  cy.wait(`@${claims}`)
    .its('status')
    .should('eq', 200);
  cy.contains('.info-card', claimNumber).within(() => {
    cy.get('.action-links-secondary-button').click();
  });
  cy.get('h3').contains('Delete started claim process');
  cy.get('p').contains('The following claim process will be deleted');
  cy.get('cx-fs-deleted-claim-dialog').within(() => {
    cy.get('.primary-button').click();
  });
}

export function clickContinueAndGetNewClaimID() {
  cy.get('.primary-button')
    .should('contain', 'Continue')
    .click()
    .then(() => {
      const fsUserRequests = waitForUserAssets(
        'fsUserRequests/',
        'fsUserRequests'
      );
      cy.wait(`@${fsUserRequests}`)
        .its('status')
        .should('eq', 200);
    })
    .then(() => {
      claimNumber = this.getClaimIdFromLocalStorage();
    });
}

export function waitForIncidentReportStep() {
  const incidentForm = waitForCMSComponent(
    'AutoClaimIncidentReportFormComponent',
    'incidentForm'
  );
  cy.wait(`@${incidentForm}`)
    .its('status')
    .should('eq', 200);
}
