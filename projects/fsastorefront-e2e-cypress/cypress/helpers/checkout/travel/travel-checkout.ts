import * as addOptionsPage from '../../../helpers/checkout/addOptionsPage';

export function openCategoryPage() {
  cy.selectOptionFromDropdown({
    menuOption: 'Insurance',
    dropdownItem: 'Travel',
  });
  cy.wait(500);
  cy.get('.enriched-banner__styled-text')
    .should('be.visible')
    .click({ force: true });
}

export function populateInsuranceInfoForm() {
  cy.get('cx-dynamic-form').within(() => {
    cy.get('[name=tripDestination]').select('Europe');
    cy.get('[name="NoOfDays"]').type('9');
    cy.get('[name="tripStartDate"]').type('2020-01-01');
    cy.get('[name="tripEndDate"]').type('2020-01-10');
    cy.get('[name="costOfTrip"]').type('3000');
    cy.get('[name="Travellers"]').select('1');
    cy.get('[name="tripDetailsTravellerAges"]').type('20');
  });
  cy.get('fsa-form-navigation')
    .findByText('Next')
    .click();
}

export function checkComparisonAndAddProduct() {
  cy.get('fsa-comparison-table-panel-item').should('have.length', 3);
  cy.get('fsa-comparison-table-panel-item')
    .eq(2)
    .within(() => {
      cy.get('h3').should('have.text', 'Single - Gold Plan');
      cy.get('h4').should('have.text', '€150.00');
    });
  cy.get('fsa-comparison-table-panel-item')
    .eq(1)
    .within(() => {
      cy.get('h3').should('have.text', 'Single - Silver Plan');
      cy.get('h4').should('have.text', '€120.00');
    });
  cy.get('fsa-comparison-table-panel-item')
    .eq(0)
    .within(() => {
      cy.get('h3').should('have.text', 'Single - Budget Plan');
      cy.get('h4').should('have.text', '€90.00');
      cy.get('.primary-button').click();
    });
}

export function checkOptionalProductsAndPick() {
  const addOptionsContent: addOptionsPage.AddOptions = {
    title: 'Your Travel Insurance',
    items: [
      {
        name: 'Winter Sports Cover',
        available: true,
        shouldAdd: true,
      },
      {
        name: 'Golf Cover',
        available: false,
      },
      {
        name: 'Business Cover',
        available: false,
      },
      {
        name: 'Valuables Extension',
        available: true,
      },
      {
        name: 'Hazardous Activities',
        available: false,
      },
      {
        name: 'Excess waiver',
        available: true,
      },
    ],
  };

  addOptionsPage.checkAddOptionsPageContent(addOptionsContent);

  cy.get('.primary-button')
    .should('be.visible')
    .click();
}

export function populatePersonalDetailsForm() {
  cy.get('cx-dynamic-form').within(() => {
    cy.get('[name=title]').select('Mr.');
    cy.get('[name="firstName"]').type('Ben');
    cy.get('[name="lastName"]').type('Moore');
    cy.get('[name="age"]').type('30');
    cy.get('[name="phoneNumber"]').type('111111');
    cy.get('[name="email"]').type('ben@moore.com');
    cy.get('[name="address1"]').type('Test address');
    cy.get('[name="city"]').type('Test city');
    cy.get('[name="postcode"]').type('111111');
    cy.get('[name=country]').select('Serbia');
  });
  cy.get('fsa-form-navigation')
    .findByText('Next')
    .click();
}

export function checkQuoteReview() {
  cy.get('fsa-mini-cart').within(() => {
    cy.get('.short-overview-item').should('have.length', 2);
    cy.get('.short-overview-item')
      .eq(0)
      .should('have.text', ' Single - Budget Plan:  €90.00 ');
    cy.get('.short-overview-item')
      .eq(1)
      .should('have.text', ' Winter Sports Cover:  €9.00 ');
    cy.get('.highlighted').should('have.text', ' Total price:  €99.00 ');
  });
  cy.get('.primary-button').click();
}

export function checkPaymentPage() {
  cy.get('cx-payment-form').within(() => {
    cy.get('[bindValue="code"]').ngSelect('Visa');
    cy.get('[formcontrolname="accountHolderName"]').type('Ben Moore');
    cy.get('[formcontrolname="cardNumber"]').type('4111111111111111');
    cy.get('[formcontrolname="cvn"]').type('1234');
    cy.get('[bindValue="expiryMonth"]').ngSelect('08');
    cy.get('[bindValue="expiryYear"]').ngSelect('2024');
    cy.get('input[type="checkbox"]').click();
  });
  cy.get('.cx-payment-form-billing').within(() => {
    cy.get('[bindvalue="isocode"]').ngSelect('Germany');
    cy.get('[formcontrolname="firstName"]')
      .clear()
      .type('Ben');
    cy.get('[formcontrolname="lastName"]')
      .clear()
      .type('Moore');
    cy.get('[formcontrolname="line1"]')
      .clear()
      .type('Test Address 1');
    cy.get('[formcontrolname="town"]')
      .clear()
      .type('Test City');
    cy.get('[formcontrolname="postalCode"]')
      .clear()
      .type('113232');
  });
  cy.wait(1000);

  cy.get('.cx-checkout-btns').within(() => {
    cy.get('.btn-primary').click();
  });
}

export function placeOrderOnFinalReivew() {
  cy.wait(5000);
  cy.get('fsa-final-review').within(() => {
    cy.get('.form-check-input').click();
    cy.get('.primary-button').click();
  });
}

export function checkOrderConfirmation() {
  cy.get('fsa-order-confirmation').within(() => {
    cy.get('h2')
      .eq(0)
      .should(
        'have.text',
        ' Thank you! Your policy request has been submitted '
      );
  });
}

export function checkMyPoliciesPage() {
  cy.selectOptionFromDropdown({
    menuOption: 'My Account',
    dropdownItem: 'Policies',
  });
  cy.get('fsa-policies').within(() => {
    cy.get('.info-card').should('have.length', 1);
  });
}
