import { Component } from '@angular/core';
import { LoginRegisterComponent } from '@spartacus/user/account/components';

@Component({
  selector: 'cx-fs-login-register',
  templateUrl: './login-register.component.html',
})
// TODO_UPGRADE: Remove once LoginRegisterComponent is exported in Spartacus app.
// After that selector of component should be recognized by FSA
export class FSLoginRegisterComponent extends LoginRegisterComponent {}
