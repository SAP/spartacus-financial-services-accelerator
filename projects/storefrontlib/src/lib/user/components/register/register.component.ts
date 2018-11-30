import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { Observable, Subscription, of } from 'rxjs';
import { take, tap, switchMap } from 'rxjs/operators';

import { CustomFormValidators } from '../../../ui/validators/custom-form-validators';
import { AuthService } from '../../../auth/facade/auth.service';
import { RoutingService } from '@spartacus/core';
import { UserService } from '../../facade/user.service';

@Component({
  selector: 'cx-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  titles$: Observable<any>;
  subscription: Subscription;
  userRegistrationForm: FormGroup = this.fb.group(
    {
      titleCode: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, CustomFormValidators.emailValidator]],
      password: [
        '',
        [Validators.required, CustomFormValidators.passwordValidator]
      ],
      passwordconf: ['', Validators.required],
      newsletter: [false],
      termsandconditions: [false, Validators.requiredTrue]
    },
    { validator: this.matchPassword }
  );

  constructor(
    private auth: AuthService,
    private routing: RoutingService,
    private userService: UserService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.titles$ = this.userService.titles$.pipe(
      tap(titles => {
        if (Object.keys(titles).length === 0) {
          this.userService.loadTitles();
        }
      })
    );

    this.subscription = this.auth.userToken$
      .pipe(
        switchMap(data => {
          if (data && data.access_token) {
            return this.routing.redirectUrl$.pipe(take(1));
          }
          return of();
        })
      )
      .subscribe(url => {
        if (url) {
          // If forced to login due to AuthGuard, then redirect to intended destination
          this.routing.go([url]);
          this.routing.clearRedirectUrl();
        } else {
          // User manual login
          this.routing.back();
        }
      });
  }

  submit() {
    this.userService.registerUser(
      this.userRegistrationForm.value.titleCode,
      this.userRegistrationForm.value.firstName,
      this.userRegistrationForm.value.lastName,
      this.userRegistrationForm.value.email,
      this.userRegistrationForm.value.password
    );
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private matchPassword(ac: AbstractControl) {
    if (ac.get('password').value !== ac.get('passwordconf').value) {
      return { NotEqual: true };
    }
  }
}
