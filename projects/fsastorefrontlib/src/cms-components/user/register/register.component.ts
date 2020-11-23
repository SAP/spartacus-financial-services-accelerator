import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DefaultFormValidators } from '@fsa/dynamicforms';
import {
  AnonymousConsentsConfig,
  AnonymousConsentsService,
  GlobalMessageService,
  RoutingService,
  UserService,
  AuthConfigService,
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
    protected config: DateConfig,
    protected authConfigService: AuthConfigService
  ) {
    super(
      userService,
      globalMessageService,
      fb,
      router,
      anonymousConsentsService,
      anonymousConsentsConfig,
      authConfigService
    );
  }
  registerForm: FormGroup = this.fb.group(
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
      newsletter: new FormControl({
        value: false,
        disabled: this.isFSConsentRequired(),
      }),
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

  getDateFormat() {
    return this.config.date.format || '';
  }

  protected isFSConsentRequired(): boolean {
    const {
      requiredConsents,
      registerConsent,
    } = this.anonymousConsentsConfig?.anonymousConsents;

    if (requiredConsents && registerConsent) {
      return requiredConsents.includes(registerConsent);
    }

    return false;
  }
}
