import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UserDetailsComponent } from '@spartacus/organization/administration/components';

@Component({
  selector: 'cx-fs-org-user-details',
  templateUrl: './user-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FSUserDetailsComponent extends UserDetailsComponent {}
