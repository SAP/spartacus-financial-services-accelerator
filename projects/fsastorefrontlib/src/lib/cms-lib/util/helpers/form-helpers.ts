import { AbstractControl, ValidationErrors } from '@angular/forms';

export class FormHelpers {
  // tslint:disable-next-line:max-line-length

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
          targetGroup = control.parent.parent.controls[name];
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
