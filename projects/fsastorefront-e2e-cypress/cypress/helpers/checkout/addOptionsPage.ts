export interface AddOptionItem {
  name: string;
  available?: boolean;
  shouldAdd?: boolean;
}

export interface AddOptions {
  title: string;
  items: AddOptionItem[];
}

export function checkAddOptionsPage() {
  cy.get('div.progress-inner-wrapper').should('have.length', 5);
  cy.get('fsa-add-options').should('be.visible');
}

export function checkAddOptionsPageContent(addOptions: AddOptions) {
  cy.get('h2.main-heading').contains(addOptions.title);
  cy.get('fsa-add-options')
    .should('be.visible')
    .within(() => {
      cy.get('h3').should('have.length', addOptions.items.length);
      addOptions.items.forEach((item, index) => {
        cy.get('h3')
          .eq(index)
          .should('have.text', item.name);
        if (!item.available) {
          cy.get('button.secondary-button')
            .eq(index)
            .should('contain', 'Not available');
        }
        if (item.shouldAdd) {
          cy.get('.secondary-button')
            .eq(index)
            .click();
          cy.wait(1000);
        }
      });
    });
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
