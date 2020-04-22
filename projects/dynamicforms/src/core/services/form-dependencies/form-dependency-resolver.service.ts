import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
} from '@angular/forms';
import { ControlDependency } from './../../models/form-config.interface';
import { FormValidationService } from './../form-validation/form-validation.service';

@Injectable()
export class FormDependencyResolverService {
  constructor(
    protected formValidationService: FormValidationService,
    protected fb: FormBuilder
  ) {}

  /**
   * Method used to enable/disable dependent control based on conditions defined at master control
   *
   * @param dependencyConditions The conditions of master control that need to be fullfilled
   * @param dependentControl The dependent field control for which dependencies are resolved
   * @param formGroup The form group which tracks value and validity of master form controls
   */
  resolveFormControlDependencies(
    dependencyConditions: ControlDependency[],
    dependentControl: AbstractControl,
    formGroup: FormGroup
  ) {
    dependencyConditions.forEach(condition => {
      const masterFormControl = this.getFormControlForCode(
        condition.controlName,
        formGroup
      );
      if (masterFormControl) {
        if (!masterFormControl.value) {
          dependentControl.disable();
        }
        masterFormControl.valueChanges.subscribe(fieldValue => {
          const dependancyValidations = this.geValidationsForCondition(
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
   * Method used to recursively find master form control by its code in specified form group
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

  geValidationsForCondition(dependencyFn: ControlDependency): ValidatorFn[] {
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
