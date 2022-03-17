import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromStore from '../store';
import * as fromAction from '../store/actions';
import {
  LanguageSetEvent,
  Query,
  QueryService,
  UserIdService,
} from '@spartacus/core';
import { switchMap, take } from 'rxjs/operators';
import { StateWithMyAccount } from '../store/my-account-state';
import { PolicyConnector } from '../connectors/policy.connector';

@Injectable()
export class PolicyService {
  constructor(
    protected store: Store<StateWithMyAccount>,
    protected userIdService: UserIdService,
    protected query: QueryService,
    protected policyConnector: PolicyConnector
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

  protected premiumCalendarQuery: Query<any> = this.query.create(
    () =>
      this.userIdService
        .getUserId()
        .pipe(
          switchMap(userId => this.policyConnector.getPremiumCalendar(userId))
        ),
    {
      reloadOn: [LanguageSetEvent],
    }
  );

  getPremiumCalendar(): Observable<any> {
    return this.premiumCalendarQuery.get();
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
}
