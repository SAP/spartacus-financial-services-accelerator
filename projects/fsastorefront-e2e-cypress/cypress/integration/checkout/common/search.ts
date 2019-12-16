import * as productCategory from '../../../helpers/productCategoryPage';
import * as search from '../../../helpers/search';

context('Search', () => {
  before(() => {
    cy.visit('/');
  });

  it('Should search world that will lead to no results page', () => {
    search.searchNoResults();
  });

  it('Should search for insurance products', () => {
    search.searchInsuranceProducts();
  });

  it('Should search for banking products', () => {
    search.searchBankingProducts();
  });

  it('Should check buttons on search results', () => {
    search.searchSavingsProducts();
    search.seachResultsButtons();
    search.clickMoreInfoButton();
    productCategory.checkComponents();
    productCategory.checkQuoteButtons();
    productCategory.checksSavingsCategoryPage();
    search.clickGetAQuoteButton();
    cy.get('h2').should('contain', 'Your Savings Insurance');
  });
});
