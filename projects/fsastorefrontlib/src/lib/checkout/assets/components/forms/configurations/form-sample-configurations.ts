import { FormDefinition, FormSubmitType } from '../dynamic-form/models/field-config.interface';
import { CustomFormValidators } from '../../../../../cms-lib/util/validators/custom-form-validators';
import { Validators } from '@angular/forms';

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
              },
              {
                type: 'select',
                options: ['MONTHLY', 'YEARLY'],
                label: 'Payment Frequency',
                name: 'paymentFrequency',
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
                name: 'vehicleMake'
              },
              {
                type: 'select',
                options: ['328'],
                label: 'Vehicle Model',
                name: 'vehicleModel',
                validation: [Validators.required],
              },
              {
                type: 'select',
                options: ['BMW3.2SUPER'],
                label: 'Vehicle Type',
                name: 'vehicleType',
                validation: [Validators.required],
              },
              {
                type: 'select',
                options: ['1940', '1939', '1938', '1937', '1936'],
                label: 'Vehicle Year',
                name: 'vehicleYear',
                validation: [Validators.required],
              },
              {
                type: 'input',
                label: 'Annual Mileage',
                name: 'vehicleAnnualMileage',
                validation: [Validators.required],
              },
              {
                type: 'input',
                label: 'Vehicle Value',
                name: 'vehicleValue',
                validation: [Validators.required],
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
                validation: [Validators.required],
              },
              {
                type: 'input',
                label: 'Vehicle Owner Postal Code',
                name: 'vehicleOwnerPostalCode',
                validation: [Validators.required],
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
                validation: [ CustomFormValidators.dateOfBirthValidator(18)]
              },
              {
                type: 'select',
                label: 'Driver Gender',
                name: 'driverGender',
                options: ['Male', 'Female', 'wtf']
              },
              {
                type: 'select',
                label: 'Driver Marital Status',
                name: 'driverMaritalStatus',
                options: ['Single', 'Married', 'Widowed']
              },
              {
                type: 'select',
                label: 'Driver`s Category',
                name: 'driverCategory',
                options: ['Main'],
                disabled: true,
                placeholder: 'Main'
              },
              {
                type: 'datepicker',
                label: 'Driver Licence Date',
                name: 'driverLicenceDate',
              },
              {
                label: 'Find Prices',
                name: 'submit',
                type: 'button'
              }
            ]
          },
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
              options: ['Europe', 'UK']
            },
            {
              type: 'datepicker',
              label: 'Start Date',
              name: 'tripStartDate',
              validation: [Validators.required, CustomFormValidators.compareToCurrentDate('shouldBeGreater')],
            },
            {
              type: 'datepicker',
              label: 'End Date',
              name: 'tripEndDate',
              validation: [Validators.required, CustomFormValidators.compareToCurrentDate('shouldBeGreater')],
            },
            {
              type: 'input',
              label: 'Trip Cost',
              name: 'costOfTrip'
            },
            {
              type: 'input',
              label: 'Minimum number of days before departure',
              name: 'NoOfDays'
            },  
            {
              type: 'input',
              label: 'Number of Traveller',
              name: 'Travellers'
            },
            {
              type: 'input',
              label: 'Age of Traveller',
              name: 'tripDetailsTravellerAges'
            },
            {
              label: 'Find Prices',
              name: 'submit',
              type: 'button'
            }
          ]
        }
      ]}
    ];
}
