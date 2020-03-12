import { Claim } from './../../../occ/occ-models/occ.models';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import * as fromAction from '../store/actions';
import * as fromReducer from '../store/reducers';
import * as fromClaimStore from '../store';
import { SelectedPolicy } from '../services/claim-data.service';
import { AuthService } from '@spartacus/core';
import { take } from 'rxjs/operators';
import * as fromSelector from '../store/selectors';

@Injectable()
export class ClaimService {
  currentClaimId;
  private selectedPolicySource = new BehaviorSubject<SelectedPolicy>(null);
  private selectedPolicy = this.selectedPolicySource.asObservable();

  constructor(
    protected store: Store<fromReducer.UserState>,
    protected authService: AuthService
  ) {
    combineLatest([
      this.store.select(fromSelector.getClaimContent),
      this.authService.getUserToken(),
    ])
      .subscribe(([claim, userToken]) => {
        this.currentClaimId = claim.claimNumber;
        if (this.isCreated(claim) && this.isLoggedIn(userToken.userId)) {
          this.loadCurrentClaim();
        }
      })
      .unsubscribe();
  }

  loadCurrentClaim() {
    this.authService
      .getOccUserId()
      .pipe(take(1))
      .subscribe(occUserId => {
        this.store.dispatch(
          new fromAction.LoadCurrentClaim({
            userId: occUserId,
            claimId: this.currentClaimId,
          })
        );
      })
      .unsubscribe();
  }

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
    this.authService
      .getOccUserId()
      .pipe(take(1))
      .subscribe(occUserId => {
        this.store.dispatch(
          new fromAction.LoadClaims({
            userId: occUserId,
          })
        );
      })
      .unsubscribe();
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

  resumeClaim(claimNumber: string) {
    this.authService
      .getOccUserId()
      .pipe(take(1))
      .subscribe(occUserId => {
        this.currentClaimId = claimNumber;
        this.store.dispatch(
          new fromAction.LoadCurrentClaim({
            userId: occUserId,
            claimId: claimNumber,
          })
        );
      })
      .unsubscribe();
  }

  updateClaim(claim: Claim, stepIndex: number, stepStatus: string) {
    const stepData = Object.assign({}, claim.configurationSteps[stepIndex], {
      status: stepStatus,
    });

    this.authService
      .getOccUserId()
      .pipe(take(1))
      .subscribe(occUserId => {
        this.store.dispatch(
          new fromAction.UpdateClaim({
            userId: occUserId,
            claimData: claim,
            stepData: stepData,
          })
        );
      })
      .unsubscribe();
  }

  private isCreated(claim: any): boolean {
    return claim && claim.claimNumber !== undefined;
  }

  private isLoggedIn(userId: string): boolean {
    return typeof userId !== undefined;
  }
}
