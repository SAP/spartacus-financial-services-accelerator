import {
  AbstractControl,
  ValidationErrors,
  Validators,
  UntypedFormGroup,
} from '@angular/forms';

// @dynamic
export class DefaultFormValidators extends Validators {
  static passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[!@#$%^*()_\-+{};:.,]).{6,}$/;
  static phoneNumberRegex = /^(?:\d{6,20})?$/;

  static checkEmptyValue(control: AbstractControl) {
    const valid = !!control.value?.trim();
    return valid ? null : { required: true };
  }

  static valueComparison(
    baseValue: number | Date,
    comparisonValue: number | Date,
    operator: string
  ) {
    if (baseValue && comparisonValue) {
      switch (operator) {
        case 'shouldBeGreater':
          return baseValue > comparisonValue
            ? null
            : { valueShouldBeGreater: true };
        case 'shouldBeLess':
          return baseValue < comparisonValue
            ? null
            : { valueShouldBeLess: true };
      }
    }
  }

  static getFormControlForCode(
    formControlCode: string,
    formGroup: UntypedFormGroup
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

  static regexValidator(regex) {
    return (control: AbstractControl): ValidationErrors | null => {
      const field = control.value as string;
      if (field) {
        if (regex === this.phoneNumberRegex) {
          return field.match(regex) ? null : { cxInvalidPhoneRegex: true };
        }
        return field.match(regex) ? null : { invalidFormat: true };
      }
      return null;
    };
  }

  static matchFields(controlName: string, controlName2: string) {
    return (control: AbstractControl): { notEqual: boolean } => {
      if (control.get(controlName).value !== control.get(controlName2).value) {
        return { notEqual: true };
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
      return userAge < age ? null : { invalidAge: true };
    };
  }

  static compareDOBtoAge(comparisonField: string, operator: string) {
    return (control: AbstractControl): ValidationErrors | null => {
      const userAge = new Date(control.value as string);
      const today = new Date();
      if (control.parent) {
        const compareToField = DefaultFormValidators.getFormControlForCode(
          comparisonField,
          <UntypedFormGroup>control.root
        );
        const targetAge = compareToField.value;
        const age = new Date(
          today.getFullYear() - targetAge,
          today.getMonth(),
          today.getDate()
        );
        return DefaultFormValidators.valueComparison(userAge, age, operator);
      }
    };
  }

  static compareAgeToDOB(comparisonField: string, operator: string) {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.parent) {
        const compareToField = DefaultFormValidators.getFormControlForCode(
          comparisonField,
          <UntypedFormGroup>control.root
        );
        const compareToFieldParsed = compareToField.value;
        const DOBtoYear = Number(
          new Date(compareToFieldParsed as string).getFullYear()
        );
        const currentYear = Number(new Date().getFullYear());
        const currentAge = Number(control.value);
        const calculatedAge = currentYear - DOBtoYear;
        return DefaultFormValidators.valueComparison(
          calculatedAge,
          currentAge,
          operator
        );
      }
    };
  }

  static compareNumbers(comparisonField: string, operator: string) {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.parent) {
        const currentField = Number(control.value);
        const compareToField = DefaultFormValidators.getFormControlForCode(
          comparisonField,
          <UntypedFormGroup>control.root
        );
        const compareToFieldParsed = Number(compareToField.value);
        return DefaultFormValidators.valueComparison(
          currentField,
          compareToFieldParsed,
          operator
        );
      }
    };
  }

  static compareDates(comparisonField: string, operator: string) {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.parent) {
        const currentField = Date.parse(control.value);
        const compareToField = DefaultFormValidators.getFormControlForCode(
          comparisonField,
          <UntypedFormGroup>control.root
        );
        const compareToFieldParsed = Date.parse(compareToField.value);
        return DefaultFormValidators.valueComparison(
          compareToFieldParsed,
          currentField,
          operator
        );
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
          return inputVal.getTime() === today.getTime()
            ? null
            : { dateShouldBeEqual: true };
        case 'shouldBeGreater':
          return inputVal.getTime() > today.getTime()
            ? null
            : { dateShouldBeGreater: true };
        case 'shouldBeLess':
          return inputVal.getTime() < today.getTime()
            ? null
            : { dateShouldBeLess: true };
        case 'shouldBeGreaterOrEqual':
          return inputVal.getTime() >= today.getTime()
            ? null
            : { dateShouldBeGreaterOrEqual: true };
        case 'shouldBeLessOrEqual':
          return inputVal.getTime() <= today.getTime()
            ? null
            : { dateShouldBeLessOrEqual: true };
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

  static alphanumeric(control: AbstractControl) {
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

  static shouldContainValue(value) {
    return (control: AbstractControl): ValidationErrors | null => {
      const valid = control.value.indexOf(value) !== -1;
      return valid ? null : { noValue: true };
    };
  }
}
