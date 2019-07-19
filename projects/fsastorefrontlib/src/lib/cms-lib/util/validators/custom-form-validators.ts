import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomFormValidators {
    static passwordValidator(control: AbstractControl): ValidationErrors | null {
        const password = control.value as string;
        return password.match( /^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[!@#$%^*()_\-+{};:.,]).{6,}$/)
          ? null
          : { InvalidPassword: true };
      }

    static emailValidator(control: AbstractControl): ValidationErrors | null {
        const email = control.value as string;
        return email.match(
            // Email Standard RFC 5322:
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ // tslint:disable-line
        )
            ? null
            : { InvalidEmail: true };
    }

    static dateFormatValidator(control: AbstractControl): ValidationErrors | null {
        const date = control.value as string;
        return date.match(/^\\d{4}-\\d{2}-\\d{2}$/) ? null : { InvalidDate: true };
    }

    static dateOfBirthValidator(control: AbstractControl): ValidationErrors | null {
        const dateString = control.value as string;
        const userAge = new Date(dateString);
        const today = new Date();
        const age = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
        return userAge < age ? null : { InvalidDate: true };
    }
}
