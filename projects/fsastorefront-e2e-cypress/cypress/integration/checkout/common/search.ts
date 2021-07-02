import * as productCategory from '../../../helpers/productCategoryPage';
import * as search from '../../../helpers/search';

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
    productCategory.checkQuoteButtons(' Get a Quote', 'Retrieve a Quote');
    productCategory.checkCategoryPage(
      3,
      'Travel Single Silver',
      'Travel Single Budget',
      'Travel Single Gold'
    );
    search.clickGetAQuoteButton();
    cy.get('h2').should('contain', 'Your Travel Insurance');
  });
});
