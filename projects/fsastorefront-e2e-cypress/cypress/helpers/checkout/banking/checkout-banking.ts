export function checkBankingComparisonPage() {
  cy.get('cx-fs-comparison-table-panel').should('be.visible');
  cy.get('.fixed-column').should('have.length', 1);
  cy.get('.primary-button')
    .should('contain', 'Select')
    .should('have.length', 3);
  cy.get('a.link').should('contain', 'More Info').should('have.length', 3);
}

export function checkBankingProgressBar() {
  cy.get('.progress-inner-wrapper').should('have.length', 7);
  cy.get('p.label').should('have.length', 7).eq(0).contains("What's Included");
  cy.get('p.label').eq(1).contains('Configure a Product');
  cy.get('p.label').eq(2).contains('Add Options');
  cy.get('p.label').eq(3).contains('Personal Details');
  cy.get('p.label').eq(4).contains('Quote Review');
  cy.get('p.label').eq(5).contains('Legal Information');
  cy.get('p.label').eq(6).contains('User Identification');
}

export function checkLegalInformationPage() {
  cy.get('.section-header-heading').should('have.text', 'Legal Information');
  cy.get('cx-fs-legal-documents > .border-color-3')
    .should('be.visible')
    .within(() => {
      cy.get('li.pb-3').should('have.length', 4);
    });
  cy.get('cx-fs-legal-checkboxes').within(() => {
    cy.get('input[type="checkbox"]').click({ multiple: true, force: true });
  });
}

export function checkConfigureStep() {
  cy.get('cx-fs-product-configuration-form').should('be.visible');
  cy.get('cx-fs-product-configuration-mini-cart').should('be.visible');
  cy.get('h3').contains('Configure a Product');
}

export function checkProgressBarLoanAndFTD() {
  cy.get('p.label')
    .should('have.length', 6)
    .eq(0)
    .contains('Configure a Product');
  cy.get('p.label').eq(1).contains('Add Options');
  cy.get('p.label').eq(2).contains('Personal Details');
  cy.get('p.label').eq(3).contains('Quote Review');
  cy.get('p.label').eq(4).contains('Legal Information');
  cy.get('p.label').eq(5).contains('User Identification');
}

export function populatePersonalDetails() {
  cy.get('[name="dob"]').type('1987-01-01');
  cy.get('[name="maritalStatus"]').select('married');
  cy.get('[name="numberOfFinancialDependents"]').select('4');
  cy.get('[name="permanentResident"]').eq(0).click();
  cy.get('[name="usCitizen"]').eq(1).click();
  cy.get('[name="residentialStatus"]').select('4');
  cy.get('[name="residentialAddress"]').type('Omladinskih Brigada');
  cy.get('[name="movedToAddressDate"]').type('2002-01-01');
  cy.get('[name="isPostalAddressSame"]').eq(0).click();
  cy.get('[name="employmentStatus"]').select('fullTime');
  cy.get('[name="employerName"]').type('Ben Moore DOO');
  cy.get('[name="jobTitle"]').type('CEO');
  cy.get('[name="employmentStartDate"]').type('2005-01-01');
  cy.get('[name="incomeFrequency"]').select('monthly');
  cy.get('[name="netIncomeAmount"]').type('7800');
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

export function populatePersonalDetailsLoanAndCA() {
  cy.get('[name="maritalStatus"]').select('married');
  cy.get('[name="numberOfFinancialDependants"]').select('4');
  cy.get('[name="isResidentOfBanksCountry"]').eq(0).click();
  cy.get('[name="isUsCitizen"]').eq(1).click();
  cy.get('[name="residentialStatus"]').select('living-with-parent-relative');
  cy.get('[name="street"]').eq(0).type('Omladinskih Brigada');
  cy.get('[name="streetNumber"]').eq(0).type('90g');
  cy.get('[name="city"]').eq(0).type('Belgrade');
  cy.get('[name="postcode"]').eq(0).type('11010');
  cy.get('[name="country"]').eq(0).select('RS');
  cy.get('[name="movingInDateToResidentialAddress"]').type('2002-01-01');
  cy.get('[name="isPostalSameAsResidential"]').eq(0).click();
}

export function startBankingCheckout(mainProduct) {
  cy.selectOptionFromDropdown({
    menuOption: 'Banking',
    dropdownItem: mainProduct,
  });
  cy.get('.enriched-banner-styled-text')
    .should('contain', ' Request a product')
    .click({ multiple: true, force: true });
}

export function populatePersonalDetailsCCandLoan() {
  cy.get('[name="maritalStatus"]').eq(0).select('married');
  cy.get('[name="numberOfFinancialDependents"]').eq(0).select('4');
  cy.get('[name="permanentResident"]').eq(0).click();
  cy.get('[name="usCitizen"]').eq(1).click();
  cy.get('[name="residentialStatus"]').eq(0).select('4');
  cy.get('[name="movedToAddressDate"]').eq(0).type('2002-01-01');
  cy.get('[name="isPostalAddressSame"]').eq(0).click();
  cy.get('[name="employmentStatus"]').eq(0).select('fullTime');
  cy.get('[name="employerName"]').eq(0).type('Ben Moore DOO');
  cy.get('[name="jobTitle"]').eq(0).type('CEO');
  cy.get('[name="employmentStartDate"]').eq(0).type('2005-01-01');
  cy.get('[name="incomeFrequency"]').eq(0).select('monthly');
  cy.get('[name="net-income-amount"]').type('7800');
  cy.get('[name="anyOtherIncome"]').eq(0).click();
  cy.get('[name="workingOvertime"]').click();
  cy.get('[name="meetingFinancialCommitments"]').eq(0).click();
  cy.get('[name="meetingFinancialCommitmentsDescription"]').type(
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry. '
  );
  cy.get('[name="anyFinancialObstacles"]').eq(1).click();
  cy.get('[name="anyPossessions"]').eq(1).click();
  cy.get('[name="anyDebts"]').eq(1).click();
  cy.get('[name="total-other-monthly-expenses"]').type('5050');
}

export function populateAdditionalApplicantCCandLoan() {
  cy.get('[name="title"]').eq(1).select('dr');
  cy.get('[name="firstName"]').eq(1).type('John');
  cy.get('[name="lastName"]').eq(1).type('Moore');
  cy.get('[name="dob"]').eq(1).type('1981-01-01');
  cy.get('[name="maritalStatus"]').eq(1).select('divorced');
  cy.get('[name="numberOfFinancialDependents"]').eq(1).select('1');
  cy.get('[name="sameLocationAsMainApplicant"]').eq(0).click();
  cy.get('[name="employmentStatus-additionalApplicant"]').select('retired');
  cy.get('[name="income-frequency"]').select('annually');
  cy.get('[name="netIncomeAmount"]').type('7800');
}

export function checkConfigurationMiniCart() {
  cy.get('cx-fs-product-configuration-mini-cart').within(() => {
    cy.get('.short-overview-content').contains(
      ' Interested in how great our offer is? '
    );
  });
}

export function checkOrderTotal(price) {
  cy.get('.short-overview-title')
    .contains('Order total')
    .parent()
    .contains(price);
}

export function populateAddressInfo() {
  cy.get('[name="street"]').eq(0).type('Omladinskih Brigada');
  cy.get('[name="streetNumber"]').eq(0).type('90g');
  cy.get('[name="city"]').eq(0).type('Belgrade');
  cy.get('[name="postcode"]').eq(0).type('11010');
  cy.get('[name="country"]').eq(0).select('RS');
}

export function populateEmploymentData() {
  cy.get('[name="employmentStatus"]').select('unemployed');
  cy.get('[name="incomeFrequency"]').select('yearly');
  cy.get('[name="netIncomeAmount"]').type('560');
}
