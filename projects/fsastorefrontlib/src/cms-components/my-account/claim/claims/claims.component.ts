import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { DeleteClaimDialogComponent } from '../delete-claim-dialog/delete-claim-dialog.component';
import * as fromClaimStore from '../../../../core/my-account/store';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OccConfig, RoutingService } from '@spartacus/core';
import { DomSanitizer } from '@angular/platform-browser';
import { naIconImgSrc } from '../../../../assets/icons/na-icon';
import { ClaimService } from '../../../../core/my-account/services';
import { UserRequestService } from '../../../../core/user-request/services/user-request/user-request.service';

@Component({
  selector: 'fsa-claims',
  templateUrl: './claims.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClaimsComponent implements OnInit {
  constructor(
    private modalService: NgbModal,
    protected store: Store<fromClaimStore.UserState>,
    private config: OccConfig,
    private domSanitizer: DomSanitizer,
    protected claimService: ClaimService,
    protected userRequestService: UserRequestService,
    protected routingService: RoutingService
  ) {}

  naIconImgSrc = naIconImgSrc;
  claims$;
  claimsLoaded$;

  modalInstance;

  ngOnInit() {
    this.claimService.loadClaims();
    this.claims$ = this.store.pipe(select(fromClaimStore.getClaims));
    this.claimsLoaded$ = this.store.pipe(
      select(fromClaimStore.getClaimsLoaded)
    );
  }

  deleteClaim(claimNumber: string) {
    this.openModal(claimNumber);
  }

  getNaImagelink() {
    return this.domSanitizer.bypassSecurityTrustUrl(naIconImgSrc);
  }

  resumeClaim(requestId: string) {
    this.userRequestService.resumeRequest(requestId).subscribe(request => {
      if (request.requestId === requestId) {
        this.routingService.go({
          cxRoute: request.configurationSteps[0].pageLabelOrId,
        });
      }
    });
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
}
