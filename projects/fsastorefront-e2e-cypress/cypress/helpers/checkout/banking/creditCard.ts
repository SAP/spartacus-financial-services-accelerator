import * as shared from '../shared-checkout';

export function checkOptionalProducts() {
  const addOptionsContent: addOptionsPage.AddOptions = {
    title: 'Your Credit Card Application',
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
  cy.get('[name="dob"]').eq(0).type('1987-01-01');
  cy.get('[name="maritalStatus"]').eq(0).select('married');
  cy.get('[name="numberOfFinancialDependents"]').eq(0).select('4');
  cy.get('[name="permanentResident"]').eq(0).click();
  cy.get('[name="usCitizen"]').eq(1).click();
  cy.get('[name="residentialStatus"]').eq(0).select('4');
  cy.get('[name="residentialAddress"]').eq(0).type('Omladinskih Brigada');
  cy.get('[name="movedToAddressDate"]').eq(0).type('2002-01-01');
  cy.get('[name="isPostalAddressSame"]').eq(0).click();
  cy.get('[name="employmentStatus"]').eq(0).select('fullTime');
  cy.get('[name="employerName"]').eq(0).type('Ben Moore DOO');
  cy.get('[name="jobTitle"]').eq(0).type('CEO');
  cy.get('[name="employmentStartDate"]').eq(0).type('2005-01-01');
  cy.get('[name="incomeFrequency"]').eq(0).select('monthly');
  cy.get('[name="netIncomeAmount"]').eq(0).type('7800');
  cy.get('[name="anyOtherIncome"]').eq(0).click();
  cy.get('[name="workingOvertime"]').click();
  cy.get('[name="meetingFinancialCommitments"]').eq(0).click();
  cy.get('[name="meetingFinancialCommitmentsDescription"]').type(
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry. '
  );
  cy.get('[name="anyFinancialObstacles"]').eq(1).click();
  cy.get('[name="anyPossessions"]').eq(1).click();
  cy.get('[name="anyDebts"]').eq(1).click();
  cy.get('[name="totalMonthlyExpenses"]').type('5050');
}

export function populateConfigureStep() {
  cy.get('[name=debit-card-design]').select('black');
  cy.get('[name=minimum-card-limit]').select('no');
  cy.get('[name=minimum-card-amount]').type('45000');
  cy.get('[name=numberOfApplicants]').select('2');
}

export function populateAdditionalApplicant() {
  cy.get('[name="title"]').eq(1).select('dr');
  cy.get('[name="firstName"]').eq(1).type('John');
  cy.get('[name="lastName"]').eq(1).type('Moore');
  cy.get('[name="dob"]').eq(1).type('1981-01-01');
  cy.get('[name="maritalStatus"]').eq(1).select('divorced');
  cy.get('[name="numberOfFinancialDependents"]').eq(1).select('1');
  cy.get('[name="sameLocationAsMainApplicant"]').eq(0).click();
  cy.get('[name="employmentStatus-additionalApplicant"]').select('retired');
  cy.get('[name="employmentStartDate"]').eq(1).type('2000-01-01');
  cy.get('[name="incomeFrequency"]').eq(1).select('annually');
  cy.get('[name="netIncomeAmount"]').eq(1).type('7800');
}
