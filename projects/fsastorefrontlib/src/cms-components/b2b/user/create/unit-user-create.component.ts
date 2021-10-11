import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  UnitUserCreateComponent,
} from '@spartacus/organization/administration/components';

@Component({
  selector: 'cx-fs-org-unit-user-create',
  templateUrl: './unit-user-create.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'content-wrapper' }
})
export class FSUnitUserCreateComponent extends UnitUserCreateComponent {}
