export interface AddOptionItem {
  name: string;
  available?: boolean;
  shouldAdd?: boolean;
}

export interface AddOptions {
  title: string;
  items: AddOptionItem[];
}

export function checkAddOptionsPageContent(addOptions: AddOptions) {
  cy.get('.heading-headline').contains(addOptions.title);
  cy.get('fsa-add-options')
    .should('be.visible')
    .within(() => {
      cy.get('h6').should('have.length', addOptions.items.length);
      addOptions.items.forEach((item, index) => {
        cy.get('.row.mx-3.py-3')
          .eq(index)
          .within(() => {
            cy.get('h6').should('have.text', item.name);
            if (!item.available) {
              cy.get('span').should('contain', 'Not available');
            }
            if (item.shouldAdd) {
              cy.get('.secondary-button').click();
              cy.wait(1000);
            }
          });
      });
    });
}
