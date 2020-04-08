import { Injectable } from '@angular/core';
import { ValidatorFn, Validators } from '@angular/forms';
import { DynamicFormsConfig } from '../../config/form-config';
import { FieldConfig } from '../../models/form-config.interface';

@Injectable()
export class FormValidationService {
  constructor(protected formConfig: DynamicFormsConfig) {}

  configValidators = this.formConfig.dynamicForms.validators;

  getValidatorsForField(fieldConfig: FieldConfig): ValidatorFn[] {
    const validators: ValidatorFn[] = [];
    if (fieldConfig.validations) {
      fieldConfig.validations.forEach(fieldValidation => {
        const validatorMapping = this.configValidators[fieldValidation.name];
        if (validatorMapping && validatorMapping.validator) {
          if (fieldValidation.arguments) {
            validators.push(
              validatorMapping.validator.apply(
                this,
                fieldValidation.arguments.map(arg => arg.value)
              )
            );
          } else {
            validators.push(validatorMapping.validator);
          }
        }
      });
    }
    if (fieldConfig.required) {
      validators.push(Validators.required);
    }
    return validators;
  }
}
