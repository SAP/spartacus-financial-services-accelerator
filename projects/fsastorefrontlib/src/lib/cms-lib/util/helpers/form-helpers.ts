import { AbstractControl, ValidationErrors } from '@angular/forms';

export class FormHelpers {
  // tslint:disable-next-line:max-line-length

  static shouldEnableDependentField(controlName: string, numberToCompare: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      const namesArray = Array(numberToCompare + 1);
      const newControlName = namesArray.fill(null).map((k, idx) => controlName + '-' + (idx + 1));
      newControlName.forEach((item, index) => {
        if (control.parent) {
          const targetControl = control.parent.controls[item];
          control.value > index ? targetControl.enable() : targetControl.disable();
        }
      });
      return null;
    };
  }
  static shouldEnableDependentGroup(groupName: string, numberToCompare: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      const namesArray = Array(numberToCompare + 1);
      const newGroupName = namesArray.fill(null).map((k, idx) => groupName + '-' + (idx + 1));
      let targetGroup;
      newGroupName.forEach((item, index) => {
        if (control.parent) {
          targetGroup = control.parent.parent.controls[item];
          if (targetGroup) {
            for (const key in targetGroup.controls) {
              if (targetGroup.controls.hasOwnProperty(key)) {
                control.value > index ? targetGroup.controls[key].enable() : targetGroup.controls[key].disable();
              }
            }
          }
        }
      });
      return null;
    };
  }
}
