import { Component } from '@angular/core';
import { RegisterComponent } from '@spartacus/storefront';
import {
  UserService,
  AuthService,
  AuthRedirectService,
  GlobalMessageService,
  RoutingService,
  FeatureConfigService,
  AnonymousConsentsService,
  AnonymousConsentsConfig,
} from '@spartacus/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { FSUserSignUp } from '../../../occ/occ-models';
import { DefaultFormValidators } from '@fsa/dynamicforms';

@Component({
  selector: 'fsa-register',
  templateUrl: './fs-register.component.html',
})
export class FSRegisterComponent extends RegisterComponent {
  constructor(
    protected auth: AuthService,
    protected authRedirectService: AuthRedirectService,
    protected userService: UserService,
    protected globalMessageService: GlobalMessageService,
    protected fb: FormBuilder,
    protected router?: RoutingService,
    protected featureConfig?: FeatureConfigService,
    protected anonymousConsentsService?: AnonymousConsentsService,
    protected anonymousConsentsConfig?: AnonymousConsentsConfig
  ) {
    super(
      auth,
      authRedirectService,
      userService,
      globalMessageService,
      fb,
      router,
      featureConfig,
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
      email: [
        '',
        [
          Validators.required,
          DefaultFormValidators.regexValidator(
            DefaultFormValidators.emailRegex
          ),
        ],
      ],
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
}
