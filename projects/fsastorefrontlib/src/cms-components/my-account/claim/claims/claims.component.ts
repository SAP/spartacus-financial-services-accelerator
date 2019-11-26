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
import { Store, select } from '@ngrx/store';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OccConfig, RoutingService } from '@spartacus/core';

import { DeleteClaimDialogComponent } from '../delete-claim-dialog/delete-claim-dialog.component';
import { UserState } from './../../../../core/my-account/store/reducers/index';
import { UserRequestService } from './../../../../core/user-request/services/user-request/user-request.service';
import * as fromClaimStore from '../../../../core/my-account/store';
import { naIconImgSrc } from '../../../../assets/icons/na-icon';
import { ClaimService } from '../../../../core/my-account/services';

@Component({
  selector: 'fsa-claims',
  templateUrl: './claims.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClaimsComponent implements OnInit, OnDestroy {
  constructor(
    protected modalService: NgbModal,
    protected store: Store<fromClaimStore.UserState>,
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
    this.claims$ = this.store.pipe(select(fromClaimStore.getClaims));
    this.claimsLoaded$ = this.store.pipe(
      select(fromClaimStore.getClaimsLoaded)
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  deleteClaim(claimNumber: string) {
    this.openModal(claimNumber);
  }

  getNaImagelink() {
    return this.domSanitizer.bypassSecurityTrustUrl(naIconImgSrc);
  }

  private openModal(claimNumber: string) {
    this.modalInstance = this.modalService.open(DeleteClaimDialogComponent, {
      centered: true,
      size: 'lg',
    }).componentInstance;
    this.modalInstance.claimNumber = claimNumber;
  }

  public getBaseUrl() {
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
}
