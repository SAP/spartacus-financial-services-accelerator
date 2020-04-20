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
              required: true,
              validation: [DefaultFormValidators.required],
            },
            {
              label: 'When did it happen?',
              name: 'whenHappened',
              type: 'datepicker',
              required: true,
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
              required: true,
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
              required: true,
              validation: [DefaultFormValidators.required],
            },
            {
              label: 'City',
              name: 'city',
              type: 'input',
              required: true,
              validation: [DefaultFormValidators.required],
            },
            {
              label: 'Postcode',
              name: 'postcode',
              type: 'input',
              required: true,
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
              required: true,
              validation: [DefaultFormValidators.required],
            },
            {
              label: 'Description',
              name: 'description',
              type: 'textarea',
              required: true,
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
              required: true,
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
              required: true,
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
              required: true,
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
              required: true,
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
              required: true,
              validation: [DefaultFormValidators.required],
            },
            {
              label: 'First name',
              name: 'firstName',
              type: 'input',
              required: true,
              validation: [DefaultFormValidators.required],
            },
            {
              label: 'Last name',
              name: 'lastName',
              type: 'input',
              required: true,
              validation: [DefaultFormValidators.required],
            },
            {
              label: 'Phone Number',
              name: 'phoneNumber',
              type: 'input',
              required: true,
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
              required: true,
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
              required: true,
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
              required: true,
              validation: [DefaultFormValidators.required],
            },
            {
              label: 'Postcode',
              name: 'postcode',
              type: 'input',
              required: true,
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
              required: true,
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
              required: true,
              validation: [DefaultFormValidators.required],
            },
            {
              label: 'Event date',
              name: 'eventDate',
              type: 'datepicker',
              required: true,
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
              required: true,
              validation: [DefaultFormValidators.required],
            },
            {
              label: 'Venue address',
              name: 'eventVenueAddress',
              type: 'input',
              required: true,
              validation: [DefaultFormValidators.required],
            },
            {
              label: 'Venue city',
              name: 'eventVenueCity',
              type: 'input',
              required: true,
              validation: [DefaultFormValidators.required],
            },
            {
              label: 'First name',
              name: 'firstName',
              type: 'input',
              required: true,
              validation: [DefaultFormValidators.required],
            },
            {
              label: 'Last name',
              name: 'lastName',
              type: 'input',
              required: true,
              validation: [DefaultFormValidators.required],
            },
            {
              label: 'Email',
              name: 'email',
              type: 'input',
              required: true,
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
              required: true,
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
              required: true,
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
              required: true,
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
              required: true,
              validation: [DefaultFormValidators.required],
            },
            {
              label: 'First name',
              name: 'firstName',
              type: 'input',
              required: true,
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
              label: 'Phone Number',
              name: 'phoneNumber',
              type: 'input',
              required: true,
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
              required: true,
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
              required: true,
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
              required: true,
              validation: [DefaultFormValidators.required],
            },
            {
              label: 'Postcode',
              name: 'postcode',
              type: 'input',
              required: true,
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
              required: true,
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
              required: true,
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
