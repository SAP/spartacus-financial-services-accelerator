export function checkAddOptionsPage() {
  cy.get('div.progress-inner-wrapper').should('have.length', 5);
  cy.get('fsa-add-options').should('be.visible');
}

export function checkAddOptionsPageCurrentAccount() {
  cy.get('h2.main-heading').contains('Your Current Account Insurance');
  cy.get('fsa-add-options')
    .should('be.visible')
    .within(() => {
      cy.get('h3').should('have.length', 3);
      cy.get('h3')
        .eq(0)
        .should('have.text', 'Expense Tracker');
      cy.get('h3')
        .eq(1)
        .should('have.text', 'Transaction Pouch');
      cy.get('h3')
        .eq(2)
        .should('have.text', 'Transaction Chest');
    });
  cy.get('.disabled-option')
    .eq(0)
    .should('have.length', 1);
  cy.get('button.secondary-button')
    .eq(0)
    .should('contain', 'Not available');
}

export function addTransactionChest() {
  cy.get('.secondary-button')
    .eq(2)
    .click();
  cy.get('.secondary-button')
    .eq(0)
    .should('contain', 'Remove');
}
