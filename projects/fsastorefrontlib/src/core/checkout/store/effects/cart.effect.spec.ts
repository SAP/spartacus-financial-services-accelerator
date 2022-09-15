import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FormDataStorageService } from '@spartacus/dynamicforms';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { CartActions, OccConfig } from '@spartacus/core';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { CartConnector } from '../../../cart';
import * as fromActions from '../actions';
import * as fromEffects from './cart.effect';
import * as fromQuoteActions from '../../../my-account/store/actions/quote.action';

const cartId = 'cartId';
const userId = 'testUserId';
const productCode = 'testProductCode';
const entryNumber = 'testEntryNumber';
const quantity = '1';
const bundleTemplateId = 'testBundleTemplateId';

const MockOccModuleConfig: OccConfig = {
  backend: {
    occ: {
      baseUrl: '',
      prefix: '',
    },
  },
};

const formDataId = 'formDataId';
const formId = 'formId';
const insuranceQuote = {
  quoteDetails: {
    entry: [
      {
        key: formId,
        value: formDataId,
      },
    ],
  },
};

const simpleCartPayload: any = {
  cartId: cartId,
  userId: userId,
};

class MockFormDataStorageService {
  getFormDataIdByCategory() {
    return formDataId;
  }
}

class MockCartConnector {
  addToCart() {}
  startBundle() {}
}

describe('Cart Effects', () => {
  let actions$: Observable<Action>;
  let effects: fromEffects.CartEffects;
  let mockFormDataStorageService: FormDataStorageService;
  let mockCartConnector: CartConnector;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: CartConnector, useClass: MockCartConnector },
        {
          provide: FormDataStorageService,
          useClass: MockFormDataStorageService,
        },
        { provide: OccConfig, useValue: MockOccModuleConfig },
        fromEffects.CartEffects,
        provideMockActions(() => actions$),
      ],
    });
    mockFormDataStorageService = TestBed.inject(FormDataStorageService);
    mockCartConnector = TestBed.inject(CartConnector);
    effects = TestBed.inject(fromEffects.CartEffects);
  });

  describe('addOptionalProduct$', () => {
    it('should add optional product to the cart', () => {
      spyOn(mockCartConnector, 'addToCart').and.returnValue(
        of(simpleCartPayload)
      );
      const action = new fromActions.AddOptionalProduct({
        userId: userId,
        cartId: cartId,
        productCode: productCode,
        quantity: quantity,
        entryNumber: entryNumber,
      });

      const completion = new CartActions.CartAddEntrySuccess({
        ...simpleCartPayload,
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.addOptionalProduct$).toBeObservable(expected);
    });
  });

  describe('startBundle$', () => {
    it('should be able to start bundle without form data', () => {
      const cartPayload: any = {
        cartCode: cartId,
        userId: userId,
      };
      spyOn(mockCartConnector, 'startBundle').and.returnValue(of(cartPayload));
      const action = new fromActions.StartBundle({
        userId: userId,
        cartId: cartId,
        productCode: productCode,
        bundleTemplateId: bundleTemplateId,
        quantity: quantity,
        pricingData: {},
      });

      const loadCartCompletion = new CartActions.LoadCart({
        userId: userId,
        cartId: cartId,
        extraData: {
          active: true,
        },
      });

      const addEntryCompletion = new CartActions.CartAddEntrySuccess({
        ...simpleCartPayload,
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-(bc)', {
        b: loadCartCompletion,
        c: addEntryCompletion,
      });
      expect(effects.startBundle$).toBeObservable(expected);
    });

    it('should be able to start bundle with form data', () => {
      const cartPayload: any = {
        entry: {
          product: {
            defaultCategory: {
              code: 'testCategory',
            },
          },
        },
        cartCode: cartId,
        userId: userId,
      };
      spyOn(mockCartConnector, 'startBundle').and.returnValue(of(cartPayload));
      const action = new fromActions.StartBundle({
        userId: userId,
        cartId: cartId,
        productCode: productCode,
        bundleTemplateId: bundleTemplateId,
        quantity: quantity,
        pricingData: {},
      });

      const loadCartCompletion = new CartActions.LoadCart({
        userId: userId,
        cartId: cartId,
        extraData: {
          active: true,
        },
      });
      const updateQuoteCompletion = new fromQuoteActions.UpdateQuote({
        userId: userId,
        cartId: cartId,
        quoteContent: insuranceQuote,
      });

      const responsePayload: any = {
        product: {
          defaultCategory: {
            code: 'testCategory',
          },
        },
        cartId: cartId,
        userId: userId,
      };
      const addEntryCompletion = new CartActions.CartAddEntrySuccess({
        ...responsePayload,
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-(bcd)', {
        b: loadCartCompletion,
        c: updateQuoteCompletion,
        d: addEntryCompletion,
      });
      expect(effects.startBundle$).toBeObservable(expected);
    });
  });
});
