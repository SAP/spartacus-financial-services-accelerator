import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
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
import { RegisterComponent, RegisterComponentService } from '@spartacus/user/profile/components';
import { CustomFormValidators } from '@spartacus/storefront';

@Component({
  selector: 'cx-fs-register',
  templateUrl: './register.component.html',
})
export class FSRegisterComponent extends RegisterComponent implements OnInit {
  constructor(
    protected globalMessageService: GlobalMessageService,
    protected fb: UntypedFormBuilder,
    protected router: RoutingService,
    protected anonymousConsentsService: AnonymousConsentsService,
    protected anonymousConsentsConfig: AnonymousConsentsConfig,
    protected config: DateConfig,
    protected authConfigService: AuthConfigService,
    protected registerComponentService: RegisterComponentService,
  ) {
    super(
      globalMessageService,
      fb,
      router,
      anonymousConsentsService,
      anonymousConsentsConfig,
      authConfigService,
      registerComponentService
    );
  }

  sub = new Subscription();
  consentGiven: boolean;

  registerForm = this.fb.group(
    {
      ...this.registerForm.controls,
      titleCode: ['', Validators.required],
      phoneNumber: [
        '',
        DefaultFormValidators.regexValidator(
          DefaultFormValidators.phoneNumberRegex
        ),
      ],
      dateOfBirth: [
        '',
        [
          Validators.required,
          DefaultFormValidators.dateOfBirthValidator(18),
          Validators.min(1900),
        ],
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
