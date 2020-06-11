import { AbstractControl, ValidationErrors, Validators } from '@angular/forms';

// @dynamic
export class DefaultFormValidators extends Validators {
  static passwordRegex = /^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[!@#$%^*()_\-+{};:.,]).{6,}$/;
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

  static youngerThanValidator(controlName: string) {
    return (control: AbstractControl): ValidationErrors | null => {
      const userAge = new Date(control.value as string);
      const today = new Date();
      if (
        control.parent &&
        control.parent.controls &&
        control.parent.controls[controlName]
      ) {
        const retirementAge = control.parent.controls[controlName].value;
        const age = new Date(
          today.getFullYear() - retirementAge,
          today.getMonth(),
          today.getDate()
        );
        return userAge > age ? null : { InvalidDate: true };
      }
    };
  }

  static compareToCurrentDate(operator) {
    return (control: AbstractControl): ValidationErrors | null => {
      const inputVal = new Date(control.value as string);
      inputVal.setHours(0, 0, 0, 0);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      switch (operator) {
        case 'shouldBeEqual':
          console.log(today);
          return inputVal.getTime() === today.getTime()
            ? null
            : { InvalidDate: true };
        case 'shouldBeGreater':
          return inputVal.getTime() > today.getTime()
            ? null
            : { InvalidDate: true };
        case 'shouldBeLess':
          return inputVal.getTime() < today.getTime()
            ? null
            : { InvalidDate: true };
        case 'shouldBeGreaterOrEqual':
          return inputVal.getTime() >= today.getTime()
            ? null
            : { InvalidDate: true };
        case 'shouldBeLessOrEqual':
          console.log(today);
          return inputVal.getTime() <= today.getTime()
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

  static postalCode(control: AbstractControl) {
    const field: string = control.value;
    const postalCodeRegex = /^(?=.*[0-9])[A-Za-z0-9\s]+$/;
    if (field) {
      const valid = postalCodeRegex.test(field);
      return valid
        ? null
        : {
            pattern: {
              requiredPattern: postalCodeRegex,
              actualValue: control.value,
            },
          };
    }
    return null;
  }

  static checkValue(allowedValues: string[]) {
    return (control: AbstractControl): ValidationErrors | null => {
      const valid = allowedValues.indexOf(control.value) !== -1;
      return valid ? null : { valueConflict: true };
    };
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
