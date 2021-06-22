import { Injectable } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UserFormService } from '@spartacus/organization/administration/components';
import { DefaultFormValidators } from '@spartacus/dynamicforms';

@Injectable({
  providedIn: 'root',
})
export class FSUserFormService extends UserFormService {
  protected build() {
    super.build();
    this.form.setControl(
      'dateOfBirth',
      new FormControl('', [
        Validators.required,
        DefaultFormValidators.dateOfBirthValidator(18),
      ])
    );
  }
}
