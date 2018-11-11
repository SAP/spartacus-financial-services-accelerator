import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { DeleteClaimDialogComponent } from './delete-claim-dialog/delete-claim-dialog.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as fromClaimStore from '../../store';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OccConfig } from '@spartacus/core';

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

  modalInstance;
  form: FormGroup = this.fb.group({});
  subscription: Subscription;
  userId: string;

  constructor(
    private modalService: NgbModal,
    protected fb: FormBuilder,
    protected store: Store<fromClaimStore.ClaimState>,
    private config: OccConfig,
  
  ) {}

  claims$; 
  claimsLoaded$; 

  noClaimsText = 'You have no Claims!';

  ngOnInit() {
    this.claims$ = this.store.pipe(select(fromClaimStore.getActiveClaims));
    this.claimsLoaded$ = this.store.pipe(select(fromClaimStore.getLoaded));
  }

  deleteClaim(claimNumber: string) {
    this.openModal(claimNumber);
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