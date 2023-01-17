import * as checkout from '../../helpers/checkout/checkout-steps';
import * as homepage from '../../helpers/homepage';
import * as life from '../../helpers/checkout/insurance/life-checkout';
import * as needAnalysis from '../../helpers/need-analysis';
import * as register from '../../helpers/register';
import { registrationUser } from '../../sample-data/users';
import testFilters from '../../support/filters';

testFilters([''], () => {
  context('Need Analysis', () => {
    before(() => {
      cy.visit('/');
    });

    it('Should check need analysis elements', () => {
      homepage.checkPageElements();
      homepage.checkAssistanceAndSupport();
      cy.get('.homepage-questionnaire')
        .should('contain', 'Find the Right Insurance Cover')
        .click();
      checkout.checkPageURL(checkout.pages.needAnalysis);
      needAnalysis.checkNeedAnalysisElements();
    });

    it('Should get no product fits', () => {
      needAnalysis.selectAnswers('Choose one or multiple events:', 'New Job');
      needAnalysis.selectAnswers('Do you want to insure your partner?', 'Yes');
      needAnalysis.selectAnswers('Do you want to insure your children?', 'No');
    });

    it('Should select a product - life premium', () => {
      cy.get('.SiteLogo').should('be.visible').click();
      homepage.checkPageElements();
      cy.reload();

      cy.get('.homepage-questionnaire')
        .should('contain', 'Find the Right Insurance Cover')
        .click();
      needAnalysis.selectAnswers('Choose one or multiple events:', 'Baby');
      needAnalysis.selectAnswers('Do you want to insure your partner?', 'Yes');
      needAnalysis.selectAnswers('Do you want to insure your children?', 'Yes');
      needAnalysis.selectAnswers('Covered in case of survival?', 'No');
      needAnalysis.selectAnswers('Covered in case of death?', 'Yes');
      needAnalysis.suggestedProducts(2);
      needAnalysis.selectAnswers('Terminal Illness coverage?', 'Yes');
      needAnalysis.suggestedProducts(1);
      cy.get('.primary-button').contains('Select').click();
      checkout.checkCheckoutStep('Your Life Insurance', '7');
      checkout.checkProgressBarInsurance();
      life.populateFirstStep();
      checkout.clickContinueButton();
      life.checkLifeComparisonTable();
      cy.get('.text-uppercase.ribbon').should(
        'contain.text',
        'Recommended product'
      );
      life.selectLifeProduct('Premium Life Insurance', '1');
      life.checkPremiumOptionalProducts();
      checkout.clickContinueButton();
      register.registerUser(registrationUser);
      register.login(registrationUser.email, registrationUser.password);
      checkout.checkPersonalDetailsPage();
      checkout.populatePersonalDetailsPage();
      checkout.clickContinueButton();
      checkout.checkCheckoutStep('Your Life Insurance', '7');
      checkout.checkProgressBarInsurance();
      checkout.checkAccordions('quoteReviewWithoutOptional');
      cy.get('.primary-button').contains('Continue').should('not.exist');
      cy.get('.alert-info')
        .should('be.visible')
        .contains('Your quote is in status pending. Please contact an agent.');
    });
  });
});
