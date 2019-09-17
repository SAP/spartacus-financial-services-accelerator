import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FieldConfig } from './models/field-config.interface';

@Injectable()

export class FSFormService {

  constructor(private fb: FormBuilder) { }

  createForm(config) {
    const form = this.fb.group({});
    let newGroup;
    let groupName;
    config.formGroups.forEach(formGroup => {
      newGroup = this.fb.group({});
      groupName = formGroup.groupName;
      formGroup.fieldConfigs.forEach(input => {
        input.group = newGroup;
        newGroup.addControl(input.name, this.createControl(input));
      });
      form.addControl(groupName, newGroup);
    });
    return form;
  }

  createControl(config: FieldConfig) {
    const { disabled, validation, value } = config;
    return this.fb.control({ disabled, value }, validation);
  }
}
