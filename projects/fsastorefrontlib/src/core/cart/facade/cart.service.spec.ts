import { inject, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import {
  OCC_USER_ID_CURRENT,
  OCC_USER_ID_ANONYMOUS,
  OCC_CART_ID_CURRENT,
  UserIdService,
} from '@spartacus/core';
import {
  CartActions,
  MultiCartService,
  StateWithMultiCart,
} from '@spartacus/cart/base/core';
import { Observable, of } from 'rxjs';
import { FSCartService } from './cart.service';
import * as fromAction from './../../checkout/store/actions/index';
import { MultiCartFacade } from '@spartacus/cart/base/root';

const productCode = 'testProduct';
const bundleCode = 'bundleCode';
const entryCode = 'entryCode';
const activeCartId = 'activeCartId';

const mockCartState = {
  active: activeCartId,
};

class MultiCartServiceStub {
  loadCart() {}
  createCart() {
    return of({
      value: {
        code: activeCartId,
      },
      success: true,
      loading: false,
    });
  }
}

class MultiCartFacadStub {
  loadCart() {}
  deleteCart() {}
  initAddEntryProcess() {}
  getCartEntity() {
    return of();
  }
  assignEmail() {}
  getEntry() {
    return of();
  }
  getLastEntry() {
    return of();
  }
  updateEntry() {}
  removeEntry() {}
  getEntries() {
    return of([]);
  }
  createCart() {}
  mergeToCurrentCart() {}
  addEntry() {}
  addEntries() {}
  isStable() {}
  getCartIdByType(): Observable<string> {
    return of('');
  }
}

class MockUserIdService {
  getUserId(): Observable<string> {
    return of(OCC_USER_ID_CURRENT);
  }
}

describe('FSCartServiceTest', () => {
  let service: FSCartService;
  let multiCartService: MultiCartService;
  let userIdService: UserIdService;
  let store: Store<StateWithMultiCart>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({ cart: () => mockCartState })],
      providers: [
        FSCartService,
        { provide: MultiCartService, useClass: MultiCartServiceStub },
        { provide: MultiCartFacade, useClass: MultiCartFacadStub },
        {
          provide: UserIdService,
          useClass: MockUserIdService,
        },
      ],
    });
    service = TestBed.inject(FSCartService);
    multiCartService = TestBed.inject(MultiCartService);
    userIdService = TestBed.inject(UserIdService);
    store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should inject Cart Service', inject(
    [FSCartService],
    (cartService: FSCartService) => {
      expect(cartService).toBeTruthy();
    }
  ));

  it('should create cart for product', () => {
    spyOn(service, 'getActiveCartId').and.returnValue(of('activeCartId'));
    service.createCartForProduct(productCode, bundleCode, 1, {});
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromAction.StartBundle({
        userId: OCC_USER_ID_CURRENT,
        cartId: mockCartState.active,
        productCode: productCode,
        bundleTemplateId: bundleCode,
        quantity: 1,
        pricingData: {},
      })
    );
  });

  it('should start bundle for product when active cart does not exist and user is anonymous', () => {
    spyOn(service, 'getActiveCartId').and.returnValue(of(undefined));
    spyOn(userIdService, 'getUserId').and.returnValue(
      of(OCC_USER_ID_ANONYMOUS)
    );
    service.createCartForProduct(productCode, bundleCode, 1, {});
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromAction.StartBundle({
        userId: OCC_USER_ID_ANONYMOUS,
        cartId: undefined,
        productCode: productCode,
        bundleTemplateId: bundleCode,
        quantity: 1,
        pricingData: {},
      })
    );
  });

  it('should load cart for registered user', () => {
    spyOn(multiCartService, 'loadCart').and.callThrough();

    service.loadCart('activeCartId', OCC_USER_ID_CURRENT);
    expect(multiCartService.loadCart).toHaveBeenCalledWith({
      userId: OCC_USER_ID_CURRENT,
      cartId: 'activeCartId',
      extraData: {
        active: true,
      },
    });
  });

  it('should load cart with current cart code', () => {
    spyOn(multiCartService, 'loadCart').and.callThrough();
    service.loadCart(undefined, OCC_CART_ID_CURRENT);
    expect(multiCartService.loadCart).toHaveBeenCalledWith({
      userId: OCC_USER_ID_CURRENT,
      cartId: OCC_CART_ID_CURRENT,
      extraData: {
        active: true,
      },
    });
  });

  it('should add optional product to cart', () => {
    spyOn(service, 'getActiveCartId').and.returnValue(of('activeCartId'));
    service.addOptionalProduct(productCode, 1, entryCode);
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromAction.AddOptionalProduct({
        userId: OCC_USER_ID_CURRENT,
        cartId: 'activeCartId',
        productCode: productCode,
        quantity: 1,
        entryNumber: entryCode,
      })
    );
  });

  it('should dispatch RemoveCart action', () => {
    service.removeCart('cartId');
    expect(store.dispatch).toHaveBeenCalledWith(
      new CartActions.RemoveCart({
        cartId: 'cartId',
      })
    );
  });
});
