import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import { RoutingService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChangeRequestStatus } from './../../../occ/occ-models/occ.models';
import { ChangeRequestService } from './../facade/change-request.service';

@Injectable({
  providedIn: 'root',
})
export class ChangeRequestSubmissionGuard implements CanActivate {
  constructor(
    protected routingService: RoutingService,
    protected changeRequestService: ChangeRequestService
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.changeRequestService.getChangeRequest().pipe(
      map(changeRequest => {
        if (changeRequest.requestStatus === ChangeRequestStatus.SUBMITTED) {
          this.routingService.go({ cxRoute: 'home' });
          return false;
        } else {
          return true;
        }
      })
    );
  }
}
