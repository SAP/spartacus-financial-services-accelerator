import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UpdateProfileFormComponent } from '@spartacus/storefront';
import { CustomFormValidators } from '../../../../../cms-lib/util/validators/custom-form-validators';
import { FSUser } from '../../../../../occ-models';

@Component({
  selector: 'fsa-update-profile-form',
  templateUrl: './fs-update-profile-form.component.html',
})
<<<<<<< HEAD
export class FSUpdateProfileFormComponent extends UpdateProfileFormComponent implements OnInit {

=======
export class FSUpdateProfileFormComponent extends UpdateProfileFormComponent {
>>>>>>> b87ddddb735de61ffa300231b26d202950bea90c
  form = this.formBuilder.group({
    titleCode: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    dateOfBirth: ['', CustomFormValidators.dateOfBirthValidator(18)],
<<<<<<< HEAD
    contactInfos: this.formBuilder.group({
        code: [''],
        phoneNumber: ['', CustomFormValidators.regexValidator(CustomFormValidators.phoneNumberRegex)]
      }
    )
=======
>>>>>>> b87ddddb735de61ffa300231b26d202950bea90c
  });

  constructor(private formBuilder: FormBuilder) {
    super(formBuilder);
  }

  @Input()
  user: FSUser;

  @Output()
  submited = new EventEmitter<{ userUpdates: FSUser }>();
<<<<<<< HEAD

  ngOnInit() {
    super.ngOnInit();
    this.form.controls.contactInfos.setValue(this.user.contactInfos[0]);
  }
=======
>>>>>>> b87ddddb735de61ffa300231b26d202950bea90c
}
