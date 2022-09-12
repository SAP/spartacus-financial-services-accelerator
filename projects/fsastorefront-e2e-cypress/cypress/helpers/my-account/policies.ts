export function checkMyPoliciesPage() {
  cy.selectOptionFromMyAccount({
    dropdownItem: 'Policies',
  });
  cy.get('cx-fs-policies').within(() => {
    cy.get('.info-card').should('have.length', 1);
  });
}

export function clickOnPolicyDetails() {
  cy.get('.info-card').within(() => {
    cy.get('.info-card-links .link')
      .contains(' Details ')
      .click({ force: true });
  });
}
