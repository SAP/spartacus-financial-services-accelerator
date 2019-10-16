export const CLAIMS_PAGE = '/my-account/my-insurance-claims';

export function accessClaimsPage() {
  cy.visit(CLAIMS_PAGE);
}

export function checkClaimsTitle() {
  cy.get('.heading-headline').should('contain', 'Claims');
}
