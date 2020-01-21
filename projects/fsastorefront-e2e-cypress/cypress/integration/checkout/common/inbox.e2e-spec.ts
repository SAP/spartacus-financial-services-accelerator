import { donnaMooreUser } from '../../../sample-data/users';
import * as registerHelpers from '../../../helpers/register';
import { importDocuments } from '../../../helpers/payloads';
import * as inbox from '../../../helpers/my-account/inbox';

context('Inbox Correspondence for sample data user', () => {
  before(() => {
    cy.visit('/');
  });

  it('Should import documents for sample data user', () => {
    cy.request(importDocuments);
  });

  it('Should login sample data user', () => {
    registerHelpers.login(donnaMooreUser.email, donnaMooreUser.password);
  });

  it('Should check inbox page', () => {
    cy.selectOptionFromDropdown({
      menuOption: 'My Account',
      dropdownItem: 'Inbox',
    });
    inbox.checkInboxComponets();
    inbox.checkGeneralTab();
    inbox.checkInboxHeader();
    //TODO: check read/unread status
    inbox.checNewDocumentMessage();
    inbox.checkAttachmentsInMessage();
  });
});
