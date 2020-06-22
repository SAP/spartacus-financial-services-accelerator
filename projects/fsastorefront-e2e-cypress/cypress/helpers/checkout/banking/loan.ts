import * as shared from "../shared-checkout";

export function checkOptionalProducts() {
  const addOptionsContent: addOptionsPage.AddOptions = {
    title: 'Your Loan Application',
    items: [
      {
        name: 'Service Fee',
      },
      {
        name: 'Life Cover',
        available: true,
      },
      {
        name: 'Critical Illness Cover',
        available: true,
        shouldAdd: true,
      },
      {
        name: 'Disablement Cover',
        available: true,
      },
      {
        name: 'Job Loss Cover',
        available: true,
        shouldAdd: true,
      },
    ],
  };
  shared.checkAddOptionsPageContent(addOptionsContent);
}

export function checkLegalInformationLoan() {
  cy.get('.section-header-heading').should('have.text', 'Legal information');
  cy.get('cx-fs-legal-documents > .border-color-3')
    .should('be.visible')
    .within(() => {
      cy.get('li.pb-1').should('have.length', 5);
    });
  cy.get('cx-fs-legal-checkboxes').within(() => {
    cy.get('input[type="checkbox"]').click({ multiple: true, force: true });
  });
}

export function configureLoan() {
  cy.get('[name=numberOfApplicants]').select('2');
  cy.get('[name=loan-amount]').type('18001');
  cy.get('[name=loanStartDate]').type('2021-12-12');
  cy.get('[name=loan-term]').select('6-year');
  cy.get('[name=repayment-frequency]').select('biweekly');
  cy.get('[name=loanPurpose]').select('purchasing-a-car');
}

export function checkMiniCart() {
  cy.get('.short-overview-content').should('be.visible')
    .within( ()=> {
      cy.get('.short-overview-value').contains(' €172.64 ');
    });
}
