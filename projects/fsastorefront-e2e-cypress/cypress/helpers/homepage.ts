export function checkPageElements() {
  cy.get('.SiteLogo').should('be.visible');
  cy.get('cx-fs-enriched-responsive-banner')
    .should('be.visible')
    .within(() => {
      cy.get('.enriched-banner-title.box-title').contains(
        'Choose a perfect product.'
      );
      cy.get('.enriched-banner-details-box').contains(
        'Create long lasting benefits with our digital financial solutions.'
      );
    });
  cy.get('cx-fs-category-carousel').should('be.visible');
  cy.get('cx-fs-category-feature').should('be.visible').and('have.length', 11);
  cy.get('.Section3 cx-link')
    .should('be.visible')
    .should('contain', 'Find the Right Insurance Cover');
}

export function checkAssistanceAndSupport() {
  cy.get('.heading-headline').should('contain', 'Assistance and Support');
  cy.get('.Section4 cx-banner').should('have.length', 2);
}

export function checkHeaderNavigation() {
  cy.get('.NavigationBar').within(() => {
    cy.get('cx-navigation-ui > nav').should('have.length', 3);
    cy.get('span').contains('Insurance');
    cy.get('span').contains('Banking');
    cy.get('span').contains('Services');
  });
}

export function checkFooter() {
  cy.get('.Footer').within(() => {
    cy.get('cx-navigation-ui > nav').should('have.length', 4);
    cy.get('span').should('have.length', 4);
    cy.get('cx-generic-link').should('have.length', 17);
    cy.get('cx-anonymous-consent-open-dialog').should('be.visible');
    cy.get('.cx-notice').contains(
      'SAP SE or an SAP affiliate company. All rights reserved.'
    );
  });
}

export function checkChatbot() {
  cy.get('#cai-webclient-onboarding-message').should(
    'contain.text',
    'Chat with me!'
  );
  cy.get('#cai-webclient-builtin-button').should(
    'contain.text',
    'Click on me!'
  );
}
