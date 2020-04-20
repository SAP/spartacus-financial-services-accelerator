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
              label: {
                en: 'General Information',
                de: 'Allgemeine Informationen',
              },
              name: 'general',
            },
            {
              type: 'radio',
              label: {
                en: 'Cover Required',
                de: '[DE] Cover Required',
              },
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
              label: {
                en: 'Start Date',
                de: 'Startdatum',
              },
              name: 'propertyDetailsStartDate',
              required: true,
              validation: [
                DefaultFormValidators.required,
                DefaultFormValidators.compareToCurrentDate('shouldBeGreater'),
              ],
              error: {
                en: 'Date must be in the future.',
                de: 'Datum muss in der Zukunft liegen.',
              },
            },
          ],
        },
        {
          groupCode: 'propertyDetailsCoverRequired',
          fieldConfigs: [
            {
              type: 'title',
              label: {
                en: 'Property Details',
                de: '[DE] Property Details',
              },
              name: 'propertyDetailsCoverRequired',
            },
            {
              type: 'select',
              label: {
                en: 'Property Type',
                de: '[DE] Property Type',
              },
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
              label: {
                en: 'Property Value',
                de: '[DE] value',
              },
              name: 'propertyValue',
              required: true,
              validation: [
                DefaultFormValidators.required,
                DefaultFormValidators.min(10000),
                DefaultFormValidators.max(1000000),
                DefaultFormValidators.pattern('^[0-9]*$'),
              ],
              error: {
                en: 'Must be in the range from 10.000 to 1.000.000.',
                de: '[DE] Must be in the range from 10.000 to 1.000.000.',
              },
            },
            {
              type: 'input',
              label: {
                en: 'Rebuild Value of Property',
                de: '[DE] Rebuild Value of Property',
              },
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
              error: {
                en: 'Must be less than property value.',
                de: '[DE] Must be less than property value.',
              },
            },
            {
              type: 'input',
              label: {
                en: 'Approximate Year Property Built',
                de: '[DE] Approximate Year Property Built',
              },
              name: 'ccaBuiltYear',
              required: true,
              validation: [
                DefaultFormValidators.required,
                DefaultFormValidators.min(1000),
                DefaultFormValidators.max(Number(new Date().getFullYear())),
                DefaultFormValidators.pattern('^[0-9]*$'),
              ],
              error: {
                en: 'Year must be from AD 1000 till current.',
                de: '[DE] Year must be from AD 1000 till current.',
              },
            },
            {
              type: 'input',
              label: {
                en: 'Number of Bedrooms',
                de: '[DE] Number of Bedrooms',
              },
              name: 'numberOfBedrooms',
              required: true,
              validation: [
                DefaultFormValidators.required,
                DefaultFormValidators.min(1),
                DefaultFormValidators.max(50),
                DefaultFormValidators.pattern('^[0-9]*$'),
              ],
              error: {
                en: 'Value must be a number between 1 and 50.',
                de: '[DE] Value must be a number between 1 and 50.',
              },
            },
            {
              type: 'input',
              label: {
                en: 'Number of Bathrooms',
                de: '[DE] Number of Bathrooms',
              },
              name: 'numberOfBathrooms',
              required: true,
              validation: [
                DefaultFormValidators.required,
                DefaultFormValidators.min(1),
                DefaultFormValidators.max(50),
                DefaultFormValidators.pattern('^[0-9]*$'),
              ],
              error: {
                en: 'Value must be a number between 1 and 50.',
                de: '[DE] Value must be a number between 1 and 50.',
              },
            },
            {
              type: 'radio',
              label: {
                en: 'Does anyone at the property smoke?',
                de: '[DE] Does anyone at the property smoke?',
              },
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
              label: {
                en:
                  'How many days in a row is the property likely to be unoccupied?',
                de:
                  '[DE] How many days in a row is the property likely to be unoccupied?',
              },
              name: 'numberOfDaysUnoccupied',
              required: true,
              validation: [
                DefaultFormValidators.required,
                DefaultFormValidators.min(0),
                DefaultFormValidators.max(360),
                DefaultFormValidators.pattern('^[0-9]*$'),
              ],
              error: {
                en: 'Value must be a number between 0 and 360.',
                de: '[DE] Value must be a number between 0 and 360.',
              },
            },
            {
              type: 'radio',
              label: {
                en: 'Is the property normally occupied during the day?',
                de: '[DE] Is the property normally occupied during the day?',
              },
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
              label: {
                en: 'What is the exterior construction material?',
                de: '[DE] What is the exterior construction material?',
              },
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
              label: {
                en: 'What locks are in place?',
                de: '[DE] What locks are in place?',
              },
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
              label: {
                en: 'Your Building Cover',
                de: '[DE] Your Building Cover',
              },
              name: 'buildingCover',
              hidden: true,
            },
            {
              type: 'select',
              label: {
                en:
                  'How many consecutive years have you held buildings insurance?',
                de:
                  '[DE] How many consecutive years have you held buildings insurance?',
              },
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
              label: {
                en:
                  'Would you like the accidental damage cover for your building?',
                de:
                  '[DE] Would you like the accidental damage cover for your building?',
              },
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
              label: {
                en: 'Your Contents Cover',
                de: '[DE] Your Contents Cover',
              },
              name: 'propertyIsStandard50000ContentCover',
              hidden: true,
            },
            {
              type: 'radio',
              label: {
                en:
                  'We give you 50,000€ contents cover as a standard, is this enough?',
                de:
                  '[DE] We give you 50,000€ contents cover as a standard, is this enough?',
              },
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
              label: {
                en: 'Please enter the desired amount from 10,000€ upwards.',
                de: '[DE] Please enter the desired amount from 10,000€ upwards.',
              },
              name: 'propertyMultipleOf10000ContentCover',
              required: true,
              validation: [
                DefaultFormValidators.required,
                DefaultFormValidators.min(10000),
                DefaultFormValidators.max(1000000),
                DefaultFormValidators.pattern('^[0-9]*$'),
              ],
              error: {
                en: 'Date must be in the future.',
                de: 'Datum muss in der Zukunft liegen.',
              },
              hidden: true,
            },
            {
              type: 'input',
              label: {
                en:
                  'How many consecutive years have you held contents insurance?',
                de:
                  '[DE] How many consecutive years have you held contents insurance?',
              },
              name: 'numberOfYearsHoldingInsurance',
              required: true,
              validation: [
                DefaultFormValidators.required,
                DefaultFormValidators.min(0),
                DefaultFormValidators.max(150),
                DefaultFormValidators.pattern('^[0-9]*$'),
              ],
              error: {
                en: 'Value must be less than 150.',
                de: 'Wert muss unter 150 liegen.',
              },
              hidden: true,
            },
            {
              type: 'radio',
              label: {
                en: 'Would you like accidental damage cover for your contents?',
                de:
                  '[DE] Would you like accidental damage cover for your contents?',
              },
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
              label: {
                en:
                  'If you have a car, please tell us when your insurance is due for renewal',
                de:
                  '[DE] If you have a car, please tell us when your insurance is due for renewal',
              },
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
              label: {
                en: 'Your Property Address',
                de: '[DE] Your Property Address',
              },
              name: 'propertyAddress',
            },
            {
              type: 'input',
              label: {
                en: 'Address Line 1',
                de: '[DE] Address Line 1',
              },
              name: 'property-address-line-1',
              required: true,
              validation: [DefaultFormValidators.required],
            },
            {
              type: 'input',
              label: {
                en: 'Address Line 2',
                de: '[DE] Address Line 2',
              },
              name: 'property-address-line-2',
            },
            {
              type: 'input',
              label: {
                en: 'City',
                de: 'Stadt',
              },
              name: 'property-address-city',
              required: true,
              validation: [DefaultFormValidators.required],
            },
            {
              type: 'input',
              label: {
                en: 'Postcode',
                de: 'Postleitzahl',
              },
              name: 'property-address-postcode',
              required: true,
              validation: [
                DefaultFormValidators.required,
                DefaultFormValidators.minLength(1),
                DefaultFormValidators.regexValidator(
                  DefaultFormValidators.postalCodeRegex
                ),
              ],
              error: {
                en:
                  'Should contain at least one number, no special characters.',
                de:
                  '[DE] Should contain at least one number, no special characters.',
              },
            },
            {
              type: 'select',
              label: {
                en: 'Country',
                de: 'Land',
              },
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
                  name: '[DE]',
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
              label: {
                en: 'General',
                de: '[DE] General',
              },
              name: 'general',
            },
            {
              type: 'datepicker',
              label: {
                en: 'Coverage Start Date',
                de: '[DE] Coverage Start Date',
              },
              name: 'coverageStartDate',
              required: true,
              validation: [
                DefaultFormValidators.required,
                DefaultFormValidators.compareToCurrentDate('shouldBeGreater'),
              ],
              error: {
                en: 'Date must be in the future.',
                de: 'Datum muss in der Zukunft liegen.',
              },
            },
            {
              type: 'select',
              options: [
                { name: 'MONTHLY', label: 'Monthly' },
                { name: 'YEARLY', label: 'Yearly' },
              ],
              label: {
                en: 'Payment Frequency',
                de: '[DE] value',
              },
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
              label: {
                en: 'Vehicle',
                de: '[DE] Vehicle',
              },
              name: 'vehicle',
            },
            {
              type: 'select',
              jsonField: 'make',
              label: {
                en: 'Vehicle Make',
                de: '[DE] value',
              },
              name: 'vehicleMake',
              required: true,
              validation: [DefaultFormValidators.required],
            },
            {
              type: 'select',
              jsonField: 'make.model',
              depends: ['vehicleMake'],
              label: {
                en: 'Vehicle Model',
                de: '[DE] value',
              },
              name: 'vehicleModel',
              required: true,
              validation: [DefaultFormValidators.required],
            },
            {
              type: 'select',
              depends: ['vehicleMake', 'vehicleModel'],
              jsonField: 'make.model.type',
              label: {
                en: 'Vehicle Type',
                de: '[DE] value',
              },
              name: 'vehicleType',
              required: true,
              validation: [DefaultFormValidators.required],
            },
            {
              type: 'select',
              depends: ['vehicleMake', 'vehicleModel', 'vehicleType'],
              jsonField: 'make.model.type.year',
              label: {
                en: 'Vehicle Year',
                de: '[DE] value',
              },
              name: 'vehicleYear',
              required: true,
              validation: [DefaultFormValidators.required],
            },
            {
              type: 'input',
              label: {
                en: 'Annual Mileage',
                de: '[DE] value',
              },
              name: 'vehicleAnnualMileage',
              required: true,
              validation: [
                DefaultFormValidators.required,
                DefaultFormValidators.max(100000),
                DefaultFormValidators.pattern('^[0-9]*$'),
              ],
              error: {
                en: 'Value must be less than 100.000',
                de: '[DE]r Wert muss unter 100.000 liegen',
              },
            },
            {
              type: 'input',
              label: {
                en: 'Vehicle Value',
                de: '[DE] value',
              },
              name: 'vehicleValue',
              required: true,
              validation: [
                DefaultFormValidators.required,
                DefaultFormValidators.min(3000),
                DefaultFormValidators.max(1000000),
                DefaultFormValidators.pattern('^[0-9]*$'),
              ],
              error: {
                en:
                  'Vehicle value must be a number between 3.000 and 1.000.000.',
                de:
                  '[DE]r Fahrzeugwert muss zwischen 3.000 und 1.000.000 liegen.',
              },
            },
            {
              type: 'select',
              label: {
                en: 'Vehicle Usage',
                de: '[DE] value',
              },
              name: 'vehicleUsage',
              options: [
                { name: 'Personal', label: 'Personal' },
                { name: 'Business', label: 'Business' },
              ],
              required: true,
              validation: [DefaultFormValidators.required],
            },
            {
              type: 'datepicker',
              label: {
                en: 'Vehicle Purchase Date',
                de: '[DE] value',
              },
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
              error: {
                en:
                  'Date must be in the past, during or after vehicle manufacture year.',
                de:
                  '[DE] Date must be in the past, during or after vehicle manufacture year.',
              },
            },
            {
              type: 'input',
              label: {
                en: 'Vehicle Owner Postal Code',
                de: '[DE] value',
              },
              name: 'vehicleOwnerPostalCode',
              required: true,
              validation: [
                DefaultFormValidators.required,
                DefaultFormValidators.minLength(1),
                DefaultFormValidators.regexValidator(
                  DefaultFormValidators.postalCodeRegex
                ),
              ],
              error: {
                en:
                  'Should contain at least one number, no special characters.',
                de:
                  'Should contain at least one number, no special characters.',
              },
            },
          ],
        },
        {
          groupCode: 'main-driver',
          fieldConfigs: [
            {
              type: 'title',
              label: {
                en: 'Main Driver',
                de: '[DE] Main Driver',
              },
              name: 'main-driver',
            },
            {
              type: 'datepicker',
              label: {
                en: 'Driver Date of Birth',
                de: '[DE] Driver Date of Birth',
              },
              name: 'dateOfBirth',
              required: true,
              validation: [
                DefaultFormValidators.required,
                DefaultFormValidators.dateOfBirthValidator(18),
              ],
              error: {
                en: 'Must be over 18 years old.',
                de: 'Muss über 18 Jahre alt sein.',
              },
            },
            {
              type: 'select',
              label: {
                en: 'Driver Gender',
                de: '[DE] Driver Gender',
              },
              name: 'driverGender',
              options: [
                { name: 'Male', label: 'Male' },
                { name: 'Female', label: 'Female' },
              ],
              required: true,
              validation: [DefaultFormValidators.required],
            },
            {
              type: 'select',
              label: {
                en: 'Driver Marital Status',
                de: '[DE] Driver Marital Status',
              },
              name: 'driverMaritalStatus',
              options: [
                { name: 'Single', label: 'Single' },
                { name: 'Married', label: 'Married' },
                { name: 'Widowed', label: 'Widowed' },
              ],
              required: true,
              validation: [DefaultFormValidators.required],
            },
            {
              type: 'select',
              label: {
                en: 'Driver`s Category',
                de: '[DE] Driver`s Category',
              },
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
              label: {
                en: 'Driver Licence Date',
                de: '[DE] Driver Licence Date',
              },
              name: 'driverLicenceDate',
              required: true,
              validation: [
                DefaultFormValidators.required,
                DefaultFormValidators.compareToCurrentDate('shouldBeLess'),
              ],
              error: {
                en: 'Date must be in the past.',
                de: 'Datum muss in der Vergangenheit liegen.',
              },
            },
          ],
        },
        {
          groupCode: 'additionalDrivers',
          fieldConfigs: [
            {
              type: 'title',
              label: {
                en: 'Additional Driver(s)',
                de: '[DE] Additional Driver(s)',
              },
              name: 'additionalDrivers',
            },
            {
              type: 'select',
              label: {
                en: 'Number of Drivers',
                de: '[DE] Number of Drivers',
              },
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
              label: {
                en: 'Additional Driver 1',
                de: '[DE] Additional Driver 1',
              },
              name: 'additional-driver-1',
              hidden: true,
            },
            {
              type: 'datepicker',
              label: {
                en: 'Driver Date of Birth',
                de: '[DE] Driver Date of Birth',
              },
              name: 'dateOfBirth',
              required: true,
              validation: [
                DefaultFormValidators.required,
                DefaultFormValidators.dateOfBirthValidator(18),
              ],
              error: {
                en: 'Must be over 18 years old.',
                de: 'Muss über 18 Jahre alt sein.',
              },
              hidden: true,
            },
            {
              type: 'select',
              label: {
                en: 'Driver Gender',
                de: '[DE] Driver Gender',
              },
              name: 'driverGender',
              options: [
                { name: 'Male', label: 'Male' },
                { name: 'Female', label: 'Female' },
              ],
              required: true,
              validation: [DefaultFormValidators.required],
              hidden: true,
            },
            {
              type: 'select',
              label: {
                en: 'Driver Marital Status',
                de: '[DE] Driver Marital Status',
              },
              name: 'driverMaritalStatus',
              options: [
                { name: 'Single', label: 'Single' },
                { name: 'Married', label: 'Married' },
                { name: 'Widowed', label: 'Widowed' },
              ],
              required: true,
              validation: [DefaultFormValidators.required],
              hidden: true,
            },
            {
              type: 'select',
              label: {
                en: 'Driver`s Category',
                de: '[DE] Driver`s Category',
              },
              name: 'driverCategory',
              options: [{ name: 'Occasional', label: 'Occasional' }],
              disabled: true,
              hidden: true,
            },
            {
              type: 'datepicker',
              label: {
                en: 'Driver Licence Date',
                de: '[DE] Driver Licence Date',
              },
              name: 'driverLicenceDate',
              required: true,
              validation: [
                DefaultFormValidators.required,
                DefaultFormValidators.compareToCurrentDate('shouldBeLess'),
              ],
              error: {
                en: 'Date must be in the past',
                de: 'Datum muss in der Vergangenheit liegen',
              },
              hidden: true,
            },
          ],
        },
        {
          groupCode: 'additional-driver-2',
          fieldConfigs: [
            {
              type: 'title',
              label: {
                en: 'Additional Driver 2',
                de: '[DE] Additional Driver 2',
              },
              name: 'additional-driver-2',
              hidden: true,
            },
            {
              type: 'datepicker',
              label: {
                en: 'Driver Date of Birth',
                de: '[DE] Driver Date of Birth',
              },
              name: 'dateOfBirth',
              required: true,
              validation: [
                DefaultFormValidators.required,
                DefaultFormValidators.dateOfBirthValidator(18),
              ],
              error: {
                en: 'Must be over 18 years old.',
                de: 'Muss über 18 Jahre alt sein.',
              },
              hidden: true,
            },
            {
              type: 'select',
              label: {
                en: 'Driver Gender',
                de: '[DE] Driver Gender',
              },
              name: 'driverGender',
              options: [
                { name: 'Male', label: 'Male' },
                { name: 'Female', label: 'Female' },
              ],
              required: true,
              validation: [DefaultFormValidators.required],
              hidden: true,
            },
            {
              type: 'select',
              label: {
                en: 'Driver Marital Status',
                de: '[DE] Driver Marital Status',
              },
              name: 'driverMaritalStatus',
              options: [
                { name: 'Single', label: 'Single' },
                { name: 'Married', label: 'Married' },
                { name: 'Widowed', label: 'Widowed' },
              ],
              required: true,
              validation: [DefaultFormValidators.required],
              hidden: true,
            },
            {
              type: 'select',
              label: {
                en: 'Driver`s Category',
                de: '[DE] Driver`s Category',
              },
              name: 'driverCategory',
              options: [{ name: 'Occasional', label: 'Occasional' }],
              hidden: true,
            },
            {
              type: 'datepicker',
              label: {
                en: 'Driver Licence Date',
                de: '[DE] Driver Licence Date',
              },
              name: 'driverLicenceDate',
              required: true,
              validation: [
                DefaultFormValidators.required,
                DefaultFormValidators.compareToCurrentDate('shouldBeLess'),
              ],
              error: {
                en: 'Date must be in the past.',
                de: 'Datum muss in der Vergangenheit liegen.',
              },
              hidden: true,
            },
          ],
        },
        {
          groupCode: 'additional-driver-3',
          fieldConfigs: [
            {
              type: 'title',
              label: {
                en: 'Additional Driver 3',
                de: '[DE] Additional Driver 3',
              },
              name: 'additional-driver-3',
              hidden: true,
            },
            {
              type: 'datepicker',
              label: {
                en: 'Driver Date of Birth',
                de: '[DE] Driver Date of Birth',
              },
              name: 'dateOfBirth',
              required: true,
              validation: [
                DefaultFormValidators.required,
                DefaultFormValidators.dateOfBirthValidator(18),
              ],
              error: {
                en: 'Must be over 18 years old.',
                de: 'Muss über 18 Jahre alt sein.',
              },
              hidden: true,
            },
            {
              type: 'select',
              label: {
                en: 'Driver Gender',
                de: '[DE] Driver Gender',
              },
              name: 'driverGender',
              options: [
                { name: 'Male', label: 'Male' },
                { name: 'Female', label: 'Female' },
              ],
              required: true,
              validation: [DefaultFormValidators.required],
              hidden: true,
            },
            {
              type: 'select',
              label: {
                en: 'Driver Marital Status',
                de: '[DE] Driver Marital Status',
              },
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
              label: {
                en: 'Driver`s Category',
                de: '[DE] Driver`s Category',
              },
              name: 'driverCategory',
              options: [{ name: 'Occasional', label: 'Occasional' }],
              hidden: true,
            },
            {
              type: 'datepicker',
              label: {
                en: 'Driver Licence Date',
                de: '[DE] Driver Licence Date',
              },
              name: 'driverLicenceDate',
              required: true,
              validation: [
                DefaultFormValidators.required,
                DefaultFormValidators.compareToCurrentDate('shouldBeLess'),
              ],
              error: {
                en: 'Date must be in the past.',
                de: 'Datum muss in der Vergangenheit liegen.',
              },
              hidden: true,
            },
          ],
        },
        {
          groupCode: 'additional-driver-4',
          fieldConfigs: [
            {
              type: 'title',
              label: {
                en: 'Additional Driver 4',
                de: '[DE] Additional Driver 4',
              },
              name: 'additional-driver-4',
              hidden: true,
            },
            {
              type: 'datepicker',
              label: {
                en: 'Driver Date of Birth',
                de: '[DE] Driver Date of Birth',
              },
              name: 'dateOfBirth',
              required: true,
              validation: [
                DefaultFormValidators.required,
                DefaultFormValidators.dateOfBirthValidator(18),
              ],
              error: {
                en: 'Must be over 18 years old.',
                de: 'Muss über 18 Jahre alt sein.',
              },
              hidden: true,
            },
            {
              type: 'select',
              label: {
                en: 'Driver Gender',
                de: '[DE] Driver Gender',
              },
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
              label: {
                en: 'Driver Marital Status',
                de: '[DE] Driver Marital Status',
              },
              name: 'driverMaritalStatus',
              options: [
                { name: 'Single', label: 'Single' },
                { name: 'Married', label: 'Married' },
                { name: 'Widowed', label: 'Widowed' },
              ],
              required: true,
              validation: [DefaultFormValidators.required],
              hidden: true,
            },
            {
              type: 'select',
              label: {
                en: 'Driver`s Category',
                de: '[DE] Driver`s Category',
              },
              name: 'driverCategory',
              options: [{ name: 'Occasional', label: 'Occasional' }],
              disabled: true,
              hidden: true,
            },
            {
              type: 'datepicker',
              label: {
                en: 'Driver Licence Date',
                de: '[DE] Driver Licence Date',
              },
              name: 'driverLicenceDate',
              required: true,
              validation: [
                DefaultFormValidators.required,
                DefaultFormValidators.compareToCurrentDate('shouldBeLess'),
              ],
              error: {
                en: 'Date must be in the past.',
                de: 'Datum muss in der Vergangenheit liegen.',
              },
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
              label: {
                en: 'Destination',
                de: '[DE] Destination',
              },
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
              error: {
                en: 'Please enter valid value.',
                de: 'Bitte geben Sie einen gültigen Wert ein.',
              },
            },
            {
              type: 'datepicker',
              label: {
                en: 'Start Date',
                de: '[DE] Start Date',
              },
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
              error: {
                en: 'Date must be in the future, cannot be after end date.',
                de: '[DE] Date must be in the future, cannot be after end date.',
              },
            },
            {
              type: 'datepicker',
              label: {
                en: 'End Date',
                de: '[DE] End Date',
              },
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
              error: {
                en: 'Date must be in the future, cannot be before start date.',
                de:
                  '[DE] Date must be in the future, cannot be before start date.',
              },
            },
            {
              type: 'input',
              label: {
                en: 'Duration in Days',
                de: '[DE] Duration in Days',
              },
              name: 'NoOfDays',
            },
            {
              type: 'input',
              label: {
                en: 'Trip Cost',
                de: '[DE] Trip Cost',
              },
              name: 'costOfTrip',
              required: true,
              validation: [
                DefaultFormValidators.required,
                DefaultFormValidators.min(1),
                DefaultFormValidators.max(1000000),
                DefaultFormValidators.pattern('^[0-9]*$'),
              ],
              error: {
                en: 'Value must be less than 1.000.000, cannot be 0.',
                de: '[DE]r Wert muss unter 1.000.000 liegen.',
              },
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
              label: {
                en: 'Number of Travelers',
                de: '[DE] Number of Travelers',
              },
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
              label: {
                en: 'Age of Traveller',
                de: '[DE] Age of Traveller',
              },
              name: 'tripDetailsTravellerAges',
              required: true,
              validation: [
                DefaultFormValidators.required,
                DefaultFormValidators.min(1),
                DefaultFormValidators.max(150),
                DefaultFormValidators.pattern('^[0-9]*$'),
              ],
              error: {
                en: 'Value must be less than 150.',
                de: 'Wert muss unter 150 liegen.',
              },
            },
            {
              type: 'input',
              label: {
                en: 'Age of Traveller 2',
                de: '[DE] Age of Traveller 2',
              },
              name: 'tripDetailsTravellerAges2',
              required: true,
              validation: [
                DefaultFormValidators.required,
                DefaultFormValidators.min(1),
                DefaultFormValidators.max(150),
                DefaultFormValidators.pattern('^[0-9]*$'),
              ],
              error: {
                en: 'Value must be less than 150.',
                de: 'Wert muss unter 150 liegen..',
              },
              hidden: true,
            },
            {
              type: 'input',
              label: {
                en: 'Age of Traveller 3',
                de: '[DE] Age of Traveller 3',
              },
              name: 'tripDetailsTravellerAges3',
              required: true,
              validation: [
                DefaultFormValidators.required,
                DefaultFormValidators.min(1),
                DefaultFormValidators.max(150),
                DefaultFormValidators.pattern('^[0-9]*$'),
              ],
              error: {
                en: 'Value must be less than 150.',
                de: 'Wert muss unter 150 liegen.',
              },
              hidden: true,
            },
            {
              type: 'input',
              label: {
                en: 'Age of Traveller 4',
                de: '[DE] Age of Traveller 4',
              },
              name: 'tripDetailsTravellerAges4',
              required: true,
              validation: [
                DefaultFormValidators.required,
                DefaultFormValidators.min(1),
                DefaultFormValidators.max(150),
                DefaultFormValidators.pattern('^[0-9]*$'),
              ],
              error: {
                en: 'Value must be less than 150.',
                de: 'Wert muss unter 150 liegen.',
              },
              hidden: true,
            },
            {
              type: 'input',
              label: {
                en: 'Age of Traveller 5',
                de: '[DE] Age of Traveller 5',
              },
              name: 'tripDetailsTravellerAges5',
              required: true,
              validation: [
                DefaultFormValidators.required,
                DefaultFormValidators.min(1),
                DefaultFormValidators.max(150),
                DefaultFormValidators.pattern('^[0-9]*$'),
              ],
              error: {
                en: 'Value must be less than 150.',
                de: 'Wert muss unter 150 liegen.',
              },
              hidden: true,
            },
            {
              type: 'input',
              label: {
                en: 'Age of Traveller 6',
                de: '[DE] Age of Traveller 6',
              },
              name: 'tripDetailsTravellerAges6',
              required: true,
              validation: [
                DefaultFormValidators.required,
                DefaultFormValidators.min(1),
                DefaultFormValidators.max(150),
                DefaultFormValidators.pattern('^[0-9]*$'),
              ],
              error: {
                en: 'Value must be less than 150.',
                de: 'Wert muss unter 150 liegen.',
              },
              hidden: true,
            },
            {
              type: 'input',
              label: {
                en: 'Age of Traveller 7',
                de: '[DE] Age of Traveller 7',
              },
              name: 'tripDetailsTravellerAges7',
              required: true,
              validation: [
                DefaultFormValidators.required,
                DefaultFormValidators.min(1),
                DefaultFormValidators.max(150),
                DefaultFormValidators.pattern('^[0-9]*$'),
              ],
              error: {
                en: 'Value must be less than 150.',
                de: 'Wert muss unter 150 liegen.',
              },
              hidden: true,
            },
            {
              type: 'input',
              label: {
                en: 'Age of Traveller 8',
                de: '[DE] Age of Traveller 8',
              },
              name: 'tripDetailsTravellerAges8',
              required: true,
              validation: [
                DefaultFormValidators.required,
                DefaultFormValidators.min(1),
                DefaultFormValidators.max(150),
                DefaultFormValidators.pattern('^[0-9]*$'),
              ],
              error: {
                en: 'Value must be less than 150.',
                de: 'Wert muss unter 150 liegen.',
              },
              hidden: true,
            },
            {
              type: 'input',
              label: {
                en: 'Age of Traveller 9',
                de: '[DE] Age of Traveller 9',
              },
              name: 'tripDetailsTravellerAges9',
              required: true,
              validation: [
                DefaultFormValidators.required,
                DefaultFormValidators.min(1),
                DefaultFormValidators.max(150),
                DefaultFormValidators.pattern('^[0-9]*$'),
              ],
              error: {
                en: 'Value must be less than 150.',
                de: 'Wert muss unter 150 liegen.',
              },
              hidden: true,
            },
            {
              type: 'input',
              label: {
                en: 'Age of Traveller 10',
                de: '[DE] Age of Traveller 10',
              },
              name: 'tripDetailsTravellerAges10',
              required: true,
              validation: [
                DefaultFormValidators.required,
                DefaultFormValidators.min(1),
                DefaultFormValidators.max(150),
                DefaultFormValidators.pattern('^[0-9]*$'),
              ],
              error: {
                en: 'Value must be less than 150.',
                de: 'Wert muss unter 150 liegen.',
              },
              hidden: true,
            },
          ],
        },
      ],
    },
  ];
}
