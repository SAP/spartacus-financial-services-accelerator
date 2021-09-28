import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  UnitUserCreateComponent,
  UserItemService,
} from '@spartacus/organization/administration/components';
import { UnitUserItemService } from '@spartacus/organization/administration/components/unit/links/users/create/unit-user-item.service';

@Component({
  selector: 'cx-fs-org-unit-user-create',
  templateUrl: './unit-user-create.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'content-wrapper' },
  providers: [
    {
      provide: UserItemService,
      useExisting: UnitUserItemService,
    },
  ],
})
export class FSUnitUserCreateComponent extends UnitUserCreateComponent {}
