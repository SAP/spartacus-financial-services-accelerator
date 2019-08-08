import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UpdateProfileFormComponent } from '@spartacus/storefront';
import { CustomFormValidators } from 'projects/fsastorefrontlib/src/lib/cms-lib/util/validators/custom-form-validators';
import { FSUser } from 'projects/fsastorefrontlib/src/lib/occ-models';


@Component({
  selector: 'fsa-update-profile-form',
  templateUrl: './fs-update-profile-form.component.html',
})
export class FSUpdateProfileFormComponent extends UpdateProfileFormComponent {

  form = this.formBuilder.group({
    titleCode: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    dateOfBirth: ['', CustomFormValidators.dateOfBirthValidator(18)]
  });

  constructor(private formBuilder: FormBuilder) {
    super(formBuilder);
  }

  @Input()
  user: FSUser;

  @Output()
  submited = new EventEmitter<{ userUpdates: FSUser }>();

}
