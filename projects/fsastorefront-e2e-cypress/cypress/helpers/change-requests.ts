import * as dayjs from 'dayjs';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

const todaysDateDriver = dayjs().format('YYYY-MM-DD');

export function startChangeMileage() {
  cy.get('.fs-icon')
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
    .eq(1)
    .parentsUntil()
    .contains(' Optional Extras ')
    .click({ force: true });
  cy.get('.link.position-absolute').should('be.visible');
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

export function startAddingDriverCheckout() {
  cy.get('.fs-icon')
    .parentsUntil()
    .contains(' Who or What Is Insured ')
    .click({ force: true });
  cy.get('.action-button').should('be.visible');
  cy.get('.action-button').click();
}

export function checkAddDriverSteps() {
  cy.get('h2').should('contain.text', ' Change Auto Insurance Policy ');
  cy.get('.action-button').should('contain', 'Cancel');
  cy.get('.progress-inner-wrapper')
    .should('have.length', 2)
    .within(() => {
      cy.get('p.label').eq(0).contains('Driver Information');
      cy.get('p.label').eq(1).contains('Change Preview');
    });
}

export function checkDriverInformationStep() {
  cy.get('cx-fs-cms-form-submit')
    .should('be.visible')
    .within(() => {
      cy.get('h3').should('contain.text', 'Auto Information');
    });
  cy.get('[name="effectiveDate"]').should('have.value', todaysDateDriver);
  cy.get('h4').should('contain.text', 'Additional Driver');
}

export function populateAdditionalDriverData() {
  cy.get('cx-fs-cms-form-submit').within(() => {
    cy.get('[name=firstName]').type('Sophie');
    cy.get('[name="lastName"]').type('Digital');
    cy.get('[name="dateOfBirth"]').type('1992-01-01');
    cy.get('[name="driverGender"]').select('Not specified');
    cy.get('[name="driverMaritalStatus"]').select('Single');
    cy.get('[name="driverCategory"]').select('Occasional');
    cy.get('[name="driverLicenceNumber"]').type('LN-88882');
    cy.get('[name="driverLicenceDate"]').type('2019-02-02');
  });
}

export function checkDrivers() {
  cy.get('cx-fs-change-simulation').within(() => {
    cy.get('.col-4').should('contain.text', 'John Moore');
    cy.get('.col-4').should('contain.text', 'Phin Moore');
    cy.get('.col-4').should('contain.text', 'Sophie Digital');
  });
}

export function checkOptionalExtrasGold() {
  cy.get('cx-fs-change-coverage')
    .should('be.visible')
    .within(() => {
      cy.get('.section-header-heading').contains(' Optional Extras ');
      cy.get('.row.mx-3').should('have.length', 1);
      cy.get('h6').contains('Trailer Liability');
    });
}

export function checkAllDrivers() {
  cy.get('.col-6').contains('John');
  cy.get('.col-6').contains('Phin');
  cy.get('.col-6').should('contain.text', 'Digital');
}

export function removeCoverage() {
  cy.get('.primary-button').contains('Continue').should('be.disabled');
  cy.get('.mx-3').within(() => {
    cy.get('.secondary-button').should('contain.text', 'Remove');
  });
  cy.get('.secondary-button').click();
  cy.get('.primary-button').contains('Continue').should('not.be.disabled');
  cy.get('.secondary-button').should('contain.text', 'Add');
  cy.get('.primary-button').should('contain', 'Continue');
  cy.get('.primary-button').click();
}
