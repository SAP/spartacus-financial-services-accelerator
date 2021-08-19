import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import {
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
} from '@spartacus/core';
import { combineLatest, Observable } from 'rxjs';
import { ClaimStatus } from '../../../occ/occ-models/occ.models';
import { filter, map } from 'rxjs/operators';
import { ClaimService } from '../../my-account';

@Injectable({
  providedIn: 'root',
})
export class ClaimConfirmationGuard implements CanActivate {
  constructor(
    protected routingService: RoutingService,
    protected globalMessageService: GlobalMessageService,
    protected claimService: ClaimService
  ) {}

  private readonly claimConfirmationStatuses = [
    ClaimStatus.APPROVED,
    ClaimStatus.SUBMITTED,
    ClaimStatus.PROCESSING,
  ];

  canActivate(): Observable<boolean | UrlTree> {
    return combineLatest([
      this.claimService.getLoaded(),
      this.claimService.getCurrentClaim(),
    ]).pipe(
      filter(([loaded, _]) => loaded),
      map(([_, claim]) => {
        const isClaimFinished = this.claimConfirmationStatuses.includes(
          claim.claimStatus
        );
        if (!claim || isClaimFinished) {
          isClaimFinished
            ? this.globalMessageService.add(
                { key: 'claim.alreadySubmitted' },
                GlobalMessageType.MSG_TYPE_INFO
              )
            : null;
          this.routingService.go({ cxRoute: 'home' });
          return false;
        }
        return true;
      })
    );
  }
}
