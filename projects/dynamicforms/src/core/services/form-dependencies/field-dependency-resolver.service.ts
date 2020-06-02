import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
} from '@angular/forms';
import { FormService } from '../form/form.service';
import { ControlDependency } from './../../models/form-config.interface';
import { FormValidationService } from './../form-validation/form-validation.service';
import { FieldConfig } from 'dynamicforms/src/core';

@Injectable()
export class FieldDependencyResolverService {
  constructor(
    protected formValidationService: FormValidationService,
    protected formService: FormService,
    protected fb: FormBuilder
  ) {}

  /**
   * Method used to enable/disable dependent control based on conditions defined at master control
   *
   * @param controlConfig The dependent field config for which dependencies are resolved
   * @param dependentControl The dependent field control for which dependencies are resolved
   * @param formGroup The form group which tracks value and validity of master form controls
   */
  resolveFormControlDependencies(
    controlConfig: FieldConfig,
    dependentControl: AbstractControl,
    formGroup: FormGroup
  ) {
    controlConfig.dependsOn.forEach(condition => {
      const masterFormControl = this.formService.getFormControlForCode(
        condition.controlName,
        formGroup
      );
      if (masterFormControl) {
        if (!masterFormControl.value) {
          controlConfig.hidden = true;
          dependentControl.disable();
        }
        masterFormControl.valueChanges.subscribe(fieldValue => {
          const dependencyValidations = this.geValidationsForCondition(
            condition
          );
          const dependancyControl = this.fb.control(
            { disabled: false, value: fieldValue },
            dependencyValidations
          );
          if (dependancyControl.valid) {
            controlConfig.hidden = false;
            dependentControl.enable();
          } else {
            controlConfig.hidden = true;
            dependentControl.disable();
          }
        });
      }
    });
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
