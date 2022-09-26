import * as productCategory from '../../helpers/product-category-page';
import * as checkout from '../../helpers/checkout/checkout-steps';
import { insuranceButtons, bankingButtons } from '../../helpers/constants';
import testFilters from '../../support/filters';

testFilters(['smoke'], () => {
  context('ProductCategoryPage', () => {
    before(() => {
      cy.window().then(win => win.sessionStorage.clear());
      cy.visit('/');
    });

    it('Should check homeowners product category page', () => {
      cy.selectOptionFromDropdown({
        menuOption: 'Insurance',
        dropdownItem: 'Homeowners',
      });
      checkout.checkPageURL(checkout.pages.homeowners);
      productCategory.checkComponents();
      productCategory.checkCategoryBannerButtons(insuranceButtons);
      productCategory.checkCategoryProductHeadings(
        'Homeowners Monthly',
        'Homeowners Annually'
      );
    });

    it('Should check renters product category page', () => {
      cy.selectOptionFromDropdown({
        menuOption: 'Insurance',
        dropdownItem: 'Renters',
      });
      checkout.checkPageURL(checkout.pages.renters);
      productCategory.checkComponents();
      productCategory.checkCategoryBannerButtons(insuranceButtons);
      productCategory.checkCategoryProductHeadings(
        'Renters Monthly',
        'Renters Annually'
      );
    });

    it('Should check Auto product category page', () => {
      cy.selectOptionFromDropdown({
        menuOption: 'Insurance',
        dropdownItem: 'Auto',
      });
      checkout.checkPageURL(checkout.pages.auto);
      productCategory.checkComponents();
      productCategory.checkCategoryBannerButtons(insuranceButtons);
      productCategory.checkCategoryProductHeadings(
        'Auto Bronze',
        'Auto Silver',
        'Auto Gold'
      );
    });

    it('Should check Life product category page', () => {
      cy.selectOptionFromDropdown({
        menuOption: 'Insurance',
        dropdownItem: 'Life',
      });
      checkout.checkPageURL(checkout.pages.life);
      productCategory.checkComponents();
      cy.get('cx-fs-cms-custom-container')
        .eq(1)
        .should('contain.text', 'Find Best Insurance');
      productCategory.checkCategoryBannerButtons(insuranceButtons);
      productCategory.checkCategoryProductHeadings(
        'Life Basic',
        'Life Premium'
      );
    });

    it('Should check Travel product category page', () => {
      cy.selectOptionFromDropdown({
        menuOption: 'Insurance',
        dropdownItem: 'Travel',
      });
      checkout.checkPageURL(checkout.pages.travel);
      productCategory.checkComponents();
      productCategory.checkCategoryBannerButtons(insuranceButtons);
      productCategory.checkCategoryProductHeadings(
        'Single Budget',
        'Single Silver',
        'Single Gold'
      );
    });

    it('Should check Event product category page', () => {
      cy.selectOptionFromDropdown({
        menuOption: 'Insurance',
        dropdownItem: 'Event',
      });
      checkout.checkPageURL(checkout.pages.event);
      productCategory.checkComponents();
      productCategory.checkCategoryBannerButtons(insuranceButtons);
      productCategory.checkCategoryProductHeadings(
        'Event Two Stars',
        'Event Three Stars',
        'Event Four Stars'
      );
    });

    it('Should check Savings product category page', () => {
      cy.selectOptionFromDropdown({
        menuOption: 'Insurance',
        dropdownItem: 'Savings',
      });
      checkout.checkPageURL(checkout.pages.savings);
      productCategory.checkComponents();
      cy.get('cx-fs-cms-custom-container')
        .eq(1)
        .should('contain.text', 'Find Best Insurance');
      productCategory.checkCategoryBannerButtons(insuranceButtons);
      productCategory.checkCategoryProductHeadings(
        'Savings Safe And Steady',
        'Savings Balanced Deal',
        'Savings Flexi-Max'
      );
    });

    it('Should check Current Account product category page', () => {
      cy.selectOptionFromDropdown({
        menuOption: 'Banking',
        dropdownItem: 'Current Account',
      });
      checkout.checkPageURL(checkout.pages.currentAccount);
      productCategory.checkComponents();
      productCategory.checkCategoryBannerButtons(bankingButtons);
      productCategory.checkCategoryProductHeadings(
        'Basic Account',
        'Family Account',
        'Premium Account'
      );
    });

    it('Should check Credit Card product category page', () => {
      cy.selectOptionFromDropdown({
        menuOption: 'Banking',
        dropdownItem: 'Credit Card',
      });
      checkout.checkPageURL(checkout.pages.creditCard);
      productCategory.checkComponents();
      productCategory.checkCategoryBannerButtons(bankingButtons);
      productCategory.checkCategoryProductHeadings(
        'Basic Card',
        'Premium Card',
        'Exclusive Card'
      );
    });

    it('Should check Loan product category page', () => {
      cy.selectOptionFromDropdown({
        menuOption: 'Banking',
        dropdownItem: 'Loan',
      });
      checkout.checkPageURL(checkout.pages.loan);
      productCategory.checkComponents();
      productCategory.checkCategoryBannerButtons(bankingButtons);
      productCategory.checkCategoryProductHeadings('Personal Loan');
    });

    it('Should check Fixed Term Deposit product category page', () => {
      cy.selectOptionFromDropdown({
        menuOption: 'Banking',
        dropdownItem: 'Fixed Term Deposit',
      });
      checkout.checkPageURL(checkout.pages.ftd);
      productCategory.checkComponents();
      productCategory.checkCategoryBannerButtons(bankingButtons);
      productCategory.checkCategoryProductHeadings('Fixed Term Deposit');
    });
  });
});
