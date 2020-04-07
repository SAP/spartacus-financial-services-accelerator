import { Injectable } from '@angular/core';
import { ValidatorFn } from '@angular/forms';
import { DynamicFormsConfig } from '../../config';
import { FieldConfig } from './../../models/form-config.interface';

@Injectable()
export class FormValidationService {
  constructor(protected formConfig: DynamicFormsConfig) {}

  getValidatorsForField(fieldConfig: FieldConfig): ValidatorFn[] {
    const definedValidationFunctions: ValidatorFn[] = [];
    if (fieldConfig.validations) {
      fieldConfig.validations.forEach(validation => {
        const configValidation = this.formConfig.dynamicForms.validations[validation.name];
        if (configValidation && configValidation.function) {
          const validatorFunction = configValidation.function;
          if (validation.args) {
            const targetValidation = validatorFunction.apply(
              this,
              validation.args.map(arg => arg.value)
            );
            definedValidationFunctions.push(targetValidation);
          } else {
            definedValidationFunctions.push(validatorFunction);
          }
        }
      });
    }
    return definedValidationFunctions;
  }
}
