import { inject, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import {
  ActiveCartService, AuthService, Cart,
  CheckoutDeliveryService,
  CHECKOUT_FEATURE,
  OCC_USER_ID_CURRENT
} from '@spartacus/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { FSStateWithCheckout } from '../store';
import * as fromFSAction from '../store/actions/index';
import * as fromReducers from './../store/reducers/index';
import { FSCheckoutService } from './checkout.service';

const identificationType = 'idType';
const userId = 'userId';
const cart: Cart = { code: 'cartId', guid: 'guid' };


class CheckoutDeliveryServiceStub {
  setDeliveryMode() { }
}

class MockAuthService {
  getOccUserId(): Observable<string> {
    return of(OCC_USER_ID_CURRENT);
  }
}

class MockActiveCartService {
  getActiveCartId(): Observable<string> {
    return of('cartId');
  }
}

describe('FSCheckoutServiceTest', () => {
  let service: FSCheckoutService;
  let store: Store<FSStateWithCheckout>;
  let checkoutDeliveryService: CheckoutDeliveryService;
  let authService: AuthService;
  let cartService: ActiveCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(CHECKOUT_FEATURE, fromReducers.getReducers()),
      ],
      providers: [
        FSCheckoutService,
        {
          provide: CheckoutDeliveryService,
          useClass: CheckoutDeliveryServiceStub,
        },
        { provide: AuthService, useClass: MockAuthService },
        { provide: ActiveCartService, useClass: MockActiveCartService },
      ],
    });
    service = TestBed.inject(FSCheckoutService);
    checkoutDeliveryService = TestBed.inject(CheckoutDeliveryService);
    store = TestBed.inject(Store);
    authService = TestBed.inject(AuthService);
    cartService = TestBed.inject(ActiveCartService);
    spyOn(checkoutDeliveryService, 'setDeliveryMode').and.callThrough();
    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should check if FSCheckoutService is injected', inject(
    [FSCheckoutService],
    (fsCheckoutService: FSCheckoutService) => {
      expect(fsCheckoutService).toBeTruthy();
    }
  ));

  it('should set identification type', () => {
    service.setIdentificationType(identificationType);
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromFSAction.SetIdentificationType({
        identificationType: identificationType,
        cartId: 'cartId',
        userId: OCC_USER_ID_CURRENT,
      })
    );
  });

  it('should mock delivery mode', () => {
    service.mockDeliveryMode();

    expect(checkoutDeliveryService.setDeliveryMode).toHaveBeenCalled();
  });
});
