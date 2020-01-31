import * as addOptionsPage from '../../../helpers/checkout/addOptionsPage';

export function openCategoryPage() {
  cy.selectOptionFromDropdown({
    menuOption: 'Insurance',
    dropdownItem: 'Travel',
  });
  cy.wait(800);
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

export function populateInsuranceInfoForm() {
  cy.get('cx-dynamic-form').within(() => {
    cy.get('[name=tripDestination]').select('Europe');
    cy.get('[name="NoOfDays"]').type('9');
    cy.get('[name="tripStartDate"]').type('2021-01-01');
    cy.get('[name="tripEndDate"]').type('2021-01-10');
    cy.get('[name="costOfTrip"]').type('3000');
    cy.get('[name="Travellers"]').select('1');
    cy.get('[name="tripDetailsTravellerAges"]').type('20');
  });
  cy.get('fsa-choose-cover-navigation')
    .findByText('Continue')
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
  cy.get('fsa-personal-details-navigation')
    .findByText('Continue')
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
  cy.wait(2000);
  cy.get('fsa-bind-quote-dialog').within(() => {
    cy.get('.primary-button').click();
  });
}

export function selectPaymentMethod() {
  cy.get('.cx-card-title').should('contain', 'Default Payment Method');
  cy.get('.card-header').should('contain', 'Selected');
  cy.get('cx-payment-method').within(() => {
    cy.get('button.btn-primary').click();
  });
}

export function addPaymentMethod(userId: string) {
  cy.wait(3000);
  cy.get('fsa-add-options')
    .first()
    .then(test => {
      const localData = JSON.parse(
        localStorage.getItem('spartacus-local-data')
      );
      const cartId = localData.cart.active.value.content.code;
      cy.request({
        method: 'POST',
        url: `${Cypress.env(
          'API_URL'
        )}/rest/v2/financial/users/${userId}/carts/${cartId}/paymentdetails`,
        headers: {
          Authorization: `bearer ${localData.auth.userToken.token.access_token}`,
        },
        body: {
          accountHolderName: 'Test User',
          cardNumber: '4111111111111111',
          cardType: { code: 'visa' },
          expiryMonth: '01',
          expiryYear: '2125',
          defaultPayment: true,
          saved: true,
          billingAddress: {
            firstName: 'Test',
            lastName: 'User',
            titleCode: 'mr',
            line1: 'Some address',
            line2: '',
            town: 'Town',
            postalCode: 'H4B3L4',
            country: { isocode: 'US' },
          },
        },
      }).then(response => {
        expect(response.status).to.eq(201);
      });
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
  cy.get('fsa-order-confirmation-message').within(() => {
    cy.get('h5')
      .eq(0)
      .should('have.text', ' Thank you for your order! ');
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
