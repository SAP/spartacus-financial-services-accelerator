import * as findAnAgent from '../../../helpers/find-an-agent';

context('Find An Agent', () => {
  before(() => {
    cy.visit('/');
  });

  it('Should check Agent Locator page', () => {
    findAnAgent.navigateToFindAnAgent();
    findAnAgent.checkAgentLocatorPage();
    findAnAgent.checkAgentList();
  });

  it('Should search by product category', () => {
    findAnAgent.searchSavingAgents();
  });

  it('Should contact Aladdin Gentry', () => {
    findAnAgent.contactAgentByName('Aladdin Gentry');
    findAnAgent.checkContactAgentPage();
    findAnAgent.populateContactAgentForm();
    cy.get('.alert').contains('Ticket has been created');
    cy.get('cx-fs-enriched-responsive-banner').should('be.visible');
  });

  it('Should check Map View', () => {
    findAnAgent.checkListViewPage();
    findAnAgent.locateSavingsAgent();
    findAnAgent.navigateToFindAnAgent();
    findAnAgent.checkAgentLocatorPage();
    findAnAgent.checkLocatedAgent();
  });

  it('Should check Find an Agent on Mobile View', () => {
    cy.reload();
    cy.viewport(375, 812);
    findAnAgent.checkAgentLocatorPage();
    findAnAgent.checkIndira();
    findAnAgent.searchFrancoAgent();
    findAnAgent.backButtonDisplayed();
  });
});
