import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromStore from '../store';
import { Order } from '@spartacus/core';

@Injectable()
export class UserService {
  readonly user$: Observable<any> = this.store.pipe(
    select(fromStore.getDetails)
  );

  readonly orderDetails$: Observable<Order> = this.store.pipe(
    select(fromStore.getOrderDetails)
  );

  readonly orderList$: Observable<any> = this.store.pipe(
    select(fromStore.getOrders)
  );
  readonly orderListLoaded$: Observable<boolean> = this.store.pipe(
    select(fromStore.getOrdersLoaded)
  );

  readonly paymentMethods$: Observable<any> = this.store.pipe(
    select(fromStore.getPaymentMethods)
  );
  readonly paymentMethodsLoading$: Observable<boolean> = this.store.pipe(
    select(fromStore.getPaymentMethodsLoading)
  );

  readonly addresses$: Observable<any> = this.store.pipe(
    select(fromStore.getAddresses)
  );
  readonly addressesLoading$: Observable<boolean> = this.store.pipe(
    select(fromStore.getAddressesLoading)
  );

  readonly titles$: Observable<any> = this.store.pipe(
    select(fromStore.getAllTitles)
  );

  readonly allDeliveryCountries$: Observable<any> = this.store.pipe(
    select(fromStore.getAllDeliveryCountries)
  );

  readonly allRegions$: Observable<any> = this.store.pipe(
    select(fromStore.getAllRegions)
  );

  constructor(private store: Store<fromStore.UserState>) {}

  loadUserDetails(userId: string) {
    this.store.dispatch(new fromStore.LoadUserDetails(userId));
  }

  loadTitles() {
    this.store.dispatch(new fromStore.LoadTitles());
  }

  registerUser(
    titleCode: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) {
    this.store.dispatch(
      new fromStore.RegisterUser({
        firstName: firstName,
        lastName: lastName,
        password: password,
        titleCode: titleCode,
        uid: email
      })
    );
  }

  getCountry(isocode: string): Observable<any> {
    return this.store.pipe(select(fromStore.countrySelectorFactory(isocode)));
  }

  loadDeliveryCountries() {
    this.store.dispatch(new fromStore.LoadDeliveryCountries());
  }

  loadRegions(countryIsoCode: string) {
    this.store.dispatch(new fromStore.LoadRegions(countryIsoCode));
  }

  loadOrderDetails(userId: string, orderCode: string) {
    this.store.dispatch(
      new fromStore.LoadOrderDetails({
        userId: userId,
        orderCode: orderCode
      })
    );
  }

  clearOrderDetails() {
    this.store.dispatch(new fromStore.ClearOrderDetails());
  }

  loadOrderList(
    userId: string,
    pageSize: number,
    currentPage?: number,
    sort?: string
  ) {
    this.store.dispatch(
      new fromStore.LoadUserOrders({
        userId: userId,
        pageSize: pageSize,
        currentPage: currentPage,
        sort: sort
      })
    );
  }

  loadPaymentMethods(userId: string) {
    this.store.dispatch(new fromStore.LoadUserPaymentMethods(userId));
  }

  loadAddresses(userId: string) {
    this.store.dispatch(new fromStore.LoadUserAddresses(userId));
  }
}
