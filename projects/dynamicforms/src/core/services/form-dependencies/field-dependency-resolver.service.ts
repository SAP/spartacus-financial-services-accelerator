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
    controlConfig: any,
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
          this.changeControlVisibility(controlConfig, false);
          this.changeControlEnabled(dependentControl, controlConfig, false);
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
            this.changeControlVisibility(controlConfig, true);
            this.changeControlEnabled(dependentControl, controlConfig, true);
          } else {
            this.changeControlVisibility(controlConfig, false);
            this.changeControlEnabled(dependentControl, controlConfig, false);
          }
        });
      }
    });
  }

  changeControlVisibility(controlConfig, visibility) {
    if (visibility) {
      controlConfig.hidden = false;
    } else {
      controlConfig.hidden = true;
    }
  }

  changeControlEnabled(dependentControl, controlConfig, enabled) {
    if (enabled) {
      if (dependentControl.controls && controlConfig.fieldConfigs) {
        controlConfig.fieldConfigs.forEach(childConfig => {
          childConfig.disabled ? dependentControl.controls[childConfig.name].disable()
          : dependentControl.controls[childConfig.name].enable();
        });
      } else {
        dependentControl.enable();
      }
    } else {
      dependentControl.disable();
    }
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
