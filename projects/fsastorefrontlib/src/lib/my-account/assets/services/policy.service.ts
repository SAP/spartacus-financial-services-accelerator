import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AuthService } from '@spartacus/core';
import { Observable } from 'rxjs';

import * as fromAction from '../store/actions';
import * as fromReducer from '../store/reducers';
import * as fromSelector from '../store/selectors';
import { PolicyDataService } from './policy-data.service';
import * as fromStore from '../store';


@Injectable()
export class PolicyService {
  constructor(
    private store: Store<fromReducer.UserState>,
    private policyData: PolicyDataService,
    protected auth: AuthService
  ) {
    this.initPolicies();
  }

  callback: Function;

  readonly policyData$: Observable<any> = this.store.pipe(
    select(fromStore.getPolicyData)
  );

  initPolicies() {
    this.store.pipe(select(fromSelector.getPolicyData)).subscribe(policies => {
      if (policies) {
        this.policyData.policies = policies;
      }
      if (this.callback) {
        this.callback();
        this.callback = null;
      }
    });

    this.auth.getUserToken().subscribe(userData => {
      if (this.policyData.userId !== userData.userId) {
        this.policyData.userId = userData.userId;
      }
    });

    this.store.pipe(select(fromSelector.getPoliciesRefresh)).subscribe(refresh => {
      if (refresh) {
        this.store.dispatch(
          new fromAction.LoadPolicies({
            userId: this.policyData.userId
          })
        );
      }
    });
  }

  loadPolicies() {
    this.store.dispatch(
      new fromAction.LoadPolicies({
        userId: this.policyData.userId,
      })
    );
  }

  loadClaimPolicies(claimsCategoryCode: string) {
    this.store.dispatch(
      new fromAction.LoadClaimPolicies({
        userId: this.policyData.userId,
        claimsCategoryCode: claimsCategoryCode
      })
    );
  }

  loadPremiumCalendar() {
    this.store.dispatch(
      new fromAction.LoadPremiumCalendar({
        userId: this.policyData.userId
      })
    );
  }

  loadPolicyDetails(policyId, contractId) {
    this.store.dispatch(
      new fromAction.LoadPolicyDetails({
        userId: this.policyData.userId,
        policyId: policyId,
        contractId: contractId
      })
    );
  }
}
