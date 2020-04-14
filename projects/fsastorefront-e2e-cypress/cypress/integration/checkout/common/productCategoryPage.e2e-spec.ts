import * as productCategory from '../../../helpers/productCategoryPage';

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
    productCategory.checkComponents();
    productCategory.checkQuoteButtons();
    cy.get('.product-feature-wrapper').should('have.length', 2);
    cy.get('.section-header-heading').should('contain', 'Homeowners Monthly');
    cy.get('.section-header-heading').should('contain', 'Homeowners Annually');
    cy.get('.item-details').should('have.length', 2);
  });

  it('should check renters product category page', () => {
    cy.selectOptionFromDropdown({
      menuOption: 'Insurance',
      dropdownItem: 'Renters',
    });
    productCategory.checkComponents();
    productCategory.checkQuoteButtons();
    cy.get('.product-feature-wrapper').should('have.length', 2);
    cy.get('.section-header-heading').should('contain', 'Renters Monthly');
    cy.get('.section-header-heading').should('contain', 'Renters Annually');
    cy.get('.item-details').should('have.length', 2);
  });

  it('should check Auto product category page', () => {
    cy.selectOptionFromDropdown({
      menuOption: 'Insurance',
      dropdownItem: 'Auto',
    });
    productCategory.checkComponents();
    productCategory.checkQuoteButtons();
    cy.get('.product-feature-wrapper').should('have.length', 3);
    cy.get('.section-header-heading').should('contain', 'Auto Bronze');
    cy.get('.section-header-heading').should('contain', 'Auto Silver');
    cy.get('.section-header-heading').should('contain', 'Auto Gold');
    cy.get('.item-details').should('have.length', 3);
  });

  it('should check Life product category page', () => {
    cy.selectOptionFromDropdown({
      menuOption: 'Insurance',
      dropdownItem: 'Life',
    });
    productCategory.checkComponents();
    productCategory.checkQuoteButtons();
    cy.get('.product-feature-wrapper').should('have.length', 2);
    cy.get('.section-header-heading').should('contain', 'Life Basic');
    cy.get('.section-header-heading').should('contain', 'Life Premium');
    cy.get('.item-details').should('have.length', 2);
  });

  it('should check Travel product category page', () => {
    cy.selectOptionFromDropdown({
      menuOption: 'Insurance',
      dropdownItem: 'Travel',
    });
    productCategory.checkComponents();
    productCategory.checkQuoteButtons();
    cy.get('.product-feature-wrapper').should('have.length', 3);
    cy.get('.section-header-heading').should('contain', 'Single Budget');
    cy.get('.section-header-heading').should('contain', 'Single Silver');
    cy.get('.section-header-heading').should('contain', 'Single Gold');
    cy.get('.item-details').should('have.length', 3);
  });

  it('should check Event product category page', () => {
    cy.selectOptionFromDropdown({
      menuOption: 'Insurance',
      dropdownItem: 'Event',
    });
    productCategory.checkComponents();
    productCategory.checkQuoteButtons();
    cy.get('.product-feature-wrapper').should('have.length', 3);
    cy.get('.section-header-heading').should('contain', 'Event Two Stars');
    cy.get('.section-header-heading').should('contain', 'Event Three Stars');
    cy.get('.section-header-heading').should('contain', 'Event Four Stars');
    cy.get('.item-details').should('have.length', 3);
  });

  it('should check Savings product category page', () => {
    cy.selectOptionFromDropdown({
      menuOption: 'Insurance',
      dropdownItem: 'Savings',
    });
    productCategory.checkComponents();
    productCategory.checkQuoteButtons();
    productCategory.checksSavingsCategoryPage();
  });

  it('should check Current Account product category page', () => {
    cy.selectOptionFromDropdown({
      menuOption: 'Banking',
      dropdownItem: 'Current Account',
    });
    productCategory.checkComponents();
    productCategory.checkApplicationButtons();
    cy.get('.product-feature-wrapper').should('have.length', 3);
    cy.get('.section-header-heading').should('contain', 'Basic Account');
    cy.get('.section-header-heading').should('contain', 'Family Account');
    cy.get('.section-header-heading').should('contain', 'Premium Account');
    cy.get('.item-details').should('have.length', 3);
  });

  it('should check Credit Card product category page', () => {
    cy.selectOptionFromDropdown({
      menuOption: 'Banking',
      dropdownItem: 'Credit Card',
    });
    productCategory.checkComponents();
    productCategory.checkApplicationButtons();
    cy.get('.product-feature-wrapper').should('have.length', 3);
    cy.get('.section-header-heading').should('contain', 'Basic Card');
    cy.get('.section-header-heading').should('contain', 'Premium Card');
    cy.get('.section-header-heading').should('contain', 'Exclusive Card');
    cy.get('.item-details').should('have.length', 3);
  });

  it('should check Loan product category page', () => {
    cy.selectOptionFromDropdown({
      menuOption: 'Banking',
      dropdownItem: 'Loan',
    });
    productCategory.checkComponents();
    productCategory.checkApplicationButtons();
    cy.get('.product-feature-wrapper').should('have.length', 1);
    cy.get('.section-header-heading').should('contain', 'Personal Loan');
    cy.get('.item-details').should('have.length', 1);
  });

  it('should check Fixed Term Deposit product category page', () => {
    cy.selectOptionFromDropdown({
      menuOption: 'Banking',
      dropdownItem: 'Fixed Term Deposit',
    });
    productCategory.checkComponents();
    productCategory.checkApplicationButtons();
    cy.get('.product-feature-wrapper').should('have.length', 1);
    cy.get('.section-header-heading').should('contain', 'Fixed Term Deposit');
    cy.get('.item-details').should('have.length', 1);
  });
});
