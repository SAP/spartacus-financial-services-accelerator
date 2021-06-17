import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserFormService } from '@spartacus/organization/administration/components';
import { CustomFormValidators } from '@spartacus/storefront';
import { DefaultFormValidators } from '@spartacus/dynamicforms';

@Injectable({
  providedIn: 'root',
})
export class FSUserFormService extends UserFormService {
  protected build() {
    const form = new FormGroup({});
    form.setControl('customerId', new FormControl(''));
    form.setControl('titleCode', new FormControl(''));
    form.setControl('firstName', new FormControl('', Validators.required));
    form.setControl('lastName', new FormControl('', Validators.required));
    form.setControl(
      'dateOfBirth',
      new FormControl('', [
        Validators.required,
        DefaultFormValidators.dateOfBirthValidator(18),
      ])
    );
    form.setControl(
      'email',
      new FormControl('', [
        Validators.required,
        CustomFormValidators.emailValidator,
      ])
    );
    form.setControl(
      'orgUnit',
      new FormGroup({
        uid: new FormControl(undefined, Validators.required),
      })
    );
    form.setControl('roles', new FormArray([]));
    this.form = form;
  }
}
