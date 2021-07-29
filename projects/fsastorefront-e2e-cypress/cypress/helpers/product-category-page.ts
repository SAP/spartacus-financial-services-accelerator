export function checkComponents() {
  cy.get('cx-fs-enriched-responsive-banner').should('be.visible');
  cy.get('.enriched-banner-title').should(
    'contain',
    'Apply online and save your valuable time'
  );
  cy.get('cx-fs-cms-custom-container').should('have.length', '3');
  cy.get('cx-fs-cms-custom-container')
    .eq(0)
    .should('contain.text', 'Pick up from where you left off!');
  cy.get('p.title').should('be.visible');
}

export function checkCategoryBannerButtons(buttonText) {
  cy.get('.enriched-banner-styled-text').contains(buttonText[0]);
  cy.get('.Section2').within(() => {
    cy.get('cx-generic-link a').contains(buttonText[1]);
  });
}

export function checkCategoryProductHeadings(...headings: string[]) {
  cy.get('.product-feature-wrapper').should('have.length', headings.length);
  headings.forEach(element => {
    cy.get('.section-header-heading').should('contain.text', element);
  });
  cy.get('.item-details').should('have.length', headings.length);
}

export var categoryPage = {
  homeowners: 'insurance_main_homeowners',
  renters: 'insurance_main_renters',
  auto: 'insurance_main_auto',
  life: 'insurance_main_life',
  travel: 'insurance_main_travel',
  event: 'insurance_main_event',
  savings: 'insurance_main_savings',
  currentAccount: 'banking_main_current_account',
  creditCard: 'banking_main_credit_card',
  loan: 'banking_main_loans',
  ftd: 'banking_main_fixed_term_deposits',
};

export function checkPageURL(page: string) {
  cy.location().should(loc => {
    expect(loc.href).to.include(`${page}`);
  });
}
