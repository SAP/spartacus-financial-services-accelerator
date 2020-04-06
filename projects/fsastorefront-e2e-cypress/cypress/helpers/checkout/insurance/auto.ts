export function openCategoryPage() {
  cy.selectOptionFromDropdown({
    menuOption: 'Insurance',
    dropdownItem: 'Auto',
  });
  cy.get('.enriched-banner-styled-text')
    .invoke('text')
    .then(text => {
      if (text !== ' Get a Quote') {
        openCategoryPage();
      }
    });

  cy.get('.enriched-banner-styled-text')
    .should('be.visible')
    .click({ force: true });
}

export function populateAutoInformation() {
  cy.get('cx-dynamic-form').within(() => {
    cy.get('[name=coverageStartDate]').type('2021-01-01');
    //current date + one year
    cy.get('[name="paymentFrequency"]').select('MONTHLY');
    cy.get('[name="vehicleMake"]').select('Audi');
    cy.get('[name="vehicleModel"]').select('A5');
    cy.get('[name="vehicleType"]').select('A5Quattro');
    cy.get('[name="vehicleYear"]').select('2017');
    cy.get('[name="vehicleAnnualMileage"]').type('30000');
    cy.get('[name="vehicleValue"]').type('12000');
    cy.get('[name="vehicleUsage"]').select('Personal');
    cy.get('[name="vehiclePurchaseDate"]').type('2018-01-01');
    cy.get('[name="vehicleOwnerPostalCode"]').type('11090');
  });
}

export function populateMainDriverInfo() {
  cy.get('[name=dateOfBirth]')
    .eq('0')
    .type('1982-01-01');
  cy.get('[name="driverGender"]')
    .eq('0')
    .select('Female');
  cy.get('[name="driverMaritalStatus"]')
    .eq('0')
    .select('Single');
  cy.get('[name="driverCategory"]')
    .eq('0')
    .select('Main');
  cy.get('[name="driverLicenceDate"]')
    .eq('0')
    .type('2018-01-01');
}

export function checkPricesOnComparisonTableAndSelectAutoBronze() {
  cy.get('cx-fs-comparison-table-panel-item').should('have.length', 3);
  cy.get('cx-fs-comparison-table-panel-item')
    .eq(2)
    .within(() => {
      cy.get('.table-header-title').should('have.text', 'Auto Gold');
      cy.get('.table-header-value').should('have.text', '€20.74');
    });
  cy.get('cx-fs-comparison-table-panel-item')
    .eq(1)
    .within(() => {
      cy.get('.table-header-title').should('have.text', 'Auto Silver');
      cy.get('.table-header-value').should('have.text', '€10.95');
    });
  cy.get('cx-fs-comparison-table-panel-item')
    .eq(0)
    .within(() => {
      cy.get('.table-header-title').should('have.text', 'Auto Bronze');
      cy.get('.table-header-value').should('have.text', '€4.98');
      cy.get('.primary-button').click();
    });
}

export function checkMiniCart() {
  cy.get('fsa-mini-cart').within(() => {
    cy.get('.short-overview-item').should('have.length', 3);
    cy.get('.short-overview-item')
      .eq(0)
      .should('have.text', 'Payment fequency:  Monthly');
    cy.get('.short-overview-item')
      .eq(1)
      .should('have.text', ' Auto Silver  €9.00 ');
    cy.get('.highlighted').should('have.text', ' Total price:  €99.00 ');
  });
  cy.get('.primary-button').click();
  cy.wait(2000);
  cy.get('fsa-bind-quote-dialog').within(() => {
    cy.get('.primary-button').click();
  });
}
