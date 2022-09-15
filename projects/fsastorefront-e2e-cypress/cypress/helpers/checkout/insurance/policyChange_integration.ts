const currentDate = Cypress.moment().format('DD-MM-YYYY');

export function enterNewMileage() {
  cy.get('cx-fs-cms-form-submit')
    .should('be.visible')
    .within(() => {
      cy.get('[name="vehicleAnnualMileage"]').type('50000');
    });
}

export function checkChangedMileagePremium() {
  cy.get('.offset-1').contains(currentDate);
  cy.get('.col-4.semi-bold').eq(5).contains(' €329.64 / Monthly ');
  cy.get('.col-3.semi-bold').eq(2).contains(' €329.64 / Monthly ');
}

export function checkChangedMileagePremiumCancelled() {
  cy.get('.offset-1').contains(currentDate);
  cy.get('.col-4.semi-bold').eq(5).contains(' €2,024.41 / Annually ');
  cy.get('.col-3.semi-bold').eq(2).contains(' €2,419.00 / Annually ');
}

export function checkOptionalExtrasBronze() {
  cy.get('cx-fs-change-coverage')
    .should('be.visible')
    .within(() => {
      cy.get('.section-header-heading').contains(' Optional Extras ');
      cy.get('.row.mx-3').should('have.length', 4);
      cy.get('h6').eq(0).contains('Collision Coverage');
      cy.get('h6').eq(1).contains('Uninsured Coverage');
      cy.get('h6').eq(2).contains('Trailer Liability');
      cy.get('h6').eq(3).contains('Winter Tires');
    });
}

export function addTrailerLiability() {
  cy.get('.secondary-button').should('have.length', 4);
  cy.get('.row.mx-3')
    .eq(2)
    .within(() => {
      cy.get('h6').contains('Trailer Liability');
      cy.get('.secondary-button').click();
      cy.get('.secondary-button').contains('Remove');
    });
}

export function checkChangedCoveragePremium() {
  cy.get('.offset-1').contains(currentDate);
  cy.get('.col-4.semi-bold').eq(5).contains(' €221.16 / Monthly ');
  cy.get('.col-3.semi-bold').eq(2).contains(' €229.24 / Monthly ');
}
