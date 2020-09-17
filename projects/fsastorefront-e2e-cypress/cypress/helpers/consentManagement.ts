export function checkAnonymousConsent() {
  cy.get('.anonymous-consent-banner')
    .should('be.visible')
    .within(() => {
      cy.get('.btn-primary').should('be.visible');
      cy.get('.btn-action').should('be.visible').click();
    });
  cy.get('.form-check-input').click();
  cy.get('.close').click();
  cy.get('.anonymous-consent-banner').should('not.exist');
}
