import { Injectable } from '@angular/core';
import * as fromAction from './../store/actions';
import { StateWithMyAccount } from '../store/my-account-state';
import { select, Store } from '@ngrx/store';
import * as fromConsentStore from './../store';
import { User, UserIdService } from '@spartacus/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class ConsentService {
  constructor(
    protected store: Store<StateWithMyAccount>,
    protected userIdService: UserIdService
  ) {}

  loadConsents(userId) {
    this.store.dispatch(
      new fromAction.LoadConsents({
        userId: userId,
      })
    );
  }

  loadCustomer(userId, customerId) {
    this.store.dispatch(
      new fromAction.LoadCustomer({
        userId: userId,
        customerId: customerId,
      })
    );
  }

  loadCustomerQuotes(userId, customerId) {
    this.store.dispatch(
      new fromAction.LoadCustomerQuotes({
        userId: userId,
        customerId: customerId,
      })
    );
  }

  loadCustomerPolicies(userId, customerId) {
    this.store.dispatch(
      new fromAction.LoadCustomerPolicies({
        userId: userId,
        customerId: customerId,
      })
    );
  }

  loadCustomerClaims(userId, customerId) {
    this.store.dispatch(
      new fromAction.LoadCustomerClaims({
        userId: userId,
        customerId: customerId,
      })
    );
  }

  getConsents(): Observable<any> {
    return this.store.pipe(select(fromConsentStore.getConsents));
  }

  getCustomer(): Observable<any> {
    return this.store.pipe(select(fromConsentStore.getCustomer));
  }

  getCustomerQuotes(): Observable<any> {
    return this.store.pipe(select(fromConsentStore.getCustomerQuotes));
  }

  getCustomerPolicies(): Observable<any> {
    return this.store.pipe(select(fromConsentStore.getCustomerPolicies));
  }

  getCustomerClaims(): Observable<any> {
    return this.store.pipe(select(fromConsentStore.getCustomerClaims));
  }

  getConsentsLoaded(): Observable<boolean> {
    return this.store.pipe(select(fromConsentStore.getConsentsLoaded));
  }
}
