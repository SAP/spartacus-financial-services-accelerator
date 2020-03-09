import { reducerProvider } from './../../product-assignment/store/reducers/index';
import { TestBed, inject } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { FSCartService } from './fs-cart.service';
import {
  OCC_USER_ID_CURRENT,
  UserToken,
  StateWithMultiCart,
  Cart,
  AuthService,
  MultiCartService,
  ProcessesLoaderState,
  OCC_CART_ID_CURRENT,
  OCC_USER_ID_ANONYMOUS,
} from '@spartacus/core';
import { Observable, ReplaySubject, of, BehaviorSubject } from 'rxjs';

import { ActivatedRoute } from '@angular/router';
import { Type } from '@angular/core';
import * as fromReducer from '@spartacus/core';
import * as fromFSAction from '../../checkout/store/actions/index';

const productCode = 'PRODUCT_CODE';
const bundleTemplateId = 'BUNDLE_ID';
const quantity = 1;
const entryNumber = '1';
const pricingData = {};
const userId = OCC_USER_ID_CURRENT;
const cartCode = OCC_CART_ID_CURRENT;

const userToken$ = new ReplaySubject<UserToken>();

class MockAuthService {
  getOccUserId(): Observable<string> {
    return of(OCC_USER_ID_CURRENT);
  }
  getUserToken(): Observable<UserToken> {
    return userToken$.asObservable();
  }
}

class MockActivatedRoute {
  params = of();
}

class MultiCartServiceStub {
  loadCart() {}
  createCart() {}
}

describe('FSCartServiceTest', () => {
  let service: FSCartService;
  let store: Store<StateWithMultiCart>;
  let authService: MockAuthService;
  const activatedRoute: MockActivatedRoute;
  let multiCartService: MultiCartService;

  beforeEach(() => {
    authService = new MockAuthService();

    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(
          'multi-cart',
          fromReducer.getMultiCartReducers()
        ),
      ],
      providers: [
        FSCartService,
        reducerProvider,
        {
          provide: AuthService,
          useValue: authService,
        },
        {
          provide: ActivatedRoute,
          useValue: activatedRoute,
        },
        {
          provide: MultiCartService,
          useClass: MultiCartServiceStub,
        },
      ],
    });
    service = TestBed.get(FSCartService as Type<FSCartService>);
    store = TestBed.get(Store as Type<Store<StateWithMultiCart>>);
    multiCartService = TestBed.get(MultiCartService as Type<MultiCartService>);

    spyOn(multiCartService, 'loadCart').and.callThrough();
    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should check if FSCartService is injected', inject(
    [FSCartService],
    (fsCartService: FSCartService) => {
      expect(fsCartService).toBeTruthy();
    }
  ));

  it('should be able to create cart and start bundle', () => {
    const cart$ = new BehaviorSubject<ProcessesLoaderState<Cart>>({});

    spyOn(multiCartService, 'createCart').and.callFake(() => {
      cart$.next({
        loading: false,
        success: true,
        error: false,
        value: {
          code: cartCode,
        },
      });
      return cart$;
    });

    service.createCartAndStartBundle(
      productCode,
      bundleTemplateId,
      quantity,
      pricingData
    );

    expect(store.dispatch).toHaveBeenCalledWith(
      new fromFSAction.StartBundle({
        userId: userId,
        cartId: cartCode,
        productCode: productCode,
        bundleTemplateId: bundleTemplateId,
        quantity: quantity,
        pricingData: pricingData,
      })
    );
  });

  it('should not be able to start bundle for created cart', () => {
    const cart$ = new BehaviorSubject<ProcessesLoaderState<Cart>>({});

    spyOn(multiCartService, 'createCart').and.callFake(() => {
      cart$.next({
        loading: false,
        success: false,
        error: true,
        value: {
          code: cartCode,
        },
      });
      return cart$;
    });

    service.createCartAndStartBundle(
      productCode,
      bundleTemplateId,
      quantity,
      pricingData
    );
    expect(store.dispatch).not.toHaveBeenCalled();
  });

  it('should be able to add optional product', () => {
    service.addOptionalProduct(productCode, quantity, entryNumber);
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromFSAction.AddOptionalProduct({
        userId: userId,
        cartId: cartCode,
        productCode: productCode,
        quantity: quantity,
        entryNumber: entryNumber,
      })
    );
  });

  it('should be able to load cart for logged in user', () => {
    service.loadCart(cartCode);
    expect(multiCartService.loadCart).toHaveBeenCalled();
  });

  it('should be able to load cart for anonymous user', () => {
    service.fsUserId = OCC_USER_ID_ANONYMOUS;
    service.loadCart(cartCode);

    expect(multiCartService.loadCart).not.toHaveBeenCalled();
  });

  it('should be able to load cart for anonymous user with undefined cart code', () => {
    service.fsUserId = OCC_USER_ID_ANONYMOUS;
    service.loadCart(undefined);

    expect(multiCartService.loadCart).not.toHaveBeenCalled();
  });

  it('should be able to load cart for logged in user with undefined cart code', () => {
    service.loadCart(undefined);
    expect(multiCartService.loadCart).toHaveBeenCalled();
  });
});
