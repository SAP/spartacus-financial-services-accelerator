import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { DeleteClaimDialogComponent } from '../delete-claim-dialog/delete-claim-dialog.component';
import * as fromClaimStore from '../../../lib/my-account/assets/store';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OccConfig } from '@spartacus/core';
import { DomSanitizer } from '@angular/platform-browser';
import { naIconImgSrc } from '../../../assets/icons/na-icon';
import { ClaimService } from '../../../lib/my-account/assets/services';

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
    protected claimService: ClaimService
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
