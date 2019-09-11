import { Injectable } from '@angular/core';
import { FormBuilder, FormArray } from '@angular/forms';
import { FieldConfig } from './models/field-config.interface';

@Injectable()

export class FSFormService {

  constructor(private fb: FormBuilder) { }

  form = this.fb.group({});

  createForm(config) {
    config.formGroups.forEach(formGroup => {
      const newGroup = this.fb.group({});
      const groupName = formGroup.groupName;
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
}
