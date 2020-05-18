import * as shared from '../shared-checkout';

export function checkOptionalProducts() {
  const addOptionsContent: addOptionsPage.AddOptions = {
    title: 'Your Credit Card Insurance',
    items: [
      {
        name: 'Credit Card Protection',
        available: true,
      },
      {
        name: 'Special Support',
        available: true,
      },
      {
        name: 'Overseas Insurance',
        available: false,
      },
    ],
  };
  shared.checkAddOptionsPageContent(addOptionsContent);
}

export function checkMiniCartCreditCard() {
  const miniCartContent: addOptionsPage.MiniCart = {
    price: ' €89.00 ',
    products: [
      {
        title: ' Premium Card: ',
        value: ' €89.00 ',
      },
    ],
  };
  shared.checkMiniCart(miniCartContent);
}

export function checkCreditCardComparisonTable() {
  const comparisonTableContent: addOptionsPage.ComparisonTable = {
    mainProducts: [
      {
        name: 'Basic Card',
        price: '€49.00',
      },
      {
        name: 'Premium Card',
        price: '€89.00',
      },
      {
        name: 'Exclusive Card',
        price: '€169.00',
      },
    ],
  };
  shared.checkComparisonTable(comparisonTableContent);
}

export function selectPremiumCard() {
  cy.get('cx-fs-comparison-table-panel-item')
    .eq(1)
    .within(() => {
      cy.get('.table-header-title').should('have.text', 'Premium Card');
      cy.get('.primary-button').click();
    });
}

export function populatePersonalDetails() {
  cy.get('[name="title"]').select('miss');
  cy.get('[name="firstName"]').type('Ben');
  cy.get('[name="lastName"]').type('Moore');
  cy.get('[name="dob"]').type('1987-01-01');
  cy.get('[name="maritalStatus"]').select('married');
  cy.get('[name="numberOfFinancialDependents"]').select('4');
  cy.get('[name="permanentResident"]')
    .eq(0)
    .click();
  cy.get('[name="usCitizen"]')
    .eq(1)
    .click();
  cy.get('[name="residentialStatus"]').select('4');
  cy.get('[name="residentialAddress"]').type('Omladinskih Brigada');
  cy.get('[name="movedToAddressDate"]').type('2002-01-01');
  cy.get('[name="isPostalAddressSame"]')
    .eq(0)
    .click();
  cy.get('[name="employmentStatus"]').select('fullTime');
  cy.get('[name="employerName"]').type('Ben Moore DOO');
  cy.get('[name="jobTitle"]').type('CEO');
  cy.get('[name="employmentStartDate"]').type('2005-01-01');
  cy.get('[name="incomeFrequency"]').select('monthly');
  cy.get('[name="netIncomeAmount"]').type('7800');
  cy.get('[name="anyOtherIncome"]')
    .eq(0)
    .click();
  cy.get('[name="workingOvertime"]').click();
  cy.get('[name="meetingFinancialCommitments"]')
    .eq(0)
    .click();
  cy.get('[name="meetingFinancialCommitmentsDescription"]').type(
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry. '
  );
  cy.get('[name="anyFinancialObstacles"]')
    .eq(1)
    .click();
  cy.get('[name="anyPossessions"]')
    .eq(1)
    .click();
  cy.get('[name="anyDebts"]')
    .eq(1)
    .click();
  cy.get('[name="totalMonthlyExpenses"]').type('5050');
}
