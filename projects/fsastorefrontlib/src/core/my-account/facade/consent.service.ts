import { Injectable } from '@angular/core';
import * as fromAction from './../store/actions';
import { StateWithMyAccount } from '../store/my-account-state';
import { select, Store } from '@ngrx/store';
import * as fromConsentStore from './../store';
import { UserIdService, Address } from '@spartacus/core';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { UserAccountFacade } from '@spartacus/user/account/root';
import { map } from 'rxjs/operators';
import { FSCart, FSUser, FSUserRole } from '../../../occ/occ-models/occ.models';

@Injectable({
  providedIn: 'root',
})
export class ConsentService {
  private selectedOBOCustomerSource = new BehaviorSubject<FSUser>(null);
  readonly selectedOBOCustomer$ = this.selectedOBOCustomerSource.asObservable();

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

  loadCustomer(userId, customerId) {
    this.store.dispatch(
      new fromAction.LoadCustomer({
        userId: userId,
        customerId: customerId,
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
  isCartTransferAllowedForSeller(): Observable<boolean> {
    return combineLatest([
      this.userAccountFacade.get(),
      this.selectedOBOCustomer$,
    ]).pipe(
      map(([seller, oboConsentCustomer]) => {
        if (
          !seller?.roles.includes(FSUserRole.SELLER) ||
          oboConsentCustomer?.uid
        ) {
          return true;
        }
        return false;
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
  /**
   * Method used to create address for  On-Behalf-Of customer by consent holder
   *
   * @param userId The `userId` the identifier of the consent holder
   * @param oboCustomerId The `userId` the identifier of the On-Behalf-Of Customer
   * @param address The `address` the address data
   */
  createAddressForUser(
    userId: string,
    oboCustomerId: string,
    address: Address
  ) {
    this.store.dispatch(
      new fromAction.CreateAddress({
        userId,
        oboCustomerId,
        address,
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

  setSelectedOBOCustomer(customer: FSUser) {
    return this.selectedOBOCustomerSource.next(customer);
  }
}
