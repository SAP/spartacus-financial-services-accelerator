import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { RoutingService } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { ClaimStatus } from './../../../occ/occ-models/occ.models';
import { ClaimDataService } from './../../my-account/services/claim-data.service';

@Injectable({
  providedIn: 'root',
})
export class ClaimConfirmationGuard implements CanActivate {
  claimStatus: ClaimStatus;

  constructor(
    private claimDataService: ClaimDataService,
    private routingService: RoutingService
  ) {}

  canActivate(): Observable<boolean> {
    this.claimStatus = this.claimDataService.claimData.claimStatus;
    const allowableStatuses = [
      ClaimStatus.APPROVED,
      ClaimStatus.SUBMITTED,
      ClaimStatus.PROCESSING,
    ];
    if (allowableStatuses.indexOf(this.claimStatus) === -1) {
      this.routingService.go({ cxRoute: 'home' });
      return of(false);
    }
    return of(true);
  }
}
