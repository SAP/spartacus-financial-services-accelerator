import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromAction from '../store/actions';
import * as fromReducer from '../store/reducers';
import * as fromSelector from '../store/selectors';
import { AuthService } from '@spartacus/core';
import { PolicyDataService } from './policy-data.service';
import * as fromStore from '../store';
import { Observable } from 'rxjs';


@Injectable()
export class PremiumCalendarService {
  constructor(
    private store: Store<fromReducer.UserState>,
    private policyData: PolicyDataService,
    protected auth: AuthService
  ) {
    this.initPolicies();
  }

  callback: Function;

  readonly premiumCalendarData$: Observable<any> = this.store.pipe(
    select(fromStore.getPremiumCalendar)
  );

  initPolicies() {
    this.store.pipe(select(fromSelector.getPremiumCalendar)).subscribe(policies => {
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

    this.store.pipe(select(fromSelector.getPremiumCalendarRefresh)).subscribe(refresh => {
      if (refresh) {
        this.store.dispatch(
          new fromAction.LoadPremiumCalendar({
            userId: this.policyData.userId
          })
        );
      }
    });
  }

  loadPremiumCalendar() {
        this.store.dispatch(
          new fromAction.LoadPremiumCalendar({
            userId: this.policyData.userId
          })
        );
  }
}
