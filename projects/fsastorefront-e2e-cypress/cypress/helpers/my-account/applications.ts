export const APPLICATIONS_PAGE = '/my-account/my-financial-applications';

export function accessApplicationsPage() {
  cy.visit(APPLICATIONS_PAGE);
}

export function checkApplicationTitle() {
  cy.get('.heading-headline').should('contain', 'Applications');
}
