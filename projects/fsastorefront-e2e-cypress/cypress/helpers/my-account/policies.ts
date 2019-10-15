export const POLICIES_PAGE = '/my-account/my-policies';

export function accessPoliciesPage() {
  cy.visit(POLICIES_PAGE);
}

export function checkPoliciesTitle() {
  cy.get('.heading-headline').should('contain', 'Policies');
}

export function checkNumberOfPolicies(numberOfPolicies) {
  cy.get('.info-card').should('have.length', numberOfPolicies);
}
