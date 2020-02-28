import {
  OCC_USER_ID_CURRENT,
  CartActions,
  OCC_USER_ID_ANONYMOUS,
} from '@spartacus/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import * as fromActions from '../actions';
import * as fromEffects from './fs-cart.effect';
import { FsCartConnector } from '../../../cart';
import { FormDataService } from '@fsa/dynamicforms';
import * as fromQuoteActions from '../../../my-account/store/actions/quote.action';

const cartId = 'cartId';
const productCode = 'product1';
const entryNumber = '3';
const quantity = '1';
const bundleTemplateId = 'bundleTemplate1';
const pricingData = {};

const categoryCode = 'category1';
let formDataId = 'formDataId';
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

const cart = {
  cartCode: cartId,
  entry: {
    product: {
      defaultCategory: {
        code: categoryCode,
      },
    },
  },
};

class MockOccFSCartAdapter {
  addToCart() {
    return of(cart);
  }

  startBundle() {
    return of(cart);
  }
}

class MockFormDataService {
  getFormDataIdByCategory() {
    return formDataId;
  }
}

describe('FS Checkout Effects', () => {
  let actions$: Observable<fromActions.FSCartAction>;
  let effects: fromEffects.FSCartEffects;
  let mockOccCartAdapter: MockOccFSCartAdapter;
  let mockFormDataService: MockFormDataService;

  beforeEach(() => {
    mockOccCartAdapter = new MockOccFSCartAdapter();
    mockFormDataService = new MockFormDataService();
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, StoreModule.forRoot({})],
      providers: [
        { provide: FsCartConnector, useValue: mockOccCartAdapter },
        { provide: FormDataService, useValue: mockFormDataService },

        fromEffects.FSCartEffects,
        provideMockActions(() => actions$),
      ],
    });
    effects = TestBed.get(fromEffects.FSCartEffects as Type<
      fromEffects.FSCartEffects
    >);
  });

  describe('addOptionalProduct$', () => {
    it('should add optional product to the cart with form data', () => {
      const action = new fromActions.AddOptionalProduct({
        userId: OCC_USER_ID_CURRENT,
        cartId: cartId,
        productCode: productCode,
        quantity: quantity,
        entryNumber: entryNumber,
      });

      const completion = new CartActions.CartAddEntrySuccess({
        ...cart.entry,
        userId: OCC_USER_ID_CURRENT,
        cartId: cartId,
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.addOptionalProduct$).toBeObservable(expected);
    });
  });

  describe('startBundle$', () => {
    it('should be able to start bundle with form data', () => {
      formDataId = 'formDataId';
      const action = new fromActions.StartBundle({
        userId: OCC_USER_ID_ANONYMOUS,
        cartId: cartId,
        productCode: productCode,
        bundleTemplateId: bundleTemplateId,
        quantity: quantity,
        pricingData: pricingData,
      });

      const updateQuoteCompletion = new fromQuoteActions.UpdateQuote({
        userId: OCC_USER_ID_ANONYMOUS,
        cartId: cartId,
        quoteContent: insuranceQuote,
      });

      const addEntrycompletion = new CartActions.CartAddEntrySuccess({
        ...cart.entry,
        userId: OCC_USER_ID_ANONYMOUS,
        cartId: cartId,
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-(bc)', {
        b: updateQuoteCompletion,
        c: addEntrycompletion,
      });
      expect(effects.startBundle$).toBeObservable(expected);
    });

    it('should be able to start bundle without form data', () => {
      formDataId = undefined;

      const action = new fromActions.StartBundle({
        userId: OCC_USER_ID_ANONYMOUS,
        cartId: cartId,
        productCode: productCode,
        bundleTemplateId: bundleTemplateId,
        quantity: quantity,
        pricingData: pricingData,
      });

      const addEntrycompletion = new CartActions.CartAddEntrySuccess({
        ...cart.entry,
        userId: OCC_USER_ID_ANONYMOUS,
        cartId: cartId,
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-(b)', {
        b: addEntrycompletion,
      });
      expect(effects.startBundle$).toBeObservable(expected);
    });

    it('should be able to start bundle for current user without form data', () => {
      formDataId = undefined;
      const action = new fromActions.StartBundle({
        userId: OCC_USER_ID_CURRENT,
        cartId: cartId,
        productCode: productCode,
        bundleTemplateId: bundleTemplateId,
        quantity: quantity,
        pricingData: pricingData,
      });

      const addEntrycompletion = new CartActions.CartAddEntrySuccess({
        ...cart.entry,
        userId: OCC_USER_ID_CURRENT,
        cartId: cartId,
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-(b)', {
        b: addEntrycompletion,
      });
      expect(effects.startBundle$).toBeObservable(expected);
    });

    it('should be able to process cart increment', () => {
      const action = new fromActions.AddOptionalProduct({
        cartId: cartId,
      });
      const completion = new CartActions.CartProcessesIncrement(cartId);

      actions$ = hot('-a', { a: action });
      const expected = cold('-(b)', {
        b: completion,
      });
      expect(effects.processesIncrement$).toBeObservable(expected);
    });
  });
});
