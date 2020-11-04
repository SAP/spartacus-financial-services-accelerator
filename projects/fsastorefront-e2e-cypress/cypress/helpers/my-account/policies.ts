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
  cy.get('.info-card-data').within(() => {
    cy.get('.value').then($element => {
      const policyId = $element.text().trim();
      const payload = this.getPayloadForPolicyUpdate(policyId);
      cy.request(payload);
    });
  });
  cy.get('a.link').contains('Make a Claim').click({ force: true });
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
      cy.get('.info-card-data').within(() => {
        cy.get('.label').contains('Premium');
        cy.get('.value').contains('€10.95 ');
      });
      cy.get('.info-card-links .link')
        .contains(' Details ')
        //TODO: When cypress fix issue detached from the DOM remove force true
        .click({ force: true });
    });
}

export function checkAutoChangedPolicy() {
  cy.get('.info-card')
    .should('have.length', 1)
    .within(() => {
      cy.get('.info-card-data').within(() => {
        cy.get('.label').contains('Premium');
        //cy.get('.value').contains('€100.00 ');
      });
      cy.get('.info-card-links .link')
        .contains(' Details ')
        //TODO: When cypress fix issue detached from the DOM remove force true
        .click({ force: true });
    });
}

export function checkMyQuotesPage() {
  cy.selectOptionFromDropdown({
    menuOption: 'My Account',
    dropdownItem: 'Quotes & Applications',
  });
}

export function clickOnPolicyDetails() {
  cy.get('.info-card').within(() => {
    cy.get('.info-card-links .link')
      .contains(' Details ')
      .click({ force: true });
  });
}
