import { Claim } from './../../../occ/occ-models/occ.models';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import * as fromAction from '../store/actions';
import * as fromClaimStore from '../store';
import { SelectedPolicy } from '../services/claim-data.service';
import { AuthService, UserIdService } from '@spartacus/core';
import { take, filter, switchMap, map } from 'rxjs/operators';
import * as fromSelector from '../store/selectors';
import { StateWithMyAccount } from '../store/my-account-state';
import { OboCustomerService } from 'projects/fsastorefrontlib/src/cms-components/seller-dashboard/seller-dashboard-list/obo-customer.service';

@Injectable()
export class ClaimService {
  currentClaimId;
  private selectedPolicySource = new BehaviorSubject<SelectedPolicy>(null);
  private selectedPolicy = this.selectedPolicySource.asObservable();

  constructor(
    protected store: Store<StateWithMyAccount>,
    protected authService: AuthService,
    protected userIdService: UserIdService,
    protected oboCustomerService: OboCustomerService
  ) {
    combineLatest([
      this.store.select(fromSelector.getClaimContent),
      this.authService.isUserLoggedIn(),
    ])
      .subscribe(([claim, userLoggedIn]) => {
        this.currentClaimId = claim?.claimNumber;
        if (this.isCreated(claim) && userLoggedIn) {
          this.loadClaimById(this.currentClaimId);
        }
      })
      .unsubscribe();
  }

  loadClaimById(claimId) {
    this.userIdService
      .getUserId()
      .pipe(take(1))
      .subscribe(occUserId => {
        this.store.dispatch(
          new fromAction.LoadClaimById({
            userId: occUserId,
            claimId: claimId,
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

  getCurrentClaim(): Observable<any> {
    return this.store.select(fromClaimStore.getClaimsLoaded).pipe(
      filter(loaded => loaded),
      take(1),
      switchMap(_ => {
        return this.store.select(fromSelector.getClaimContent);
      })
    );
  }

  getClaimPolicies(): Observable<any> {
    return this.store.pipe(select(fromClaimStore.getClaimPoliciesState));
  }

  getClaimPoliciesLoaded(): Observable<any> {
    return this.store.pipe(select(fromClaimStore.getClaimPoliciesLoaded));
  }

  loadClaims() {
    this.userIdService
      .getUserId()
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
    this.oboCustomerService
      .getOboCustomerUserId()
      .pipe(
        map(userId => {
          this.store.dispatch(
            new fromAction.CreateClaim({ userId, policyId, contractId })
          );
        })
      )
      .subscribe()
      .unsubscribe();
    // combineLatest([
    //   this.oboCustomerService.selectedCustomer$,
    //   this.userIdService.getUserId(),
    // ])
    //   .pipe(
    //     map(([selectedCustomer, occUserId]) => {
    //       const userId = selectedCustomer ? selectedCustomer.uid : occUserId;

    //       this.store.dispatch(
    //         new fromAction.CreateClaim({
    //           userId,
    //           policyId: policyId,
    //           contractId: contractId,
    //         })
    //       );
    //     })
    //   )
    //   .subscribe()
    //   .unsubscribe();
  }

  resumeClaim(claimNumber: string) {
    this.userIdService
      .getUserId()
      .pipe(take(1))
      .subscribe(occUserId => {
        this.currentClaimId = claimNumber;
        this.store.dispatch(
          new fromAction.LoadClaimById({
            userId: occUserId,
            claimId: claimNumber,
          })
        );
      })
      .unsubscribe();
  }

  updateClaim(claimData: Claim, stepIndex: number, stepStatus: string) {
    const stepData = Object.assign(
      {},
      claimData.configurationSteps[stepIndex],
      {
        status: stepStatus,
      }
    );

    this.oboCustomerService
      .getOboCustomerUserId()
      .pipe(
        map(userId => {
          this.store.dispatch(
            new fromAction.UpdateClaim({ userId, claimData, stepData })
          );
        })
      )
      .subscribe()
      .unsubscribe();

    // combineLatest([
    //   this.oboCustomerService.selectedCustomer$,
    //   this.userIdService.getUserId(),
    // ])
    //   .pipe(
    //     map(([selectedCustomer, occUserId]) => {
    //       const userId = selectedCustomer ? selectedCustomer.uid : occUserId;

    //       this.store.dispatch(
    //         new fromAction.UpdateClaim({ userId, claimData, stepData })
    //       );
    //     })
    //   )
    //   .subscribe()
    //   .unsubscribe();
  }

  changeClaim(claim: Claim, userId: string) {
    this.store.dispatch(
      new fromAction.ChangeClaim({
        userId: userId,
        claimData: claim,
      })
    );
  }

  private isCreated(claim: any): boolean {
    return claim && claim.claimNumber !== undefined;
  }
}
