context('Homepage', () => {
  before(() => {
    cy.visit('/');
  });

  it('should display title', () => {
    cy.title().should('not.be.empty');
  });

  it('should have site logo', () => {
    cy.get('cx-page-slot.SiteLogo').should('be.visible');
  });

  it('should have enriched banner', () => {
    cy.get('cx-page-slot.Section1 fsa-enriched-responsive-banner');
  });

  it('should have policies component', () => {
    cy.get('cx-page-slot.Section2C fsa-view-policies');
  });

  it('should have quotes component', () => {
    cy.get('cx-page-slot.Section2C fsa-view-quotes');
  });

  it('should have header navigation with nav nodes', () => {
    cy.get('cx-page-slot.NavigationBar').within(() => {
      cy.get('cx-navigation-ui > nav').should('have.length', 3);
      cy.get('cx-generic-link').should('have.length', 13);
    });
  });

  it('should have footer with footer navigation and notice', () => {
    cy.get('cx-page-slot.Footer').within(() => {
      cy.get('cx-navigation-ui > nav').should('have.length', 4);
      cy.get('h5').should('have.length', 4);
      cy.get('cx-generic-link').should('have.length', 19);
      cy.get('.notice').should(
        'contain',
        'SAP SE or an SAP affiliate company. All rights reserved.'
      );
    });
  });
});
