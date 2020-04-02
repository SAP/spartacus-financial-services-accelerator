export const POLICIES_PAGE = '/my-account/my-policies/';

export function accessPoliciesPage() {
  cy.visit(POLICIES_PAGE);
}

export function checkPoliciesTitle() {
  cy.get('.heading-headline').should('contain', 'Policies');
}

export function checkMyPoliciesPage() {
  cy.selectOptionFromDropdown({
    menuOption: 'My Account',
    dropdownItem: 'Policies',
  });
  cy.get('cx-fs-policies').within(() => {
    cy.get('.info-card').should('have.length', 1);
  });
}

export function updatePolicyEffectiveAndStartDate() {
  cy.get('div.info-card-caption').then($element => {
    const policyId = $element.text().trim();
    const payload = this.getPayloadForPolicyUpdate(policyId);
    cy.request(payload);
    cy.get('.primary-button')
      .contains(' Make a Claim')
      .click();
  });
}
