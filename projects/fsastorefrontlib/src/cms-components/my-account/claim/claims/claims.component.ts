import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { Subscription } from 'rxjs';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OccConfig, RoutingService } from '@spartacus/core';

import { DeleteClaimDialogComponent } from '../delete-claim-dialog/delete-claim-dialog.component';
import { UserState } from './../../../../core/my-account/store/reducers/index';
import { UserRequestService } from '../../../../core/user-request/facade/user-request.service';
import { genericIcons } from '../../../../assets/icons/generic-icons';
import { ClaimService } from '../../../../core/my-account/facade';

@Component({
  selector: 'fsa-claims',
  templateUrl: './claims.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClaimsComponent implements OnInit, OnDestroy {
  constructor(
    protected modalService: NgbModal,
    protected config: OccConfig,
    protected domSanitizer: DomSanitizer,
    protected claimService: ClaimService,
    protected userRequestService: UserRequestService,
    protected routingService: RoutingService
  ) {}

  private subscription = new Subscription();
  claims$: Observable<UserState>;
  claimsLoaded$: Observable<boolean>;
  modalInstance: any;

  ngOnInit() {
    this.claimService.loadClaims();
    this.claims$ = this.claimService.getClaims();
    this.claimsLoaded$ = this.claimService.getLoaded();

    this.subscription.add(
      this.claimService
        .shouldReload()
        .pipe(
          map(reload => {
            if (reload) {
              this.claimService.loadClaims();
            }
          })
        )
        .subscribe()
    );
  }

  deleteClaim(claimNumber: string) {
    this.openModal(claimNumber);
  }

  getImagelink() {
    return this.domSanitizer.bypassSecurityTrustUrl(genericIcons.naIcon);
  }

  private openModal(claimNumber: string) {
    this.modalInstance = this.modalService.open(DeleteClaimDialogComponent, {
      centered: true,
      size: 'lg',
    }).componentInstance;
    this.modalInstance.claimNumber = claimNumber;
  }

  getBaseUrl() {
    return this.config.backend.occ.baseUrl || '';
  }

  resumeClaim(requestId: string) {
    this.subscription.add(
      this.userRequestService
        .resumeRequest(requestId)
        .pipe(
          map(userRequest => {
            if (userRequest.requestId === requestId) {
              this.routingService.go({
                cxRoute: userRequest.configurationSteps[0].pageLabelOrId,
              });
            }
          })
        )
        .subscribe()
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
