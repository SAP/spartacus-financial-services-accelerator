import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UpdateProfileFormComponent } from '@spartacus/storefront';
import { DefaultFormValidators } from '../../../../shared/util/validators/default-form-validators';
import { FSUser } from '../../../../occ/occ-models';

@Component({
  selector: 'fsa-update-profile-form',
  templateUrl: './fs-update-profile-form.component.html',
})
export class FSUpdateProfileFormComponent extends UpdateProfileFormComponent
  implements OnInit {
  form = this.formBuilder.group({
    titleCode: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    dateOfBirth: ['', DefaultFormValidators.dateOfBirthValidator(18)],
    contactInfos: this.formBuilder.group({
      code: [''],
      phoneNumber: [
        '',
        DefaultFormValidators.regexValidator(
          DefaultFormValidators.phoneNumberRegex
        ),
      ],
    }),
  });

  constructor(private formBuilder: FormBuilder) {
    super(formBuilder);
  }

  @Input()
  user: FSUser;

  @Output()
  submited = new EventEmitter<{ userUpdates: FSUser }>();

  ngOnInit() {
    super.ngOnInit();
    if (this.user && this.user.contactInfos) {
      this.form.controls.contactInfos.setValue(this.user.contactInfos[0]);
    }
  }
}
