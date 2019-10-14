export const APPLICATIONS_PAGE = '/my-account/my-financial-applications';

export function accessApllicationsPage() {
    cy.visit(APPLICATIONS_PAGE);
}

export function checkApplicationTitle() {
    cy.get('.heading-headline').should('contain', 'Applications');
}

export function checkNumberOfApplications(numberOfApplications) {
    cy.get('.info-card').should('have.length', numberOfApplications);
}