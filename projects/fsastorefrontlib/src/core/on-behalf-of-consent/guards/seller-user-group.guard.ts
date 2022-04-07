import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import {
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
  User,
} from '@spartacus/core';
import { UserAccountFacade } from '@spartacus/user/account/root';
import { Observable } from 'rxjs';
import { filter, map, pluck } from 'rxjs/operators';
import { FSUserRole } from '../../../occ/occ-models/occ.models';

/**
    Allows access if currently logged in customer is part of seller user group.
    Prevents access to certain pages that should be approachable only by sellers/agents.
*/
@Injectable({
  providedIn: 'root',
})
export class SellerUserGroupGuard implements CanActivate {
  constructor(
    protected userAccountFacade: UserAccountFacade,
    protected routingService: RoutingService,
    protected globalMessageService: GlobalMessageService
  ) {}

  canActivate(): Observable<boolean> {
    return this.userAccountFacade.get().pipe(
      filter((user: User) => !!user),
      pluck('roles'),
      map((roles: string[]) => {
        const hasRole = roles.includes(FSUserRole.SELLER);
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
