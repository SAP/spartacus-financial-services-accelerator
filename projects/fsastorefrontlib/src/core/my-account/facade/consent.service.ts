import { Injectable } from '@angular/core';
import * as fromAction from './../store/actions';
import { StateWithMyAccount } from '../store/my-account-state';
import { select, Store } from '@ngrx/store';
import * as fromConsentStore from './../store';
import { UserIdService } from '@spartacus/core';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { UserAccountFacade } from '@spartacus/user/account/root';
import { map } from 'rxjs/operators';
import { FSCart, FSUser, FSUserRole } from '../../../occ/occ-models/occ.models';

@Injectable({
  providedIn: 'root',
})
export class ConsentService {
  selectedOBOCustomer = new BehaviorSubject<FSUser>(null);

  constructor(
    protected store: Store<StateWithMyAccount>,
    protected userIdService: UserIdService,
    protected userAccountFacade: UserAccountFacade
  ) {}

  loadConsents(userId) {
    this.store.dispatch(
      new fromAction.LoadConsents({
        userId: userId,
      })
    );
  }

  transferCartToSelectedOBOCustomer(
    cart: FSCart,
    currentUser: FSUser,
    oboConsentCustomer: FSUser
  ) {
    this.store.dispatch(
      new fromAction.TransferCart({
        cart: cart,
        consentHolder: currentUser,
        oboCustomer: oboConsentCustomer,
      })
    );
  }

  isCartTransferAllowedForSeller(): Observable<boolean> {
    return combineLatest([
      this.userAccountFacade.get(),
      this.getSelectedOBOCustomer(),
    ]).pipe(
      map(([seller, oboConsentCustomer]) => {
        if (!seller?.roles.includes(FSUserRole.SELLER) || oboConsentCustomer?.uid) {
          return true;
        }
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
