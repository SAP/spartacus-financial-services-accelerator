import * as dayjs from 'dayjs';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

const todaysDate = dayjs().format('DD MMM YYYY');

export function clickOnInbox() {
  cy.get('cx-fs-message-notification').within(() => {
    cy.get('.icon-envelope').click();
  });
}

export function checkInboxComponets() {
  cy.get('.heading-headline').should('have.text', 'Inbox');
  cy.get('cx-fs-inbox').should('be.visible');
  cy.get('.m-4').should('be.visible');
  cy.get('.section-header-heading ').within(() => {
    cy.contains('Subject');
    cy.contains('Preview');
    cy.contains('Date');
  });
}

export function checkGeneralTab() {
  cy.get('.fs-tab').should('be.visible').contains('General');
  cy.get('.message').should('not.have.class', 'read');
  cy.contains('Welcome');
  cy.contains(todaysDate);
}

export function checkBankingTabs() {
  cy.get('.fs-tab').should('be.visible').contains('General');
  cy.get('.fs-tab').should('be.visible').contains('Applications');
}

export function checkSavingsTabs() {
  cy.get('.fs-tab').should('be.visible').contains('General');
  cy.get('.fs-tab').should('be.visible').contains('Savings');
  cy.get('.fs-tab').should('be.visible').contains('Policies');
}

export function checkSavingsMessage() {
  cy.get('.fs-tab').contains('Savings').click();
  cy.get('.message').should('not.have.class', 'read');
  cy.get('.message')
    .click()
    .within(() => {
      cy.contains('Dear Alex Moore Thank you for purchasing');
      cy.contains(todaysDate);
      cy.get('.box-shadow').should('be.visible');
    });
  cy.get('.message').should('have.class', 'read');
}

export function checkPendingMessage() {
  cy.get('.fs-tab').contains('Application').click();
  cy.get('.message').should('not.have.class', 'read');
  cy.get('.message')
    .click()
    .within(() => {
      cy.contains('Application Pending');
      cy.contains('Dear Ben Moore , Thank you for your application');
      cy.contains(todaysDate);
      cy.get('.box-shadow').should('be.visible');
    });
  cy.get('.message').should('have.class', 'read');
  cy.get('cx-fs-message-notification').click();
}
