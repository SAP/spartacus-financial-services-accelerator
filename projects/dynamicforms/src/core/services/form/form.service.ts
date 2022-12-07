import { Injectable } from '@angular/core';
import { AbstractControl, UntypedFormGroup } from '@angular/forms';

@Injectable()
export class FormService {
  constructor() {}

  /**
   * Method used to recursively find form control by its code in specified form group
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
      } else if (nestedFormGroup instanceof UntypedFormGroup) {
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
}
