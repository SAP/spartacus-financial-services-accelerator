import { Injectable } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
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
      new UntypedFormControl('', [
        Validators.required,
        DefaultFormValidators.dateOfBirthValidator(18),
      ])
    );
  }
}
