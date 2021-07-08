import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { B2BUser, UserService } from '@spartacus/core';
import {
  CurrentItemService,
  CurrentUserService,
  ItemService,
  UserFormComponent,
} from '@spartacus/organization/administration/components';
import {
  B2BUserService,
  OrgUnitService,
} from '@spartacus/organization/administration/core';
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

  updateRoles(event: MouseEvent) {
    this.roles.reset();
    this.roles.push(new FormControl((<HTMLInputElement>event.target).value));
  }

  getDateFormat() {
    return this.config.date.format;
  }
}
