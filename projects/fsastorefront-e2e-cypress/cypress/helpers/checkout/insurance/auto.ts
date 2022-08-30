import * as shared from '../shared-checkout';
import * as dayjs from 'dayjs';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

const todaysDate = dayjs().format('YYYY-MM-DD');
const currentDate = dayjs().format(' DD MMM YYYY ');

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

export function populateAutoMonthlyOpel() {
  cy.get('cx-dynamic-form')
    .should('be.visible')
    .within(() => {
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

export function populateMainDriverInfo() {
  cy.get('#customerIdfalse').check();
  cy.get('[name=dateOfBirth]').eq(0).type('1982-01-01');
  cy.get('[name="driverGender"]').eq(0).select('Female');
  cy.get('[name="driverMaritalStatus"]').eq(0).select('Single');
  cy.get('[name="driverCategory"]').eq(0).select('Main');
  cy.get('[name="driverLicenceDate"]').eq(0).type('2018-01-01');
}

export function populateAdditionalDriverInfo() {
  cy.get('[name=dateOfBirth]').eq(1).type('1982-08-24');
  cy.get('[name="driverGender"]').eq(1).select('Male');
  cy.get('[name="driverMaritalStatus"]').eq(1).select('Widowed');
  cy.get('[name="driverCategory"]').eq(1).select('Occasional');
  cy.get('[name="driverLicenceDate"]').eq(1).type('2015-01-01');
}

export function populateSecondAdditionalDriverInfo() {
  cy.get('[name=dateOfBirth]').eq(2).type('1982-08-24');
  cy.get('[name="driverGender"]').eq(2).select('Not specified');
  cy.get('[name="driverMaritalStatus"]').eq(2).select('Married');
  cy.get('[name="driverCategory"]').eq(2).select('Occasional');
  cy.get('[name="driverLicenceDate"]').eq(2).type('2015-01-01');
}

export function populatePersonalDetails() {
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
  cy.get('[name=mainDriverFirstName]').type('John');
  cy.get('[name=mainDriverLastName]').type('Moore');
  cy.get('[name=mainDriverLicenceNumber]').clear().type('BG-234-xx');
}

export function populateAdditionalData() {
  cy.get('[name=additionalDriver1FirstName]').type('Phin');
  cy.get('[name=additionalDriver1LastName]').type('Moore');
  cy.get('[name=additionalDriver1LicenceNumber]').type('BG-234-yy');
}

export function populateAdditionalDriver2ata() {
  cy.get('[name=additionalDriver2FirstName]').type('Baja');
  cy.get('[name=additionalDriver2LastName]').type('Parker');
  cy.get('[name=additionalDriver2LicenceNumber]').type('BG-234-AN');
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
        name: 'Roadside Assistance',
        available: true,
      },
      {
        name: 'Trailer Liability',
        available: true,
      },

      {
        name: 'Uninsured Coverage',
        available: true,
      },
      {
        name: 'Winter Tires',
        available: true,
      },
      {
        name: ' Covered with Third Party Liability ',
      },
    ],
  };
  shared.checkAddOptionsPageContent(addOptionsContent);
}

export function addOptionalProductsSilver() {
  const addOptionsContent: addOptionsPage.AddOptions = {
    title: 'Your Auto Insurance',
    items: [
      {
        name: 'Collision Coverage',
        mandatory: true,
      },
      {
        name: 'Roadside Assistance',
        available: true,
        shouldAdd: true,
      },
      {
        name: 'Trailer Liability',
        available: true,
      },

      {
        name: 'Uninsured Coverage',
        available: true,
      },
      {
        name: 'Winter Tires',
        available: true,
        shouldAdd: true,
      },
      {
        name: ' Covered with Third Party Liability ',
      },
    ],
  };
  shared.checkAddOptionsPageContent(addOptionsContent);
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
        name: 'Trailer Liability',
        available: true,
      },
      {
        name: 'Uninsured Coverage',
        available: true,
        shouldAdd: true,
      },
      {
        name: 'Winter Tires',
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
        name: 'Roadside Assistance',
        mandatory: true,
      },
      {
        name: 'Trailer Liability',
        available: true,
      },
      {
        name: 'Uninsured Coverage',
        mandatory: true,
      },
      {
        name: 'Winter Tires',
        available: true,
      },
      {
        name: ' Covered with Third Party Liability ',
      },
    ],
  };
  shared.checkAddOptionsPageContent(addOptionsContent);
}

export function checkOptionalProductsGoldAddOptional() {
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
        name: 'Roadside Assistance',
        mandatory: true,
      },
      {
        name: 'Trailer Liability',
        available: true,
        shouldAdd: true,
      },
      {
        name: 'Uninsured Coverage',
        mandatory: true,
      },
      {
        name: 'Winter Tires',
        available: true,
        shouldAdd: true,
      },
      {
        name: ' Covered with Third Party Liability ',
      },
    ],
  };
  shared.checkAddOptionsPageContent(addOptionsContent);
}

export function updateDateOfBirth() {
  cy.get('cx-dynamic-form').within(() => {
    cy.get('[name="vehicleModel"]').select('Golf');
    cy.get('[name="vehicleType"]').select('GolfCDiesel');
    cy.get('[name="vehicleYear"]').select('2014');
    cy.get('[name=dateOfBirth]').eq(0).type('1990-01-12');
  });
}
