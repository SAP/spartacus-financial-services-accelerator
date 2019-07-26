import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Validators, AbstractControl, ValidatorFn, FormGroup, FormControl } from '@angular/forms';

import { FieldConfig } from './dynamic-form/models/field-config.interface';
import { DynamicFormComponent } from './dynamic-form/containers/dynamic-form/dynamic-form.component';

@Component({
  selector: 'fsa-forms',
  styleUrls: ['forms.component.scss'],
  templateUrl: './forms.component.html'
})
export class FormsComponent implements AfterViewInit {
  @ViewChild(DynamicFormComponent, { static: false, read: false }) form: DynamicFormComponent;

  config: FieldConfig[] = [
    {
      type: 'input',
      label: 'Full name',
      name: 'name',
      placeholder: 'Enter your name',
      validation: [Validators.required, Validators.minLength(4)]
    },
    {
      type: 'select',
      label: 'Destination',
      name: 'destination',
      options: ['Europe', 'Asia', 'UK'],
      placeholder: 'Select an option',
      validation: [Validators.required]
    },
    {
      type: 'select',
      label: 'Number of travelers',
      name: 'numberOfTravelers',
      options: ['1', '2', '3'],
      placeholder: 'Select an option',
      validation: [Validators.required, this.customValidator('numberOfTravelers', 1)]
    },
    {
      type: 'input',
      label: 'Traveler 1 Age',
      name: 'traveler1',
      placeholder: 'Enter age of traveler 1',
      validation: [Validators.required],
      disabled: true,
      hidden: true
    },
    {
      type: 'input',
      label: 'Traveler 2 Age',
      name: 'traveler2',
      placeholder: 'Enter age of traveler 2',
      validation: [Validators.required],
      disabled: true,
      hidden: true
    },
    {
      label: 'Submit',
      name: 'submit',
      type: 'button'
    }
  ];
customValidator(controllName: string, limit: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const parent = control.parent;
    if (parent) {
        let type = parent.get(controllName);
        let controlValue = control.value;
        if (type.value === limit ) {
            console.log('radiii');
        }
    }
    return null;
    }
}
  ngAfterViewInit() {
    let previousValid = this.form.valid;
    this.form.changes.subscribe(() => {
      if (this.form.valid !== previousValid) {
        previousValid = this.form.valid;
        this.form.setDisabled('submit', !previousValid);
      }
    });

    this.form.setDisabled('submit', true);
    this.form.setValue('name', 'Donna Moore');
  }
  
  submit(value: {[name: string]: any}) {
    console.log(value);
  }
}
