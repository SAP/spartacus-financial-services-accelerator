import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { DeleteClaimDialogComponent } from './delete-claim-dialog/delete-claim-dialog.component';
import * as fromClaimStore from '../../store';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OccConfig } from '@spartacus/core';
import { DomSanitizer } from '@angular/platform-browser'
import { naIconImgSrc } from '../../../../assets/info-icon';

export interface Claim {
  claimNumber?: any;
}

@Component({
  selector: 'fsa-claims',
  templateUrl: './claims.component.html',
  styleUrls: ['./claims.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ClaimsComponent implements OnInit {
  constructor(
    private modalService: NgbModal,
    protected store: Store<fromClaimStore.ClaimState>,
    private config: OccConfig,
    private domSanitizer: DomSanitizer
  ) {}

  naIconImgSrc = naIconImgSrc;
  claims$;
  claimsLoaded$;

  modalInstance;
  noClaimsText = 'You have no Claims!';

  ngOnInit() {
    this.claims$ = this.store.pipe(select(fromClaimStore.getActiveClaims));
    this.claimsLoaded$ = this.store.pipe(select(fromClaimStore.getLoaded));
  }

  deleteClaim(claimNumber: string) {
    this.openModal(claimNumber);
  }

  getlink() {
    return this.domSanitizer.bypassSecurityTrustUrl(naIconImgSrc);
  }

  private openModal(claimNumber: string) {
    this.modalInstance = this.modalService.open(DeleteClaimDialogComponent, {
      centered: true,
      size: 'lg'
    }).componentInstance;
    this.modalInstance.claimNumber = claimNumber;
  }

  public getBaseUrl() {
    return this.config.server.baseUrl || '';
  }
}