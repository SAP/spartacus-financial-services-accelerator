import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FieldConfig } from './models/field-config.interface';

@Injectable()

export class FSFormService {

  constructor(private fb: FormBuilder) { }

  form = this.fb.group({});

  createForm(config) {
    let newGroup;
    let groupName;
    config.formGroups.forEach(formGroup => {
      newGroup = this.fb.group({});
      groupName = formGroup.groupName;
      formGroup.fieldConfigs.forEach(input => {
        input.group = newGroup;
        newGroup.addControl(input.name, this.createControl(input));
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
