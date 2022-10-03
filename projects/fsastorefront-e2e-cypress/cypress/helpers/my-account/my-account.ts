export function checkPageContent() {
  cy.get('cx-fs-premium-calendar').should('be.visible');
  cy.get('h2').contains('Premium Calendar');
  cy.get('cx-footer-navigation').should('be.visible');
}

export function checkPremiumCalendarTable() {
  cy.get('.section-header-heading ').within(() => {
    cy.contains('Policy');
    cy.contains('Payment frequency');
    cy.contains('Due Date');
    cy.contains('Premium');
    cy.contains('Payment method');
  });
}

export function checkSavingsData() {
  cy.get('.premium-data-row').within(() => {
    cy.contains('Savings Insurance');
    cy.contains('Half-yearly');
  });
  cy.get('.premium-data-row').click({ force: true });
  cy.get('.container-fluid').should('be.visible');
}

export function checkCloseAccountPage() {
  cy.get('.heading-headline').should('contain.text', 'Close Account');
  cy.get('cx-paragraph').contains('When you close your account, your');
  cy.get('.item-details')
    .should('be.visible')
    .within(() => {
      cy.get('li').should('have.length', 10);
    });
  cy.get('cx-close-account')
    .should('be.visible')
    .within(() => {
      cy.get('.btn-secondary').contains('Cancel');
      cy.get('.btn-primary').contains('CLOSE MY ACCOUNT');
    });
}

export function closeAccount() {
  cy.get('.btn-primary').contains('CLOSE MY ACCOUNT').click();
  cy.get('cx-close-account-modal')
    .should('be.visible')
    .within(() => {
      cy.get('.cx-confirmation').should('be.visible');
      cy.get('.btn-secondary').contains('Cancel');
      cy.get('.btn-primary').contains('CLOSE MY ACCOUNT').click();
    });
  cy.get('.alert-success').should('have.text', 'Account closed with success');
}

export function checkPersonalDetails() {
  cy.get('.heading-headline').should('have.text', 'Update Personal Details');
  cy.get('[formcontrolname="firstName"]').should('have.value', 'Alex');
  cy.get('[formcontrolname="lastName"]').should('have.value', 'Moore');
  cy.get('[formcontrolname="dateOfBirth"]').should('have.value', '1990-12-12');
}

export function orderHistoryPage() {
  cy.selectOptionFromMyAccount({
    dropdownItem: 'Order History',
  });
}

export function checkEmptyOrderHistoryPage() {
  cy.get('cx-fs-order-history').should('be.visible');
  cy.get('h2').contains('Order history');
  cy.get('div').contains('We have no order records for this account.');
}

export function checkOrderHistoryContent(price, status) {
  cy.get('h2').should('contain.text', 'Order history');
  cy.get('.cx-order-history-body')
    .should('be.visible')
    .within(() => {
      cy.get('.cx-order-history-thead-mobile').should('be.visible');
      cy.get('.cx-order-history-code').should('be.visible');
      cy.get('.cx-order-history-placed').should('be.visible');
      cy.get('.cx-order-history-value').should('contain.text', status);
      cy.get('.cx-order-history-total').contains(price);
    });
}

export function retrieveQuote(length, product) {
  cy.selectOptionFromMyAccount({
    dropdownItem: 'Quotes & Applications',
  });
  cy.get('h2').should('contain.text', 'Quotes & Applications');
  cy.get('.info-card').should('have.length', length);
  cy.get('.info-card')
    .contains(product)
    .siblings('.info-card-wrapper')
    .within(() => {
      cy.get('.link').contains('Retrieve').click({ force: true });
    });
}

export function checkMyDocuments(documentNumber) {
  cy.selectOptionFromMyAccount({
    dropdownItem: 'My Documents',
  });
  cy.get('cx-fs-documents-overview', { withinSubject: null }).should(
    'be.visible'
  );
  cy.get('.heading-headline').should('be.visible').contains('My Documents');
  cy.get('h4').contains('Uploaded Documents');
  cy.get('thead.d-none')
    .should('be.visible')
    .within(() => {
      cy.get('th').contains('Document name');
      cy.contains('Creation date');
      cy.contains('Belonging to');
    });
  cy.get('tr').should('have.length', documentNumber);
}
