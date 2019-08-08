import { Component, ViewChild, AfterViewInit, OnInit, Input } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormDefinition } from './dynamic-form/models/field-config.interface';
import { DynamicFormComponent } from './dynamic-form/containers/dynamic-form/dynamic-form.component';
import { CustomFormValidators } from 'projects/fsastorefrontlib/src/lib/cms-lib/util/validators/custom-form-validators';

@Component({
  selector: 'fsa-forms',
  templateUrl: './forms.component.html'
})
export class FormsComponent implements AfterViewInit, OnInit {
  @ViewChild(DynamicFormComponent, {static: false}) form: DynamicFormComponent;
  @Input()
  formCategoryCode: string;
  categoryConfig: FormDefinition;
  formData = {
    'priceAttributeList': [
    ],
  };

  config: FormDefinition[] = [{
    categoryCode: 'insurances_auto',
    formGroups: [
      {
        groupName: 'general',
        priceAttributes: [
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
            options: ['Monthly', 'Annually'],
            label: 'Payent Frequency',
            name: 'paymentFrequency',
          }
        ]
      },
    {
      groupName: 'vehicle',
        priceAttributes: [
          {
            type: 'title',
            label: 'Vehicle'
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
        priceAttributes: [
          {
            type: 'title',
            label: 'Main Driver'
          },
          {
            type: 'select',
            label: 'Driver Gender',
            name: 'driverGender',
            options: ['Male', 'Female']
          },
          {
            label: 'Submit',
            name: 'submit',
            type: 'button'
          }
        ]
      },
    ]
  },
  {
  categoryCode: 'insurances_travel',
  formGroups: [
    {
      groupName: 'trip',
      priceAttributes: [
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
          label: 'Age of Traveller',
          name: 'tripDetailsTravellerAges'
        }
      ]
    }
  ]}
];

  ngOnInit() {
    this.categoryConfig = this.config.filter( item => item.categoryCode === this.formCategoryCode)[0];
  }

  ngAfterViewInit() {
    let previousValid = this.form.valid;
    this.form.changes.subscribe(() => {
      if (this.form.valid !== previousValid) {
        previousValid = this.form.valid;
      }
    });
  }

  submit(formData: {[name: string]: any}) {
    Object.entries(formData).forEach(
      ([groupName, inputsObj]) => {
        const inputs = [];
        const groupObj = {
          'priceAttributesGroup': groupName,
          'priceAttributes': inputs
        };
        Object.entries(inputsObj).forEach( ([inputName, inputValue]) => {
          inputs.push({
            'key' : inputName,
            'value': inputValue
          });
        });
        this.formData.priceAttributeList.push(groupObj);
      });
      console.log(this.formData);
    }
}
