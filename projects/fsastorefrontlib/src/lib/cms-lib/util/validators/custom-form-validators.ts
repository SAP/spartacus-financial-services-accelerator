import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomFormValidators {
    static passwordRegex = /^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[!@#$%^*()_\-+{};:.,]).{6,}$/;
    // tslint:disable-next-line:max-line-length
    static emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    static regexValidator(formattRegex) {
        return (control: AbstractControl): ValidationErrors | null => {
            const date = control.value as string;
            return date.match(formattRegex) ? null : { InvalidFormat: true };
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
            const dateString = control.value as string;
            const userAge = new Date(dateString);
            const today = new Date();
            const age = new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate());
            return userAge < age ? null : { InvalidDate: true };
        };
    }
}
