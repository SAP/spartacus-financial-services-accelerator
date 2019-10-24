import { Validators } from '@angular/forms';
import { FormHelpers } from '../../../../../cms-lib/util/helpers/form-helpers';
import { CustomFormValidators } from '../../../../../cms-lib/util/validators/custom-form-validators';
import {
  FormDefinition,
  FormSubmitType,
} from '../dynamic-form/models/field-config.interface';

export class FormSampleConfigurations {
  static sampleConfigurations: FormDefinition[] = [
    {
      submitType: FormSubmitType.PRICING,
      formId: 'auto_details_form',
      formGroups: [
        {
          groupName: 'general',
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
              options: ['MONTHLY', 'YEARLY'],
              label: 'Payment Frequency',
              name: 'paymentFrequency',
              validation: [Validators.required],
            },
          ],
        },
        {
          groupName: 'vehicle',
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
              options: ['Personal', 'Business'],
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
              validation: [Validators.required],
            },
          ],
        },
        {
          groupName: 'mainDriver',
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
              options: ['Male', 'Female'],
              validation: [Validators.required],
            },
            {
              type: 'select',
              label: 'Driver Marital Status',
              name: 'driverMaritalStatus',
              options: ['Single', 'Married', 'Widowed'],
              validation: [Validators.required],
            },
            {
              type: 'select',
              label: 'Driver`s Category',
              name: 'driverCategory',
              options: ['Main'],
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
          groupName: 'additionalDrivers',
          fieldConfigs: [
            {
              type: 'title',
              label: 'Additional Driver(s)',
              name: 'additionalDrivers',
            },
            {
              type: 'select',
              options: ['0', '1', '2', '3', '4'],
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
          groupName: 'additional-driver-1',
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
              options: ['Male', 'Female'],
              validation: [Validators.required],
              hidden: true,
            },
            {
              type: 'select',
              label: 'Driver Marital Status',
              name: 'driverMaritalStatus',
              options: ['Single', 'Married', 'Widowed'],
              validation: [Validators.required],
              hidden: true,
            },
            {
              type: 'select',
              label: 'Driver`s Category',
              name: 'driverCategory',
              options: ['Occasional'],
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
          groupName: 'additional-driver-2',
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
              options: ['Male', 'Female'],
              validation: [Validators.required],
              hidden: true,
            },
            {
              type: 'select',
              label: 'Driver Marital Status',
              name: 'driverMaritalStatus',
              options: ['Single', 'Married', 'Widowed'],
              validation: [Validators.required],
              hidden: true,
            },
            {
              type: 'select',
              label: 'Driver`s Category',
              name: 'driverCategory',
              options: ['Occasional'],
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
          groupName: 'additional-driver-3',
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
              options: ['Male', 'Female'],
              validation: [Validators.required],
              hidden: true,
            },
            {
              type: 'select',
              label: 'Driver Marital Status',
              name: 'driverMaritalStatus',
              options: ['Single', 'Married', 'Widowed'],
              validation: [Validators.required],
              hidden: true,
            },
            {
              type: 'select',
              label: 'Driver`s Category',
              name: 'driverCategory',
              options: ['Occasional'],
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
          groupName: 'additional-driver-4',
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
              options: ['Male', 'Female'],
              validation: [Validators.required],
              hidden: true,
            },
            {
              type: 'select',
              label: 'Driver Marital Status',
              name: 'driverMaritalStatus',
              options: ['Single', 'Married', 'Widowed'],
              validation: [Validators.required],
              hidden: true,
            },
            {
              type: 'select',
              label: 'Driver`s Category',
              name: 'driverCategory',
              options: ['Occasional'],
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
          groupName: 'button',
          fieldConfigs: [
            {
              label: 'Find Prices',
              name: 'submit',
              type: 'button',
            },
          ],
        },
      ],
    },
    {
      submitType: FormSubmitType.PRICING,
      formId: 'trip_details_form',
      formGroups: [
        {
          groupName: 'trip',
          fieldConfigs: [
            {
              type: 'select',
              label: 'Destination',
              name: 'tripDestination',
              options: [
                'Europe',
                'Australia and New Zealand',
                'Worldwide (excluding USA, Canada, and the Caribbean)',
                'Worldwide (including USA, Canada and the Caribbean)',
                'UK',
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
              ],
              error: 'forms.dateInFuture',
            },
            {
              type: 'datepicker',
              label: 'End Date',
              name: 'tripEndDate',
              validation: [
                Validators.required,
                CustomFormValidators.compareToCurrentDate('shouldBeGreater'),
              ],
              error: 'forms.dateInFuture',
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
              options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
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
        {
          groupName: 'button',
          fieldConfigs: [
            {
              label: 'Find Prices',
              name: 'submit',
              type: 'button',
            },
          ],
        },
      ],
    },
    {
      formId: 'auto_claim_incident_info_form',
      formGroups: [
        {
          groupName: 'incidentInfo',
          fieldConfigs: [
            {
              type: 'select',
              options: [
                'Other Accident',
                'Glass Damage',
                'Collision',
                'Fire',
                'Theft',
                'Breakdown',
                'Accident',
              ],
              label: 'What happened?',
              name: 'whatHappened',
              validation: [Validators.required],
            },
            {
              label: 'When did it happen?',
              name: 'whenHappen',
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
                'Austira',
                'Canada',
                'France',
                'Germany',
                'Poland',
                'Serbia',
                'United States',
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
          groupName: 'incidentReport',
          fieldConfigs: [
            {
              label: 'Please describe how the accident occurred:',
              name: 'howItHappen',
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
          groupName: 'incidentReport',
          fieldConfigs: [
            {
              label: 'Who is responsible for the accident?',
              name: 'resposnible',
              type: 'input',
              validation: [Validators.required],
            },
            {
              label: 'Were the police informed?',
              name: 'policyInformed',
              type: 'radio',
              options: ['Yes', 'No'],
              validation: [Validators.required],
            },
            {
              label: 'Are there any witnesses we can contact?',
              name: 'anyWitnesses',
              type: 'radio',
              options: ['Yes', 'No'],
              validation: [Validators.required],
            },
          ],
        },
      ],
    },
  ];
}
