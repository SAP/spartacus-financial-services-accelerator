import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FieldConfig } from '../../models';
import { FormValidationService } from '../form-validation/form-validation.service';

@Injectable()
export class FormBuilderService {
  constructor(
    protected fb: FormBuilder,
    protected formValidationService: FormValidationService
  ) {}

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

  createControl(fieldConfig: FieldConfig) {
    const { disabled, validation, value } = fieldConfig;
    // TODO: Replace attribute 'validation' with 'validations' in form sample configuration
    const validations = validation
      ? validation
      : this.formValidationService.getValidatorsForField(fieldConfig);
    return this.fb.control({ disabled, value }, validations);
  }
}
