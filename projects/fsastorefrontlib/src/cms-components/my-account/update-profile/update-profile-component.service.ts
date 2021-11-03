import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  form: FormGroup = new FormGroup({
    titleCode: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    dateOfBirth: new FormControl('', [
      DefaultFormValidators.required,
      DefaultFormValidators.dateOfBirthValidator(18),
      Validators.min(1900),
    ]),
    contactInfos: new FormGroup({
      code: new FormControl(''),
      phoneNumber: new FormControl(
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
      }
    }
  }
}
