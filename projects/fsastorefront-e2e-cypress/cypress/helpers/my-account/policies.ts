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

export function getPayloadForPolicyUpdate(policyId) {
  return {
    url: `${Cypress.env(
      'API_URL'
    )}/odata2webservices/InboundInsurancePolicy/InsurancePolicies`,
    method: 'POST',
    headers: {
      Authorization: 'Basic ZnNpbnRlZ3JhdGlvbmFkbWluOjEyMzQ1Ng==',
      'Content-Type': 'application/json',
    },
    body: {
      '@odata.context': '$metadata#InsurancePolicy/$entity',
      policyId: policyId,
      contractId: policyId,
      versionNumber: '1',
      policyEffectiveDate: '2018-05-11T08:59:04',
      policyStartDate: '2018-05-11T08:59:04',
    },
  };
}

export function checkAutoPolicy() {
  cy.get('.info-card')
    .should('have.length', 1)
    .within(() => {
      cy.get('.info-card-data .title')
        .eq(2)
        .contains('€10.95 / Monthly');
      cy.get('.primary-button').contains(' Make a Claim');
    });
}

export function clickOnDetails() {
  cy.get('.secondary-button').click();
}
