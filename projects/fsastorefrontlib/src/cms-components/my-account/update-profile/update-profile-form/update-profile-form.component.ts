import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DefaultFormValidators } from '@fsa/dynamicforms';
import { UpdateProfileFormComponent } from '@spartacus/storefront';
import { FSUser } from '../../../../occ/occ-models';

@Component({
  selector: 'cx-fs-update-profile-form',
  templateUrl: './update-profile-form.component.html',
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

  constructor(protected formBuilder: FormBuilder) {
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
