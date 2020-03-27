import * as register from '../helpers/register';
import { donnaMooreUser } from '../sample-data/users';

context('PremiumCalendar', () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.visit('/login');
    register.login(donnaMooreUser.email, donnaMooreUser.password);
    cy.wait(1500);
    cy.visit('/my-account/premium-calendar');
  });

  it('should have premium calendar component', () => {
    cy.get('cx-fs-premium-calendar').should('be.visible');
  });

  it('should have policy table', () => {
    cy.get('div.section-header-heading.row').within(() => {
      cy.get('h5').should('have.length', 5);
    });
  });

  it('should have policy entries', () => {
    cy.get('div.premium-data-row.row').should('be.visible');
  });
});
