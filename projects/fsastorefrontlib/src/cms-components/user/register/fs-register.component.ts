import { Component } from '@angular/core';
import { RegisterComponent } from '@spartacus/storefront';
import {
  UserService,
  AuthService,
  AuthRedirectService,
  GlobalMessageService,
} from '@spartacus/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { FSUserSignUp } from '../../../occ/occ-models';
import { CustomFormValidators } from '../../../shared/util/validators/custom-form-validators';

@Component({
  selector: 'fsa-register',
  templateUrl: './fs-register.component.html',
})
export class FSRegisterComponent extends RegisterComponent {
  constructor(
    private authService: AuthService,
    private authRedService: AuthRedirectService,
    private fsUserService: UserService,
    private globalMsgService: GlobalMessageService,
    private formBuilder: FormBuilder
  ) {
    super(
      authService,
      authRedService,
      fsUserService,
      globalMsgService,
      formBuilder
    );
  }
  fsUserRegistrationForm: FormGroup = this.formBuilder.group(
    {
      titleCode: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: [
        '',
        CustomFormValidators.regexValidator(
          CustomFormValidators.phoneNumberRegex
        ),
      ],
      dateOfBirth: [
        '',
        [Validators.required, CustomFormValidators.dateOfBirthValidator(18)],
      ],
      email: [
        '',
        [
          Validators.required,
          CustomFormValidators.regexValidator(CustomFormValidators.emailRegex),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          CustomFormValidators.regexValidator(
            CustomFormValidators.passwordRegex
          ),
        ],
      ],
      passwordconf: ['', Validators.required],
      newsletter: [false],
      termsandconditions: [false, Validators.requiredTrue],
    },
    { validator: CustomFormValidators.matchFields('password', 'passwordconf') }
  );

  submit(): void {
    this.userService.register(
      this.collectDataFromRegisterForm(this.fsUserRegistrationForm.value)
    );
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
}
