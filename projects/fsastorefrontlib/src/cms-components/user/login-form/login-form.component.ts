import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoginFormComponent } from '@spartacus/user/account/components';

@Component({
  selector: 'cx-fs-login-form',
  templateUrl: './login-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FSLoginFormComponent extends LoginFormComponent {
}
