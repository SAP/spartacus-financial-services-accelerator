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

export function populatePersonalDetails() {
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
