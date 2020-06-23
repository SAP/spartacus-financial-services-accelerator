import { Type } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import * as fromReducer from '@spartacus/core';
import {
  Cart,
  CartDataService,
  CheckoutDeliveryService,
  CHECKOUT_FEATURE,
} from '@spartacus/core';
import { FSStateWithCheckout } from '../store';
import * as fromFSAction from '../store/actions/index';
import { FSCheckoutService } from './checkout.service';

const identificationType = 'idType';
const userId = 'userId';
const cart: Cart = { code: 'cartId', guid: 'guid' };

class CartDataServiceStub {
  get userId() {
    return userId;
  }

  get cartId() {
    return cart.code;
  }
}

class CheckoutDeliveryServiceStub {
  setDeliveryMode() {}
}

describe('FSCheckoutServiceTest', () => {
  let service: FSCheckoutService;
  let store: Store<FSStateWithCheckout>;
  let checkoutDeliveryService: CheckoutDeliveryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(CHECKOUT_FEATURE, fromReducer.getReducers()),
      ],
      providers: [
        FSCheckoutService,
        {
          provide: CartDataService,
          useClass: CartDataServiceStub,
        },
        {
          provide: CheckoutDeliveryService,
          useClass: CheckoutDeliveryServiceStub,
        },
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
        cartId: cart.code,
        userId: userId,
      })
    );
  });

  it('should mock delivery mode', () => {
    service.mockDeliveryMode();

    expect(checkoutDeliveryService.setDeliveryMode).toHaveBeenCalled();
  });
});
