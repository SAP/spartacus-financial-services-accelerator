import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DefaultFormValidators } from '@fsa/dynamicforms';
import {
  AnonymousConsentsConfig,
  AnonymousConsentsService,
  GlobalMessageService,
  RoutingService,
  UserService,
} from '@spartacus/core';
import { RegisterComponent } from '@spartacus/storefront';
import { FSUserSignUp } from '../../../occ/occ-models';
import { DateConfig } from './../../../core/date-config/date-config';

@Component({
  selector: 'cx-fs-register',
  templateUrl: './register.component.html',
})
export class FSRegisterComponent extends RegisterComponent {
  constructor(
    protected userService: UserService,
    protected globalMessageService: GlobalMessageService,
    protected fb: FormBuilder,
    protected router: RoutingService,
    protected anonymousConsentsService: AnonymousConsentsService,
    protected anonymousConsentsConfig: AnonymousConsentsConfig,
    protected config: DateConfig
  ) {
    super(
      userService,
      globalMessageService,
      fb,
      router,
      anonymousConsentsService,
      anonymousConsentsConfig
    );
  }

  userRegistrationForm: FormGroup = this.fb.group(
    {
      titleCode: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: [
        '',
        DefaultFormValidators.regexValidator(
          DefaultFormValidators.phoneNumberRegex
        ),
      ],
      dateOfBirth: [
        '',
        [Validators.required, DefaultFormValidators.dateOfBirthValidator(18)],
      ],
      email: ['', [Validators.required, DefaultFormValidators.email]],
      password: [
        '',
        [
          Validators.required,
          DefaultFormValidators.regexValidator(
            DefaultFormValidators.passwordRegex
          ),
        ],
      ],
      passwordconf: ['', Validators.required],
      newsletter: [false],
      termsandconditions: [false, Validators.requiredTrue],
    },
    { validator: DefaultFormValidators.matchFields('password', 'passwordconf') }
  );

  collectDataFromRegisterForm(formData: any): FSUserSignUp {
    const {
      firstName,
      lastName,
      dateOfBirth,
      email,
      password,
      titleCode,
      phoneNumber,
    } = formData;

    return {
      firstName,
      lastName,
      dateOfBirth,
      uid: email.toLowerCase(),
      password,
      titleCode,
      phoneNumber,
    };
  }

  submitForm(): void {
    if (this.userRegistrationForm.valid) {
      this.registerUser();
    } else {
      this.userRegistrationForm.markAllAsTouched();
    }
  }

  registerUser(): void {
    this.userService.register(
      this.collectDataFromRegisterForm(this.userRegistrationForm.value)
    );
  }

  getDateFormat() {
    return this.config.date.format || '';
  }
}
