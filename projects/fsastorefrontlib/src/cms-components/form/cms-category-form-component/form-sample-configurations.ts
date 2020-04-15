import { DefaultFormValidators, FormDefinition } from '@fsa/dynamicforms';
import { FormHelpers } from '../../../shared/util/helpers/form-helpers';

export class FormSampleConfigurations {
  static sampleConfigurations: FormDefinition[] = [
    {
      formId: 'homeowners_details_form',
      formGroups: [
        {
          groupCode: 'property',
          fieldConfigs: [
            {
              type: 'title',
              label: 'General Information',
              name: 'general',
            },
            {
              type: 'radio',
              label: 'Cover Required',
              name: 'coverRequired',
              options: [
                { name: 'buildingAndContents', label: 'Building and Contents' },
                { name: 'buildingsOnly', label: 'Buildings Only' },
                { name: 'contentsOnly', label: 'Contents Only' },
              ],
              required: true,
              validation: [
                DefaultFormValidators.required,
                FormHelpers.shouldEnableTargetGroup({
                  buildingAndContents: ['buildingCover', 'contentsCover'],
                  buildingsOnly: ['buildingCover'],
                  contentsOnly: ['contentsCover'],
                }),
              ],
            },
            {
              type: 'datepicker',
              label: 'Start Date',
              name: 'propertyDetailsStartDate',
              required: true,
              validation: [
                DefaultFormValidators.required,
                DefaultFormValidators.compareToCurrentDate('shouldBeGreater'),
              ],
              error: 'forms.dateInFuture',
            },
          ],
        },
        {
          groupCode: 'propertyDetailsCoverRequired',
          fieldConfigs: [
            {
              type: 'title',
              label: 'Property Details',
              name: 'propertyDetailsCoverRequired',
            },
            {
              type: 'select',
              label: 'Property Type',
              name: 'propertyType',
              options: [
                { name: 'House', label: 'House' },
                { name: 'Bungalow', label: 'Bungalow' },
                { name: 'Flat', label: 'Flat' },
              ],
              validation: [DefaultFormValidators.required],
            },
            {
              type: 'input',
              label: 'Property Value',
              name: 'propertyValue',
              required: true,
              validation: [
                DefaultFormValidators.required,
                DefaultFormValidators.min(10000),
                DefaultFormValidators.max(1000000),
                DefaultFormValidators.pattern('^[0-9]*$'),
              ],
              error: 'forms.from10Kto1M',
            },
            {
              type: 'input',
              label: 'Rebuild Value of Property',
              name: 'propertyRebuildCost',
              required: true,
              validation: [
                DefaultFormValidators.required,
                DefaultFormValidators.pattern('^[0-9]*$'),
                DefaultFormValidators.compareNumbers(
                  'propertyValue',
                  'shouldBeLess'
                ),
              ],
              error: 'forms.lessThanPropertyValue',
            },
            {
              type: 'input',
              label: 'Approximate Year Property Built',
              name: 'ccaBuiltYear',
              required: true,
              validation: [
                DefaultFormValidators.required,
                DefaultFormValidators.min(1000),
                DefaultFormValidators.max(Number(new Date().getFullYear())),
                DefaultFormValidators.pattern('^[0-9]*$'),
              ],
              error: 'forms.dateFrom1000toCurrent',
            },
            {
              type: 'input',
              label: 'Number of Bedrooms',
              name: 'numberOfBedrooms',
              required: true,
              validation: [
                DefaultFormValidators.required,
                DefaultFormValidators.min(1),
                DefaultFormValidators.max(50),
                DefaultFormValidators.pattern('^[0-9]*$'),
              ],
              error: 'forms.between1And50',
            },
            {
              type: 'input',
              label: 'Number of Bathrooms',
              name: 'numberOfBathrooms',
              required: true,
              validation: [
                DefaultFormValidators.required,
                DefaultFormValidators.min(1),
                DefaultFormValidators.max(50),
                DefaultFormValidators.pattern('^[0-9]*$'),
              ],
              error: 'forms.between1And50',
            },
            {
              type: 'radio',
              label: 'Does anyone at the property smoke?',
              name: 'smoking',
              options: [
                { name: 'yes', label: 'Yes' },
                { name: 'no', label: 'No' },
              ],
              required: true,
              validation: [DefaultFormValidators.required],
            },
            {
              type: 'input',
              label:
                'How many days in a row is the property likely to be unoccupied?',
              name: 'numberOfDaysUnoccupied',
              required: true,
              validation: [
                DefaultFormValidators.required,
                DefaultFormValidators.min(0),
                DefaultFormValidators.max(360),
                DefaultFormValidators.pattern('^[0-9]*$'),
              ],
              error: 'forms.between0And360',
            },
            {
              type: 'radio',
              label: 'Is the property normally occupied during the day?',
              name: 'normallyOccupied',
              options: [
                { name: 'yes', label: 'Yes' },
                { name: 'no', label: 'No' },
              ],
              required: true,
              validation: [DefaultFormValidators.required],
            },
            {
              type: 'radio',
              label: 'What is the exterior construction material?',
              name: 'constructionMaterial',
              options: [
                { name: 'wood', label: 'Wood' },
                { name: 'brick', label: 'Brick' },
              ],
              required: true,
              validation: [DefaultFormValidators.required],
            },
            {
              type: 'radio',
              label: 'What locks are in place?',
              name: 'locks',
              options: [
                { name: 'morticeDeadlock', label: 'Mortice Deadlock' },
                {
                  name: 'MultiPointLockingSystem',
                  label: 'Multi-Point Locking System',
                },
              ],
              required: true,
              validation: [DefaultFormValidators.required],
            },
          ],
        },
        {
          groupCode: 'buildingCover',
          fieldConfigs: [
            {
              type: 'title',
              label: 'Your Building Cover',
              name: 'buildingCover',
              hidden: true,
            },
            {
              type: 'select',
              label:
                'How many consecutive years have you held buildings insurance?',
              name: 'alreadyHeldInsurance',
              options: [
                { name: '0', label: '0' },
                { name: '1', label: '1' },
                { name: '2', label: '2' },
                { name: '3', label: '3' },
                { name: '4', label: '4' },
                { name: '5', label: '5+' },
              ],
              required: true,
              validation: [DefaultFormValidators.required],
              hidden: true,
            },
            {
              type: 'radio',
              label:
                'Would you like the accidental damage cover for your building?',
              name: 'accidentalDamageCoverBuilding',
              options: [
                { name: 'yes', label: 'Yes' },
                { name: 'no', label: 'No' },
              ],
              required: true,
              validation: [DefaultFormValidators.required],
              hidden: true,
            },
          ],
        },
        {
          groupCode: 'contentsCover',
          fieldConfigs: [
            {
              type: 'title',
              label: 'Your Contents Cover',
              name: 'propertyIsStandard50000ContentCover',
              hidden: true,
            },
            {
              type: 'radio',
              label:
                'We give you 50,000€ contents cover as a standard, is this enough?',
              name: 'startAmountCover',
              options: [
                { name: '0', label: 'Yes' },
                { name: '1', label: 'No' },
              ],
              required: true,
              validation: [
                DefaultFormValidators.required,
                FormHelpers.shouldEnableDependentField([
                  'propertyMultipleOf10000ContentCover',
                ]),
              ],
              hidden: true,
            },
            {
              type: 'input',
              label: 'Please enter the desired amount from 10,000€ upwards.',
              name: 'propertyMultipleOf10000ContentCover',
              required: true,
              validation: [
                DefaultFormValidators.required,
                DefaultFormValidators.min(10000),
                DefaultFormValidators.max(1000000),
                DefaultFormValidators.pattern('^[0-9]*$'),
              ],
              error: 'forms.from10Kto1M',
              hidden: true,
            },
            {
              type: 'input',
              label:
                'How many consecutive years have you held contents insurance?',
              name: 'numberOfYearsHoldingInsurance',
              required: true,
              validation: [
                DefaultFormValidators.required,
                DefaultFormValidators.min(0),
                DefaultFormValidators.max(150),
                DefaultFormValidators.pattern('^[0-9]*$'),
              ],
              error: 'forms.lessThan150',
              hidden: true,
            },
            {
              type: 'radio',
              label:
                'Would you like accidental damage cover for your contents?',
              name: 'accidentalDamageCoverContents',
              options: [
                { name: 'yes', label: 'Yes' },
                { name: 'no', label: 'No' },
              ],
              required: true,
              validation: [DefaultFormValidators.required],
              hidden: true,
            },
            {
              type: 'datepicker',
              label:
                'If you have a car, please tell us when your insurance is due for renewal',
              name: 'coverageStartDate',
              hidden: true,
            },
          ],
        },
        {
          groupCode: 'propertyAddress',
          fieldConfigs: [
            {
              type: 'title',
              label: 'Your Property Address',
              name: 'propertyAddress',
            },
            {
              type: 'input',
              label: 'Address Line 1',
              name: 'property-address-line-1',
              required: true,
              validation: [DefaultFormValidators.required],
            },
            {
              type: 'input',
              label: 'Address Line 2',
              name: 'property-address-line-2',
            },
            {
              type: 'input',
              label: 'City',
              name: 'property-address-city',
              required: true,
              validation: [DefaultFormValidators.required],
            },
            {
              type: 'input',
              label: 'Postcode',
              name: 'property-address-postcode',
              required: true,
              validation: [
                DefaultFormValidators.required,
                DefaultFormValidators.minLength(1),
                DefaultFormValidators.regexValidator(
                  DefaultFormValidators.postalCodeRegex
                ),
              ],
              error: 'forms.containAtLeastOneNumber',
            },
            {
              type: 'select',
              label: 'Country',
              name: 'property-address-country',
              options: [
                {
                  name: 'AT',
                  label: 'Austria',
                },
                {
                  name: 'CA',
                  label: 'Canada',
                },
                {
                  name: 'FR',
                  label: 'France',
                },
                {
                  name: 'DE',
                  label: 'Germany',
                },
                {
                  name: 'PL',
                  label: 'Poland',
                },
                {
                  name: 'RS',
                  label: 'Serbia',
                },
                {
                  name: 'US',
                  label: 'United States',
                },
              ],
              required: true,
              validation: [DefaultFormValidators.required],
            },
          ],
        },
      ],
    },
    {
      formId: 'auto_details_form',
      formGroups: [
        {
          groupCode: 'general',
          fieldConfigs: [
            {
              type: 'title',
              label: 'General',
              name: 'general',
            },
            {
              type: 'datepicker',
              label: 'Coverage Start Date',
              name: 'coverageStartDate',
              required: true,
              validation: [
                DefaultFormValidators.required,
                DefaultFormValidators.compareToCurrentDate('shouldBeGreater'),
              ],
              error: 'forms.dateInFuture',
            },
            {
              type: 'select',
              apiUrl:
                '/catalogs/financialProductCatalog/valueLists/paymentFrequency?categoryCode=insurances_auto',
              label: 'Payment Frequency',
              name: 'paymentFrequency',
              required: true,
              validation: [DefaultFormValidators.required],
            },
          ],
        },
        {
          groupCode: 'vehicle',
          fieldConfigs: [
            {
              type: 'title',
              label: 'Vehicle',
              name: 'vehicle',
            },
            {
              type: 'select',
              apiUrl:
                '/catalogs/financialProductCatalog/valueLists/autoVehicleMake',
              label: 'Vehicle Make',
              name: 'vehicleMake',
              required: true,
              validation: [DefaultFormValidators.required],
            },
            {
              type: 'select',
              apiUrl:
                '/catalogs/financialProductCatalog/valueLists/autoVehicleModel',
              depends: ['vehicleMake'],
              label: 'Vehicle Model',
              name: 'vehicleModel',
              required: true,
              validation: [DefaultFormValidators.required],
            },
            {
              type: 'select',
              depends: ['vehicleMake', 'vehicleModel'],
              apiUrl:
                '/catalogs/financialProductCatalog/valueLists/autoVehicleType',
              label: 'Vehicle Type',
              name: 'vehicleType',
              required: true,
              validation: [DefaultFormValidators.required],
            },
            {
              type: 'select',
              depends: ['vehicleMake', 'vehicleModel', 'vehicleType'],
              label: 'Vehicle Year',
              apiUrl:
                '/catalogs/financialProductCatalog/valueLists/autoVehicleYear',
              name: 'vehicleYear',
              required: true,
              validation: [DefaultFormValidators.required],
            },
            {
              type: 'input',
              label: 'Annual Mileage',
              name: 'vehicleAnnualMileage',
              required: true,
              validation: [
                DefaultFormValidators.required,
                DefaultFormValidators.max(100000),
                DefaultFormValidators.pattern('^[0-9]*$'),
              ],
              error: 'forms.lessThan100K',
            },
            {
              type: 'input',
              label: 'Vehicle Value',
              name: 'vehicleValue',
              required: true,
              validation: [
                DefaultFormValidators.required,
                DefaultFormValidators.min(3000),
                DefaultFormValidators.max(1000000),
                DefaultFormValidators.pattern('^[0-9]*$'),
              ],
              error: 'forms.vehicleValue',
            },
            {
              type: 'select',
              label: 'Vehicle Usage',
              name: 'vehicleUsage',
              apiUrl:
                '/catalogs/financialProductCatalog/valueLists/autoVehicleUsage',
              required: true,
              validation: [DefaultFormValidators.required],
            },
            {
              type: 'datepicker',
              label: 'Vehicle Purchase Date',
              name: 'vehiclePurchaseDate',
              required: true,
              validation: [
                DefaultFormValidators.required,
                DefaultFormValidators.compareToCurrentDate('shouldBeLess'),
                DefaultFormValidators.compareDates(
                  'vehicleYear',
                  'shouldBeLess'
                ),
              ],
              error: 'forms.afterVehicleManufacture',
            },
            {
              type: 'input',
              label: 'Vehicle Owner Postal Code',
              name: 'vehicleOwnerPostalCode',
              required: true,
              validation: [
                DefaultFormValidators.required,
                DefaultFormValidators.minLength(1),
                DefaultFormValidators.regexValidator(
                  DefaultFormValidators.postalCodeRegex
                ),
              ],
              error: 'forms.containAtLeastOneNumber',
            },
          ],
        },
        {
          groupCode: 'main-driver',
          fieldConfigs: [
            {
              type: 'title',
              label: 'Main Driver',
              name: 'main-driver',
            },
            {
              type: 'datepicker',
              label: 'Driver Date of Birth',
              name: 'dateOfBirth',
              required: true,
              validation: [
                DefaultFormValidators.required,
                DefaultFormValidators.dateOfBirthValidator(18),
              ],
              error: 'forms.dateOfBirthMinimumAge',
            },
            {
              type: 'select',
              label: 'Driver Gender',
              name: 'driverGender',
              apiUrl: '/catalogs/financialProductCatalog/valueLists/gender',
              required: true,
              validation: [DefaultFormValidators.required],
            },
            {
              type: 'select',
              label: 'Driver Marital Status',
              name: 'driverMaritalStatus',
              apiUrl:
                '/catalogs/financialProductCatalog/valueLists/maritalStatus',
              required: true,
              validation: [DefaultFormValidators.required],
            },
            {
              type: 'select',
              label: 'Driver`s Category',
              name: 'driverCategory',
              apiUrl:
                '/catalogs/financialProductCatalog/valueLists/autoDriverCategory',
            },
            {
              type: 'datepicker',
              label: 'Driver Licence Date',
              name: 'driverLicenceDate',
              required: true,
              validation: [
                DefaultFormValidators.required,
                DefaultFormValidators.compareToCurrentDate('shouldBeLess'),
              ],
              error: 'forms.dateInPast',
            },
          ],
        },
        {
          groupCode: 'additionalDrivers',
          fieldConfigs: [
            {
              type: 'title',
              label: 'Additional Driver(s)',
              name: 'additionalDrivers',
            },
            {
              type: 'select',
              label: 'Number of Drivers',
              name: 'noOfDrivers',
              options: [
                { name: '0', label: '0' },
                { name: '1', label: '1' },
                { name: '2', label: '2' },
                { name: '3', label: '3' },
                { name: '4', label: '4' },
              ],
              required: true,
              validation: [
                DefaultFormValidators.required,
                FormHelpers.shouldEnableDependentGroup([
                  'additional-driver-1',
                  'additional-driver-2',
                  'additional-driver-3',
                  'additional-driver-4',
                ]),
              ],
            },
          ],
        },
        {
          groupCode: 'additional-driver-1',
          fieldConfigs: [
            {
              type: 'title',
              label: 'Additional Driver 1',
              name: 'additional-driver-1',
              hidden: true,
            },
            {
              type: 'datepicker',
              label: 'Driver Date of Birth',
              name: 'dateOfBirth',
              required: true,
              validation: [
                DefaultFormValidators.required,
                DefaultFormValidators.dateOfBirthValidator(18),
              ],
              error: 'forms.dateOfBirthMinimumAge',
              hidden: true,
            },
            {
              type: 'select',
              label: 'Driver Gender',
              name: 'driverGender',
              apiUrl: '/catalogs/financialProductCatalog/valueLists/gender',
              required: true,
              validation: [DefaultFormValidators.required],
              hidden: true,
            },
            {
              type: 'select',
              label: 'Driver Marital Status',
              name: 'driverMaritalStatus',
              apiUrl:
                '/catalogs/financialProductCatalog/valueLists/maritalStatus',
              required: true,
              validation: [DefaultFormValidators.required],
              hidden: true,
            },
            {
              type: 'select',
              label: 'Driver`s Category',
              name: 'driverCategory',
              options: [{ name: 'Occasional', label: 'Occasional' }],
              disabled: true,
              hidden: true,
            },
            {
              type: 'datepicker',
              label: 'Driver Licence Date',
              name: 'driverLicenceDate',
              required: true,
              validation: [
                DefaultFormValidators.required,
                DefaultFormValidators.compareToCurrentDate('shouldBeLess'),
              ],
              error: 'forms.dateInPast',
              hidden: true,
            },
          ],
        },
        {
          groupCode: 'additional-driver-2',
          fieldConfigs: [
            {
              type: 'title',
              label: 'Additional Driver 2',
              name: 'additional-driver-2',
              hidden: true,
            },
            {
              type: 'datepicker',
              label: 'Driver Date of Birth',
              name: 'dateOfBirth',
              required: true,
              validation: [
                DefaultFormValidators.required,
                DefaultFormValidators.dateOfBirthValidator(18),
              ],
              error: 'forms.dateOfBirthMinimumAge',
              hidden: true,
            },
            {
              type: 'select',
              label: 'Driver Gender',
              name: 'driverGender',
              apiUrl: '/catalogs/financialProductCatalog/valueLists/gender',
              required: true,
              validation: [DefaultFormValidators.required],
              hidden: true,
            },
            {
              type: 'select',
              label: 'Driver Marital Status',
              name: 'driverMaritalStatus',
              apiUrl:
                '/catalogs/financialProductCatalog/valueLists/maritalStatus',
              required: true,
              validation: [DefaultFormValidators.required],
              hidden: true,
            },
            {
              type: 'select',
              label: 'Driver`s Category',
              name: 'driverCategory',
              options: [{ name: 'Occasional', label: 'Occasional' }],
              hidden: true,
            },
            {
              type: 'datepicker',
              label: 'Driver Licence Date',
              name: 'driverLicenceDate',
              required: true,
              validation: [
                DefaultFormValidators.required,
                DefaultFormValidators.compareToCurrentDate('shouldBeLess'),
              ],
              error: 'forms.dateInPast',
              hidden: true,
            },
          ],
        },
        {
          groupCode: 'additional-driver-3',
          fieldConfigs: [
            {
              type: 'title',
              label: 'Additional Driver 3',
              name: 'additional-driver-3',
              hidden: true,
            },
            {
              type: 'datepicker',
              label: 'Driver Date of Birth',
              name: 'dateOfBirth',
              required: true,
              validation: [
                DefaultFormValidators.required,
                DefaultFormValidators.dateOfBirthValidator(18),
              ],
              error: 'forms.dateOfBirthMinimumAge',
              hidden: true,
            },
            {
              type: 'select',
              label: 'Driver Gender',
              name: 'driverGender',
              apiUrl: '/catalogs/financialProductCatalog/valueLists/gender',
              required: true,
              validation: [DefaultFormValidators.required],
              hidden: true,
            },
            {
              type: 'select',
              label: 'Driver Marital Status',
              name: 'driverMaritalStatus',
              apiUrl:
                '/catalogs/financialProductCatalog/valueLists/maritalStatus',
              validation: [DefaultFormValidators.required],
              hidden: true,
            },
            {
              type: 'select',
              label: 'Driver`s Category',
              name: 'driverCategory',
              options: [{ name: 'Occasional', label: 'Occasional' }],
              hidden: true,
            },
            {
              type: 'datepicker',
              label: 'Driver Licence Date',
              name: 'driverLicenceDate',
              required: true,
              validation: [
                DefaultFormValidators.required,
                DefaultFormValidators.compareToCurrentDate('shouldBeLess'),
              ],
              error: 'forms.dateInPast',
              hidden: true,
            },
          ],
        },
        {
          groupCode: 'additional-driver-4',
          fieldConfigs: [
            {
              type: 'title',
              label: 'Additional Driver 4',
              name: 'additional-driver-4',
              hidden: true,
            },
            {
              type: 'datepicker',
              label: 'Driver Date of Birth',
              name: 'dateOfBirth',
              required: true,
              validation: [
                DefaultFormValidators.required,
                DefaultFormValidators.dateOfBirthValidator(18),
              ],
              error: 'forms.dateOfBirthMinimumAge',
              hidden: true,
            },
            {
              type: 'select',
              label: 'Driver Gender',
              name: 'driverGender',
              apiUrl: '/catalogs/financialProductCatalog/valueLists/gender',
              validation: [DefaultFormValidators.required],
              hidden: true,
            },
            {
              type: 'select',
              label: 'Driver Marital Status',
              name: 'driverMaritalStatus',
              apiUrl:
                '/catalogs/financialProductCatalog/valueLists/maritalStatus',
              required: true,
              validation: [DefaultFormValidators.required],
              hidden: true,
            },
            {
              type: 'select',
              label: 'Driver`s Category',
              name: 'driverCategory',
              options: [{ name: 'Occasional', label: 'Occasional' }],
              disabled: true,
              hidden: true,
            },
            {
              type: 'datepicker',
              label: 'Driver Licence Date',
              name: 'driverLicenceDate',
              required: true,
              validation: [
                DefaultFormValidators.required,
                DefaultFormValidators.compareToCurrentDate('shouldBeLess'),
              ],
              error: 'forms.dateInPast',
              hidden: true,
            },
          ],
        },
      ],
    },
    {
      formId: 'trip_details_form',
      formGroups: [
        {
          groupCode: 'trip',
          fieldConfigs: [
            {
              type: 'select',
              label: 'Destination',
              name: 'tripDestination',
              options: [
                { name: 'Europe', label: 'Europe' },
                {
                  name: 'Australia and New Zealand',
                  label: 'Australia and New Zealand',
                },
                {
                  name: 'Worldwide (excluding USA, Canada, and the Caribbean)',
                  label: 'Worldwide (excluding USA, Canada, and the Caribbean)',
                },
                {
                  name: 'Worldwide (including USA, Canada and the Caribbean)',
                  label: 'Worldwide (including USA, Canada and the Caribbean)',
                },
                { name: 'UK', label: 'UK' },
              ],
              required: true,
              validation: [DefaultFormValidators.required],
              error: 'forms.enterValidValue',
            },
            {
              type: 'datepicker',
              label: 'Start Date',
              name: 'tripStartDate',
              required: true,
              validation: [
                DefaultFormValidators.required,
                DefaultFormValidators.compareToCurrentDate('shouldBeGreater'),
                DefaultFormValidators.compareDates(
                  'tripEndDate',
                  'shouldBeGreater'
                ),
              ],
              error: 'forms.dateInFutureAfterEnd',
            },
            {
              type: 'datepicker',
              label: 'End Date',
              name: 'tripEndDate',
              required: true,
              validation: [
                DefaultFormValidators.required,
                DefaultFormValidators.compareToCurrentDate('shouldBeGreater'),
                DefaultFormValidators.compareDates(
                  'tripStartDate',
                  'shouldBeLess'
                ),
              ],
              error: 'forms.dateInFutureBeforeStart',
            },
            {
              type: 'input',
              label: 'Duration in Days',
              name: 'NoOfDays',
            },
            {
              type: 'input',
              label: 'Trip Cost',
              name: 'costOfTrip',
              required: true,
              validation: [
                DefaultFormValidators.required,
                DefaultFormValidators.min(1),
                DefaultFormValidators.max(1000000),
                DefaultFormValidators.pattern('^[0-9]*$'),
              ],
              error: 'forms.lessThan1M',
            },
            {
              type: 'select',
              options: [
                { label: '1', name: '1' },
                { label: '2', name: '2' },
                { label: '3', name: '3' },
                { label: '4', name: '4' },
                { label: '5', name: '5' },
                { label: '6', name: '6' },
                { label: '7', name: '7' },
                { label: '8', name: '8' },
                { label: '9', name: '9' },
                { label: '10', name: '10' },
              ],
              label: 'Number of Travelers',
              name: 'Travellers',
              required: true,
              validation: [
                DefaultFormValidators.required,
                FormHelpers.shouldEnableDependentField([
                  'tripDetailsTravellerAges',
                  'tripDetailsTravellerAges2',
                  'tripDetailsTravellerAges3',
                  'tripDetailsTravellerAges4',
                  'tripDetailsTravellerAges5',
                  'tripDetailsTravellerAges6',
                  'tripDetailsTravellerAges7',
                  'tripDetailsTravellerAges8',
                  'tripDetailsTravellerAges9',
                  'tripDetailsTravellerAges10',
                ]),
              ],
            },
            {
              type: 'input',
              label: 'Age of Traveller',
              name: 'tripDetailsTravellerAges',
              required: true,
              validation: [
                DefaultFormValidators.required,
                DefaultFormValidators.min(1),
                DefaultFormValidators.max(150),
                DefaultFormValidators.pattern('^[0-9]*$'),
              ],
              error: 'forms.lessThan150',
            },
            {
              type: 'input',
              label: 'Age of Traveller 2',
              name: 'tripDetailsTravellerAges2',
              required: true,
              validation: [
                DefaultFormValidators.required,
                DefaultFormValidators.min(1),
                DefaultFormValidators.max(150),
                DefaultFormValidators.pattern('^[0-9]*$'),
              ],
              error: 'forms.lessThan150',
              hidden: true,
            },
            {
              type: 'input',
              label: 'Age of Traveller 3',
              name: 'tripDetailsTravellerAges3',
              required: true,
              validation: [
                DefaultFormValidators.required,
                DefaultFormValidators.min(1),
                DefaultFormValidators.max(150),
                DefaultFormValidators.pattern('^[0-9]*$'),
              ],
              error: 'forms.lessThan150',
              hidden: true,
            },
            {
              type: 'input',
              label: 'Age of Traveller 4',
              name: 'tripDetailsTravellerAges4',
              required: true,
              validation: [
                DefaultFormValidators.required,
                DefaultFormValidators.min(1),
                DefaultFormValidators.max(150),
                DefaultFormValidators.pattern('^[0-9]*$'),
              ],
              error: 'forms.lessThan150',
              hidden: true,
            },
            {
              type: 'input',
              label: 'Age of Traveller 5',
              name: 'tripDetailsTravellerAges5',
              required: true,
              validation: [
                DefaultFormValidators.required,
                DefaultFormValidators.min(1),
                DefaultFormValidators.max(150),
                DefaultFormValidators.pattern('^[0-9]*$'),
              ],
              error: 'forms.lessThan150',
              hidden: true,
            },
            {
              type: 'input',
              label: 'Age of Traveller 6',
              name: 'tripDetailsTravellerAges6',
              required: true,
              validation: [
                DefaultFormValidators.required,
                DefaultFormValidators.min(1),
                DefaultFormValidators.max(150),
                DefaultFormValidators.pattern('^[0-9]*$'),
              ],
              error: 'forms.lessThan150',
              hidden: true,
            },
            {
              type: 'input',
              label: 'Age of Traveller 7',
              name: 'tripDetailsTravellerAges7',
              required: true,
              validation: [
                DefaultFormValidators.required,
                DefaultFormValidators.min(1),
                DefaultFormValidators.max(150),
                DefaultFormValidators.pattern('^[0-9]*$'),
              ],
              error: 'forms.lessThan150',
              hidden: true,
            },
            {
              type: 'input',
              label: 'Age of Traveller 8',
              name: 'tripDetailsTravellerAges8',
              required: true,
              validation: [
                DefaultFormValidators.required,
                DefaultFormValidators.min(1),
                DefaultFormValidators.max(150),
                DefaultFormValidators.pattern('^[0-9]*$'),
              ],
              error: 'forms.lessThan150',
              hidden: true,
            },
            {
              type: 'input',
              label: 'Age of Traveller 9',
              name: 'tripDetailsTravellerAges9',
              required: true,
              validation: [
                DefaultFormValidators.required,
                DefaultFormValidators.min(1),
                DefaultFormValidators.max(150),
                DefaultFormValidators.pattern('^[0-9]*$'),
              ],
              error: 'forms.lessThan150',
              hidden: true,
            },
            {
              type: 'input',
              label: 'Age of Traveller 10',
              name: 'tripDetailsTravellerAges10',
              required: true,
              validation: [
                DefaultFormValidators.required,
                DefaultFormValidators.min(1),
                DefaultFormValidators.max(150),
                DefaultFormValidators.pattern('^[0-9]*$'),
              ],
              error: 'forms.lessThan150',
              hidden: true,
            },
          ],
        },
      ],
    },
  ];
}
