import * as consentManagement from '../../helpers/consent-management';
import * as homepage from '../../helpers/homepage';
import testFilters from '../../support/filters';

testFilters([''], () => {
  context('Homepage', () => {
    before(() => {
      cy.visit('/');
    });

    it('Check homepage elements', () => {
      homepage.checkPageElements();
      homepage.checkAssistanceAndSupport();
    });

    it('Check header navigation with nav nodes', () => {
      homepage.checkHeaderNavigation();
    });

    it('should have footer with footer navigation and notice', () => {
      homepage.checkFooter();
    });

    it('Check Consent Management', () => {
      consentManagement.checkAnonymousConsent();
      consentManagement.clickAllowAll();
    });

    it('Check Chatbot', () => {
      homepage.checkChatbot();
    });
  });
});
