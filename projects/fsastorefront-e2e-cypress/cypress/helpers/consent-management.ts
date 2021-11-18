export function checkAnonymousConsent() {
  cy.get('.anonymous-consent-banner')
    .should('be.visible')
    .within(() => {
      cy.get('.btn-primary').should('contain.text', 'Allow All');
      cy.get('.btn-action').should('contain.text', 'View Details');
    });
}

export function checkConsentDetails() {
  cy.get('.btn-action').should('be.visible').click();
  cy.get('.form-check-input').click({ force: true });
  cy.get('.close').click();
  cy.get('.anonymous-consent-banner').should('not.exist');
}

export function clickAllowAll() {
  cy.get('.btn-primary').should('be.visible').click();
  cy.get('.anonymous-consent-banner').should('not.exist');
}

export function checkFooterConsent() {
  cy.get('cx-anonymous-consent-open-dialog')
    .should('be.visible')
    .within(() => {
      cy.get('.btn-link').contains('Consent Preferences').click();
    });
  cy.get('.cx-dialog-content')
    .should('be.visible')
    .within(() => {
      cy.get('.cx-dialog-header').contains('Consent Management');
      cy.get('.btn-link').contains('Clear all');
      cy.get('.btn-link').contains('Select all');
      cy.get('.form-check-label').contains('I approve this sample consent');
      cy.get('button').click();
    });
}
