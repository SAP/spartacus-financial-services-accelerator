import * as shared from '../shared-checkout';

export function checkOptionalProducts() {
  const addOptionsContent: addOptionsPage.AddOptions = {
    title: 'Your Loan Application',
    items: [
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
      {
        name: 'Life Cover',
        available: true,
      },
      {
        name: 'Service Fee',
        mandatory: true,
      },
    ],
  };
  shared.checkAddOptionsPageContent(addOptionsContent);
}

export function checkLegalInformationLoan() {
  cy.get('.section-header-heading').should('have.text', 'Legal Information');
  cy.get('cx-fs-legal-documents > .border-color-3')
    .should('be.visible')
    .within(() => {
      cy.get('li.pb-3')
        .should('have.length', 5)
        .last()
        .contains('Personal Loan - Terms And Conditions');
    });
  cy.get('cx-fs-legal-checkboxes').within(() => {
    cy.get('input[type="checkbox"]').click({ multiple: true, force: true });
  });
}

export function configureLoan(numberOfApplicats) {
  cy.get('[name=numberOfApplicants]').select(numberOfApplicats);
  cy.get('[name=loan-amount]').type('18001');
  cy.get('[name=loanStartDate]').type('2021-12-12');
  cy.get('[name=loan-term]').select('6-year');
  cy.get('[name=repayment-frequency]').select('biweekly');
  cy.get('[name=loanPurpose]').select('purchasing-a-car');
}

export function checkMiniCartFirstStep() {
  const miniCartContent: addOptionsPage.MiniCart = {
    price: ' €128.83 ',
    products: [
      {
        title: 'Number of Applicants:',
        value: ' 2 ',
      },
      {
        title: 'Loan Amount:',
        value: ' 18001 ',
      },
      {
        title: 'Loan Start Date:',
        value: ' 2021-12-12 ',
      },
      {
        title: 'Loan Term:',
        value: ' 6-year ',
      },
      {
        title: 'Repayment Frequency:',
        value: ' biweekly ',
      },
      {
        title: 'Loan Purpose:',
        value: ' purchasing-a-car ',
      },
    ],
  };
  shared.checkMiniCart(miniCartContent);
}

export function checkMiniCart() {
  const miniCartContent: addOptionsPage.MiniCart = {
    price: ' €140.00 ',
    products: [
      {
        title: ' Start Date: ',
        value: ' 12 Dec 2021 ',
      },
      {
        title: 'Loan Amount:',
        value: ' 18001 ',
      },
      {
        title: 'Loan Term:',
        value: ' 6-year ',
      },
      {
        title: 'Loan Purpose:',
        value: ' purchasing-a-car ',
      },
      {
        title: 'Number Of Applicants:',
        value: ' 2 ',
      },
      {
        title: 'Repayment Frequency:',
        value: ' biweekly ',
      },
      {
        title: ' Personal Loan: ',
        value: ' €124.21 ',
      },
      {
        title: ' Service Fee: ',
        value: ' €4.62 ',
      },
      {
        title: ' Critical Illness Cover: ',
        value: ' €8.69 ',
      },
      {
        title: ' Job Loss Cover: ',
        value: ' €2.48 ',
      },
    ],
  };
  shared.checkMiniCart(miniCartContent);
}

export function checkLoanApplication() {
  cy.get('cx-fs-quotes').within(() => {
    cy.get('.info-card').should('have.length', 1);
    cy.get('h6').should('have.text', ' Loan ');
    cy.get('.label').contains('Personal Loan');
    cy.get('.label').contains('Quote status');
    cy.get('.value').contains('Approved');
    cy.get('.value').contains('€140.00');
  });
}
