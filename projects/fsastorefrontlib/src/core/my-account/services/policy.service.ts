import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromStore from '../store';
import * as fromAction from '../store/actions';
import * as fromReducer from '../store/reducers';
import { PolicyDataService } from './policy-data.service';

@Injectable()
export class PolicyService {
  constructor(
    private store: Store<fromReducer.UserState>,
    private policyData: PolicyDataService
  ) {}

  getPolicies(): Observable<any> {
    return this.store.pipe(select(fromStore.getPolicyData));
  }

  loadPolicies() {
    this.store.dispatch(
      new fromAction.LoadPolicies({
        userId: this.policyData.userId,
      })
    );
  }

  loadClaimPolicies(policyCategoryCode: string) {
    this.store.dispatch(
      new fromAction.LoadClaimPolicies({
        userId: this.policyData.userId,
        policyCategoryCode: policyCategoryCode,
      })
    );
  }

  loadPremiumCalendar() {
    this.store.dispatch(
      new fromAction.LoadPremiumCalendar({
        userId: this.policyData.userId,
      })
    );
  }

  loadPolicyDetails(policyId, contractId) {
    this.store.dispatch(
      new fromAction.LoadPolicyDetails({
        userId: this.policyData.userId,
        policyId: policyId,
        contractId: contractId,
      })
    );
  }
}
