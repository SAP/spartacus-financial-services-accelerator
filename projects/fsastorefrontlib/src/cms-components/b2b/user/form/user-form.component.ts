import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { B2BUser, B2BUserRole, UserService } from '@spartacus/core';
import {
  CurrentItemService,
  CurrentUserService,
  ItemService,
  UserFormComponent,
  UserItemService,
} from '@spartacus/organization/administration/components';
import {
  B2BUnitNode,
  B2BUserService,
  OrgUnitService,
} from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import { DateConfig } from '../../../../core/date-config/date-config';
import { FSUserItemService } from './user-item.service';

@Component({
  selector: 'cx-fs-org-user-form',
  templateUrl: './user-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'content-wrapper' },
  providers: [
    {
      provide: ItemService,
      useExisting: FSUserItemService,
    },
    {
      provide: CurrentItemService,
      useExisting: CurrentUserService,
    },
  ],
})
export class FSUserFormComponent extends UserFormComponent {
  constructor(
    itemService: ItemService<B2BUser>,
    unitService: OrgUnitService,
    userService: UserService,
    b2bUserService: B2BUserService,
    protected config: DateConfig
  ) {
    super(itemService, unitService, userService, b2bUserService);
  }

  @Input() set unitKey(value: string) {
    if (value) {
      this.form?.get('orgUnit.uid').setValue(value);
    }
  }

  availableRoles: B2BUserRole[] = this.getAllRoles();

  getDateFormat() {
    return this.config.date.format || '';
  }

  //prebaciti u servis
  getAllRoles(): B2BUserRole[] {
    return [B2BUserRole.CUSTOMER, B2BUserRole.ADMIN];
  }
}
