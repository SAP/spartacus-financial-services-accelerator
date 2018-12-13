import { TestBed, inject } from '@angular/core/testing';
import { StoreModule, Store } from '@ngrx/store';

import * as fromStore from '../store';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let store: Store<fromStore.UserState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('user', fromStore.getReducers())
      ],
      providers: [UserService]
    });

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
    service = TestBed.get(UserService);
  });

  it('should UserService is injected', inject(
    [UserService],
    (userService: UserService) => {
      expect(userService).toBeTruthy();
    }
  ));

  it('should be able to get user details', () => {
    store.dispatch(
      new fromStore.LoadUserDetailsSuccess({ userId: 'testUser' })
    );

    let userDetails;
    service.user$.subscribe(data => {
      userDetails = data;
    });
    expect(userDetails).toEqual({ userId: 'testUser' });
  });

  it('should be able to get titles data', () => {
    store.dispatch(
      new fromStore.LoadTitlesSuccess([
        { code: 't1', name: 't1' },
        { code: 't2', name: 't2' }
      ])
    );
    let titles;
    service.titles$.subscribe(data => {
      titles = data;
    });
    expect(titles).toEqual([
      { code: 't1', name: 't1' },
      { code: 't2', name: 't2' }
    ]);
  });

  it('should be able to get user address', () => {
    store.dispatch(
      new fromStore.LoadUserAddressesSuccess(['address1', 'address2'])
    );

    let addresses;
    service.addresses$.subscribe(data => {
      addresses = data;
    });
    expect(addresses).toEqual(['address1', 'address2']);
  });

  it('should be able to get Address loading flag', () => {
    store.dispatch(new fromStore.LoadUserAddresses('testUserId'));

    let flag;
    service.addressesLoading$.subscribe(data => {
      flag = data;
    });
    expect(flag).toEqual(true);
  });

  it('should be able to get user payment methods', () => {
    store.dispatch(
      new fromStore.LoadUserPaymentMethodsSuccess(['method1', 'method2'])
    );

    let paymentMethods;
    service.paymentMethods$.subscribe(data => {
      paymentMethods = data;
    });
    expect(paymentMethods).toEqual(['method1', 'method2']);
  });

  it('should be able to get user payment methods loading flag', () => {
    store.dispatch(new fromStore.LoadUserPaymentMethods('testUserId'));

    let flag;
    service.paymentMethodsLoading$.subscribe(data => {
      flag = data;
    });
    expect(flag).toEqual(true);
  });

  it('should be able to get all delivery countries', () => {
    store.dispatch(
      new fromStore.LoadDeliveryCountriesSuccess([
        { isocode: 'c1', name: 'n1' },
        { isocode: 'c2', name: 'n2' }
      ])
    );
    let countries;
    service.allDeliveryCountries$.subscribe(data => {
      countries = data;
    });
    expect(countries).toEqual([
      { isocode: 'c1', name: 'n1' },
      { isocode: 'c2', name: 'n2' }
    ]);
  });

  it('should be able to get all regions', () => {
    store.dispatch(new fromStore.LoadRegionsSuccess(['r1', 'r2']));

    let regions;
    service.allRegions$.subscribe(data => {
      regions = data;
    });
    expect(regions).toEqual(['r1', 'r2']);
  });

  it('should be able to get order details', () => {
    store.dispatch(
      new fromStore.LoadOrderDetailsSuccess({ code: 'testOrder' })
    );

    let order;
    service.orderDetails$.subscribe(data => {
      order = data;
    });
    expect(order).toEqual({ code: 'testOrder' });
  });

  it('should be able to get order list', () => {
    store.dispatch(new fromStore.LoadUserOrdersSuccess([]));

    let orderList;
    service.orderList$.subscribe(data => {
      orderList = data;
    });
    expect(orderList).toEqual([]);
  });

  it('should be able to get order list loaded flag', () => {
    store.dispatch(
      new fromStore.LoadUserOrders({ userId: 'testUserId', pageSize: 10 })
    );

    let orderListLoaded;
    service.orderListLoaded$.subscribe(data => {
      orderListLoaded = data;
    });
    expect(orderListLoaded).toEqual(false);
  });

  it('should be able to get country by isocode', () => {
    store.dispatch(
      new fromStore.LoadDeliveryCountriesSuccess([
        { isocode: 'c1', name: 'n1' },
        { isocode: 'c2', name: 'n2' }
      ])
    );

    let country;
    service.getCountry('c1').subscribe(data => {
      country = data;
    });
    expect(country).toEqual({ isocode: 'c1', name: 'n1' });
  });

  it('should be able to load user details', () => {
    service.loadUserDetails('testUserId');
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromStore.LoadUserDetails('testUserId')
    );
  });

  it('should be able to load titles', () => {
    service.loadTitles();
    expect(store.dispatch).toHaveBeenCalledWith(new fromStore.LoadTitles());
  });

  it('should be able to register user', () => {
    service.registerUser('title', 'firstname', 'lastname', 'email', 'password');
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromStore.RegisterUser({
        firstName: 'firstname',
        lastName: 'lastname',
        password: 'password',
        titleCode: 'title',
        uid: 'email'
      })
    );
  });

  it('should be able to load delivery countries', () => {
    service.loadDeliveryCountries();
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromStore.LoadDeliveryCountries()
    );
  });

  it('should be able to load regions based on country isocode', () => {
    service.loadRegions('ca');
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromStore.LoadRegions('ca')
    );
  });

  it('should be able to load order details', () => {
    service.loadOrderDetails('userId', 'orderCode');
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromStore.LoadOrderDetails({
        userId: 'userId',
        orderCode: 'orderCode'
      })
    );
  });

  it('should be able to clear order details', () => {
    service.clearOrderDetails();
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromStore.ClearOrderDetails()
    );
  });

  it('should be able to load order list data', () => {
    service.loadOrderList('userId', 10, 1, 'byDate');
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromStore.LoadUserOrders({
        userId: 'userId',
        pageSize: 10,
        currentPage: 1,
        sort: 'byDate'
      })
    );
  });

  it('should be able to load user payment methods', () => {
    service.loadPaymentMethods('testUserId');
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromStore.LoadUserPaymentMethods('testUserId')
    );
  });

  it('should be able to load user addresses', () => {
    service.loadAddresses('testUserId');
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromStore.LoadUserAddresses('testUserId')
    );
  });
});
