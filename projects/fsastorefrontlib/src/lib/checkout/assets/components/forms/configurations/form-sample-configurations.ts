import { Validators } from '@angular/forms';
import { CustomFormValidators } from '../../../../../cms-lib/util/validators/custom-form-validators';
import { FormHelpers } from '../../../../../cms-lib/util/helpers/form-helpers';
import { FormDefinition, FormSubmitType } from '../dynamic-form/models/field-config.interface';

export class FormSampleConfigurations {
  static sampleConfigurations: FormDefinition[] = [{
    submitType: FormSubmitType.PRICING,
    categoryCode: 'insurances_auto',
    formGroups: [
      {
        groupName: 'general',
        fieldConfigs: [
          {
            type: 'title',
            label: 'General'
          },
          {
            type: 'datepicker',
            label: 'Coverage Start Date',
            name: 'coverageStartDate',
            validation: [Validators.required, CustomFormValidators.compareToCurrentDate('shouldBeGreater')],
            error: 'forms.dateInFuture'
          },
          {
            type: 'select',
            options: ['MONTHLY', 'YEARLY'],
            label: 'Payment Frequency',
            name: 'paymentFrequency',
            validation: [Validators.required]
          }
        ]
      },
      {
        groupName: 'vehicle',
        fieldConfigs: [
          {
            type: 'title',
            label: 'Vehicle'
          },
          {
            type: 'select',
            options: ['BMW'],
            label: 'Vehicle Make',
            name: 'vehicleMake',
            validation: [Validators.required]
          },
          {
            type: 'select',
            options: ['328'],
            label: 'Vehicle Model',
            name: 'vehicleModel',
            validation: [Validators.required]
          },
          {
            type: 'select',
            options: ['BMW3.2SUPER'],
            label: 'Vehicle Type',
            name: 'vehicleType',
            validation: [Validators.required]
          },
          {
            type: 'select',
            options: ['1940', '1939', '1938', '1937', '1936'],
            label: 'Vehicle Year',
            name: 'vehicleYear',
            validation: [Validators.required]
          },
          {
            type: 'input',
            label: 'Annual Mileage',
            name: 'vehicleAnnualMileage',
            validation: [Validators.required, Validators.max(100000), Validators.pattern('^[0-9]*$')],
            error: 'forms.lessThan100K'
          },
          {
            type: 'input',
            label: 'Vehicle Value',
            name: 'vehicleValue',
            validation: [Validators.required, Validators.min(3000), Validators.max(1000000), Validators.pattern('^[0-9]*$')],
            error: 'forms.vehicleValue'
          },
          {
            type: 'select',
            options: ['Personal', 'Business'],
            label: 'Vehicle Usage',
            name: 'vehicleUsage',
            validation: [Validators.required]
          },
          {
            type: 'datepicker',
            label: 'Vehicle Purchase Date',
            name: 'vehiclePurchaseDate',
            validation: [Validators.required, CustomFormValidators.compareToCurrentDate('shouldBeLess')],
            error: 'forms.dateInPast'
          },
          {
            type: 'input',
            label: 'Vehicle Owner Postal Code',
            name: 'vehicleOwnerPostalCode',
            validation: [Validators.required]
          },
        ]
      },
      {
        groupName: 'main-driver',
        fieldConfigs: [
          {
            type: 'title',
            label: 'Main Driver'
          },
          {
            type: 'datepicker',
            label: 'Driver Date of Birth',
            name: 'driverDob',
            validation: [Validators.required, CustomFormValidators.dateOfBirthValidator(18)],
            error: 'forms.dateOfBirthMinimumAge'
          },
          {
            type: 'select',
            label: 'Driver Gender',
            name: 'driverGender',
            options: ['Male', 'Female'],
            validation: [Validators.required]
          },
          {
            type: 'select',
            label: 'Driver Marital Status',
            name: 'driverMaritalStatus',
            options: ['Single', 'Married', 'Widowed'],
            validation: [Validators.required]
          },
          {
            type: 'select',
            label: 'Driver`s Category',
            name: 'driverCategory',
            options: ['Main'],
            disabled: true
          },
          {
            type: 'datepicker',
            label: 'Driver Licence Date',
            name: 'driverLicenceDate',
            validation: [Validators.required, CustomFormValidators.compareToCurrentDate('shouldBeLess')],
            error: 'forms.dateInPast'
          }
        ]
      },
      {
        groupName: 'additional-drivers',
        fieldConfigs: [
          {
            type: 'title',
            label: 'Additional Driver(s)'
          },
          {
            type: 'select',
            options: ['1', '2', '3', '4'],
            label: 'Number of Drivers',
            name: 'numberOfDrivers',
            validation: [FormHelpers.shouldEnableDependentGroup('additional-driver', 9)]
          }
        ]
      },
      {
        groupName: 'additional-driver-1',
        fieldConfigs: [
          {
            type: 'title',
            label: 'Additional Driver 1',
            name: 'driverName-1',
            hidden: true
          },
          {
            type: 'datepicker',
            label: 'Driver Date of Birth',
            name: 'driverDob-1',
            validation: [Validators.required, CustomFormValidators.dateOfBirthValidator(18)],
            error: 'forms.dateOfBirthMinimumAge',
            hidden: true,
          },
          {
            type: 'select',
            label: 'Driver Gender',
            name: 'driverGender-1',
            options: ['Male', 'Female'],
            validation: [Validators.required],
            hidden: true,
          },
          {
            type: 'select',
            label: 'Driver Marital Status',
            name: 'driverMaritalStatus-1',
            options: ['Single', 'Married', 'Widowed'],
            validation: [Validators.required],
            hidden: true,
          },
          {
            type: 'select',
            label: 'Driver`s Category',
            name: 'driverCategory-1',
            options: ['Occasional'],
            disabled: true,
            hidden: true,
          },
          {
            type: 'datepicker',
            label: 'Driver Licence Date',
            name: 'driverLicenceDate-1',
            validation: [Validators.required, CustomFormValidators.compareToCurrentDate('shouldBeLess')],
            error: 'forms.dateInPast',
            hidden: true,
          }
        ]
      },
      {
        groupName: 'additional-driver-2',
        fieldConfigs: [
          {
            type: 'title',
            label: 'Additional Driver 2',
            name: 'driverName-2',
            hidden: true
          },
          {
            type: 'datepicker',
            label: 'Driver Date of Birth',
            name: 'driverDob-2',
            validation: [Validators.required, CustomFormValidators.dateOfBirthValidator(18)],
            error: 'forms.dateOfBirthMinimumAge',
            hidden: true
          },
          {
            type: 'select',
            label: 'Driver Gender',
            name: 'driverGender-2',
            options: ['Male', 'Female'],
            validation: [Validators.required],
            hidden: true,
          },
          {
            type: 'select',
            label: 'Driver Marital Status',
            name: 'driverMaritalStatus-2',
            options: ['Single', 'Married', 'Widowed'],
            validation: [Validators.required],
            hidden: true
          },
          {
            type: 'select',
            label: 'Driver`s Category',
            name: 'driverCategory-2',
            options: ['Occasional'],
            hidden: true
          },
          {
            type: 'datepicker',
            label: 'Driver Licence Date',
            name: 'driverLicenceDate-2',
            validation: [Validators.required, CustomFormValidators.compareToCurrentDate('shouldBeLess')],
            error: 'forms.dateInPast',
            hidden: true
          }
        ]
      },
      {
        groupName: 'additional-driver-3',
        fieldConfigs: [
          {
            type: 'title',
            label: 'Additional Driver 3',
            name: 'driverName-3',
            hidden: true
          },
          {
            type: 'datepicker',
            label: 'Driver Date of Birth',
            name: 'driverDob-3',
            validation: [Validators.required, CustomFormValidators.dateOfBirthValidator(18)],
            error: 'forms.dateOfBirthMinimumAge',
            hidden: true
          },
          {
            type: 'select',
            label: 'Driver Gender',
            name: 'driverGender-3',
            options: ['Male', 'Female'],
            validation: [Validators.required],
            hidden: true
          },
          {
            type: 'select',
            label: 'Driver Marital Status',
            name: 'driverMaritalStatus-3',
            options: ['Single', 'Married', 'Widowed'],
            validation: [Validators.required],
            hidden: true
          },
          {
            type: 'select',
            label: 'Driver`s Category',
            name: 'driverCategory-3',
            options: ['Occasional'],
            hidden: true
          },
          {
            type: 'datepicker',
            label: 'Driver Licence Date',
            name: 'driverLicenceDate-3',
            validation: [Validators.required, CustomFormValidators.compareToCurrentDate('shouldBeLess')],
            error: 'forms.dateInPast',
            hidden: true
          }
        ]
      },
      {
        groupName: 'additional-driver-4',
        fieldConfigs: [
          {
            type: 'title',
            label: 'Additional Driver 4',
            name: 'driverName-4',
            hidden: true
          },
          {
            type: 'datepicker',
            label: 'Driver Date of Birth',
            name: 'driverDob-4',
            validation: [Validators.required, CustomFormValidators.dateOfBirthValidator(18)],
            error: 'forms.dateOfBirthMinimumAge',
            hidden: true
          },
          {
            type: 'select',
            label: 'Driver Gender',
            name: 'driverGender-4',
            options: ['Male', 'Female'],
            validation: [Validators.required],
            hidden: true
          },
          {
            type: 'select',
            label: 'Driver Marital Status',
            name: 'driverMaritalStatus-4',
            options: ['Single', 'Married', 'Widowed'],
            validation: [Validators.required],
            hidden: true
          },
          {
            type: 'select',
            label: 'Driver`s Category',
            name: 'driverCategory-4',
            options: ['Occasional'],
            disabled: true,
            hidden: true
          },
          {
            type: 'datepicker',
            label: 'Driver Licence Date',
            name: 'driverLicenceDate-4',
            validation: [Validators.required, CustomFormValidators.compareToCurrentDate('shouldBeLess')],
            error: 'forms.dateInPast',
            hidden: true
          }
        ]
      },
      {
        groupName: 'button',
        fieldConfigs: [
          {
            label: 'Find Prices',
            name: 'submit',
            type: 'button'
          }
        ]
      }
    ]
  },
  {
    submitType: FormSubmitType.PRICING,
    categoryCode: 'insurances_travel',
    formGroups: [
      {
        groupName: 'trip',
        fieldConfigs: [
          {
            type: 'select',
            label: 'Destination',
            name: 'tripDestination',
            options: [
              'Europe', 'Australia and New Zealand',
              'Worldwide(excluding USA, Canada and the Caribbean)',
              'Worldwide(including USA, Canada and the Caribbean)',
              'UK'
            ],
            validation: [Validators.required],
            error: 'forms.enterValidValue'
          },
          {
            type: 'datepicker',
            label: 'Start Date',
            name: 'tripStartDate',
            validation: [Validators.required, CustomFormValidators.compareToCurrentDate('shouldBeGreater')],
            error: 'forms.dateInFuture'
          },
          {
            type: 'datepicker',
            label: 'End Date',
            name: 'tripEndDate',
            validation: [Validators.required, CustomFormValidators.compareToCurrentDate('shouldBeGreater')],
            error: 'forms.dateInPast'
          },
          {
            type: 'input',
            label: 'Duration in Days',
            name: 'NoOfDays'
          },
          {
            type: 'input',
            label: 'Trip Cost',
            name: 'costOfTrip',
            validation: [Validators.required, Validators.min(0), Validators.max(1000000), Validators.pattern('^[0-9]*$')],
            error: 'forms.lessThan100K'
          },
          {
            type: 'select',
            options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
            label: 'Number of Traveller',
            name: 'Travellers',
            validation: [Validators.required,
            FormHelpers.shouldEnableDependentField('tripDetailsTravellerAges', 9)]
          },
          {
            type: 'input',
            label: 'Age of Traveller',
            name: 'tripDetailsTravellerAges-1',
            validation: [Validators.required, Validators.max(150), Validators.pattern('^[0-9]*$')],
            error: 'forms.lessThan150',
          },
          {
            type: 'input',
            label: 'Age of Traveller 2',
            name: 'tripDetailsTravellerAges-2',
            validation: [Validators.required, Validators.max(150), Validators.pattern('^[0-9]*$')],
            error: 'forms.lessThan150',
            hidden: true
          },
          {
            type: 'input',
            label: 'Age of Traveller 3',
            name: 'tripDetailsTravellerAges-3',
            validation: [Validators.required, Validators.max(150), Validators.pattern('^[0-9]*$')],
            error: 'forms.lessThan150',
            hidden: true
          },
          {
            type: 'input',
            label: 'Age of Traveller 4',
            name: 'tripDetailsTravellerAges-4',
            validation: [Validators.required, Validators.max(150), Validators.pattern('^[0-9]*$')],
            error: 'forms.lessThan150',
            hidden: true
          },
          {
            type: 'input',
            label: 'Age of Traveller 5',
            name: 'tripDetailsTravellerAges-5',
            validation: [Validators.required, Validators.max(150), Validators.pattern('^[0-9]*$')],
            error: 'forms.lessThan150',
            hidden: true
          },
          {
            type: 'input',
            label: 'Age of Traveller 6',
            name: 'tripDetailsTravellerAges-6',
            validation: [Validators.required, Validators.max(150), Validators.pattern('^[0-9]*$')],
            error: 'forms.lessThan150',
            hidden: true
          },
          {
            type: 'input',
            label: 'Age of Traveller 7',
            name: 'tripDetailsTravellerAges-7',
            validation: [Validators.required, Validators.max(150), Validators.pattern('^[0-9]*$')],
            error: 'forms.lessThan150',
            hidden: true
          },
          {
            type: 'input',
            label: 'Age of Traveller 8',
            name: 'tripDetailsTravellerAges-8',
            validation: [Validators.required, Validators.max(150), Validators.pattern('^[0-9]*$')],
            error: 'forms.lessThan150',
            hidden: true
          },
          {
            type: 'input',
            label: 'Age of Traveller 9',
            name: 'tripDetailsTravellerAges-9',
            validation: [Validators.required, Validators.max(150), Validators.pattern('^[0-9]*$')],
            error: 'forms.lessThan150',
            hidden: true
          },
          {
            type: 'input',
            label: 'Age of Traveller 10',
            name: 'tripDetailsTravellerAges-10',
            validation: [Validators.required, Validators.max(150), Validators.pattern('^[0-9]*$')],
            error: 'forms.lessThan150',
            hidden: true
          }
        ]
      },
      {
        groupName: 'button',
        fieldConfigs: [
          {
            label: 'Find Prices',
            name: 'submit',
            type: 'button'
          }
        ]
      }
    ]
  }
  ];
}
