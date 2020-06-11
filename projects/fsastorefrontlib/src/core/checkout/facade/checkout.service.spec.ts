import { Type } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import * as fromReducer from '@spartacus/core';
import { provideMockStore } from '@ngrx/store/testing';

import {
  Cart,
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
    const initialState = {
      checkout: {},
    };

    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [
        FSCheckoutService,
        {
          provide: CheckoutDeliveryService,
          useClass: CheckoutDeliveryServiceStub,
        },
        provideMockStore({ initialState }),
      ],
    });
    service = TestBed.get(FSCheckoutService as Type<FSCheckoutService>);
    checkoutDeliveryService = TestBed.get(
      CheckoutDeliveryService as Type<CheckoutDeliveryService>
    );
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
