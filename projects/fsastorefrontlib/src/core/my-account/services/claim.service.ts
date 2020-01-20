import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import * as fromAction from '../store/actions';
import * as fromReducer from '../store/reducers';
import * as fromClaimStore from '../store/';
import { ClaimDataService, SelectedPolicy } from './claim-data.service';

@Injectable()
export class ClaimService {
  constructor(
    protected store: Store<fromReducer.UserState>,
    protected claimData: ClaimDataService
  ) {}

  private selectedPolicySource = new BehaviorSubject<SelectedPolicy>(null);
  private selectedPolicy = this.selectedPolicySource.asObservable();

  getClaims(): Observable<any> {
    return this.store.pipe(select(fromClaimStore.getClaims));
  }

  getLoaded(): Observable<boolean> {
    return this.store.pipe(select(fromClaimStore.getClaimsLoaded));
  }

  loadClaims() {
    this.store.dispatch(
      new fromAction.LoadClaims({
        userId: this.claimData.userId,
      })
    );
  }

  removeClaim(userId: string, claimId: string) {
    this.store.dispatch(
      new fromAction.DeleteClaim({
        userId: userId,
        claimId: claimId,
      })
    );
  }
  getSelectedPolicy() {
    return this.selectedPolicy;
  }
  setSelectedPolicy(userId: string, policyId: string, contractId: string) {
    this.selectedPolicySource.next({ userId, policyId, contractId });
  }

  createClaim(userId: string, policyId: string, contractId: string) {
    this.store.dispatch(
      new fromAction.CreateClaim({
        userId: userId,
        policyId: policyId,
        contractId: contractId,
      })
    );
  }

  submitClaim(userId: string, claimId: string) {
    this.store.dispatch(
      new fromAction.SubmitClaim({
        userId: userId,
        claimId: claimId,
      })
    );
  }
}
