import { Component, OnInit, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { DeleteClaimDialogComponent } from './delete-claim-dialog/delete-claim-dialog.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as fromClaimStore from '../../store';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

export interface Claim {
  claimNumber?: any;
}

@Component({
  selector: 'fsa-claims',
  templateUrl: './claims.component.html',
  styleUrls: ['./claims.component.scss']
})
export class ClaimsComponent implements OnInit {
  @Input()
  claims: Claim[] = [];

  @Input()
  claim: Claim;

  @Input()
  claimIsLoading = false;

  modalInstance;
  form: FormGroup = this.fb.group({});
  subscription: Subscription;
  userId: string;

  constructor(
    private modalService: NgbModal,
    protected fb: FormBuilder,
    protected store: Store<fromClaimStore.ClaimState>
  ) {}

  claims$: Observable<any>;
  claimsLoaded$: Observable<any>;

  noClaimsText = 'You have no Claims!';

  ngOnInit() {
     this.claims$ = this.store.pipe(select(fromClaimStore.getActiveClaims));
     this.claimsLoaded$ = this.store.pipe(select(fromClaimStore.getLoaded));
  }

  deleteClaim(claim: Claim) {
    this.openModal(claim);
  }

  private openModal(claim: Claim) {
    this.modalInstance = this.modalService.open(DeleteClaimDialogComponent, {
      centered: true,
      size: 'lg'
    }).componentInstance;
    this.modalInstance.claim$ = claim;
  }
}