import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
} from '@angular/forms';
import { filter, tap } from 'rxjs/operators';
import { FormService } from '../form/form.service';
import {
  ControlDependency,
  DynamicFormGroup,
} from './../../models/form-config.interface';
import { FormValidationService } from './../form-validation/form-validation.service';

@Injectable()
export class FieldDependencyResolverService {
  constructor(
    protected formValidationService: FormValidationService,
    protected formService: FormService,
    protected fb: FormBuilder
  ) {}

  /**
   * Method used to enable/disable dependent control based on conditions defined at main control
   *
   * @param controlConfig The dependent field config for which dependencies are resolved
   * @param dependentControl The dependent field control for which dependencies are resolved
   * @param formGroup The form group which tracks value and validity of main form controls
   */
  resolveFormControlDependencies(
    controlConfig: any,
    dependentControl: AbstractControl,
    formGroup: FormGroup
  ) {
    controlConfig.dependsOn.controls.forEach(condition => {
      const mainFormControl = this.formService.getFormControlForCode(
        condition.controlName,
        formGroup
      );
      if (mainFormControl) {
        if (!mainFormControl.value) {
          if (controlConfig.dependsOn.hide === true) {
            controlConfig.hidden = true;
          }
          this.changeControlEnabled(dependentControl, controlConfig, false);
        }
        mainFormControl.valueChanges
          .pipe(
            filter(fieldValue => !!fieldValue),
            tap(fieldValue => {
              const dependencyValidations = this.geValidationsForCondition(
                condition
              );
              const dependancyControl = this.fb.control(
                { disabled: false, value: fieldValue },
                dependencyValidations
              );
              if (dependancyControl.valid) {
                if (controlConfig.dependsOn.hide === true) {
                  controlConfig.hidden = false;
                  console.log(controlConfig);
                }
                this.changeControlEnabled(
                  dependentControl,
                  controlConfig,
                  true
                );
              } else {
                if (controlConfig.dependsOn.hide === true) {
                  controlConfig.hidden = true;
                }
                this.changeControlEnabled(
                  dependentControl,
                  controlConfig,
                  false
                );
              }
            })
          )
          .subscribe();
      }
    });
  }

  /**
   * Method used to enable/disable control based on input parameter and form configuration value.
   * In case control is from group, check is done for nested controls to see if any of them has configuration set to disabled.
   * If any field config has disabled property set to true, dynamic condition cannot change that.
   *
   * @param dependentControl The dependent field control for which dependencies are resolved
   * @param controlConfig The dependent field config for which dependencies are resolved (control or group)
   * @param enabled The enabled flag which indicates if parent control conditions are met.
   */
  changeControlEnabled(
    dependentControl: any,
    controlConfig: DynamicFormGroup,
    enabled: boolean
  ) {
    if (enabled) {
      if (dependentControl.controls && controlConfig.fieldConfigs) {
        controlConfig.fieldConfigs.forEach(childConfig => {
          childConfig.disabled
            ? dependentControl.controls[childConfig.name].disable()
            : dependentControl.controls[childConfig.name].enable();
        });
      } else {
        dependentControl.enable();
      }
    } else {
      dependentControl.disable();
    }
    dependentControl.updateValueAndValidity({ emitEvent: false });
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
