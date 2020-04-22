import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
} from '@angular/forms';
import { DependencyFn } from './../../models/form-config.interface';
import { FormValidationService } from './../form-validation/form-validation.service';

@Injectable()
export class FormDependencyResolverService {
  constructor(
    protected formValidationService: FormValidationService,
    protected fb: FormBuilder
  ) {}

  /**
   * Method used to enable/disable dependent control based on conditions defined at parent control
   *
   * @param dependencyConditions The conditions of parent control that need to be fullfilled
   * @param dependentControl The dependent field control for which dependencies are resolved
   * @param formGroup The form group which tracks value and validity of parent form controls
   */
  resolveFormControlDependencies(
    dependencyConditions: DependencyFn[],
    dependentControl: AbstractControl,
    formGroup: FormGroup
  ) {
    dependencyConditions.forEach(condition => {
      const parentFormControl = this.getFormControlForCode(
        condition.name,
        formGroup
      );
      if (parentFormControl) {
        if (!parentFormControl.value) {
          dependentControl.disable();
        }
        parentFormControl.valueChanges.subscribe(fieldValue => {
          const dependancyValidations = this.getDependencyConditionsForFunction(
            condition
          );
          const dependancyControl = this.fb.control(
            { disabled: false, value: fieldValue },
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
