import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FieldConfig } from '../../models';

@Injectable()
export class FormBuilderService {
  constructor(private fb: FormBuilder) {}

  createForm(config) {
    const form = this.fb.group({});
    config.formGroups.forEach(formGroup => {
      const controlGroup =
        formGroup.groupCode !== undefined ? this.fb.group({}) : form;
      formGroup.fieldConfigs.forEach(input => {
        input.group = controlGroup;
        controlGroup.addControl(input.name, this.createControl(input));
      });
      if (formGroup.groupCode !== undefined) {
        form.addControl(formGroup.groupCode, controlGroup);
      }
    });
    return form;
  }

  createControl(config: FieldConfig) {
    const { disabled, validation, value } = config;
    return this.fb.control({ disabled, value }, validation);
  }
}
