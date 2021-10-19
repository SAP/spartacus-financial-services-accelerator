import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DefaultFormValidators } from '@spartacus/dynamicforms';
import {
  AnonymousConsentsConfig,
  AnonymousConsentsService,
  ANONYMOUS_CONSENT_STATUS,
  GlobalMessageService,
  RoutingService,
  AuthConfigService,
} from '@spartacus/core';
import { Subscription } from 'rxjs';
import { FSUserSignUp } from '../../../occ/occ-models';
import { DateConfig } from './../../../core/date-config/date-config';
import { RegisterComponent } from '@spartacus/user/profile/components';
import { UserRegisterFacade } from '@spartacus/user/profile/root';
import { CustomFormValidators } from '@spartacus/storefront';

@Component({
  selector: 'cx-fs-register',
  templateUrl: './register.component.html',
})
export class FSRegisterComponent extends RegisterComponent {
  constructor(
    protected userRegister: UserRegisterFacade,
    protected globalMessageService: GlobalMessageService,
    protected fb: FormBuilder,
    protected router: RoutingService,
    protected anonymousConsentsService: AnonymousConsentsService,
    protected anonymousConsentsConfig: AnonymousConsentsConfig,
    protected config: DateConfig,
    protected authConfigService: AuthConfigService
  ) {
    super(
      userRegister,
      globalMessageService,
      fb,
      router,
      anonymousConsentsService,
      anonymousConsentsConfig,
      authConfigService
    );
  }

  sub = new Subscription();
  consentGiven: boolean;

  registerForm = this.fb.group(
    {
      ...this.registerForm.controls,
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
    },
    {
      validators: CustomFormValidators.passwordsMustMatch(
        'password',
        'passwordconf'
      ),
    }
  );

  ngOnInit() {
    super.ngOnInit();
    this.sub.add(
      this.anonymousConsent$.subscribe(data => {
        this.consentGiven =
          data?.consent?.consentState === ANONYMOUS_CONSENT_STATUS.GIVEN;
      })
    );
    this.registerForm.get('newsletter').patchValue(this.consentGiven);
  }

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
}
