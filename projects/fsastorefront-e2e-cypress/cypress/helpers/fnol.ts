import { waitForCMSComponent, waitForPage } from './general-helpers';

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

export function checkFNOLCheckoutPage() {
  cy.get('cx-fs-fnol-progress-bar')
    .should('be.visible')
    .within(() => {
      cy.get('h2').contains('Make a Claim Online');
      cy.get('p.label').should('have.length', '4');
    });
}

export function checkFNOLSteps() {
  cy.get('p.label').eq(0).should('have.text', ' Incident Information ');
  cy.get('p.label').eq(1).should('have.text', ' Incident Report ');
  cy.get('p.label').eq(2).should('have.text', ' General Information ');
  cy.get('p.label').eq(3).should('have.text', ' Summary ');
}

export function populateIncidentInformationStep(incidentType) {
  cy.get('cx-dynamic-form').within(() => {
    cy.get('[name=whatHappened]')
      .select(incidentType)
      .then(() => {
        if (!claimNumber) {
          claimNumber = this.getClaimIdFromLocalStorage();
        }
      });
    cy.get('[name=whenHappened]').clear().type('2018-01-01');
    cy.get('[name=whatTime]').clear().type('12:12:12');
    cy.get('[name=country]').select('Serbia');
    cy.get('[name=city]').clear().type('Belgräde');
    cy.get('[name=postcode]').clear().type('11040');
    cy.get('[name=address]').clear().type('Omladinskih Brigada 90g');
    cy.get('[name=description]')
      .clear()
      .type('my tesla S was stolen while I was in the shopping center');
  });
}

export function populateGeneralInformationStep() {
  cy.get('[name=phFault]').select('3rdParty');
  cy.get('[name=reportedToPolice]').eq(0).click();
  cy.get('[name=witnessExist]').eq(1).click();
  cy.get('[name=entitledToDriveVehicle]').eq(1).click();
  cy.get('[name=vehicleParked]').eq(1).click();
  cy.get('[name=otherVehicleInvolved]').eq(1).click();
}

export function checkSummaryPage() {
  cy.get('cx-fs-fnol-summary').within(() => {
    cy.get('h2').contains('Summary');
  });
  cy.get('.accordion-item').should('have.length', '3');
}

export function checkIncidentReportAccordion(accordionItem) {
  cy.get('.accordion-heading').eq(1).should('have.text', ' Incident Report ');
  cy.get('.accordion-item-wrapper')
    .eq(1)
    .within(() => {
      cy.get('.accordion-list-item').should('have.length', accordionItem);
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
      cy.get('.accordion-list-item').should('have.length', '6');
    });
  cy.get('.accordion-list-item').contains('3rdParty');
}

export function checkConfirmationPage() {
  cy.get('.heading-headline').contains('Claim Confirmation');
  cy.get('.notice-text ').contains(' Your processing number is: ');
  cy.get('.content860 p')
    .first()
    .contains(
      'Your claim request has been successfully saved in our system. You can find the confirmation email in the Inbox of your self-service portal and in your mailbox.'
    );
}

export function populateIncidentReportStep() {
  const filePath = 'Claim.pdf';
  cy.get('[name=howAccidentOccurred]').type(
    'while buying tesla coils, my tesla model s was stolen while buying tesla coils, my tesla model s was stolen'
  );
  cy.get('.custom-file-input').attachFile(filePath);
  cy.get('.btn-primary')
    .should('contain.text', 'Upload')
    .eq(0)
    .click({ force: true });
}

export function checkDownloadButton() {
  cy.get('cx-upload').within(() => {
    cy.get('.fa-download');
  });
}

export function checkClaimReplication(incidetType) {
  cy.get('.info-card')
    .should('have.length', 1)
    .within(() => {
      cy.get('.info-card-data').within(() => {
        cy.get('.value').should('contain.text', incidetType);
      });
      cy.get('.info-card-links').contains('Details');
      cy.get('.info-card-links').contains('Add Documents');
    });
}

export function startClaimFromHomepage() {
  cy.get('cx-banner').should('be.visible').eq(2).click();
  cy.get('.section-header-heading').contains('Which car has been damaged?');
  cy.contains('The affected car is not listed? Contact an agent for help!');
  cy.get('.form-check-label').should('be.visible');
  cy.get('.primary-button').contains('Continue').should('be.disabled');
  cy.get('.heading-headline')
    .should('be.visible')
    .contains('Make a Claim Online');
}

export function selectAutoPolicyAndStartClaim() {
  cy.get('cx-card')
    .should('be.visible')
    .within(() => {
      cy.contains('Auto Insurance Policy');
      cy.contains('Vehicle Make: Tesla');
      cy.get('.btn-link').contains('Select').click({ force: true });
    });
  cy.get('.form-check-input').click();
  cy.get('.primary-button').contains('Continue').click();
}

export function deleteClaim() {
  cy.get('.info-card').within(() => {
    cy.contains('Fire')
      .parents('.col-12')
      .within(() => {
        cy.get('a.fs-icon.icon-bin')
          .should('be.visible')
          .eq(0)
          .click({ force: true });
      });
  });
  cy.get('cx-fs-deleted-claim-dialog', { withinSubject: null })
    .should('be.visible')
    .within(() => {
      cy.get('h3').contains('Delete started claim process');
      cy.get('.action-button').contains('Cancel');
      cy.get('button.close').should('be.visible');
      cy.get('.primary-button').contains('Delete').click();
    });
}

export function claimAction(action) {
  cy.get('.info-card').within(() => {
    cy.contains('Glass Damage')
      .parents('.col-12')
      .within(() => {
        cy.get('a.link').contains(action).click({ force: true });
      });
  });
}

export function checkUpdateClaimPage() {
  cy.get('cx-form-component', { withinSubject: null }).should('be.visible');
  cy.get('cx-fs-change-claim-navigation', { withinSubject: null })
    .should('be.visible')
    .within(() => {
      cy.get('.action-button').contains('Back');
      cy.get('.primary-button').contains('Submit');
    });
  cy.get('.heading-headline').contains('Update Claim');
}

export function uploadNewDocument(newDocument) {
  cy.get('cx-form-component', { withinSubject: null })
    .should('be.visible')
    .within(() => {
      const filePath = newDocument;
      cy.get('.col-form-label').contains(
        'Please upload files relevant to the incident:'
      );
      cy.get('.custom-file-input').attachFile(filePath);
      cy.get('.btn-primary')
        .should('contain.text', 'Upload')
        .click({ force: true });
      cy.get('.fa-check').should('be.visible');
    });
  cy.get('.primary-button').contains('Submit').click({ force: true });
}

export function checkClaimDetails() {
  cy.get('.heading-headline', { withinSubject: null }).should(
    'contain.text',
    'Auto Insurance Claim'
  );
  cy.get('cx-fs-accordion-item', { withinSubject: null })
    .should('be.visible')
    .within(() => {
      cy.get('.accordion-heading').contains('General Information');
      cy.get('.accordion-heading').contains('Documents').click();
      cy.get('.action-button').contains('Add Documents').click();
    });
}

export function checkNoClaimsPage() {
  cy.get('.heading-headline').should('be.visible');
  cy.get('.heading-headline').contains('Make a Claim Online');
  cy.get('cx-fs-cms-custom-container')
    .should('be.visible')
    .within(() => {
      cy.get('.notice-text').contains(
        'The affected car is not listed? Contact an agent for help!'
      );
    });
  cy.get('h6.notice')
    .should('be.visible')
    .contains('You have no valid policies!');
}
