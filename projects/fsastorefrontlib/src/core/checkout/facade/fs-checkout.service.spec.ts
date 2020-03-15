import { StoreModule, Store } from '@ngrx/store';
import { TestBed, inject } from '@angular/core/testing';
import { FSCheckoutService } from './fs-checkout.service';
import { Type } from '@angular/core';
import {
  CHECKOUT_FEATURE,
  CartDataService,
  CheckoutDeliveryService,
  Cart,
} from '@spartacus/core';
import * as fromReducer from '@spartacus/core';
import { FSStateWithCheckout } from '../store';
import * as fromFSAction from '../store/actions/index';

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
    service = TestBed.get(FSCheckoutService as Type<FSCheckoutService>);
    checkoutDeliveryService = TestBed.get(CheckoutDeliveryService as Type<
      CheckoutDeliveryService
    >);
    store = TestBed.get(Store as Type<Store<FSStateWithCheckout>>);

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
