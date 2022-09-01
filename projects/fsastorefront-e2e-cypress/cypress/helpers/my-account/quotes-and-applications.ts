export function checkMyQuotesPage() {
  cy.selectOptionFromMyAccount({
    dropdownItem: 'Quotes & Applications',
  });
  cy.get('.heading-headline').should('contain.text', 'Quotes & Applications');
}

export function checkAutoReferredQuote() {
  cy.get('.info-card')
    .should('have.length', 1)
    .within(() => {
      cy.get('.info-card-data').within(() => {
        cy.get('.label').contains('Auto Silver');
        cy.get('.label').contains('Quote status');
        cy.get('.value').contains('Referred');
        cy.get('.label').contains('Expiry Date');
        cy.get('.label').contains('Price');
        cy.get('.value').contains('€174.03');
        cy.get('.value').contains('Monthly');
      });
    });
}

export function checkBiweeklyLoanApplication() {
  cy.get('cx-fs-quotes').within(() => {
    cy.get('.info-card').should('have.length', 1);
    cy.get('h6').should('contain.text', 'Loan');
    cy.get('.label').contains('Personal Loan');
    cy.get('.value').contains('QREF');
    cy.get('.label').contains('Quote status');
    cy.get('.value').contains('Approved');
    cy.get('.value').contains('€140.00 / Biweekly');
  });
}

export function checkEventQuote() {
  cy.get('cx-fs-quotes').within(() => {
    cy.get('.info-card').should('have.length', 2);
    cy.get('h6')
      .should('contain.text', 'Event Insurance')
      .parent()
      .within(() => {
        cy.get('.label').contains('Event');
        cy.get('.value').contains('QREF');
        cy.get('.label').contains('Quote status');
        cy.get('.value').contains('Approved');
        cy.get('.value').contains('€57.99 / One-time Charge');
      });
  });
}

export function checkWeeklyLoanApplication() {
  cy.get('cx-fs-quotes').within(() => {
    cy.get('.info-card').should('have.length', 3);
    cy.get('.value')
      .contains('Pending')
      .parentsUntil('.col-md-6.d-flex')
      .within(() => {
        cy.get('h6').should('contain.text', 'Loan');
        cy.get('.label').contains('Personal Loan');
        cy.get('.value').contains('Pending');
        cy.get('.value').contains('€69.99 / Weekly');
      });
  });
}

export function checkTwoQuotes(product1, product2) {
  cy.get('cx-fs-quotes').within(() => {
    cy.get('.info-card').should('have.length', 2);
    cy.get('h6').should('contain.text', product1);
    cy.get('h6').should('contain.text', product2);
  });
}

export function checkEventQuoteAndRetrieve() {
  cy.get('.info-card')
    .contains('Event Insurance')
    .siblings('.info-card-wrapper')
    .within(() => {
      cy.get('.value').contains('QREF');
      cy.get('.value').contains('Approved');
      cy.get('.value').contains('€57.99 / One-time Charge');
      cy.get('.link').contains('Retrieve').click({ force: true });
    });
}

export function checkCurrentAccountAndRetrieve() {
  cy.get('.info-card')
    .contains('Current Account')
    .siblings('.info-card-wrapper')
    .within(() => {
      cy.get('.label').contains('Family Account');
      cy.get('.value').contains('QREF');
      cy.get('.value').contains('Approved');
      cy.get('.value').contains('€9.99 / Monthly');
      cy.get('.link').contains('Retrieve').click({ force: true });
    });
}
