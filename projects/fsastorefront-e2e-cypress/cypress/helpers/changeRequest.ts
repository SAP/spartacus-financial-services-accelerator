const currentDate = Cypress.moment().format('DD-MM-YYYY');
const todaysDate = Cypress.moment().format('DD MMM YYYY');

export function startChangeMileage() {
  cy.get('.fs-icon')
    .should('have.length', 2)
    .eq(0)
    .parentsUntil()
    .contains(' Who or What Is Insured ')
    .click();
  cy.get('p.link.mb-0').contains('Edit').click({ force: true });
}

export function checkChangeMileageSteps() {
  cy.get('h2').should('contain.text', ' Change Auto Insurance Policy ');
  cy.get('.action-button').should('contain', 'Cancel');
  cy.get('.progress-inner-wrapper')
    .should('have.length', 2)
    .within(() => {
      cy.get('p.label').eq(0).contains(' Change Car Details ');
      cy.get('p.label').eq(1).contains(' Change Preview ');
    });
}

export function checkChangeRequestConfirmation() {
  cy.get('cx-fs-change-process-confirmation').should('be.visible');
  cy.get('h2').contains(' Change Request Confirmation ');
  cy.get('p').contains(
    ' Your change has been successfully submitted. You can find processing email in the Inbox'
  );
}

export function startChangeCoverage() {
  cy.get('.fs-icon')
    .should('have.length', 2)
    .eq(1)
    .parentsUntil()
    .contains(' Optional Extras ')
    .click({ force: true });
  cy.get('.link.position-absolute').contains('Edit').click();
}

export function checkChangeCoverageSteps() {
  cy.get('h2').should('contain.text', ' Change Auto Insurance Policy ');
  cy.get('.action-button').should('contain', 'Cancel');
  cy.get('.progress-inner-wrapper')
    .should('have.length', 2)
    .within(() => {
      cy.get('p.label').eq(0).contains(' Change Coverage ');
      cy.get('p.label').eq(1).contains(' Change Preview ');
    });
}

export function enterNewMileage() {
  cy.get('cx-fs-cms-form-submit')
    .should('be.visible')
    .within(() => {
      cy.get('[name="vehicleAnnualMileage"]').type('50000');
    });
}

export function checkOptionalExtrasBronze() {
  cy.get('cx-fs-change-coverage')
    .should('be.visible')
    .within(() => {
      cy.get('.section-header-heading').contains(' Optional Extras ');
      cy.get('.row.mx-3').should('have.length', 3);
      cy.get('h6').contains('Collision Coverage');
      cy.get('h6').contains('Uninsured Coverage');
      cy.get('h6').contains('Trailer Liability');
    });
}

export function addTrailerLiability() {
  cy.get('.secondary-button').should('have.length', 3);
  cy.get('.row.mx-3')
    .eq(2)
    .within(() => {
      cy.get('h6').contains('Trailer Liability');
      cy.get('.secondary-button').click();
      cy.get('.secondary-button').contains('Remove');
    });
}
