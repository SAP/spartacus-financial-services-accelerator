import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  UnitUserCreateComponent,
  UserItemService,
} from '@spartacus/organization/administration/components';
// TODO: Fix imports once the files are exported
import { ɵi as UnitUserItemService } from '@spartacus/organization/administration/components';

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
