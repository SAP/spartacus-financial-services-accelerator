import { AbstractControl, ValidationErrors } from '@angular/forms';

// @dynamic
export class FormHelpers {
  static shouldEnableDependentField(controlNameArray: Array<string>) {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.parent) {
        controlNameArray.forEach((name, index) => {
          const targetControl = control.parent.controls[name];
          // control.value > index
          //   ? targetControl.enable()
          //   : targetControl.disable();
            if (control.value > index) {
              targetControl.enable();
              console.log(targetControl);
            } else {
              targetControl.disable();
            }
        });
      }
      return null;
    };
  }

  static shouldEnableDependentGroup(groupName: Array<string>) {
    return (control: AbstractControl): ValidationErrors | null => {
      let targetGroup;
      groupName.forEach((name, index) => {
        if (
          control.parent &&
          control.parent.parent &&
          control.parent.parent.controls[name]
        ) {
          targetGroup = control.parent.parent.controls[name];
          for (const key in targetGroup.controls) {
            if (targetGroup.controls.hasOwnProperty(key)) {
              control.value > index
                ? targetGroup.controls[key].enable()
                : targetGroup.controls[key].disable();
            }
          }
        }
      });
      return null;
    };
  }
}
