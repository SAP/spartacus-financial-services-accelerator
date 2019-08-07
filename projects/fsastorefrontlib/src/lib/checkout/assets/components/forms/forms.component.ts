import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Validators, AbstractControl, ValidatorFn, FormGroup, FormControl } from '@angular/forms';

import { FormDefinition } from './dynamic-form/models/field-config.interface';
import { DynamicFormComponent } from './dynamic-form/containers/dynamic-form/dynamic-form.component';

@Component({
  selector: 'fsa-forms',
  styleUrls: ['forms.component.scss'],
  templateUrl: './forms.component.html'
})
export class FormsComponent implements AfterViewInit {
  @ViewChild(DynamicFormComponent, {static: false}) form: DynamicFormComponent;

  config: FormDefinition = {
    formGroups: [
      {
        groupName: 'General',
        priceAttributes: [
          {
            type: 'input',
            label: 'Payent Frequency',
            name: 'paymentFrequency',
          },
          {
            type: 'input',
            label: 'Coverage Start Date',
            name: 'coverageStartDate',
          }
        ]
      },
    {
      groupName: 'Vehicle',
        priceAttributes: [
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
          }
        ]
      },
      {
        groupName: 'Main Driver',
        priceAttributes: [
          {
            type: 'input',
            label: 'Driver Date of Birth',
            name: 'driverDob',
          },
          {
            type: 'select',
            label: 'Driver Gender',
            name: 'driverGender',
            options: ['Male', 'Female', 'wtf']
          },
          {
            label: 'Submit',
            name: 'submit',
            type: 'button'
          }
        ]
      },
    ]
  };
  ngAfterViewInit() {
    let previousValid = this.form.valid;
    this.form.changes.subscribe(() => {
      if (this.form.valid !== previousValid) {
        previousValid = this.form.valid;
      }
    });
  }

  submit(value: {[name: string]: any}) {
    console.log(value);
  }
}