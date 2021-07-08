import { Injectable } from '@angular/core';
import { RoutingService } from '@spartacus/core';
import {
  CurrentUserService,
  UserItemService,
} from '@spartacus/organization/administration/components';
import { B2BUserService } from '@spartacus/organization/administration/core';
import { FSUserFormService } from './user-form.service';
@Injectable({
  providedIn: 'root',
})
export class FSUserItemService extends UserItemService {
  constructor(
    protected currentItemService: CurrentUserService,
    protected routingService: RoutingService,
    protected formService: FSUserFormService,
    protected userService: B2BUserService
  ) {
    super(currentItemService, routingService, formService, userService);
  }
}
