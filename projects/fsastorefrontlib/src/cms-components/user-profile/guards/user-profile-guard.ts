import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import {
  CmsActivatedRouteSnapshot,
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
} from '@spartacus/core';
import { UserProfileService } from '@spartacus/user/profile/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { FSUserRole } from '../../../occ/occ-models';

@Injectable({
  providedIn: 'root',
})
export class UserProfileGuard implements CanActivate {
  constructor(
    protected routingService: RoutingService,
    protected globalMessageService: GlobalMessageService,
    protected userProfileService: UserProfileService
  ) {}

  canActivate(route: CmsActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    return this.userProfileService.get().pipe(
      filter(customer => !!customer),
      map(customer => {
        const oboCustomerId = route.params['customerId'];
        if (
          !!oboCustomerId &&
          !customer.roles.includes(FSUserRole.SELLER) &&
          customer.uid !== oboCustomerId
        ) {
          this.globalMessageService.add(
            { key: 'organization.notification.noSufficientPermissions' },
            GlobalMessageType.MSG_TYPE_WARNING
          );
          this.routingService.go({
            cxRoute: 'userProfile',
            params: { customerId: "" },
          });
        }


        if (
          !!oboCustomerId &&
          customer.uid === oboCustomerId
        ) {
          this.routingService.go({
            cxRoute: 'userProfile',
            params: { customerId: "" },
          });
        }


        return true;
      })
    );
  }
}
