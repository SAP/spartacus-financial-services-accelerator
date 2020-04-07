import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormConfig } from '../../config';
import { FieldConfig } from '../../models';

@Injectable()
export class FormBuilderService {
  constructor(protected fb: FormBuilder, protected formConfig: FormConfig,
  ) { }

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
    const validations = validation ? validation : this.defineValidationsForField(fieldConfig);
    return this.fb.control({ disabled, value }, validations);
  }


  defineValidationsForField(fieldConfig: FieldConfig) {
    if (fieldConfig.validations) {
      const definedValidationFunctions = [];
      fieldConfig.validations.forEach(validation => {
        const configValidation = this.formConfig.validations[validation.name];
        if (configValidation && configValidation.function) {
          const validatorFunction = configValidation.function;
          if (validation.args) {
            const targetValidation = validatorFunction.apply(this, validation.args.map(arg => arg.value));
            definedValidationFunctions.push(targetValidation);
          } else {
            definedValidationFunctions.push(validatorFunction);
          }
        }
      });
      return definedValidationFunctions;
    }
  }
}
