import { Injectable } from '@angular/core';
import * as fromAction from './../store/actions';
import { StateWithMyAccount } from '../store/my-account-state';
import { select, Store } from '@ngrx/store';
import * as fromConsentStore from './../store';
import { UserIdService } from '@spartacus/core';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject } from 'rxjs';
import { FSUser } from '@spartacus/fsa-storefront';

@Injectable({
  providedIn: 'root',
})
export class ConsentService {
  selectedOBOCustomer = new BehaviorSubject<FSUser>(null);

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

  transferCartToSelectedOBOCustomer(cartId, currentUser, oboConsentCustomer) {
    this.store.dispatch(
      new fromAction.TransferCart({
        cartId: cartId,
        userId: currentUser,
        oboCustomer: oboConsentCustomer
      })
    );
  }

  getConsents(): Observable<any> {
    return this.store.pipe(select(fromConsentStore.getConsents));
  }

  getConsentsLoaded(): Observable<boolean> {
    return this.store.pipe(select(fromConsentStore.getConsentsLoaded));
  }

  getSelectedOBOCustomer(): Observable<FSUser> {
    return this.selectedOBOCustomer.asObservable();
  }

  setSelectedOBOCustomer(customer: FSUser) {
    return this.selectedOBOCustomer.next(customer);
  }
}
