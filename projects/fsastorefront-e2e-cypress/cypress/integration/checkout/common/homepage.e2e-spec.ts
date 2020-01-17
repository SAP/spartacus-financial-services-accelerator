context('Homepage', () => {
  before(() => {
    cy.visit('/');
  });

  it('should display title', () => {
    cy.title().should('not.be.empty');
  });

  it('should have site logo', () => {
    cy.get('.SiteLogo').should('be.visible');
  });

  it('should have enriched banner', () => {
    cy.get('fsa-enriched-responsive-banner');
  });

  it('should contain category carousel component', () => {
    cy.get('fsa-category-carousel');
  });

  it('should contain our services banner', () => {
    cy.get('.Section3 cx-banner');
  });

  it('should have assistance and support paragraph', () => {
    cy.get('cx-paragraph .main-title.main-title__headline-border');
  });

  it('should have assistance and support banners', () => {
    cy.get('.Section4 cx-banner').should('have.length', 2);
  });

  it('should have header navigation with nav nodes', () => {
    cy.get('.NavigationBar').within(() => {
      cy.get('cx-navigation-ui > nav').should('have.length', 3);
      cy.get('cx-generic-link').should('have.length', 13);
    });
  });

  it('should have footer with footer navigation and notice', () => {
    cy.get('.Footer').within(() => {
      cy.get('cx-navigation-ui > nav').should('have.length', 4);
      cy.get('h5').should('have.length', 4);
      cy.get('cx-generic-link').should('have.length', 17);
      cy.get('.cx-notice').should(
        'contain',
        'SAP SE or an SAP affiliate company. All rights reserved.'
      );
    });
  });
});
