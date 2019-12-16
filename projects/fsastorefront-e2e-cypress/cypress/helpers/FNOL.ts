export function openMyAccountPolicySection() {
  cy.selectOptionFromDropdown({
    menuOption: 'My Account',
    dropdownItem: 'Policies',
  });
  }

export function openMyAccountClaimsSection() {
  cy.selectOptionFromDropdown({
    menuOption: 'My Account',
    dropdownItem: 'Claims',
  });
}

export function checkClaimsPage() {
  cy.get('.heading-headline').contains('Claims');
}



export function selectAutoPolicyForFNOL () {
  cy.get('.col-md-4')
    //can we find better selector for this
    .eq(0)
    .within( () => {
      cy.get('h4.info-card-caption').contains('Auto Insurance')
      cy.get('div.info-card-caption').contains( ' BULK1T2000000552 ')
      cy.get('.primary-button').contains(' Make a Claim')
        .click();
  })
}

export function checkFNOLCheckoutPage () {
  cy.get('fsa-user-request-progress-bar').should('be.visible')
    .within( () => {
      cy.get('h2').contains('Make a Claim Online');
      cy.get('p.label').should('have.length', '4');
    })
}

export function checkFNOLSteps () {
  cy.get('p.label')
    .eq(0)
    .should('have.text', ' Incident Information ');
  cy.get('p.label')
    .eq(1)
    .should('have.text', ' Incident Report ');
  cy.get('p.label')
    .eq(2)
    .should('have.text', ' General Information ');
  cy.get('p.label')
    .eq(3)
    .should('have.text', ' Summary ');
}

export function populateIncidentInformationStep () {
  //fix it
  cy.get('h3').contains('Incident Information');
  cy.get('cx-dynamic-form').within(() => {
    //can we make random choose
    cy.get('[name=whatHappened]').select('Collision');
    cy.get('[name=whenHappened]').type('2018-01-01');
    cy.get('[name=whatTime]').type('12:12:12');
    cy.get('[name=country]').select('Serbia');
    cy.get('[name=city]').type('Belgräde');
    cy.get('[name=postcode]').type('11040');
    cy.get('[name=address]').type('Omladinskih Brigada 90g');
    cy.get('[name=description]').type('my tesla S was stolen while I was in the shopping center');
    cy.wait(3000);
  });
}

export function populateIncidentReportStep () {
  cy.get('h3').contains('Incident Report');
  cy.get('[name=howAccidentOccured]').type('while buying tesla coils, my tesla model s was stolen while buying tesla coils, my tesla model s was stolen');
  cy.get('button.secondary-button').should('be.visible').contains('Back');
  cy.get('button.primary-button').should('be.visible').contains('Continue')
    .click();
  cy.wait(1500);
}

export function populateGeneralInformationStep () {
  cy.get('h3').contains('General Information');
  cy.get('[name=responsibleForAccident]').type('me');
  cy.get('[name=policeInformed]').eq(0).click();
  cy.get('[name=policeInformed]').eq(0).click();
  cy.get('[name=witnesses]').eq(1).click();
  cy.wait(1500);
}

export function checkSummaryPage () {
  cy.get('fsa-user-request-summary')
    .within(() => {
    cy.get('h2').contains('Summary');
  });
  cy.get('.accordion-item').should('have.length', '3')
    .within( ()=> {
      cy.get('h4')
        .eq(0)
        .should('have.text', ' Incident Information ');
      cy.get('h4')
        .eq(1)
        .should('have.text', ' Incident Report ');
      cy.get('h4')
        .eq(2)
        .should('have.text', ' General Information ');
    });
}




