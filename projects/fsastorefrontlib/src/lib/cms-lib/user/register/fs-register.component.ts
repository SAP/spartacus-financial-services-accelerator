import { Component } from '@angular/core';
import { RegisterComponent } from '@spartacus/storefront';
import {
  UserService,
  AuthService,
  AuthRedirectService,
  GlobalMessageService,
} from '@spartacus/core';
import {
  Validators,
  FormGroup,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';
import { FSUserSignUp } from '../../../occ-models';
import { CustomFormValidators } from '../../util/validators/custom-form-validators';

@Component({
  selector: 'fsa-register',
  templateUrl: './fs-register.component.html',
})
export class FSRegisterComponent extends RegisterComponent {
  private fsFormBuilder: FormBuilder = new FormBuilder();

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
    this.emailToLowerCase();
    const {
      firstName,
      lastName,
      dateOfBirth,
      email,
      password,
      titleCode,
      phoneNumber,
    } = this.fsUserRegistrationForm.value;
    const userRegisterFormData: FSUserSignUp = {
      firstName,
      lastName,
      dateOfBirth,
      uid: email,
      password,
      titleCode,
      phoneNumber,
    };

    this.fsUserService.register(userRegisterFormData);
  }
}
