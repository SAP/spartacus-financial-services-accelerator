import { Injectable } from '@angular/core';
import * as fromAction from './../store/actions';
import { StateWithMyAccount } from '../store/my-account-state';
import { select, Store } from '@ngrx/store';
import * as fromConsentStore from './../store';
import {
  UserIdService,
  Address,
  GlobalMessageService,
  GlobalMessageType,
} from '@spartacus/core';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { UserAccountFacade } from '@spartacus/user/account/root';
import { map, tap } from 'rxjs/operators';
import { FSCart, FSUser, FSUserRole } from '../../../occ/occ-models/occ.models';
import { ConsentConnector } from '../../../core/my-account/connectors/consent.connector';

@Injectable({
  providedIn: 'root',
})
export class ConsentService {
  private selectedOBOCustomerSource = new BehaviorSubject<FSUser>(null);
  readonly selectedOBOCustomer$ = this.selectedOBOCustomerSource.asObservable();
  private userAddressAddedSource = new BehaviorSubject<boolean>(false);
  readonly userAddressAdded$ = this.userAddressAddedSource.asObservable();

  constructor(
    protected store: Store<StateWithMyAccount>,
    protected userIdService: UserIdService,
    protected userAccountFacade: UserAccountFacade,
    protected consentConnector: ConsentConnector,
    protected globalMessageService: GlobalMessageService
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

  loadCustomerClaims(userId, customerId) {
    this.store.dispatch(
      new fromAction.LoadCustomerClaims({
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

  /**
   * Method used to create address for  On-Behalf-Of customer by consent holder
   *
   * @param userId The `userId` the identifier of the consent holder
   * @param oboCustomerId The `oboCustomerId` the identifier of the On-Behalf-Of Customer
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

  /**
   * Method used to update address for On-Behalf-Of customer by consent holder
   *
   * @param userId The `userId` the identifier of the consent holder
   * @param oboCustomerId The `oboCustomerId` the identifier of the On-Behalf-Of Customer
   * @param addressId The `addressId` the identifier of the On-Behalf-Of Customer
   * @param address The `address` the address data
   */
  updateAddressForUser(
    userId: string,
    oboCustomerId: string,
    addressId: string,
    address: Address
  ): Observable<any> {
    return this.consentConnector.updateAddressForUser(
      userId,
      oboCustomerId,
      addressId,
      address
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

  updateOBOPermission(
    userId: string,
    customerUid: string,
    permissionKey: string,
    permissionValue: boolean
  ): Observable<{}> {
    return this.consentConnector
      .updateOBOPermission(userId, customerUid, permissionKey, permissionValue)
      .pipe(
        tap(() => {
          if (permissionValue) {
            this.globalMessageService.add(
              { key: 'consentManagementForm.message.success.given' },
              GlobalMessageType.MSG_TYPE_CONFIRMATION
            );
          } else {
            this.globalMessageService.add(
              { key: 'consentManagementForm.message.success.withdrawn' },
              GlobalMessageType.MSG_TYPE_CONFIRMATION
            );
          }
        })
      );
  }

  setUserAddressAdded(changed: boolean) {
    return this.userAddressAddedSource.next(changed);
  }
}
