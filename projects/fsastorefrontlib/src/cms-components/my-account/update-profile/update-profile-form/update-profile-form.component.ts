import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DefaultFormValidators } from '@spartacus/dynamicforms';
import { UpdateProfileFormComponent } from '@spartacus/storefront';
import { FSUser } from '../../../../occ/occ-models';
import { DateConfig } from './../../../../core/date-config/date-config';

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

  constructor(
    protected formBuilder: FormBuilder,
    protected config: DateConfig
  ) {
    super(formBuilder);
  }

  @Input()
  user: FSUser;

  @Output()
  submitted = new EventEmitter<{ userUpdates: FSUser }>();

  ngOnInit() {
    if (this.user) {
      this.form.patchValue(this.user);
      if (this.user.contactInfos) {
        this.form.controls.contactInfos.setValue(this.user.contactInfos[0]);
      }
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.submitted.emit({
        userUpdates: { ...this.form.value },
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  getDateFormat() {
    return this.config.date.format || '';
  }
}
