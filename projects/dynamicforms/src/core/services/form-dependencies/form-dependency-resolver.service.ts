import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
} from '@angular/forms';
import {
  DependencyFn,
  FieldConfig,
  FormDefinition,
} from './../../models/form-config.interface';
import { FormValidationService } from './../form-validation/form-validation.service';

@Injectable()
export class FormDependencyResolverService {
  constructor(
    protected formValidationService: FormValidationService,
    protected fb: FormBuilder
  ) {}

  formDefinition: FormDefinition;

  /**
   * Method used to enable/disable dependent control based on conditions defined at parent control
   *
   * @param dependencyConditions The conditions of parent control that need to be fullfilled
   * @param dependentControl The dependent field control for which dependencies are resolved
   * @param formGroup The form group which tracks value and validity of parent form controls
   * @param formDefinition The form definition
   */
  resolveFormControlDependencies(
    dependencyConditions: any,
    dependentControl: AbstractControl,
    formGroup: FormGroup,
    formConfig: FormDefinition
  ) {
    this.formDefinition = formConfig;
    dependencyConditions.forEach(parentDependancy => {
      const parentFormControl = this.getFormControlForCode(
        parentDependancy.name,
        formGroup
      );
      if (parentFormControl) {
        if (!parentFormControl.value) {
          dependentControl.disable();
        }
        parentFormControl.valueChanges.subscribe(fieldValue => {
          const dependancyValidations = this.getDependencyConditionsForFunction(
            parentDependancy
          );
          const parentFieldConfig = this.getFieldConfigForCode(
            parentDependancy.name
          );
          parentFieldConfig.value = fieldValue;
          const { disabled, value } = parentFieldConfig;
          const dependancyControl = this.fb.control(
            { disabled, value },
            dependancyValidations
          );
          dependancyControl.valid
            ? dependentControl.enable()
            : dependentControl.disable();
        });
      }
    });
  }

  /**
   * Method used to recursively find parent form control by its code in specified form group
   *
   * @param formControlCode The form control code
   * @param formGroup The form group
   */
  getFormControlForCode(
    formControlCode: string,
    formGroup: any
  ): AbstractControl {
    let abstractFormControl;
    for (const key of Object.keys(formGroup.controls)) {
      const nestedFormGroup = formGroup.get(key);
      if (key === formControlCode) {
        abstractFormControl = formGroup.get(key);
        break;
      } else if (nestedFormGroup instanceof FormGroup) {
        abstractFormControl = this.getFormControlForCode(
          formControlCode,
          nestedFormGroup
        );
        if (abstractFormControl !== undefined) {
          break;
        }
      }
    }
    return abstractFormControl;
  }

  getFieldConfigForCode(fieldName: string): FieldConfig {
    let fieldConfig: FieldConfig;
    if (this.formDefinition && this.formDefinition.formGroups) {
      this.formDefinition.formGroups.forEach(formGroup => {
        fieldConfig = formGroup.fieldConfigs.find(
          field => (field.name = fieldName)
        );
      });
    }
    return fieldConfig;
  }

  getDependencyConditionsForFunction(
    dependencyFn: DependencyFn
  ): ValidatorFn[] {
    const dependencyFunctions: ValidatorFn[] = [];
    if (dependencyFn && dependencyFn.conditions) {
      dependencyFn.conditions.forEach(conditionFunction => {
        dependencyFunctions.push(
          this.formValidationService.getValidatorForFunction(conditionFunction)
        );
      });
    }
    return dependencyFunctions;
  }
}
