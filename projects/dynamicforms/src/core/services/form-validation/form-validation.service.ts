import { Injectable } from '@angular/core';
import { ValidatorFn } from '@angular/forms';
import { DynamicFormsConfig } from '../../config/form-config';
import { FieldConfig } from '../../models/form-config.interface';

@Injectable()
export class FormValidationService {
  constructor(protected formConfig: DynamicFormsConfig) {}

  getValidatorsForField(fieldConfig: FieldConfig): ValidatorFn[] {
    const validators: ValidatorFn[] = [];
    if (fieldConfig.validations) {
      fieldConfig.validations.forEach(validation => {
        const configValidator = this.formConfig.dynamicForms.validations[
          validation.name
        ];
        if (configValidator && configValidator.function) {
          if (validation.arguments) {
            validators.push(
              configValidator.function.apply(
                this,
                validation.arguments.map(arg => arg.value)
              )
            );
          } else {
            validators.push(configValidator.function);
          }
        }
      });
    }
    return validators;
  }
}
