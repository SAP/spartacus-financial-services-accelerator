import { waitForRequest } from '../../general-helpers';
import * as checkout from '../checkout-steps';

export function checkUserIdentificationPage() {
  checkout.checkPageURL(checkout.categoryPage.userIdentification);
  cy.get('.section-header-heading').should('have.text', 'User Identification');
  cy.get('cx-fs-cms-custom-container')
    .should('be.visible')
    .within(() => {
      cy.get('p').eq(0).should('contain.text', 'At the Nearest Branch');
      cy.get('p').eq(1).should('contain.text', 'Legal Identification');
      cy.get('p').eq(2).should('contain.text', 'Video Identification');
    });
}

export function selectUserIdentification(identification) {
  const cartContent = waitForRequest(
    'users/current/carts',
    'GET',
    'cartContent'
  );
  cy.get('.primary-button').should('be.disabled');
  cy.get('cx-fs-cms-custom-container')
    .should('be.visible')
    .within(() => {
      cy.get('p').contains(identification).click({ force: true });
    });
  cy.get('.primary-button').should('not.be.disabled');
  cy.wait(`@${cartContent}`).then(({ response }) => {
    expect(response.statusCode).to.eq(200);
  });
  cy.get('.primary-button').should('contain.text', 'Continue');
  cy.get('.primary-button').click();
}
