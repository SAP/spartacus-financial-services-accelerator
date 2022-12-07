import { Injectable } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { GlobalMessageService } from '@spartacus/core';
import { DefaultFormValidators } from '@spartacus/dynamicforms';
import { UpdateProfileComponentService } from '@spartacus/user/profile/components';
import { UserProfileFacade } from '@spartacus/user/profile/root';
import { FSUser } from './../../../occ/occ-models';

@Injectable()
export class FSUpdateProfileComponentService extends UpdateProfileComponentService {
  constructor(
    protected userProfile: UserProfileFacade,
    protected globalMessageService: GlobalMessageService
  ) {
    super(userProfile, globalMessageService);
  }

  form: UntypedFormGroup = new UntypedFormGroup({
    titleCode: new UntypedFormControl('', Validators.required),
    firstName: new UntypedFormControl('', Validators.required),
    lastName: new UntypedFormControl('', Validators.required),
    dateOfBirth: new UntypedFormControl('', [
      DefaultFormValidators.required,
      DefaultFormValidators.dateOfBirthValidator(18),
      Validators.min(1900),
    ]),
    contactInfos: new UntypedFormGroup({
      code: new UntypedFormControl(''),
      phoneNumber: new UntypedFormControl(
        '',
        DefaultFormValidators.regexValidator(
          DefaultFormValidators.phoneNumberRegex
        )
      ),
    }),
  });

  patchForm(user: FSUser) {
    if (user.uid) {
      this.form.patchValue(user);
      if (user.contactInfos) {
        this.form.controls.contactInfos.setValue(user.contactInfos[0]);
      } else {
        this.form.controls.contactInfos.reset();
      }
    }
  }
}
