import * as checkout from './checkout/checkoutSteps';

export function navigateToFindAnAgent() {
  cy.get('a').contains('Find an Agent').click();
}

export function checkAgentLocatorPage() {
  cy.get('h2').should('have.text', 'Agent Locator').should('be.visible');
  cy.get('cx-fs-agent-search-box').should('be.visible');
  cy.get('cx-fs-find-agent-navigation')
    .should('be.visible')
    .within(() => {
      cy.get('.primary-button').should('have.length', 2);
      cy.get('.primary-button').contains('Map View').should('be.disabled');
      cy.get('.primary-button').contains('List View').and('not.be.disabled');
    });
  cy.get('.cx-store-map').should('be.visible');
  cy.get('.agent-list').should('be.visible');
  cy.get('cx-footer-navigation').should('be.visible');
}

export function checkAgentList() {
  cy.get('.agent-list-item')
    .should('have.length', 10)
    .eq(0)
    .within(() => {
      cy.get('.cx-product-image-container').should('be.visible');
      cy.get('.agent-name').should('contain.text', ' Kai Ratliff');
      cy.get('.mb-3').contains(' Event Insurance ');
      cy.get('.action-button').contains(' Contact ');
    });
  cy.get('.cx-store-map').should('be.visible');
}

export function searchSavingAgents() {
  cy.get('input.ng-pristine').type('savin{enter}');
  cy.get('cx-pagination').should('be.visible');
  cy.get('.cx-store-map').should('be.visible');
  cy.get('.agent-list-item')
    .should('have.length', 4)
    .eq(0)
    .within(() => {
      cy.get('.cx-product-image-container').should('be.visible');
      cy.get('.agent-name').contains(' Burton Franco ');
      cy.get('.mb-3').contains(' Savings ');
      cy.get('.action-button').contains(' Contact ');
    });
}

export function checkContactAgentPage() {
  cy.get('cx-fs-contact-agent-form')
    .should('be.visible')
    .within(() => {
      cy.get('h2').should('have.text', ' Contact Aladdin Gentry ');
      cy.get('.btn-primary').contains(' Send ').should('be.disabled');
    });
}

export function populateContactAgentForm() {
  cy.get('[name="email"]').type('ben.moore@fsatest.com');
  cy.get('[formcontrolname="interest"]').select('QUOTE_POLICY');
  cy.get('[formcontrolname="contactType"]').select('CALL');
  cy.get('[name="subject"]').type('My Quote is rejected');
  cy.get('[name="message"]').type(
    'I just received email that my quote is rejected. I want to know the reason!'
  );
  cy.get('.btn-primary').contains(' Send ').click();
}

export function checkListViewPage() {
  cy.get('a').contains('Find an Agent').click();
  cy.get('.primary-button').contains('List View').click();
  cy.get('h2').should('have.text', 'Find an Agent');
  cy.get('cx-fs-find-agent-navigation')
    .should('be.visible')
    .within(() => {
      cy.get('.primary-button').should('have.length', 2);
      cy.get('.primary-button').contains('Map View').and('not.be.disabled');
      cy.get('.primary-button').contains('List View').should('be.disabled');
    });
  cy.get('cx-footer-navigation').should('be.visible');
  checkout.checkAccordions('agentListView');
}

export function checkLocatedAgent() {
  cy.get('.agent-list-item')
    .should('have.length', 1)
    .within(() => {
      cy.get('.cx-product-image-container').should('be.visible');
      cy.get('.agent-name').contains(' Deacon Fuller ');
      cy.get('.action-button').contains(' Contact ');
    });
}

export function searchFrancoAgent() {
  cy.get('cx-fs-agent-search-box').should('be.visible');
  cy.get('input.ng-pristine').type('Franco{enter}');
  cy.get('cx-pagination').should('be.visible');
  cy.get('.cx-store-map').should('be.visible');
  cy.get('.agent-list-item')
    .should('have.length', 1)
    .within(() => {
      cy.get('.cx-product-image-container').should('be.visible');
      cy.get('.agent-name').contains(' Burton Franco ');
      cy.get('.mb-3').contains(' Event Insurance ');
      cy.get('.action-button').contains(' Contact ');
    });
}

export function contactAgentByName(agentName) {
  cy.get('.agent-name')
    .contains(agentName)
    .parent()
    .within(() => {
      cy.get('.action-button').click();
    });
}

export function locateSavingsAgent() {
  cy.get('.accordion-heading')
    .contains(' Savings ')
    .click({ force: true })
    .parent()
    .within(() => {
      cy.get('.agent-container').should('have.length', 4);
      cy.get('.py-3')
        .contains('Deacon Fuller')
        .parent()
        .within(() => {
          cy.get('.icon-map-marker').click();
        });
    });
}

export function backButtonDisplayed() {
  cy.get('.action-button').contains(' Back ').should('be.visible');
}

export function checkIndira() {
  cy.get('.cx-product-image-container').should('be.visible');
  cy.get('.agent-name').contains(' Idira Duffy ');
  cy.get('.mb-3').contains(' Event Insurance ');
  cy.get('.action-button').contains(' Contact ');
}
