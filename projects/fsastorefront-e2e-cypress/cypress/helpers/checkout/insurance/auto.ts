import * as shared from '../shared-checkout';
import * as sharedCheckout from '../shared-checkout.interface';

const todaysDate = Cypress.moment().format('YYYY-MM-DD');
const currentDate = Cypress.moment().format(' DD MMM YYYY ');

export function openCategoryPage() {
  cy.selectOptionFromDropdown({
    menuOption: 'Insurance',
    dropdownItem: 'Auto',
  });
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

export function populateAutoInformation() {
  cy.get('cx-dynamic-form').within(() => {
    cy.get('[name=coverageStartDate]').type(todaysDate);
    //current date + one year
    cy.get('[name="paymentFrequency"]').select('MONTHLY');
    cy.get('[name="vehicleMake"]').select('Audi');
    cy.get('[name="vehicleModel"]').select('A5');
    cy.get('[name="vehicleType"]').select('A5Quattro');
    cy.get('[name="vehicleYear"]').select('2017');
    cy.get('[name="vehicleAnnualMileage"]').type('30000');
    cy.get('[name="vehicleValue"]').type('12000');
    cy.get('[name="vehicleUsage"]').select('Personal');
    cy.get('[name="vehiclePurchaseDate"]').type('2018-01-01');
    cy.get('[name="vehicleOwnerPostalCode"]').type('11090');
  });
}

export function populateAutoMonthlyAudi() {
  cy.get('cx-dynamic-form').within(() => {
    cy.get('[name=coverageStartDate]').type(todaysDate);
    cy.get('[name="paymentFrequency"]').select('MONTHLY');
    cy.get('[name="vehicleMake"]').select('Audi');
    cy.get('[name="vehicleModel"]').select('A5');
    cy.get('[name="vehicleType"]').select('A5Quattro');
    cy.get('[name="vehicleYear"]').select('2017');
    cy.get('[name="vehicleAnnualMileage"]').type('30000');
    cy.get('[name="vehicleValue"]').type('12000');
    cy.get('[name="vehicleUsage"]').select('Personal');
    cy.get('[name="vehiclePurchaseDate"]').type('2018-01-01');
    cy.get('[name="vehicleOwnerPostalCode"]').type('11090');
  });
}

export function populateAutoMonthlyOpel() {
  cy.get('cx-dynamic-form').within(() => {
    cy.get('[name=coverageStartDate]').type(todaysDate);
    cy.get('[name="paymentFrequency"]').select('MONTHLY');
    cy.get('[name="vehicleMake"]').select('Opel');
    cy.get('[name="vehicleModel"]').select('GT');
    cy.get('[name="vehicleType"]').select('OPELGT2008');
    cy.get('[name="vehicleYear"]').select('2007');
    cy.get('[name="vehicleAnnualMileage"]').type('90000');
    cy.get('[name="vehicleValue"]').type('5000');
    cy.get('[name="vehicleUsage"]').select('Personal');
    cy.get('[name="vehiclePurchaseDate"]').type('2018-01-01');
    cy.get('[name="vehicleOwnerPostalCode"]').type('11090');
  });
}

export function populateAutoAnnuallyBMW() {
  cy.get('cx-dynamic-form').within(() => {
    cy.get('[name=coverageStartDate]').type(todaysDate);
    cy.get('[name="paymentFrequency"]').select('MONTHLY');
    cy.get('[name="vehicleMake"]').select('Volkswagen');
    cy.get('[name="vehicleModel"]').select('Golf');
    cy.get('[name="vehicleType"]').select('GolfCDiesel');
    cy.get('[name="vehicleYear"]').select('2014');
    cy.get('[name="vehicleAnnualMileage"]').type('19000');
    cy.get('[name="vehicleValue"]').type('7000');
    cy.get('[name="vehicleUsage"]').select('Personal');
    cy.get('[name="vehiclePurchaseDate"]').type('2019-01-01');
    cy.get('[name="vehicleOwnerPostalCode"]').type('11090');
  });
}

export function populateAutoAnnuallyTesla() {
  cy.get('cx-dynamic-form').within(() => {
    cy.get('[name=coverageStartDate]').type(todaysDate);
    cy.get('[name="paymentFrequency"]').select('YEARLY');
    cy.get('[name="vehicleMake"]').select('Tesla');
    cy.get('[name="vehicleModel"]').select('TeslaS');
    cy.get('[name="vehicleType"]').select('S');
    cy.get('[name="vehicleYear"]').select('2018');
    cy.get('[name="vehicleAnnualMileage"]').type('3000');
    cy.get('[name="vehicleValue"]').type('27000');
    cy.get('[name="vehicleUsage"]').select('Personal');
    cy.get('[name="vehiclePurchaseDate"]').type('2019-01-01');
    cy.get('[name="vehicleOwnerPostalCode"]').type('11090');
  });
}

export function populateMainDriverInfo() {
  cy.get('#customerIdfalse').check();
  cy.get('[name=dateOfBirth]').eq('0').type('1982-01-01');
  cy.get('[name="driverGender"]').eq('0').select('Female');
  cy.get('[name="driverMaritalStatus"]').eq('0').select('Single');
  cy.get('[name="driverCategory"]').eq('0').select('Main');
  cy.get('[name="driverLicenceDate"]').eq('0').type('2018-01-01');
}

export function populateAdditionalDriver2ata() {
  cy.get('[name=additionalDriver2FirstName]').type('Baja');
  cy.get('[name=additionalDriver2LastName]').type('Parker');
  cy.get('[name=additionalDriver2LicenceNumber]').type('BG-234-AN');
}

export function populateSecondAdditionalDriverInfo() {
  cy.get('[name=dateOfBirth]').eq(2).type('1982-08-24');
  cy.get('[name="driverGender"]').eq(2).select('Not specified');
  cy.get('[name="driverMaritalStatus"]').eq(2).select('Married');
  cy.get('[name="driverCategory"]').eq(2).select('Occasional');
  cy.get('[name="driverLicenceDate"]').eq(2).type('2015-01-01');
}

export function checkAutoComparisonTable() {
  const comparisonTableContent: addOptionsPage.ComparisonTable = {
    mainProducts: [
      {
        name: 'Auto Bronze',
        price: '€4.98',
      },
      {
        name: 'Auto Silver',
        price: '€10.95',
      },
      {
        name: 'Auto Gold',
        price: '€20.74',
      },
    ],
  };
  shared.checkComparisonTable(comparisonTableContent);
}

export function selectAutoBronze() {
  cy.get('cx-fs-comparison-table-panel-item')
    .eq(0)
    .within(() => {
      cy.get('.table-header-title').should('have.text', 'Auto Bronze');
      cy.get('.table-header-value').should('have.text', '€4.98');
      cy.get('.primary-button').click();
    });
}

export function selectAutoSilver() {
  cy.get('cx-fs-comparison-table-panel-item')
    .eq(1)
    .within(() => {
      cy.get('.table-header-title').should('have.text', 'Auto Silver');
      cy.get('.table-header-value').should('have.text', '€10.95');
      cy.get('.primary-button').click();
    });
}

export function checkAutoSilverMiniCart() {
  const miniCartContent: addOptionsPage.MiniCart = {
    price: ' €10.95 ',
    products: [
      {
        title: ' Start Date: ',
        value: currentDate,
      },
      {
        title: 'Vehicle Make:',
        value: ' Audi ',
      },
      {
        title: 'Vehicle Model:',
        value: ' A5 ',
      },
      {
        title: 'Vehicle Type:',
        value: ' A5 Quattro ',
      },
      {
        title: 'Vehicle Value:',
        value: ' 12000 ',
      },
      {
        title: 'Vehicle Year:',
        value: ' 2017 ',
      },
      {
        title: ' Third Party Liability: ',
        value: ' €9.95 ',
      },
      {
        title: ' Collision Coverage: ',
        value: ' €1.00 ',
      },
    ],
  };
  shared.checkMiniCart(miniCartContent);
}

export function checkOptionalProductsBronze() {
  const addOptionsContent: addOptionsPage.AddOptions = {
    title: 'Your Auto Insurance',
    items: [
      {
        name: 'Collision Coverage',
        available: true,
        shouldAdd: true,
      },
      {
        name: 'Uninsured Coverage',
        available: true,
        shouldAdd: true,
      },
      {
        name: 'Trailer Liability',
        available: true,
      },
      {
        name: ' Covered with Third Party Liability ',
      },
    ],
  };
  shared.checkAddOptionsPageContent(addOptionsContent);
}

export function checkOptionalProductsSilver() {
  const addOptionsContent: addOptionsPage.AddOptions = {
    title: 'Your Auto Insurance',
    items: [
      {
        name: 'Collision Coverage',
        mandatory: true,
      },
      {
        name: 'Uninsured Coverage',
        available: true,
      },
      {
        name: 'Roadside Assistance',
        available: true,
      },
      {
        name: 'Trailer Liability',
        available: true,
      },
      {
        name: ' Covered with Third Party Liability ',
      },
    ],
  };
  shared.checkAddOptionsPageContent(addOptionsContent);
}

export function checkOptionalProductsGold() {
  const addOptionsContent: addOptionsPage.AddOptions = {
    title: 'Your Auto Insurance',
    items: [
      {
        name: 'Collision Coverage',
        mandatory: true,
      },
      {
        name: 'Comprehensive Coverage',
        mandatory: true,
      },
      {
        name: 'Uninsured Coverage',
        mandatory: true,
      },
      {
        name: 'Roadside Assistance',
        mandatory: true,
      },
      {
        name: 'Trailer Liability',
        available: true,
      },
      {
        name: ' Covered with Third Party Liability ',
      },
    ],
  };
  shared.checkAddOptionsPageContent(addOptionsContent);
}

export function populateAdditionalDriverInfo() {
  cy.get('[name=dateOfBirth]').eq('1').type('1982-08-24');
  cy.get('[name="driverGender"]').eq('1').select('Male');
  cy.get('[name="driverMaritalStatus"]').eq('1').select('Widowed');
  cy.get('[name="driverCategory"]').eq('1').select('Occasional');
  cy.get('[name="driverLicenceDate"]').eq('1').type('2015-01-01');
}

export function populatePersonalDetails() {
  cy.get('[name=mainDriverDateOfBirth]').type('1982-08-24');
  cy.get('[name=phoneNumber]').type('94865978');
  cy.get('[name=street]').type('Omladisnkih Brigada');
  cy.get('[name=streetNumber]').type('125g');
  cy.get('[name=city]').type('Belgrade');
  cy.get('[name=postcode]').type('11090');
  cy.get('[name=country]').select('RS');
}

export function populateVehicleDetails() {
  cy.get('[name=licencePlate]').type('94865978');
  cy.get('[name=vinNumber]').type('11111111111111111');
}

export function populateMainDriverData() {
  cy.get('[name=mainDriverFirstName]').type('Johan');
  cy.get('[name=mainDriverLastName]').type('Grozni');
  cy.get('[name=mainDriverLicenceNumber]').type('BG-234-xx');
}

export function populateAdditionalData() {
  cy.get('[name=additionalDriver1FirstName]').type('Phin');
  cy.get('[name=additionalDriver1LastName]').type('Jones');
  cy.get('[name=additionalDriver1LicenceNumber]').type('BG-234-yy');
}

export function checkOptionalProducts() {
  const addOptionsContent: addOptionsPage.AddOptions = {
    title: 'Your Auto Insurance',
    items: [
      {
        name: 'Collision Coverage',
        mandatory: true,
      },
      {
        name: 'Uninsured Coverage',
        available: true,
      },
      {
        name: 'Roadside Assistance',
        available: true,
      },
      {
        name: 'Trailer Liability',
        available: true,
      },
      {
        name: ' Covered with Third Party Liability ',
      },
    ],
  };
  shared.checkAddOptionsPageContent(addOptionsContent);
}
