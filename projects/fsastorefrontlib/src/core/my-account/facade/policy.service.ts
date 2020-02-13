import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromStore from '../store';
import * as fromAction from '../store/actions';
import * as fromReducer from '../store/reducers';
import { AuthService } from '@spartacus/core';
import { take } from 'rxjs/operators';

@Injectable()
export class PolicyService {
  constructor(
    protected store: Store<fromReducer.UserState>,
    protected authService: AuthService
  ) {}

  getPolicies(): Observable<any> {
    return this.store.pipe(select(fromStore.getPolicyData));
  }

  getLoaded(): Observable<boolean> {
    return this.store.pipe(select(fromStore.getPoliciesLoaded));
  }

  loadPolicies() {
    this.authService
      .getOccUserId()
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
    this.authService
      .getOccUserId()
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

  loadPremiumCalendar() {
    this.authService
      .getOccUserId()
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

  getPremiumCalendar() {
    return this.store.pipe(select(fromStore.getPremiumCalendarData));
  }

  getPremiumCalendarLoaded() {
    return this.store.pipe(select(fromStore.getPremiumCalendarLoaded));
  }

  loadPolicyDetails(policyId, contractId) {
    this.authService
      .getOccUserId()
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
}
