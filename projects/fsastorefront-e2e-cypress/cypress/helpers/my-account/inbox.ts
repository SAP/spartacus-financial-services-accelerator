import * as dayjs from 'dayjs';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

const todaysDate = dayjs().format('DD MMM YYYY');

export function checkInboxComponets() {
  cy.get('.heading-headline').should('have.text', 'Inbox');
  cy.get('cx-fs-inbox').should('be.visible');
}

export function checkGeneralTab() {
  cy.get('.fs-tab').should('be.visible').contains('General');
}

export function checkBankingTabs() {
  cy.get('.fs-tab').should('be.visible').contains('General');
  cy.get('.fs-tab').should('be.visible').contains('Applications');
}

export function checkInboxHeader() {
  cy.get('.m-4').should('be.visible');
  cy.get('.section-header-heading ').within(() => {
    cy.contains('Subject');
    cy.contains('Preview');
    cy.contains('Date');
  });
}

export function readMessagesAndCheckAttachment(pageNumber, numberOfMessages) {
  cy.get('a.page').contains(pageNumber).click({ force: true });
  cy.wait(500);
  for (let i = 0; i < numberOfMessages; i++) {
    cy.get('.message').eq(i).should('not.have.class', 'read');
    cy.get('.message')
      .eq(i)
      .click()
      .within(() => {
        cy.contains('New documents received');
        cy.contains('Dear Donna Moore, New documents');
        cy.contains(todaysDate);
        cy.get('.icon-attachment').should('be.visible').click();
        cy.get('.box-shadow').should('be.visible');
        cy.get('.notification').contains('1 Attachments');
        cy.get('.document-link').should(
          'have.text',
          'New Policy Effective Immediately'
        );
      });
    cy.get('.message').eq(i).should('have.class', 'read');
  }
}
