import { donnaMooreUser } from '../../../sample-data/users';
import * as registerHelpers from '../../../helpers/register';
import { createDocumentPayload } from '../../../helpers/payloads';
import * as inbox from '../../../helpers/my-account/inbox';

context('Inbox Correspondence for sample data user', () => {
  before(() => {
    cy.visit('/');
  });

  it('Should import documents for sample data user', () => {
    for (let i = 1; i <= 6; i++) {
      const documentToImport = createDocumentPayload(i);
      cy.request(documentToImport);
    }
  });

  it('Should login sample data user', () => {
    cy.visit('/login');
    registerHelpers.login(donnaMooreUser.email, donnaMooreUser.password);
  });

  it('Should check inbox page', () => {
    cy.get('cx-fs-message-notification').within(() => {
      cy.get('.icon-envelope').click();
    });
    inbox.checkInboxComponets();
    inbox.checkBankingTabs();
    inbox.checkInboxHeader();
    // checks 5 messages on first page
    inbox.readMessagesAndCheckAttachment(1, 5);
    // checks 1 message on second page
    inbox.readMessagesAndCheckAttachment(2, 1);
  });
});
