import { DefaultFormValidators, FormDefinition } from '@fsa/dynamicforms';

export class FormSampleConfigurations {
  static sampleConfigurations: FormDefinition[] = [
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
