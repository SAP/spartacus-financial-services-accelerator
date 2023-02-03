import * as consentManagement from '../../helpers/consent-management';
import * as homepage from '../../helpers/homepage';
import testFilters from '../../support/filters';

testFilters([''], () => {
  context('Homepage', () => {
    before(() => {
      cy.visit('/');
    });

    it('Should check homepage elements', () => {
      homepage.checkPageElements(
        'Choose a perfect product.',
        'Create long lasting benefits with our digital financial solutions.'
      );
      homepage.checkAssistanceAndSupport();
    });

    it('Should check header navigation with nav nodes', () => {
      homepage.checkHeaderNavigation();
    });

    it('Should have footer with footer navigation and notice', () => {
      homepage.checkFooter();
    });

    it('Should check Consent Management', () => {
      consentManagement.checkAnonymousConsent();
      consentManagement.clickAllowAll();
    });

    it('Should check Chatbot', () => {
      homepage.checkChatbot();
    });
  });
});
