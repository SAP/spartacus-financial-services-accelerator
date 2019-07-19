import { Component } from '@angular/core';
import { RegisterComponent } from '@spartacus/storefront';
import {UserService, AuthService, AuthRedirectService, GlobalMessageService } from '@spartacus/core';
import { Validators, FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { FSUserSignUp } from '../../../occ-models';
import { CustomFormValidators } from '../../util/validators/custom-form-validators';


@Component({
  selector: 'fsa-register',
  templateUrl: './fs-register.component.html'
})
export class FSRegisterComponent extends RegisterComponent {
  private fsFormBuilder: FormBuilder = new FormBuilder;

  constructor(
    private authService: AuthService,
    private authRedService: AuthRedirectService,
    private fsUserService: UserService,
    private globalMsgService: GlobalMessageService,
    private formBuilder: FormBuilder) {
    super(authService, authRedService, fsUserService, globalMsgService, formBuilder);
  }
  fsUserRegistrationForm: FormGroup = this.formBuilder.group(
    {
      titleCode: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: ['', [Validators.required, CustomFormValidators.dateOfBirthValidator]],
      email: ['', [Validators.required, CustomFormValidators.emailValidator]],
      password: [
        '',
        [Validators.required, CustomFormValidators.passwordValidator],
      ],
      passwordconf: ['', Validators.required],
      newsletter: [false],
      termsandconditions: [false, Validators.requiredTrue],
    },
    { validator: this.matchPasswords }
  );

  protected matchPasswords(ac: AbstractControl): { NotEqual: boolean } {
    if (ac.get('password').value !== ac.get('passwordconf').value) {
      return { NotEqual: true };
    }
  }

  submit(): void {
    this.emailToLowerCase();
    const {
      firstName,
      lastName,
      dateOfBirth,
      email,
      password,
      titleCode,
    } = this.fsUserRegistrationForm.value;
    const userRegisterFormData: FSUserSignUp = {
      firstName,
      lastName,
      dateOfBirth,
      uid: email,
      password,
      titleCode,
    };

    this.fsUserService.register(userRegisterFormData);
  }
}
