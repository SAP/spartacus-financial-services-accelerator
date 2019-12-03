import { Validators } from '@angular/forms';
import { FormHelpers } from '../../../shared/util/helpers/form-helpers';
import { CustomFormValidators } from '../../../shared/util/validators/custom-form-validators';
import { FormDefinition } from '@fsa/dynamicforms';

export class FormSampleConfigurations {
  static sampleConfigurations: FormDefinition[] = [
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
                Validators.required,
                CustomFormValidators.compareToCurrentDate('shouldBeGreater'),
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
              validation: [Validators.required],
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
              validation: [Validators.required],
            },
            {
              type: 'select',
              jsonField: 'make.model',
              depends: ['vehicleMake'],
              label: 'Vehicle Model',
              name: 'vehicleModel',
              validation: [Validators.required],
            },
            {
              type: 'select',
              depends: ['vehicleMake', 'vehicleModel'],
              jsonField: 'make.model.type',
              label: 'Vehicle Type',
              name: 'vehicleType',
              validation: [Validators.required],
            },
            {
              type: 'select',
              depends: ['vehicleMake', 'vehicleModel', 'vehicleType'],
              jsonField: 'make.model.type.year',
              label: 'Vehicle Year',
              name: 'vehicleYear',
              validation: [Validators.required],
            },
            {
              type: 'input',
              label: 'Annual Mileage',
              name: 'vehicleAnnualMileage',
              validation: [
                Validators.required,
                Validators.max(100000),
                Validators.pattern('^[0-9]*$'),
              ],
              error: 'forms.lessThan100K',
            },
            {
              type: 'input',
              label: 'Vehicle Value',
              name: 'vehicleValue',
              validation: [
                Validators.required,
                Validators.min(3000),
                Validators.max(1000000),
                Validators.pattern('^[0-9]*$'),
              ],
              error: 'forms.vehicleValue',
            },
            {
              type: 'select',
              options: [
                { name: 'Personal', label: 'Personal' },
                { name: 'Business', label: 'Business' },
              ],
              label: 'Vehicle Usage',
              name: 'vehicleUsage',
              validation: [Validators.required],
            },
            {
              type: 'datepicker',
              label: 'Vehicle Purchase Date',
              name: 'vehiclePurchaseDate',
              validation: [
                Validators.required,
                CustomFormValidators.compareToCurrentDate('shouldBeLess'),
              ],
              error: 'forms.dateInPast',
            },
            {
              type: 'input',
              label: 'Vehicle Owner Postal Code',
              name: 'vehicleOwnerPostalCode',
              validation: [
                Validators.required,
                Validators.minLength(1),
                CustomFormValidators.regexValidator(
                  CustomFormValidators.postalCodeRegex
                ),
              ],
              error: 'forms.containAtLeastOneNumber',
            },
          ],
        },
        {
          groupCode: 'mainDriver',
          fieldConfigs: [
            {
              type: 'title',
              label: 'Main Driver',
              name: 'mainDriver',
            },
            {
              type: 'datepicker',
              label: 'Driver Date of Birth',
              name: 'driverDob',
              validation: [
                Validators.required,
                CustomFormValidators.dateOfBirthValidator(18),
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
              validation: [Validators.required],
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
              validation: [Validators.required],
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
              disabled: true,
            },
            {
              type: 'datepicker',
              label: 'Driver Licence Date',
              name: 'driverLicenceDate',
              validation: [
                Validators.required,
                CustomFormValidators.compareToCurrentDate('shouldBeLess'),
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
              options: [
                { name: '0', label: '0' },
                { name: '1', label: '1' },
                { name: '2', label: '2' },
                { name: '3', label: '3' },
                { name: '4', label: '4' },
              ],
              label: 'Number of Drivers',
              name: 'numberOfDrivers',
              validation: [
                Validators.required,
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
              name: 'driverDob',
              validation: [
                Validators.required,
                CustomFormValidators.dateOfBirthValidator(18),
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
              validation: [Validators.required],
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
              validation: [Validators.required],
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
                Validators.required,
                CustomFormValidators.compareToCurrentDate('shouldBeLess'),
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
              name: 'driverDob',
              validation: [
                Validators.required,
                CustomFormValidators.dateOfBirthValidator(18),
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
              validation: [Validators.required],
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
              validation: [Validators.required],
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
                Validators.required,
                CustomFormValidators.compareToCurrentDate('shouldBeLess'),
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
              name: 'driverDob',
              validation: [
                Validators.required,
                CustomFormValidators.dateOfBirthValidator(18),
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
              validation: [Validators.required],
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
              validation: [Validators.required],
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
                Validators.required,
                CustomFormValidators.compareToCurrentDate('shouldBeLess'),
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
              name: 'driverDob',
              validation: [
                Validators.required,
                CustomFormValidators.dateOfBirthValidator(18),
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
              validation: [Validators.required],
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
              validation: [Validators.required],
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
                Validators.required,
                CustomFormValidators.compareToCurrentDate('shouldBeLess'),
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
              validation: [Validators.required],
              error: 'forms.enterValidValue',
            },
            {
              type: 'datepicker',
              label: 'Start Date',
              name: 'tripStartDate',
              validation: [
                Validators.required,
                CustomFormValidators.compareToCurrentDate('shouldBeGreater'),
                CustomFormValidators.compareDates(
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
                Validators.required,
                CustomFormValidators.compareToCurrentDate('shouldBeGreater'),
                CustomFormValidators.compareDates(
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
                Validators.required,
                Validators.min(0),
                Validators.max(1000000),
                Validators.pattern('^[0-9]*$'),
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
                Validators.required,
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
                Validators.required,
                Validators.min(1),
                Validators.max(150),
                Validators.pattern('^[0-9]*$'),
              ],
              error: 'forms.lessThan150',
            },
            {
              type: 'input',
              label: 'Age of Traveller 2',
              name: 'tripDetailsTravellerAges2',
              validation: [
                Validators.required,
                Validators.min(1),
                Validators.max(150),
                Validators.pattern('^[0-9]*$'),
              ],
              error: 'forms.lessThan150',
              hidden: true,
            },
            {
              type: 'input',
              label: 'Age of Traveller 3',
              name: 'tripDetailsTravellerAges3',
              validation: [
                Validators.required,
                Validators.min(1),
                Validators.max(150),
                Validators.pattern('^[0-9]*$'),
              ],
              error: 'forms.lessThan150',
              hidden: true,
            },
            {
              type: 'input',
              label: 'Age of Traveller 4',
              name: 'tripDetailsTravellerAges4',
              validation: [
                Validators.required,
                Validators.min(1),
                Validators.max(150),
                Validators.pattern('^[0-9]*$'),
              ],
              error: 'forms.lessThan150',
              hidden: true,
            },
            {
              type: 'input',
              label: 'Age of Traveller 5',
              name: 'tripDetailsTravellerAges5',
              validation: [
                Validators.required,
                Validators.min(1),
                Validators.max(150),
                Validators.pattern('^[0-9]*$'),
              ],
              error: 'forms.lessThan150',
              hidden: true,
            },
            {
              type: 'input',
              label: 'Age of Traveller 6',
              name: 'tripDetailsTravellerAges6',
              validation: [
                Validators.required,
                Validators.min(1),
                Validators.max(150),
                Validators.pattern('^[0-9]*$'),
              ],
              error: 'forms.lessThan150',
              hidden: true,
            },
            {
              type: 'input',
              label: 'Age of Traveller 7',
              name: 'tripDetailsTravellerAges7',
              validation: [
                Validators.required,
                Validators.min(1),
                Validators.max(150),
                Validators.pattern('^[0-9]*$'),
              ],
              error: 'forms.lessThan150',
              hidden: true,
            },
            {
              type: 'input',
              label: 'Age of Traveller 8',
              name: 'tripDetailsTravellerAges8',
              validation: [
                Validators.required,
                Validators.min(1),
                Validators.max(150),
                Validators.pattern('^[0-9]*$'),
              ],
              error: 'forms.lessThan150',
              hidden: true,
            },
            {
              type: 'input',
              label: 'Age of Traveller 9',
              name: 'tripDetailsTravellerAges9',
              validation: [
                Validators.required,
                Validators.min(1),
                Validators.max(150),
                Validators.pattern('^[0-9]*$'),
              ],
              error: 'forms.lessThan150',
              hidden: true,
            },
            {
              type: 'input',
              label: 'Age of Traveller 10',
              name: 'tripDetailsTravellerAges10',
              validation: [
                Validators.required,
                Validators.min(1),
                Validators.max(150),
                Validators.pattern('^[0-9]*$'),
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
              label: 'What happened?',
              name: 'whatHappened',
              validation: [Validators.required],
            },
            {
              label: 'When did it happen?',
              name: 'whenHappened',
              type: 'datepicker',
              validation: [
                Validators.required,
                CustomFormValidators.compareToCurrentDate('shouldBeLess'),
              ],
            },
            {
              label: 'What time did it happen?',
              name: 'whatTime',
              type: 'input',
              validation: [Validators.required],
            },
            {
              type: 'select',
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
              label: 'Country',
              name: 'country',
              validation: [Validators.required],
            },
            {
              label: 'Where did it happen?',
              name: 'whereDidItHappen',
              type: 'input',
              validation: [Validators.required],
            },
            {
              label: 'Postcode',
              name: 'postcode',
              type: 'input',
              validation: [Validators.required],
            },
            {
              label: 'Address',
              name: 'address',
              type: 'input',
              validation: [Validators.required],
            },
            {
              label: 'Description',
              name: 'description',
              type: 'textarea',
              validation: [Validators.required],
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
              validation: [Validators.required],
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
              validation: [Validators.required],
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
              validation: [Validators.required],
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
              validation: [Validators.required],
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
              validation: [Validators.required],
            },
            {
              label: 'First name',
              name: 'firstName',
              type: 'input',
              validation: [Validators.required],
            },
            {
              label: 'Last name',
              name: 'lastName',
              type: 'input',
              validation: [Validators.required],
            },
            {
              label: 'Phone Number',
              name: 'phoneNumber',
              type: 'input',
              validation: [Validators.required],
            },
            {
              label: 'Email',
              name: 'email',
              type: 'input',
              validation: [
                Validators.required,
                CustomFormValidators.regexValidator(
                  CustomFormValidators.emailRegex
                ),
              ],
              error: 'forms.enterValidEmail',
            },
            {
              label: 'Address Line 1',
              name: 'address1',
              type: 'input',
              validation: [Validators.required],
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
              validation: [Validators.required],
            },
            {
              label: 'Postcode',
              name: 'postcode',
              type: 'input',
              validation: [Validators.required],
            },
            {
              label: 'Country',
              name: 'country',
              type: 'select',
              validation: [Validators.required],
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
              validation: [Validators.required],
            },
            {
              label: 'Event date',
              name: 'eventData',
              type: 'datepicker',
              validation: [
                Validators.required,
                CustomFormValidators.compareToCurrentDate('shouldBeGreater'),
              ],
              error: 'forms.dateInFuture',
            },
            {
              label: 'Venue name',
              name: 'eventVenue',
              type: 'input',
              validation: [Validators.required],
            },
            {
              label: 'Venue address',
              name: 'eventVenueAddress',
              type: 'input',
              validation: [Validators.required],
            },
            {
              label: 'Venue city',
              name: 'eventVenueCity',
              type: 'input',
              validation: [Validators.required],
            },
            {
              label: 'First name',
              name: 'firstName',
              type: 'input',
              validation: [Validators.required],
            },
            {
              label: 'Last name',
              name: 'lastName',
              type: 'input',
              validation: [Validators.required],
            },
            {
              label: 'Email',
              name: 'email',
              type: 'input',
              validation: [
                Validators.required,
                CustomFormValidators.regexValidator(
                  CustomFormValidators.emailRegex
                ),
              ],
              error: 'forms.enterValidEmail',
            },
            {
              label: 'Address Line 1',
              name: 'address1',
              type: 'input',
              validation: [Validators.required],
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
              validation: [Validators.required],
            },
            {
              label: 'City',
              name: 'city',
              type: 'input',
              validation: [Validators.required],
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
              validation: [Validators.required],
            },
            {
              label: 'First name',
              name: 'firstName',
              type: 'input',
              validation: [Validators.required],
            },
            {
              label: 'Last name',
              name: 'lastName',
              type: 'input',
              validation: [Validators.required],
            },
            {
              label: 'Age',
              name: 'age',
              type: 'input',
              validation: [Validators.required],
            },
            {
              label: 'Phone Number',
              name: 'phoneNumber',
              type: 'input',
              validation: [Validators.required],
            },
            {
              label: 'Email',
              name: 'email',
              type: 'input',
              validation: [
                Validators.required,
                CustomFormValidators.regexValidator(
                  CustomFormValidators.emailRegex
                ),
              ],
              error: 'forms.enterValidEmail',
            },
            {
              label: 'Address Line 1',
              name: 'address1',
              type: 'input',
              validation: [Validators.required],
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
              validation: [Validators.required],
            },
            {
              label: 'Postcode',
              name: 'postcode',
              type: 'input',
              validation: [Validators.required],
            },
            {
              label: 'Country',
              name: 'country',
              type: 'select',
              validation: [Validators.required],
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
  ];
}
