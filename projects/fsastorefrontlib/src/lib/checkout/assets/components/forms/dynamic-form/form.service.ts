import { Injectable } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { FieldConfig } from './models/field-config.interface';

@Injectable()

export class FSFormService {

  constructor(private fb: FormBuilder) { }

  form = this.fb.group({});
  newItems: FormArray;

  createForm(config) {
    config.formGroups.forEach(formGroup => {
      const groupName = formGroup.groupName;
      const newGroup = this.fb.group({});
      formGroup.fieldConfigs.forEach(input => {
        input.group = newGroup;
        if (input.type !== 'button' && input.type !== 'title') {
          newGroup.addControl(input.name, this.createControl(input));
        }
      });
      this.form.addControl(groupName, newGroup);
    });
    return this.form;
  }

  createControl(config: FieldConfig) {
    const { disabled, validation, value } = config;
    return this.fb.control({ disabled, value }, validation);
  }

  addControl() {
    this.form.addControl('hiddenItems', this.fb.array(['George Michael', 'Aretha Franklin']));
  }
}
