import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { GlobalMessageService, WindowRef, AuthService } from '@spartacus/core';
import { LoginFormComponent } from '@spartacus/storefront';

@Component({
  selector: 'cx-fs-login-form',
  templateUrl: './login-form.component.html',
})
export class FSLoginFormComponent extends LoginFormComponent {
  constructor(
    protected auth: AuthService,
    protected globalMessageService: GlobalMessageService,
    protected fb: FormBuilder,
    protected winRef: WindowRef
  ) {
    super(auth, globalMessageService, fb, winRef);
  }
}
