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
            label: 'General',
            name: 'general'
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
            label: 'Vehicle',
            name: 'vehicle'
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
        groupName: 'mainDriver',
        fieldConfigs: [
          {
            type: 'title',
            label: 'Main Driver',
            name: 'mainDriver'
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
        groupName: 'additionalDrivers',
        fieldConfigs: [
          {
            type: 'title',
            label: 'Additional Driver(s)',
            name: 'additionalDrivers'
          },
          {
            type: 'select',
            options: ['1', '2', '3', '4'],
            label: 'Number of Drivers',
            name: 'numberOfDrivers',
            validation: [FormHelpers.shouldEnableDependentGroup([
              'additionalDriver1',
              'additionalDriver2',
              'additionalDriver3',
              'additionalDriver4'
            ])]
          }
        ]
      },
      {
        groupName: 'additionalDriver1',
        fieldConfigs: [
          {
            type: 'title',
            label: 'Additional Driver 1',
            name: 'additionalDriver1',
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
            name: 'driverGender1',
            options: ['Male', 'Female'],
            validation: [Validators.required],
            hidden: true,
          },
          {
            type: 'select',
            label: 'Driver Marital Status',
            name: 'driverMaritalStatus1',
            options: ['Single', 'Married', 'Widowed'],
            validation: [Validators.required],
            hidden: true,
          },
          {
            type: 'select',
            label: 'Driver`s Category',
            name: 'driverCategory1',
            options: ['Occasional'],
            disabled: true,
            hidden: true,
          },
          {
            type: 'datepicker',
            label: 'Driver Licence Date',
            name: 'driverLicenceDate1',
            validation: [Validators.required, CustomFormValidators.compareToCurrentDate('shouldBeLess')],
            error: 'forms.dateInPast',
            hidden: true,
          }
        ]
      },
      {
        groupName: 'additionalDriver2',
        fieldConfigs: [
          {
            type: 'title',
            label: 'Additional Driver 2',
            name: 'additionalDriver2',
            hidden: true
          },
          {
            type: 'datepicker',
            label: 'Driver Date of Birth',
            name: 'driverDob2',
            validation: [Validators.required, CustomFormValidators.dateOfBirthValidator(18)],
            error: 'forms.dateOfBirthMinimumAge',
            hidden: true
          },
          {
            type: 'select',
            label: 'Driver Gender',
            name: 'driverGender2',
            options: ['Male', 'Female'],
            validation: [Validators.required],
            hidden: true,
          },
          {
            type: 'select',
            label: 'Driver Marital Status',
            name: 'driverMaritalStatus2',
            options: ['Single', 'Married', 'Widowed'],
            validation: [Validators.required],
            hidden: true
          },
          {
            type: 'select',
            label: 'Driver`s Category',
            name: 'driverCategory2',
            options: ['Occasional'],
            hidden: true
          },
          {
            type: 'datepicker',
            label: 'Driver Licence Date',
            name: 'driverLicenceDate2',
            validation: [Validators.required, CustomFormValidators.compareToCurrentDate('shouldBeLess')],
            error: 'forms.dateInPast',
            hidden: true
          }
        ]
      },
      {
        groupName: 'additionalDriver3',
        fieldConfigs: [
          {
            type: 'title',
            label: 'Additional Driver 3',
            name: 'additionalDriver3',
            hidden: true
          },
          {
            type: 'datepicker',
            label: 'Driver Date of Birth',
            name: 'driverDob3',
            validation: [Validators.required, CustomFormValidators.dateOfBirthValidator(18)],
            error: 'forms.dateOfBirthMinimumAge',
            hidden: true
          },
          {
            type: 'select',
            label: 'Driver Gender',
            name: 'driverGender3',
            options: ['Male', 'Female'],
            validation: [Validators.required],
            hidden: true
          },
          {
            type: 'select',
            label: 'Driver Marital Status',
            name: 'driverMaritalStatus3',
            options: ['Single', 'Married', 'Widowed'],
            validation: [Validators.required],
            hidden: true
          },
          {
            type: 'select',
            label: 'Driver`s Category',
            name: 'driverCategory3',
            options: ['Occasional'],
            hidden: true
          },
          {
            type: 'datepicker',
            label: 'Driver Licence Date',
            name: 'driverLicenceDate3',
            validation: [Validators.required, CustomFormValidators.compareToCurrentDate('shouldBeLess')],
            error: 'forms.dateInPast',
            hidden: true
          }
        ]
      },
      {
        groupName: 'additionalDriver4',
        fieldConfigs: [
          {
            type: 'title',
            label: 'Additional Driver 4',
            name: 'additionalDriver4',
            hidden: true
          },
          {
            type: 'datepicker',
            label: 'Driver Date of Birth',
            name: 'driverDob4',
            validation: [Validators.required, CustomFormValidators.dateOfBirthValidator(18)],
            error: 'forms.dateOfBirthMinimumAge',
            hidden: true
          },
          {
            type: 'select',
            label: 'Driver Gender',
            name: 'driverGender4',
            options: ['Male', 'Female'],
            validation: [Validators.required],
            hidden: true
          },
          {
            type: 'select',
            label: 'Driver Marital Status',
            name: 'driverMaritalStatus4',
            options: ['Single', 'Married', 'Widowed'],
            validation: [Validators.required],
            hidden: true
          },
          {
            type: 'select',
            label: 'Driver`s Category',
            name: 'driverCategory4',
            options: ['Occasional'],
            disabled: true,
            hidden: true
          },
          {
            type: 'datepicker',
            label: 'Driver Licence Date',
            name: 'driverLicenceDate4',
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
            label: 'Number of Travelers',
            name: 'Travellers',
            validation: [Validators.required,
            FormHelpers.shouldEnableDependentField([
              'tripDetailsTravelerAges1',
              'tripDetailsTravelerAges2',
              'tripDetailsTravelerAges3',
              'tripDetailsTravelerAges4',
              'tripDetailsTravelerAges5',
              'tripDetailsTravelerAges6',
              'tripDetailsTravelerAges7',
              'tripDetailsTravelerAges8',
              'tripDetailsTravelerAges9',
              'tripDetailsTravelerAges10'
            ])]
          },
          {
            type: 'input',
            label: 'Age of Traveller',
            name: 'tripDetailsTravelerAges1',
            validation: [Validators.required, Validators.max(150), Validators.pattern('^[0-9]*$')],
            error: 'forms.lessThan150',
          },
          {
            type: 'input',
            label: 'Age of Traveller 2',
            name: 'tripDetailsTravelerAges2',
            validation: [Validators.required, Validators.max(150), Validators.pattern('^[0-9]*$')],
            error: 'forms.lessThan150',
            hidden: true
          },
          {
            type: 'input',
            label: 'Age of Traveller 3',
            name: 'tripDetailsTravelerAges3',
            validation: [Validators.required, Validators.max(150), Validators.pattern('^[0-9]*$')],
            error: 'forms.lessThan150',
            hidden: true
          },
          {
            type: 'input',
            label: 'Age of Traveller 4',
            name: 'tripDetailsTravelerAges4',
            validation: [Validators.required, Validators.max(150), Validators.pattern('^[0-9]*$')],
            error: 'forms.lessThan150',
            hidden: true
          },
          {
            type: 'input',
            label: 'Age of Traveller 5',
            name: 'tripDetailsTravelerAges5',
            validation: [Validators.required, Validators.max(150), Validators.pattern('^[0-9]*$')],
            error: 'forms.lessThan150',
            hidden: true
          },
          {
            type: 'input',
            label: 'Age of Traveller 6',
            name: 'tripDetailsTravelerAges6',
            validation: [Validators.required, Validators.max(150), Validators.pattern('^[0-9]*$')],
            error: 'forms.lessThan150',
            hidden: true
          },
          {
            type: 'input',
            label: 'Age of Traveller 7',
            name: 'tripDetailsTravelerAges7',
            validation: [Validators.required, Validators.max(150), Validators.pattern('^[0-9]*$')],
            error: 'forms.lessThan150',
            hidden: true
          },
          {
            type: 'input',
            label: 'Age of Traveller 8',
            name: 'tripDetailsTravelerAges8',
            validation: [Validators.required, Validators.max(150), Validators.pattern('^[0-9]*$')],
            error: 'forms.lessThan150',
            hidden: true
          },
          {
            type: 'input',
            label: 'Age of Traveller 9',
            name: 'tripDetailsTravelerAges9',
            validation: [Validators.required, Validators.max(150), Validators.pattern('^[0-9]*$')],
            error: 'forms.lessThan150',
            hidden: true
          },
          {
            type: 'input',
            label: 'Age of Traveller 10',
            name: 'tripDetailsTravelerAges10',
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
