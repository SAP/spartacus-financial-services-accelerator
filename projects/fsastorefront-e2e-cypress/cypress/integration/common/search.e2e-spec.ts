import * as productCategory from '../../helpers/product-category-page';
import * as search from '../../helpers/search';
import { insuranceButtons } from '../../helpers/constants';
import testFilters from '../../support/filters';

testFilters([''], () => {
  context('Search', () => {
    before(() => {
      cy.visit('/');
    });
    //TODO: Bug FSA-5142
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
      search.searchTravelProducts();
      search.seachResultsButtons();
      search.clickMoreInfoButton();
      productCategory.checkComponents();
      productCategory.checkCategoryBannerButtons(insuranceButtons);
      productCategory.checkCategoryProductHeadings(
        'Travel Single Silver',
        'Travel Single Budget',
        'Travel Single Gold'
      );
      cy.go('back');
      search.clickGetAQuoteButton();
      cy.get('h2').should('contain', 'Your Travel Insurance');
    });
  });
});
