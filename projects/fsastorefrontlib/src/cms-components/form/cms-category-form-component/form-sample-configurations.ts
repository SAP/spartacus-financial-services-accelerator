import { DefaultFormValidators, FormDefinition } from '@fsa/dynamicforms';
import { FormHelpers } from '../../../shared/util/helpers/form-helpers';

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
              name: 'general',
              label: {
                default: 'General',
                en: 'General',
                de: 'DE General'
              },
            },
            {
              type: 'datepicker',
              label: {
                default: 'Coverage Start Date',
                en: 'Coverage Start Date',
                de: 'DE Coverage Start Date'
              },
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
              options: [
                { name: 'MONTHLY', label: 'Monthly' },
                { name: 'YEARLY', label: 'Yearly' },
              ],
              label: {
                default: 'Payment Frequency',
                en: 'Payment Frequency',
                de: 'DE value'
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
                default: 'Vehicle',
                en: 'Vehicle',
                de: 'DE Vehicle'
              },
              name: 'vehicle',
            },
            {
              type: 'select',
              jsonField: 'make',
              label: {
                default: 'Vehicle Make',
                en: 'Vehicle Make',
                de: 'DE value'
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
                default: 'Vehicle Model',
                en: 'Vehicle Model',
                de: 'DE value'
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
                default: 'Vehicle Type',
                en: 'Vehicle Type',
                de: 'DE value'
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
                default: 'Vehicle Year',
                en: 'Vehicle Year',
                de: 'DE value'
              },
              name: 'vehicleYear',
              required: true,
              validation: [DefaultFormValidators.required],
            },
            {
              type: 'input',
              label: {
                default: 'Annual Mileage',
                en: 'Annual Mileage',
                de: 'DE value'
              },
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
              label: {
                default: 'Vehicle Value',
                en: 'Vehicle Value',
                de: 'DE value'
              },
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
              label: {
                default: 'Vehicle Usage',
                en: 'Vehicle Usage',
                de: 'DE value'
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
                default: 'Vehicle Purchase Date',
                en: 'Vehicle Purchase Date',
                de: 'DE value'
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
              error: 'forms.afterVehicleManufacture',
            },
            {
              type: 'input',
              label: {
                default: 'Vehicle Owner Postal Code',
                en: 'Vehicle Owner Postal Code',
                de: 'DE value'
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
              error: 'forms.containAtLeastOneNumber',
            },
          ],
        },
        {
          groupCode: 'main-driver',
          fieldConfigs: [
            {
              type: 'title',
              label: {
                default: 'Main Driver',
                en: 'Main Driver',
                de: 'DE value'
              },
              name: 'main-driver',
            },
            {
              type: 'datepicker',
              label: {
                default: 'Driver Date of Birth',
                en: 'Driver Date of Birth',
                de: 'DE value'
              },
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
              label: {
                default: 'Driver Gender',
                en: 'Driver Gender',
                de: 'DE value'
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
                default: 'Driver Marital Status',
                en: 'Driver Marital Status',
                de: 'DE value'
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
                default: 'Driver`s Category',
                en: 'Driver`s Category',
                de: 'DE value'
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
                default: 'Driver Licence Date',
                en: 'Driver Licence Date',
                de: 'DE value'
              },
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
              label: {
                default: 'Additional Driver(s)',
                en: 'Additional Driver(s)',
                de: 'DE value'
              },
              name: 'additionalDrivers',
            },
            {
              type: 'select',
              label: {
                default: 'Number of Drivers',
                en: 'Number of Drivers',
                de: 'DE value'
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
                default: 'Additional Driver 1',
                en: 'Additional Driver 1',
                de: 'DE value'
              },
              name: 'additional-driver-1',
              hidden: true,
            },
            {
              type: 'datepicker',
              label: {
                default: 'Driver Date of Birth',
                en: 'Driver Date of Birth',
                de: 'DE value'
              },
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
              label: {
                default: 'Driver Gender',
                en: 'Driver Gender',
                de: 'DE value'
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
                default: 'Driver Marital Status',
                en: 'Driver Marital Status',
                de: 'DE value'
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
                default: 'Driver`s Category',
                en: 'Driver`s Category',
                de: 'DE value'
              },
              name: 'driverCategory',
              options: [{ name: 'Occasional', label: 'Occasional' }],
              disabled: true,
              hidden: true,
            },
            {
              type: 'datepicker',
              label: {
                default: 'Driver Licence Date',
                en: 'Driver Licence Date',
                de: 'DE value'
              },
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
              label: {
                default: 'Additional Driver 2',
                en: 'Additional Driver 2',
                de: 'DE value'
              },
              name: 'additional-driver-2',
              hidden: true,
            },
            {
              type: 'datepicker',
              label: {
                default: 'Driver Date of Birth',
                en: 'Driver Date of Birth',
                de: 'DE value'
              },
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
              label: {
                default: 'Driver Gender',
                en: 'Driver Gender',
                de: 'DE value'
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
                default: 'Driver Marital Status',
                en: 'Driver Marital Status',
                de: 'DE value'
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
                default: 'Driver`s Category',
                en: 'Driver`s Category',
                de: 'DE value'
              },
              name: 'driverCategory',
              options: [{ name: 'Occasional', label: 'Occasional' }],
              hidden: true,
            },
            {
              type: 'datepicker',
              label: {
                default: 'Driver Licence Date',
                en: 'Driver Licence Date',
                de: 'DE value'
              },
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
              label: {
                default: 'Additional Driver 3',
                en: 'Additional Driver 3',
                de: 'DE value'
              },
              name: 'additional-driver-3',
              hidden: true,
            },
            {
              type: 'datepicker',
              label: {
                default: 'Driver Date of Birth',
                en: 'Driver Date of Birth',
                de: 'DE value'
              },
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
              label: {
                default: 'Driver Gender',
                en: 'Driver Gender',
                de: 'DE value'
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
                default: 'Driver Marital Status',
                en: 'Driver Marital Status',
                de: 'DE value'
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
                default: 'Driver`s Category',
                en: 'Driver`s Category',
                de: 'DE value'
              },
              name: 'driverCategory',
              options: [{ name: 'Occasional', label: 'Occasional' }],
              hidden: true,
            },
            {
              type: 'datepicker',
              label: {
                default: 'Driver Licence Date',
                en: 'Driver Licence Date',
                de: 'DE value'
              },
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
              label: {
                default: 'Additional Driver 4',
                en: 'Additional Driver 4',
                de: 'DE value'
              },
              name: 'additional-driver-4',
              hidden: true,
            },
            {
              type: 'datepicker',
              label: {
                default: 'Driver Date of Birth',
                en: 'Driver Date of Birth',
                de: 'DE value'
              },
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
              label: {
                default: 'Driver Gender',
                en: 'Driver Gender',
                de: 'DE value'
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
                default: 'Driver Marital Status',
                en: 'Driver Marital Status',
                de: 'DE value'
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
                default: 'Driver`s Category',
                en: 'Driver`s Category',
                de: 'DE value'
              },
              name: 'driverCategory',
              options: [{ name: 'Occasional', label: 'Occasional' }],
              disabled: true,
              hidden: true,
            },
            {
              type: 'datepicker',
              label: {
                default: 'Driver Licence Date',
                en: 'Driver Licence Date',
                de: 'DE value'
              },
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
    }
  ];
}
