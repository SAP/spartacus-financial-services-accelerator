import * as productCategory from '../../../helpers/productCategoryPage';
import { insuranceButtons } from '../../../helpers/constants';

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
    productCategory.checkCategoryBannerButtons(insuranceButtons);
    cy.get('.product-feature-wrapper').should('have.length', 2);
    cy.get('.section-header-heading').should(
      'contain.text',
      'Homeowners Monthly'
    );
    cy.get('.section-header-heading').should(
      'contain.text',
      'Homeowners Annually'
    );
    cy.get('.item-details').should('have.length', 2);
  });

  it('should check renters product category page', () => {
    cy.selectOptionFromDropdown({
      menuOption: 'Insurance',
      dropdownItem: 'Renters',
    });
    productCategory.checkComponents();
    productCategory.checkCategoryBannerButtons(insuranceButtons);
    cy.get('.product-feature-wrapper').should('have.length', 2);
    cy.get('.section-header-heading').should('contain.text', 'Renters Monthly');
    cy.get('.section-header-heading').should(
      'contain.text',
      'Renters Annually'
    );
    cy.get('.item-details').should('have.length', 2);
  });

  it('should check Auto product category page', () => {
    cy.selectOptionFromDropdown({
      menuOption: 'Insurance',
      dropdownItem: 'Auto',
    });
    productCategory.checkComponents();
    productCategory.checkCategoryBannerButtons(insuranceButtons);
    cy.get('.product-feature-wrapper').should('have.length', 3);
    cy.get('.section-header-heading').should('contain.text', 'Auto Bronze');
    cy.get('.section-header-heading').should('contain.text', 'Auto Silver');
    cy.get('.section-header-heading').should('contain.text', 'Auto Gold');
    cy.get('.item-details').should('have.length', 3);
  });

  it('should check Life product category page', () => {
    cy.selectOptionFromDropdown({
      menuOption: 'Insurance',
      dropdownItem: 'Life',
    });
    productCategory.checkComponents();
    productCategory.checkCategoryBannerButtons(insuranceButtons);
    cy.get('.product-feature-wrapper').should('have.length', 2);
    cy.get('.section-header-heading').should('contain.text', 'Life Basic');
    cy.get('.section-header-heading').should('contain.text', 'Life Premium');
    cy.get('.item-details').should('have.length', 2);
  });

  it('should check Travel product category page', () => {
    cy.selectOptionFromDropdown({
      menuOption: 'Insurance',
      dropdownItem: 'Travel',
    });
    productCategory.checkComponents();
    productCategory.checkCategoryBannerButtons(insuranceButtons);
    cy.get('.product-feature-wrapper').should('have.length', 3);
    cy.get('.section-header-heading').should('contain.text', 'Single Budget');
    cy.get('.section-header-heading').should('contain.text', 'Single Silver');
    cy.get('.section-header-heading').should('contain.text', 'Single Gold');
    cy.get('.item-details').should('have.length', 3);
  });

  it('should check Event product category page', () => {
    cy.selectOptionFromDropdown({
      menuOption: 'Insurance',
      dropdownItem: 'Event',
    });
    productCategory.checkComponents();
    productCategory.checkCategoryBannerButtons(insuranceButtons);
    cy.get('.product-feature-wrapper').should('have.length', 3);
    cy.get('.section-header-heading').should('contain.text', 'Event Two Stars');
    cy.get('.section-header-heading').should(
      'contain.text',
      'Event Three Stars'
    );
    cy.get('.section-header-heading').should(
      'contain.text',
      'Event Four Stars'
    );
    cy.get('.item-details').should('have.length', 3);
  });

  it('should check Savings product category page', () => {
    cy.selectOptionFromDropdown({
      menuOption: 'Insurance',
      dropdownItem: 'Savings',
    });
    productCategory.checkComponents();
    productCategory.checkCategoryBannerButtons(insuranceButtons);
    productCategory.checkCategoryPage(
      'Savings Safe And Steady',
      'Savings Balanced Deal',
      'Savings Flexi-Max'
    );
  });

  it('should check Current Account product category page', () => {
    cy.selectOptionFromDropdown({
      menuOption: 'Banking',
      dropdownItem: 'Current Account',
    });
    productCategory.checkComponents();
    productCategory.checkApplicationButtons();
    cy.get('.product-feature-wrapper').should('have.length', 3);
    cy.get('.section-header-heading').should('contain.text', 'Basic Account');
    cy.get('.section-header-heading').should('contain.text', 'Family Account');
    cy.get('.section-header-heading').should('contain.text', 'Premium Account');
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
    cy.get('.section-header-heading').should('contain.text', 'Basic Card');
    cy.get('.section-header-heading').should('contain.text', 'Premium Card');
    cy.get('.section-header-heading').should('contain.text', 'Exclusive Card');
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
    cy.get('.section-header-heading').should('contain.text', 'Personal Loan');
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
    cy.get('.section-header-heading').should(
      'contain.text',
      'Fixed Term Deposit'
    );
    cy.get('.item-details').should('have.length', 1);
  });
});
