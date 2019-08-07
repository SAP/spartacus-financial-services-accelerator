import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Validators, AbstractControl, ValidatorFn, FormGroup, FormControl } from '@angular/forms';

import { FormDefinition } from './dynamic-form/models/field-config.interface';
import { DynamicFormComponent } from './dynamic-form/containers/dynamic-form/dynamic-form.component';
import { CustomFormValidators } from 'projects/fsastorefrontlib/src/lib/cms-lib/util/validators/custom-form-validators';

@Component({
  selector: 'fsa-forms',
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
            type: 'title',
            label: 'General'
          },
          {
            type: 'datepicker',
            label: 'Coverage Start Date',
            name: 'coverageStartDate',
            validation: [Validators.required, CustomFormValidators.dateBiggerThanCurrentDate()],
          }
        ]
      },
    {
      groupName: 'Vehicle',
        priceAttributes: [
          {
            type: 'title',
            label: 'Vehicle'
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
            type: 'title',
            label: 'Main Driver'
          },
          {
            type: 'datepicker',
            label: 'Driver Date of Birth',
            name: 'driverDob',
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