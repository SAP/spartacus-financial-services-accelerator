import { Component } from '@angular/core';
import { LoginFormComponent, LoginFormComponentService } from '@spartacus/user/account/components';

@Component({
  selector: 'cx-fs-login-form',
  templateUrl: './login-form.component.html',
})
export class FSLoginFormComponent extends LoginFormComponent {
  constructor(
    protected loginFormComponentService: LoginFormComponentService
  ) {
    super(loginFormComponentService);
  }
}
