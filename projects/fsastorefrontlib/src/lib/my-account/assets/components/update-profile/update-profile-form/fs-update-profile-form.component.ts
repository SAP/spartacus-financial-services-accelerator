import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UpdateProfileFormComponent } from '@spartacus/storefront';
import { CustomFormValidators } from '../../../../../cms-lib/util/validators/custom-form-validators';
import { FSUser } from '../../../../../occ-models';


@Component({
  selector: 'fsa-update-profile-form',
  templateUrl: './fs-update-profile-form.component.html',
})
export class FSUpdateProfileFormComponent extends UpdateProfileFormComponent implements OnInit {

  form = this.formBuilder.group({
    titleCode: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    dateOfBirth: ['', CustomFormValidators.dateOfBirthValidator(18)],
    contactInfos: this.formBuilder.group({
        code: [''],
        phoneNumber: ['', CustomFormValidators.regexValidator(CustomFormValidators.phoneNumberRegex)]
      }
    )
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
    this.form.controls.contactInfos.setValue(this.user.contactInfos[0]);
  }
}
