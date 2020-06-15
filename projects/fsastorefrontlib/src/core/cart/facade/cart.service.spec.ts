import { Type } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Store, StoreModule } from '@ngrx/store';
import {
  AuthService,
  Cart,
  MultiCartService,
  OCC_CART_ID_CURRENT,
  OCC_USER_ID_ANONYMOUS,
  OCC_USER_ID_CURRENT,
  StateUtils,
  StateWithMultiCart,
  UserToken,
} from '@spartacus/core';
import { BehaviorSubject, Observable, of, ReplaySubject } from 'rxjs';
import * as fromAction from '../../checkout/store/actions/index';
import { reducerProvider } from './../../product-assignment/store/reducers/index';
import { FSCartService } from './cart.service';
import { provideMockStore } from '@ngrx/store/testing';

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
  let multiCartService: MultiCartService;

  beforeEach(() => {
    authService = new MockAuthService();
    const initialState = {
      cart: {
        cartId: 'current',
      },
    };

    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [
        FSCartService,
        reducerProvider,
        {
          provide: AuthService,
          useValue: authService,
        },
        {
          provide: ActivatedRoute,
          useValue: MockActivatedRoute,
        },
        {
          provide: MultiCartService,
          useClass: MultiCartServiceStub,
        },
        provideMockStore({ initialState }),
      ],
    });
    service = TestBed.inject(FSCartService as Type<FSCartService>);
    store = TestBed.inject(Store as Type<Store<StateWithMultiCart>>);
    multiCartService = TestBed.inject(
      MultiCartService as Type<MultiCartService>
    );

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
    const cart$ = new BehaviorSubject<StateUtils.ProcessesLoaderState<Cart>>(
      {}
    );

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

    service.createCartForProduct(
      productCode,
      bundleTemplateId,
      quantity,
      pricingData
    );

    expect(store.dispatch).toHaveBeenCalledWith(
      new fromAction.StartBundle({
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
    const cart$ = new BehaviorSubject<StateUtils.ProcessesLoaderState<Cart>>(
      {}
    );

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

    service.createCartForProduct(
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
      new fromAction.AddOptionalProduct({
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
