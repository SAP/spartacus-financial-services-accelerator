export function checkUserIdentificationPage() {
  cy.get('h2.main-heading').contains('Your Current Account Insurance');
  cy.get('div.progress-inner-wrapper').should('have.length', 5);
  cy.get('cx-paragraph').findByText('User Identification');
  cy.get('fsa-select-identification')
    .should('be.visible')
    .within(() => {
      cy.get('.d-flex .position-relative:first-of-type p').contains(
        ' At the Nearest Branch '
      );
      cy.get('.d-flex .position-relative:nth-of-type(2) p').contains(
        ' Legal Identification '
      );
      cy.get('.d-flex .position-relative:nth-of-type(3) p').contains(
        ' Video Identification '
      );
    });
}

export function selectAtTheNearestBranch() {
  cy.get('.d-flex .position-relative:first-of-type p')
    .contains(' At the Nearest Branch ')
    .click();
}
