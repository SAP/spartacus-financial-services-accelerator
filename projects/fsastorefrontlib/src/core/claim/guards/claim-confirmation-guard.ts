import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import {
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { ClaimStatus } from '../../../occ/occ-models/occ.models';
import { map } from 'rxjs/operators';
import { UserRequestService } from '../../user-request/facade';

@Injectable({
  providedIn: 'root',
})
export class ClaimConfirmationGuard implements CanActivate {
  constructor(
    protected userRequestService: UserRequestService,
    protected routingService: RoutingService,
    protected globalMessageService: GlobalMessageService
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.userRequestService.getUserRequest().pipe(
      map(claim => {
        if (claim.requestStatus === ClaimStatus.SUBMITTED) {
          this.globalMessageService.add(
            { key: 'claim.alreadySubmitted' },
            GlobalMessageType.MSG_TYPE_INFO
          );
          this.routingService.go({ cxRoute: 'home' });
          return false;
        }
        return true;
      })
    );
  }
}
