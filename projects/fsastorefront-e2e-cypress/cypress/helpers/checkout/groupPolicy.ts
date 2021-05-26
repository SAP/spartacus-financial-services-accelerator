import { createCustomer } from '../../sample-data/users';
import * as register from '../register';

export function checkGroupPolicyMainPage() {
  cy.get('h5').should('contain.text', 'My Account');
  cy.get('cx-link').should('contain.text', 'My Group');
  cy.get('cx-link').contains('My Group').click();
  cy.get('cx-breadcrumb').should('be.visible');
  cy.get('.heading-headline').contains('My Group');
  cy.get('cx-page-layout.CompanyPageTemplate').within(() => {
    cy.get('cx-generic-link').should('have.length', 2);
    cy.get('cx-generic-link').should('contain.text', 'Units');
    cy.get('cx-generic-link').should('contain.text', 'Members');
  });
}

export function checkUnitsPage() {
  cy.get('cx-generic-link').contains('Units').click();
  cy.get('.heading-headline').should('contain.text', 'Units');
  cy.get('cx-org-list').should('be.visible');
  cy.get('.header').should('contain.text', 'All units');
  cy.get('.actions').should('be.visible');
  cy.get('table').should('be.visible');
  cy.get('.button.primary').should('contain.text', 'Add');
}

export function checkCreateUnitPage() {
  cy.get('.button.primary').click();
  cy.get('cx-view').should('be.visible');
  cy.get('h3').should('contain.text', 'Create Unit');
  cy.get('.button.primary').should('contain.text', 'Save');
  cy.get('button.link').should('contain.text', 'Cancel');
}

export function populateNewUnitDetails() {
  const timestamp = Date.now();
  cy.get('.main').within(() => {
    cy.get('[formcontrolname=name]').type('Panda' + timestamp);
    cy.get('[formcontrolname="uid"]').eq(0).type(timestamp);
    cy.get('[formcontrolname="code"]').click();
  });
  cy.get('cx-org-list.orgUnit').should('be.visible');
  cy.get('cx-org-list.orgUnit').within(() => {
    cy.get('ng-dropdown-panel').should('be.visible');
    cy.get('ng-dropdown-panel').click({ force: true });
    cy.get('[formcontrolname=uid]').eq(1).ngSelect('Car Company');
  });
  cy.get('.button.primary').contains('Save').click();
}

export function checkMembersPage() {
  cy.get('cx-generic-link').contains('Members').click();
  cy.get('.heading-headline').should('contain.text', 'Members');
  cy.get('cx-org-list')
    .should('be.visible')
    .within(() => {
      cy.get('h3').should('contain.text', 'All users');
      cy.get('.button.primary').should('contain.text', 'Add');
    });
}

export function createNewMember() {
  cy.get('.button.primary').contains('Add').click();
  cy.get('cx-view').should('be.visible');
  register.createB2bCustomer(createCustomer);
}

export function changePasswordForNewMember() {
  cy.contains(createCustomer.firstName).click();
  cy.get('cx-view')
    .should('be.visible')
    .within(() => {
      cy.get('a.text-capitalize').contains('Change password').click();
    });
  cy.get('h3').should('contain.text', 'Change password');
  cy.get('[formcontrolname=password]').type('Password1.');
  cy.get('[formcontrolname=confirmPassword]').type('Password1.');
  cy.get('.button.primary').contains('Save').click();
}
