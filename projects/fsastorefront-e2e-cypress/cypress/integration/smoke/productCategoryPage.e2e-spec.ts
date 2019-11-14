import * as productCategory from '../../helpers/productCategoryPage';

context('ProductCategoryPage', () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.visit('/');
  });

  it('should check homeowners product category page', () => {
    cy.selectOptionFromDropdown({
      menuOption: 'Insurance',
      dropdownItem: 'Homeowners',
    });
    productCategory.checkComponets();
    productCategory.checkQuoteButtons();
    cy.get('div.product-feature-wrapper').should('have.length', 2);
    cy.get('h3.section-header-heading').should('contain', 'Homeowners Monthly');
    cy.get('h3.section-header-heading').should(
      'contain',
      'Homeowners Annually'
    );
    cy.get('ul.item-details').should('have.length', 2);
  });

  it('should check renters product category page', () => {
    cy.selectOptionFromDropdown({
      menuOption: 'Insurance',
      dropdownItem: 'Renters',
    });
    productCategory.checkComponets();
    productCategory.checkQuoteButtons();
    cy.get('div.product-feature-wrapper').should('have.length', 2);
    cy.get('h3.section-header-heading').should('contain', 'Renters Monthly');
    cy.get('h3.section-header-heading').should('contain', 'Renters Annually');
    cy.get('ul.item-details').should('have.length', 2);
  });

  it('should check Auto product category page', () => {
    cy.selectOptionFromDropdown({
      menuOption: 'Insurance',
      dropdownItem: 'Auto',
    });
    productCategory.checkComponets();
    productCategory.checkQuoteButtons();
    cy.get('div.product-feature-wrapper').should('have.length', 3);
    cy.get('h3.section-header-heading').should('contain', 'Auto Bronze');
    cy.get('h3.section-header-heading').should('contain', 'Auto Silver');
    cy.get('h3.section-header-heading').should('contain', 'Auto Gold');
    cy.get('ul.item-details').should('have.length', 3);
  });

  it('should check Life product category page', () => {
    cy.selectOptionFromDropdown({
      menuOption: 'Insurance',
      dropdownItem: 'Life',
    });
    productCategory.checkComponets();
    productCategory.checkQuoteButtons();
    cy.get('div.product-feature-wrapper').should('have.length', 2);
    cy.get('h3.section-header-heading').should('contain', 'Life Basic');
    cy.get('h3.section-header-heading').should('contain', 'Life Premium');
    cy.get('ul.item-details').should('have.length', 2);
  });

  it('should check Travel product category page', () => {
    cy.selectOptionFromDropdown({
      menuOption: 'Insurance',
      dropdownItem: 'Travel',
    });
    productCategory.checkComponets();
    productCategory.checkQuoteButtons();
    cy.get('div.product-feature-wrapper').should('have.length', 3);
    cy.get('h3.section-header-heading').should('contain', 'Single Budget');
    cy.get('h3.section-header-heading').should('contain', 'Single Silver');
    cy.get('h3.section-header-heading').should('contain', 'Single Gold');
    cy.get('ul.item-details').should('have.length', 3);
  });

  it('should check Event product category page', () => {
    cy.selectOptionFromDropdown({
      menuOption: 'Insurance',
      dropdownItem: 'Event',
    });
    productCategory.checkComponets();
    productCategory.checkQuoteButtons();
    cy.get('div.product-feature-wrapper').should('have.length', 3);
    cy.get('h3.section-header-heading').should('contain', 'Two Stars Event');
    cy.get('h3.section-header-heading').should('contain', 'Three Stars Event');
    cy.get('h3.section-header-heading').should('contain', 'Four Stars Event');
    cy.get('ul.item-details').should('have.length', 3);
  });

  it('should check Savings product category page', () => {
    cy.selectOptionFromDropdown({
      menuOption: 'Insurance',
      dropdownItem: 'Savings',
    });
    productCategory.checkComponets();
    productCategory.checkQuoteButtons();
    cy.get('div.product-feature-wrapper').should('have.length', 3);
    cy.get('h3.section-header-heading').should('contain', 'Safe And Steady');
    cy.get('h3.section-header-heading').should('contain', 'Balanced Deal');
    cy.get('h3.section-header-heading').should('contain', 'Flexi-Max');
    cy.get('ul.item-details').should('have.length', 3);
  });

  it('should check Current Account product category page', () => {
    cy.visit('Banking-Products/Credit-Card/c/banking_main_current_account');
    productCategory.checkComponets();
    productCategory.checkApplicationButtons();
    cy.get('div.product-feature-wrapper').should('have.length', 3);
    cy.get('h3.section-header-heading').should('contain', 'Basic Account');
    cy.get('h3.section-header-heading').should('contain', 'Family Account');
    cy.get('h3.section-header-heading').should('contain', 'Premium Account');
    cy.get('ul.item-details').should('have.length', 3);
  });

  it('should check Credit Card product category page', () => {
    cy.visit('Banking-Products/Credit-Card/c/banking_main_credit_card');
    productCategory.checkComponets();
    productCategory.checkApplicationButtons();
    cy.get('div.product-feature-wrapper').should('have.length', 3);
    cy.get('h3.section-header-heading').should('contain', 'Basic Card');
    cy.get('h3.section-header-heading').should('contain', 'Premium Card');
    cy.get('h3.section-header-heading').should('contain', 'Exclusive Card');
    cy.get('ul.item-details').should('have.length', 3);
  });

  it('should check Loan product category page', () => {
    cy.visit('Banking-Products/Credit-Card/c/banking_main_loans');
    productCategory.checkComponets();
    productCategory.checkApplicationButtons();
    cy.get('div.product-feature-wrapper').should('have.length', 1);
    cy.get('h3.section-header-heading').should('contain', 'Personal Loan');
    cy.get('ul.item-details').should('have.length', 1);
  });

  it('should check Fixed Term Deposit product category page', () => {
    cy.visit('Banking-Products/Credit-Card/c/banking_main_fixed_term_deposits');
    productCategory.checkComponets();
    productCategory.checkApplicationButtons();
    cy.get('div.product-feature-wrapper').should('have.length', 1);
    cy.get('h3.section-header-heading').should('contain', 'Fixed Term Deposit');
    cy.get('ul.item-details').should('have.length', 1);
  });
});
