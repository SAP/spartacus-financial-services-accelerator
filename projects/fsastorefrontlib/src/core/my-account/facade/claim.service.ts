import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import * as fromAction from '../store/actions';
import * as fromReducer from '../store/reducers';
import * as fromClaimStore from '../store';
import {
  ClaimDataService,
  SelectedPolicy,
} from '../services/claim-data.service';
import { AuthService } from '@spartacus/core';
import { take } from 'rxjs/operators';

@Injectable()
export class ClaimService {
  constructor(
    protected store: Store<fromReducer.UserState>,
    protected claimData: ClaimDataService,
    protected authService: AuthService
  ) {}

  private selectedPolicySource = new BehaviorSubject<SelectedPolicy>(null);
  private selectedPolicy = this.selectedPolicySource.asObservable();

  getClaims(): Observable<any> {
    return this.store.pipe(select(fromClaimStore.getClaims));
  }

  getLoaded(): Observable<boolean> {
    return this.store.pipe(select(fromClaimStore.getClaimsLoaded));
  }

  getCurrentClaim() {
    return this.store.pipe(select(fromClaimStore.getClaimContent));
  }

  getClaimPolicies(): Observable<any> {
    return this.store.pipe(select(fromClaimStore.getClaimPoliciesState));
  }

  getClaimPoliciesLoaded(): Observable<any> {
    return this.store.pipe(select(fromClaimStore.getClaimPoliciesLoaded));
  }

  loadClaims() {
    this.store.dispatch(
      new fromAction.LoadClaims({
        userId: this.claimData.userId,
      })
    );
  }

  shouldReload() {
    return this.store.pipe(select(fromClaimStore.getClaimsRefresh));
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

  resetSelectedPolicy() {
    this.selectedPolicySource.next(null);
  }

  createClaim(policyId: string, contractId: string) {
    this.authService
      .getOccUserId()
      .pipe(take(1))
      .subscribe(occUserId =>
        this.store.dispatch(
          new fromAction.CreateClaim({
            userId: occUserId,
            policyId: policyId,
            contractId: contractId,
          })
        )
      )
      .unsubscribe();
  }
}
