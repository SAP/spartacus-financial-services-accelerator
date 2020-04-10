import { AbstractControl, ValidationErrors, Validators } from '@angular/forms';

// @dynamic
export class DefaultFormValidators extends Validators {
  static passwordRegex = /^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[!@#$%^*()_\-+{};:.,]).{6,}$/;
  // tslint:disable-next-line:max-line-length
  static emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  static phoneNumberRegex = /^(?:\d{6,20})?$/;
  static postalCodeRegex = /^(?=.*[0-9])[A-Za-z0-9\s]+$/;

  static regexValidator(regex) {
    return (control: AbstractControl): ValidationErrors | null => {
      const field = control.value as string;
      if (field) {
        return field.match(regex) ? null : { InvalidFormat: true };
      }
      return null;
    };
  }

  static matchFields(controlName: string, controlName2: string) {
    return (control: AbstractControl): { NotEqual: boolean } => {
      if (control.get(controlName).value !== control.get(controlName2).value) {
        return { NotEqual: true };
      }
    };
  }

  static dateOfBirthValidator(minAge: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      const userAge = new Date(control.value as string);
      const today = new Date();
      const age = new Date(
        today.getFullYear() - minAge,
        today.getMonth(),
        today.getDate()
      );
      return userAge < age ? null : { InvalidDate: true };
    };
  }

  static compareToCurrentDate(operator) {
    return (control: AbstractControl): ValidationErrors | null => {
      const inputVal = new Date(control.value as string);
      const today = new Date();
      switch (operator) {
        case 'shouldBeGreater':
          return inputVal.getTime() > today.getTime()
            ? null
            : { InvalidDate: true };
        case 'shouldBeLess':
          return inputVal.getTime() < today.getTime()
            ? null
            : { InvalidDate: true };
      }
    };
  }

  static compareNumbers(comparisonField: string, operator: string) {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.parent) {
        const currentField = Number(control.value);
        const compareToField = Number(
          control.parent.controls[comparisonField].value
        );
        if (currentField && compareToField) {
          switch (operator) {
            case 'shouldBeGreater':
              return currentField > compareToField
                ? null
                : { valueConflict: true };
            case 'shouldBeLess':
              return compareToField > currentField
                ? null
                : { valueConflict: true };
          }
        }
      }
    };
  }

  static number(control: AbstractControl) {
    const field: string = control.value;
    const numberRegex = /^[0-9]*$/;
    if (field) {
      const valid = numberRegex.test(field);
      return valid
        ? null
        : {
            pattern: {
              requiredPattern: numberRegex,
              actualValue: control.value,
            },
          };
    }
    return null;
  }

  static compareDates(comparisonField: string, operator: string) {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.parent) {
        const currentField = Date.parse(control.value);
        const compareToField = Date.parse(
          control.parent.controls[comparisonField].value
        );
        if (currentField && compareToField) {
          switch (operator) {
            case 'shouldBeGreater':
              return compareToField > currentField
                ? null
                : { timeConflict: true };
            case 'shouldBeLess':
              return currentField > compareToField
                ? null
                : { timeConflict: true };
          }
        }
      }
    };
  }
}
