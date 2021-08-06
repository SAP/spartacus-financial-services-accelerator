import * as productCategory from '../../helpers/product-category-page';
import { insuranceButtons, bankingButtons } from '../../helpers/constants';

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
    productCategory.checkPageURL(productCategory.categoryPage.homeowners);
    productCategory.checkComponents();
    productCategory.checkCategoryBannerButtons(insuranceButtons);
    productCategory.checkCategoryProductHeadings(
      'Homeowners Monthly',
      'Homeowners Annually'
    );
  });

  it('should check renters product category page', () => {
    cy.selectOptionFromDropdown({
      menuOption: 'Insurance',
      dropdownItem: 'Renters',
    });
    productCategory.checkPageURL(productCategory.categoryPage.renters);
    productCategory.checkComponents();
    productCategory.checkCategoryBannerButtons(insuranceButtons);
    productCategory.checkCategoryProductHeadings(
      'Renters Monthly',
      'Renters Annually'
    );
  });

  it('should check Auto product category page', () => {
    cy.selectOptionFromDropdown({
      menuOption: 'Insurance',
      dropdownItem: 'Auto',
    });
    productCategory.checkPageURL(productCategory.categoryPage.auto);
    productCategory.checkComponents();
    productCategory.checkCategoryBannerButtons(insuranceButtons);
    productCategory.checkCategoryProductHeadings(
      'Auto Bronze',
      'Auto Silver',
      'Auto Gold'
    );
  });

  it('should check Life product category page', () => {
    cy.selectOptionFromDropdown({
      menuOption: 'Insurance',
      dropdownItem: 'Life',
    });
    productCategory.checkPageURL(productCategory.categoryPage.life);
    productCategory.checkComponents();
    productCategory.checkCategoryBannerButtons(insuranceButtons);
    productCategory.checkCategoryProductHeadings('Life Basic', 'Life Premium');
  });

  it('should check Travel product category page', () => {
    cy.selectOptionFromDropdown({
      menuOption: 'Insurance',
      dropdownItem: 'Travel',
    });
    productCategory.checkPageURL(productCategory.categoryPage.travel);
    productCategory.checkComponents();
    productCategory.checkCategoryBannerButtons(insuranceButtons);
    productCategory.checkCategoryProductHeadings(
      'Single Budget',
      'Single Silver',
      'Single Gold'
    );
  });

  it('should check Event product category page', () => {
    cy.selectOptionFromDropdown({
      menuOption: 'Insurance',
      dropdownItem: 'Event',
    });
    productCategory.checkPageURL(productCategory.categoryPage.event);
    productCategory.checkComponents();
    productCategory.checkCategoryBannerButtons(insuranceButtons);
    productCategory.checkCategoryProductHeadings(
      'Event Two Stars',
      'Event Three Stars',
      'Event Four Stars'
    );
  });

  it('should check Savings product category page', () => {
    cy.selectOptionFromDropdown({
      menuOption: 'Insurance',
      dropdownItem: 'Savings',
    });
    productCategory.checkPageURL(productCategory.categoryPage.savings);
    productCategory.checkComponents();
    productCategory.checkCategoryBannerButtons(insuranceButtons);
    productCategory.checkCategoryProductHeadings(
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
    productCategory.checkPageURL(productCategory.categoryPage.currentAccount);
    productCategory.checkComponents();
    productCategory.checkCategoryBannerButtons(bankingButtons);
    productCategory.checkCategoryProductHeadings(
      'Basic Account',
      'Family Account',
      'Premium Account'
    );
  });

  it('should check Credit Card product category page', () => {
    cy.selectOptionFromDropdown({
      menuOption: 'Banking',
      dropdownItem: 'Credit Card',
    });
    productCategory.checkPageURL(productCategory.categoryPage.creditCard);
    productCategory.checkComponents();
    productCategory.checkCategoryBannerButtons(bankingButtons);
    productCategory.checkCategoryProductHeadings(
      'Basic Card',
      'Premium Card',
      'Exclusive Card'
    );
  });

  it('should check Loan product category page', () => {
    cy.selectOptionFromDropdown({
      menuOption: 'Banking',
      dropdownItem: 'Loan',
    });
    productCategory.checkPageURL(productCategory.categoryPage.loan);
    productCategory.checkComponents();
    productCategory.checkCategoryBannerButtons(bankingButtons);
    productCategory.checkCategoryProductHeadings('Personal Loan');
  });

  it('should check Fixed Term Deposit product category page', () => {
    cy.selectOptionFromDropdown({
      menuOption: 'Banking',
      dropdownItem: 'Fixed Term Deposit',
    });
    productCategory.checkPageURL(productCategory.categoryPage.ftd);
    productCategory.checkComponents();
    productCategory.checkCategoryBannerButtons(bankingButtons);
    productCategory.checkCategoryProductHeadings('Fixed Term Deposit');
  });
});
