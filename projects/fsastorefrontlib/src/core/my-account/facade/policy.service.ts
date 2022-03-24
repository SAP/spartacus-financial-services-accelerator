import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromStore from '../store';
import * as fromAction from '../store/actions';
import { UserIdService } from '@spartacus/core';
import { take } from 'rxjs/operators';
import { StateWithMyAccount } from '../store/my-account-state';

@Injectable()
export class PolicyService {
  constructor(
    protected store: Store<StateWithMyAccount>,
    protected userIdService: UserIdService
  ) {}

  getPolicies(): Observable<any> {
    return this.store.pipe(select(fromStore.getPolicies));
  }

  getPolicyDetails(): Observable<any> {
    return this.store.pipe(select(fromStore.getPolicyDetails));
  }

  getLoaded(): Observable<boolean> {
    return this.store.pipe(select(fromStore.getPoliciesLoaded));
  }

  loadPolicies() {
    this.userIdService
      .getUserId()
      .pipe(take(1))
      .subscribe(occUserId =>
        this.store.dispatch(
          new fromAction.LoadPolicies({
            userId: occUserId,
          })
        )
      )
      .unsubscribe();
  }

  loadClaimPolicies(policyCategoryCode: string) {
    this.userIdService
      .getUserId()
      .pipe(take(1))
      .subscribe(occUserId =>
        this.store.dispatch(
          new fromAction.LoadClaimPolicies({
            userId: occUserId,
            policyCategoryCode: policyCategoryCode,
          })
        )
      )
      .unsubscribe();
  }

  loadPolicyDetails(policyId, contractId) {
    this.userIdService
      .getUserId()
      .pipe(take(1))
      .subscribe(occUserId =>
        this.store.dispatch(
          new fromAction.LoadPolicyDetails({
            userId: occUserId,
            policyId: policyId,
            contractId: contractId,
          })
        )
      )
      .unsubscribe();
  }

  /**
   * @deprecated since version 4.0.2
   * Use connector directly, as we remove store for this feature.
   */
  loadPremiumCalendar() {
    this.userIdService
      .getUserId()
      .pipe(take(1))
      .subscribe(occUserId =>
        this.store.dispatch(
          new fromAction.LoadPremiumCalendar({
            userId: occUserId,
          })
        )
      )
      .unsubscribe();
  }

  /**
   * @deprecated since version 4.0.2
   * Use connector directly, as we remove store for this feature.
   */
  getPremiumCalendar() {
    return this.store.pipe(select(fromStore.getPremiumCalendarData));
  }

  /**
   * @deprecated since version 4.0.2
   * Use connector directly, as we remove store for this feature.
   */
  getPremiumCalendarLoaded() {
    return this.store.pipe(select(fromStore.getPremiumCalendarLoaded));
  }
}
