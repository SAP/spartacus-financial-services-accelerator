import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromAction from '../store/actions';
import * as fromReducer from '../store/reducers';
import * as fromSelector from '../store/selectors';
import { AuthService } from '@spartacus/core';
import { PolicyDataService } from './policy-data.service';


@Injectable()
export class PolicyService {
  constructor(
    private store: Store<fromReducer.PolicyState>,
    private policyData: PolicyDataService,
    protected auth: AuthService
  ) {
    this.initQuotes();
  }

  callback: Function;

  initQuotes() {
    this.store.pipe(select(fromSelector.getActivePolicies)).subscribe(policies => {
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

    this.store.pipe(select(fromSelector.getPolicyRefresh)).subscribe(refresh => {
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
}
