import { Injectable } from '@angular/core';
import { ValidatorFn, Validators } from '@angular/forms';
import { DefaultFormValidators } from '../../../util/validators/default-form-validators';
import { DynamicFormsConfig } from '../../config/form-config';
import {
  FieldConfig,
  ValidatorFunction,
} from './../../models/form-config.interface';

@Injectable()
export class FormValidationService {
  constructor(protected formConfig: DynamicFormsConfig) {}

  configValidators = this.formConfig.dynamicForms.validators;

  getValidatorsForField(fieldConfig: FieldConfig): ValidatorFn[] {
    const validators: ValidatorFn[] = [];
    if (fieldConfig) {
      if (fieldConfig.validations) {
        fieldConfig.validations.forEach(fieldValidation => {
          const validatorFn = this.getValidatorForFunction(fieldValidation);
          if (validatorFn) {
            validators.push(validatorFn);
          }
        });
      }
      if (fieldConfig.required) {
        validators.push(DefaultFormValidators.required);
      }
    }
    return validators;
  }

  getValidatorForFunction(validatorFunction: ValidatorFunction): ValidatorFn {
    const validatorMapping = this.configValidators[validatorFunction.name];
    if (validatorMapping && validatorMapping.validator) {
      if (validatorFunction.arguments) {
        return validatorMapping.validator.apply(
          this,
          validatorFunction.arguments.map(arg => arg.value)
        );
      } else {
        return validatorMapping.validator;
      }
    }
  }
}
