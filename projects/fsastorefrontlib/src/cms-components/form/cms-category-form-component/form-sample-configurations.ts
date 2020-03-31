import { FormHelpers } from '../../../shared/util/helpers/form-helpers';
import { DefaultFormValidators } from '@fsa/dynamicforms';
import { FormDefinition } from '@fsa/dynamicforms';

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
              validation: [DefaultFormValidators.required],
            },
            {
              type: 'input',
              label:
                'How many days in a row is the property likely to be unoccupied?',
              name: 'numberOfDaysUnoccupied',
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
              validation: [DefaultFormValidators.required],
            },
            {
              type: 'input',
              label: 'Postcode',
              name: 'property-address-postcode',
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
              validation: [
                DefaultFormValidators.required,
                DefaultFormValidators.compareToCurrentDate('shouldBeGreater'),
              ],
              error: 'forms.dateInFuture',
            },
            {
              type: 'select',
              options: [
                { name: 'MONTHLY', label: 'Monthly' },
                { name: 'YEARLY', label: 'Yearly' },
              ],
              label: 'Payment Frequency',
              name: 'paymentFrequency',
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
              jsonField: 'make',
              label: 'Vehicle Make',
              name: 'vehicleMake',
              validation: [DefaultFormValidators.required],
            },
            {
              type: 'select',
              jsonField: 'make.model',
              depends: ['vehicleMake'],
              label: 'Vehicle Model',
              name: 'vehicleModel',
              validation: [DefaultFormValidators.required],
            },
            {
              type: 'select',
              depends: ['vehicleMake', 'vehicleModel'],
              jsonField: 'make.model.type',
              label: 'Vehicle Type',
              name: 'vehicleType',
              validation: [DefaultFormValidators.required],
            },
            {
              type: 'select',
              depends: ['vehicleMake', 'vehicleModel', 'vehicleType'],
              jsonField: 'make.model.type.year',
              label: 'Vehicle Year',
              name: 'vehicleYear',
              validation: [DefaultFormValidators.required],
            },
            {
              type: 'input',
              label: 'Annual Mileage',
              name: 'vehicleAnnualMileage',
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
              options: [
                { name: 'Personal', label: 'Personal' },
                { name: 'Business', label: 'Business' },
              ],
              validation: [DefaultFormValidators.required],
            },
            {
              type: 'datepicker',
              label: 'Vehicle Purchase Date',
              name: 'vehiclePurchaseDate',
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
              options: [
                { name: 'Male', label: 'Male' },
                { name: 'Female', label: 'Female' },
              ],
              validation: [DefaultFormValidators.required],
            },
            {
              type: 'select',
              label: 'Driver Marital Status',
              name: 'driverMaritalStatus',
              options: [
                { name: 'Single', label: 'Single' },
                { name: 'Married', label: 'Married' },
                { name: 'Widowed', label: 'Widowed' },
              ],
              validation: [DefaultFormValidators.required],
            },
            {
              type: 'select',
              label: 'Driver`s Category',
              name: 'driverCategory',
              options: [
                {
                  label: 'Main',
                  name: 'Main',
                },
              ],
            },
            {
              type: 'datepicker',
              label: 'Driver Licence Date',
              name: 'driverLicenceDate',
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
              options: [
                { name: 'Male', label: 'Male' },
                { name: 'Female', label: 'Female' },
              ],
              validation: [DefaultFormValidators.required],
              hidden: true,
            },
            {
              type: 'select',
              label: 'Driver Marital Status',
              name: 'driverMaritalStatus',
              options: [
                { name: 'Single', label: 'Single' },
                { name: 'Married', label: 'Married' },
                { name: 'Widowed', label: 'Widowed' },
              ],
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
              options: [
                { name: 'Male', label: 'Male' },
                { name: 'Female', label: 'Female' },
              ],
              validation: [DefaultFormValidators.required],
              hidden: true,
            },
            {
              type: 'select',
              label: 'Driver Marital Status',
              name: 'driverMaritalStatus',
              options: [
                { name: 'Single', label: 'Single' },
                { name: 'Married', label: 'Married' },
                { name: 'Widowed', label: 'Widowed' },
              ],
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
              options: [
                { name: 'Male', label: 'Male' },
                { name: 'Female', label: 'Female' },
              ],
              validation: [DefaultFormValidators.required],
              hidden: true,
            },
            {
              type: 'select',
              label: 'Driver Marital Status',
              name: 'driverMaritalStatus',
              options: [
                { name: 'Single', label: 'Single' },
                { name: 'Married', label: 'Married' },
                { name: 'Widowed', label: 'Widowed' },
              ],
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
              options: [
                { name: 'Male', label: 'Male' },
                { name: 'Female', label: 'Female' },
              ],
              validation: [DefaultFormValidators.required],
              hidden: true,
            },
            {
              type: 'select',
              label: 'Driver Marital Status',
              name: 'driverMaritalStatus',
              options: [
                { name: 'Single', label: 'Single' },
                { name: 'Married', label: 'Married' },
                { name: 'Widowed', label: 'Widowed' },
              ],
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
              validation: [DefaultFormValidators.required],
              error: 'forms.enterValidValue',
            },
            {
              type: 'datepicker',
              label: 'Start Date',
              name: 'tripStartDate',
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
    {
      formId: 'auto_claim_incident_info_form',
      formGroups: [
        {
          fieldConfigs: [
            {
              type: 'select',
              label: 'What happened?',
              name: 'whatHappened',
              options: [
                {
                  name: 'AutoOtherAccident',
                  label: 'Other Accident',
                },
                {
                  name: 'AutoGlassDamage',
                  label: 'Glass Damage',
                },
                {
                  name: 'AutoCollision',
                  label: 'Collision',
                },
                {
                  name: 'AutoFire',
                  label: 'Fire',
                },
                {
                  name: 'AutoTheft',
                  label: 'Theft',
                },
                {
                  name: 'AutoBreakdown',
                  label: 'Breakdown',
                },
                {
                  name: 'AutoAccident',
                  label: 'Accident',
                },
              ],
              validation: [DefaultFormValidators.required],
            },
            {
              label: 'When did it happen?',
              name: 'whenHappened',
              type: 'datepicker',
              validation: [
                DefaultFormValidators.required,
                DefaultFormValidators.compareToCurrentDate('shouldBeLess'),
              ],
              error: 'forms.dateInPast',
            },
            {
              label: 'What time did it happen?',
              name: 'whatTime',
              type: 'time',
              validation: [DefaultFormValidators.required],
            },
            {
              type: 'select',
              label: 'Country',
              name: 'country',
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
              validation: [DefaultFormValidators.required],
            },
            {
              label: 'City',
              name: 'city',
              type: 'input',
              validation: [DefaultFormValidators.required],
            },
            {
              label: 'Postcode',
              name: 'postcode',
              type: 'input',
              validation: [
                DefaultFormValidators.required,
                DefaultFormValidators.regexValidator(
                  DefaultFormValidators.postalCodeRegex
                ),
              ],
              error: 'forms.containAtLeastOneNumber',
            },
            {
              label: 'Address',
              name: 'address',
              type: 'input',
              validation: [DefaultFormValidators.required],
            },
            {
              label: 'Description',
              name: 'description',
              type: 'textarea',
              validation: [DefaultFormValidators.required],
            },
          ],
        },
      ],
    },
    {
      formId: 'auto_claim_incident_report_form',
      formGroups: [
        {
          fieldConfigs: [
            {
              label: 'Please describe how the accident occurred:',
              name: 'howAccidentOccured',
              type: 'textarea',
              validation: [DefaultFormValidators.required],
            },
          ],
        },
      ],
    },
    {
      formId: 'auto_claim_general_form',
      formGroups: [
        {
          fieldConfigs: [
            {
              label: 'Who is responsible for the accident?',
              name: 'responsibleForAccident',
              type: 'input',
              validation: [DefaultFormValidators.required],
            },
            {
              label: 'Were the police informed?',
              name: 'policeInformed',
              type: 'radio',
              options: [
                {
                  name: 'yes',
                  label: 'Yes',
                },
                {
                  name: 'no',
                  label: 'No',
                },
              ],
              validation: [DefaultFormValidators.required],
            },
            {
              label: 'Are there any witnesses we can contact?',
              name: 'witnesses',
              type: 'radio',
              options: [
                {
                  name: 'yes',
                  label: 'Yes',
                },
                {
                  name: 'no',
                  label: 'No',
                },
              ],
              validation: [DefaultFormValidators.required],
            },
          ],
        },
      ],
    },
    {
      formId: 'insurance_personal_details',
      formGroups: [
        {
          groupCode: 'personalDetails',
          fieldConfigs: [
            {
              label: 'Title',
              name: 'title',
              type: 'select',
              options: [
                {
                  name: 'mr',
                  label: 'Mr.',
                },
                {
                  name: 'mrs',
                  label: 'Mrs.',
                },
                {
                  name: 'miss',
                  label: 'Miss.',
                },
                {
                  name: 'dr',
                  label: 'Dr.',
                },
                {
                  name: 'rev',
                  label: 'Rev.',
                },
              ],
              validation: [DefaultFormValidators.required],
            },
            {
              label: 'First name',
              name: 'firstName',
              type: 'input',
              validation: [DefaultFormValidators.required],
            },
            {
              label: 'Last name',
              name: 'lastName',
              type: 'input',
              validation: [DefaultFormValidators.required],
            },
            {
              label: 'Phone Number',
              name: 'phoneNumber',
              type: 'input',
              validation: [
                DefaultFormValidators.required,
                DefaultFormValidators.minLength(4),
                DefaultFormValidators.maxLength(20),
                DefaultFormValidators.pattern('^[0-9]*$'),
              ],
              error: 'forms.between4And20Digits',
            },
            {
              label: 'Email',
              name: 'email',
              type: 'input',
              validation: [
                DefaultFormValidators.required,
                DefaultFormValidators.regexValidator(
                  DefaultFormValidators.emailRegex
                ),
              ],
              error: 'forms.enterValidEmail',
            },
            {
              label: 'Address Line 1',
              name: 'address1',
              type: 'input',
              validation: [DefaultFormValidators.required],
            },
            {
              label: 'Address Line 2',
              name: 'address2',
              type: 'input',
            },
            {
              label: 'City',
              name: 'city',
              type: 'input',
              validation: [DefaultFormValidators.required],
            },
            {
              label: 'Postcode',
              name: 'postcode',
              type: 'input',
              validation: [
                DefaultFormValidators.required,
                DefaultFormValidators.regexValidator(
                  DefaultFormValidators.postalCodeRegex
                ),
              ],
              error: 'forms.containAtLeastOneNumber',
            },
            {
              label: 'Country',
              name: 'country',
              type: 'select',
              options: [
                {
                  label: 'Serbia',
                  name: 'RS',
                },
              ],
              validation: [DefaultFormValidators.required],
            },
          ],
        },
      ],
    },
    {
      formId: 'event_personal_details',
      formGroups: [
        {
          groupCode: 'personalDetails',
          fieldConfigs: [
            {
              label: 'Event country',
              name: 'eventCountry',
              type: 'select',
              options: [
                {
                  name: 'DE',
                  label: 'Germany',
                },
                {
                  name: 'CA',
                  label: 'Canada',
                },
                {
                  name: 'UK',
                  label: 'United Kingdom',
                },
                {
                  name: 'FR',
                  label: 'France',
                },
              ],
              validation: [DefaultFormValidators.required],
            },
            {
              label: 'Event date',
              name: 'eventDate',
              type: 'datepicker',
              validation: [
                DefaultFormValidators.required,
                DefaultFormValidators.compareToCurrentDate('shouldBeGreater'),
              ],
              error: 'forms.dateInFuture',
            },
            {
              label: 'Venue name',
              name: 'eventVenue',
              type: 'input',
              validation: [DefaultFormValidators.required],
            },
            {
              label: 'Venue address',
              name: 'eventVenueAddress',
              type: 'input',
              validation: [DefaultFormValidators.required],
            },
            {
              label: 'Venue city',
              name: 'eventVenueCity',
              type: 'input',
              validation: [DefaultFormValidators.required],
            },
            {
              label: 'First name',
              name: 'firstName',
              type: 'input',
              validation: [DefaultFormValidators.required],
            },
            {
              label: 'Last name',
              name: 'lastName',
              type: 'input',
              validation: [DefaultFormValidators.required],
            },
            {
              label: 'Email',
              name: 'email',
              type: 'input',
              validation: [
                DefaultFormValidators.required,
                DefaultFormValidators.regexValidator(
                  DefaultFormValidators.emailRegex
                ),
              ],
              error: 'forms.enterValidEmail',
            },
            {
              label: 'Address Line 1',
              name: 'address1',
              type: 'input',
              validation: [DefaultFormValidators.required],
            },
            {
              label: 'Address Line 2',
              name: 'address2',
              type: 'input',
            },
            {
              label: 'Postcode',
              name: 'postcode',
              type: 'input',
              validation: [
                DefaultFormValidators.required,
                DefaultFormValidators.regexValidator(
                  DefaultFormValidators.postalCodeRegex
                ),
              ],
              error: 'forms.containAtLeastOneNumber',
            },
            {
              label: 'City',
              name: 'city',
              type: 'input',
              validation: [DefaultFormValidators.required],
            },
          ],
        },
      ],
    },
    {
      formId: 'travel_personal_details',
      formGroups: [
        {
          groupCode: 'personalDetails',
          fieldConfigs: [
            {
              label: 'Title',
              name: 'title',
              type: 'select',
              options: [
                {
                  name: 'mr',
                  label: 'Mr.',
                },
                {
                  name: 'mrs',
                  label: 'Mrs.',
                },
                {
                  name: 'miss',
                  label: 'Miss.',
                },
                {
                  name: 'dr',
                  label: 'Dr.',
                },
                {
                  name: 'rev',
                  label: 'Rev.',
                },
              ],
              validation: [DefaultFormValidators.required],
            },
            {
              label: 'First name',
              name: 'firstName',
              type: 'input',
              validation: [DefaultFormValidators.required],
            },
            {
              label: 'Last name',
              name: 'lastName',
              type: 'input',
              validation: [DefaultFormValidators.required],
            },
            {
              label: 'Age',
              name: 'age',
              type: 'input',
              validation: [
                DefaultFormValidators.required,
                DefaultFormValidators.min(1),
                DefaultFormValidators.max(150),
                DefaultFormValidators.pattern('^[0-9]*$'),
              ],
              error: 'forms.lessThan150',
            },
            {
              label: 'Phone Number',
              name: 'phoneNumber',
              type: 'input',
              validation: [
                DefaultFormValidators.required,
                DefaultFormValidators.minLength(4),
                DefaultFormValidators.maxLength(20),
                DefaultFormValidators.pattern('^[0-9]*$'),
              ],
              error: 'forms.between4And20Digits',
            },
            {
              label: 'Email',
              name: 'email',
              type: 'input',
              validation: [
                DefaultFormValidators.required,
                DefaultFormValidators.regexValidator(
                  DefaultFormValidators.emailRegex
                ),
              ],
              error: 'forms.enterValidEmail',
            },
            {
              label: 'Address Line 1',
              name: 'address1',
              type: 'input',
              validation: [DefaultFormValidators.required],
            },
            {
              label: 'Address Line 2',
              name: 'address2',
              type: 'input',
            },
            {
              label: 'City',
              name: 'city',
              type: 'input',
              validation: [DefaultFormValidators.required],
            },
            {
              label: 'Postcode',
              name: 'postcode',
              type: 'input',
              validation: [
                DefaultFormValidators.required,
                DefaultFormValidators.regexValidator(
                  DefaultFormValidators.postalCodeRegex
                ),
              ],
              error: 'forms.containAtLeastOneNumber',
            },
            {
              label: 'Country',
              name: 'country',
              type: 'select',
              validation: [DefaultFormValidators.required],
              options: [
                {
                  label: 'Serbia',
                  name: 'RS',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      formId: 'auto_change_car_details_form',
      formGroups: [
        {
          fieldConfigs: [
            {
              label: 'Change mileage',
              name: 'newMileage',
              type: 'input',
              placeholder: 'Insert New Mileage',
              validation: [
                DefaultFormValidators.required,
                DefaultFormValidators.max(100000),
                DefaultFormValidators.pattern('^[0-9]*$'),
              ],
              error: 'forms.lessThan100K',
            },
          ],
        },
      ],
    },
  ];
}
