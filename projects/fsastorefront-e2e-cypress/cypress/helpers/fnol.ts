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

export function populateIncidentInformationStep() {
  cy.get('cx-dynamic-form').within(() => {
    cy.get('[name=whatHappened]')
      .select('Collision')
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

export function updateIncidentType() {
  cy.get('cx-dynamic-form').within(() => {
    cy.get('[name=whatHappened]').select('Glass Damage');
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

export function checkIncidentInformationAccordion() {
  cy.get('.accordion-heading')
    .eq(0)
    .should('have.text', ' Incident Information ');
  cy.get('.accordion-item-wrapper')
    .eq(0)
    .within(() => {
      cy.get('.accordion-list-item').should('have.length', '8');
    });
  cy.get('.accordion-list-item').contains('AutoGlassDamage');
}

export function checkIncidentReportAccordion() {
  cy.get('.accordion-heading').eq(1).should('have.text', ' Incident Report ');
  cy.get('.accordion-item-wrapper')
    .eq(1)
    .within(() => {
      cy.get('.accordion-list-item').should('have.length', '3');
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

export function checkOpenClaimContent() {
  cy.get('h6').contains(' Auto Insurance Claim ');
  cy.get('.label').contains('Incident Type');
  cy.get('.value').contains('Collision');
  cy.get('.label').contains('Date of Loss');
  cy.get('.value').contains('01 Jan 2018');
  cy.get('.label').contains('Status');
  cy.get('.value').contains('OPEN');
}

export function startClaimFromHomepage() {
  const claimsPage = waitForPage('claimsPage', 'claimsPage');
  cy.get('.Section4 cx-banner').eq(1).click();
  cy.wait(`@${claimsPage}`).its('status').should('eq', 200);
}

export function checkFnolEntryPage() {
  cy.get('.heading-headline').contains('Make a Claim Online');
  cy.get('h3').contains('Which car has been damaged?');
  cy.get('cx-fs-cms-custom-container').within(() => {
    cy.get('.cx-payment-card-inner').should('be.visible');
  });
}

export function selectPolicyOnEntryPage() {
  cy.get('.cx-payment-card')
    .eq(0)
    .within(() => {
      cy.get('.cx-card-link').click();
    });
  cy.get('.form-check-input').click();
}

export function checkAndResumeSpecificClaim() {
  const claims = waitForPage('my-claims', 'claims');
  cy.selectOptionFromDropdown({
    menuOption: 'My Account',
    dropdownItem: 'Claims',
  });
  cy.wait(`@${claims}`).its('status').should('eq', 200);
  cy.get('.info-card').within(() => {
    cy.get('.info-card-content').contains(claimNumber);
    this.checkOpenClaimContent();
    cy.get('.link').contains('Resume').click({ force: true });
  });
}

export function deleteClaimFromDialog() {
  const claims = waitForPage('my-claims', 'claims');
  cy.selectOptionFromDropdown({
    menuOption: 'My Account',
    dropdownItem: 'Claims',
  });
  cy.wait(`@${claims}`).its('status').should('eq', 200);
  cy.contains('.info-card', claimNumber).within(() => {
    cy.get('a.fs-icon').should('be.visible').click({ force: true });
  });
  cy.get('h3').should('contain.text', 'Delete started claim process');
  cy.get('p').contains('The following claim process will be deleted');
  cy.get('cx-fs-deleted-claim-dialog').within(() => {
    cy.get('.primary-button').click();
  });
}

export function clickContinueAndGetNewClaimID() {
  const incidentInfoForm = waitForCMSComponent(
    'AutoClaimIncidentFormComponent',
    'incidentInfoForm'
  );
  cy.get('h3').contains('Which car has been damaged?');
  cy.get('.primary-button').should('be.visible').click();
  cy.wait(`@${incidentInfoForm}`)
    .its('status')
    .should('eq', 200)
    .then(() => {
      claimNumber = this.getClaimIdFromLocalStorage();
    });
}

export function populateIncidentInformationSecondClaim() {
  cy.get('[name=whatHappened]').select('AutoTheft');
  cy.get('[name=whenHappened]').clear().type('2019-01-01');
  cy.get('[name=whatTime]').clear().type('12:12:12');
  cy.get('[name=country]').select('Serbia');
  cy.get('[name=city]').clear().type('Belgräde');
  cy.get('[name=postcode]').clear().type('11040');
  cy.get('[name=address]').clear().type('Omladinskih Brigada 90g');
  cy.get('[name=description]')
    .clear()
    .type('my tesla S was stolen while I was in the shopping center');
}

export function waitForfnolGeneralInformationStep() {
  const generalInfoPage = waitForPage('fnolGeneralInfoPage', 'generalInfoPage');
  cy.get('.Section4 cx-banner').eq(1).click();
  cy.wait(`@${generalInfoPage}`).its('status').should('eq', 200);
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

export function checkClaimReplication() {
  cy.get('.info-card')
    .should('have.length', 1)
    .within(() => {
      cy.get('.info-card-data').within(() => {
        cy.get('.value').should('contain.text', 'Collision');
      });
    });
}
