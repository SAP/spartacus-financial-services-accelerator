import { AbstractControl, ValidationErrors } from '@angular/forms';

// @dynamic
export class FormHelpers {
  static shouldEnableDependentField(controlNameArray: Array<string>) {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.parent) {
        controlNameArray.forEach((name, index) => {
          const targetControl = control.parent.controls[name];
          control.value > index ? targetControl.enable() : targetControl.disable();
        });
      }
      return null;
    };
  }

  static shouldEnableDependentGroup(groupName: Array<string>) {
    return (control: AbstractControl): ValidationErrors | null => {
      let targetGroup;
      groupName.forEach((name, index) => {
        if (control.parent) {
          if (control.parent.parent) {
            targetGroup = control.parent.parent.controls[name];
            if (targetGroup) {
              for (const key in targetGroup.controls) {
                if (targetGroup.controls.hasOwnProperty(key)) {
                  control.value > index ? targetGroup.controls[key].enable() : targetGroup.controls[key].disable();
                }
              }
            }
          }
        }
      });
      return null;
    };
  }
}
