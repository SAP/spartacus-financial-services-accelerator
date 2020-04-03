declare namespace Cypress {
  interface Chainable {
    /**
     * Select user menu option
     *
     * @memberof Cypress.Chainable
     *
     * @example
     ```
     cy.selectUserMenuOption({
          option: 'Sign out'
        })
     ```
     */
    selectUserMenuOption: ({
      option,
      isMobile,
    }: {
      option: string;
      isMobile?: boolean;
    }) => void;
  }
}

Cypress.Commands.add(
  'selectUserMenuOption',
  ({ isMobile, option }: { option: string; isMobile?: boolean }) => {
    if (isMobile) {
      // below click is exactly the same as clickHamburger() but we cannot import it here
      cy.get('cx-hamburger-menu [aria-label="Menu"]').click({ force: true });
    }

    cy.get('nav a')
      .getAllByText(new RegExp(option, 'i'))
      .first()
      .click({ force: true });
  }
);

Cypress.Commands.add(
  'selectOptionFromDropdown',
  ({
    menuOption,
    dropdownItem,
    nextPageUrlPart,
  }: {
    menuOption: string;
    dropdownItem: string;
    nextPageUrlPart: string;
  }) => {
    cy.get('[aria-label="' + menuOption + '"]').invoke('mouseover');
    cy.findAllByText(dropdownItem).click({ multiple: true, force: true });
    if (nextPageUrlPart) {
      cy.location('pathname', { timeout: 10000 }).should(
        'include',
        nextPageUrlPart
      );
    }
  }
);
