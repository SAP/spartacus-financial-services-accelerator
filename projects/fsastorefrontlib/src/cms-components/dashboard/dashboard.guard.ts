import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import {
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
  User,
} from '@spartacus/core';
import { FSUserRole } from '../../occ/occ-models/occ.models';
import { UserAccountFacade } from '@spartacus/user/account/root';
import { Observable } from 'rxjs';
import { filter, map, pluck } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DashboardGuard implements CanActivate {
  constructor(
    protected userAccountFacade: UserAccountFacade,
    protected routingService: RoutingService,
    protected globalMessageService: GlobalMessageService
  ) {}

  canActivate(): Observable<boolean> {
    return this.userAccountFacade.get().pipe(
      filter((user: User) => user && Object.keys(user).length > 0),
      pluck('roles'),
      map((roles: string[]) => {
        const hasRole =
          Array.isArray(roles) && roles.includes(FSUserRole.SELLER);
        if (!hasRole) {
          this.routingService.go({ cxRoute: '/' });
          this.globalMessageService.add(
            { key: 'organization.notification.noSufficientPermissions' },
            GlobalMessageType.MSG_TYPE_WARNING
          );
        }
        return hasRole;
      })
    );
  }
}
