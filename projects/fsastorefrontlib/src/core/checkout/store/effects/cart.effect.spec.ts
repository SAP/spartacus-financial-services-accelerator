import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormDataStorageService } from '@fsa/dynamicforms';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import {
  CartActions,
  OCC_USER_ID_CURRENT,
  OCC_USER_ID_ANONYMOUS,
} from '@spartacus/core';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { CartConnector } from '../../../cart';
import * as fromActions from '../actions';
import * as fromEffects from './cart.effect';

const cartId = 'cartId';
const productCode = 'product1';
const entryNumber = '3';
const quantity = '1';
const bundleTemplateId = 'bundleTemplate1';
const pricingData = {};

const categoryCode = 'category1';
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

const cart = {
  cartCode: cartId,
  entry: {
    // product: {
    //   defaultCategory: {
    //     code: categoryCode,
    //   },
    // },
  },
};

const mockCartModification = {
  deliveryModeChanged: true,
  entry: cart.entry,
  quantity: 1,
  quantityAdded: 1,
  statusCode: 'statusCode',
  statusMessage: 'statusMessage',
};

class MockCartConnector {
  addToCart() {
    return of(cart);
  }

  startBundle() {
    return of(cart);
  }
}

class MockFormDataStorageService {
  getFormDataIdByCategory() {
    return formDataId;
  }
}

describe('Cart Effects', () => {
  let actions$: Observable<fromActions.CartAction>;
  let effects: fromEffects.CartEffects;
  let mockCartConnector: MockCartConnector;
  let mockFormDataStorageService: FormDataStorageService;

  beforeEach(() => {
    mockCartConnector = new MockCartConnector();
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, StoreModule.forRoot({})],
      providers: [
        { provide: CartConnector, useValue: mockCartConnector },
        {
          provide: FormDataStorageService,
          useClass: MockFormDataStorageService,
        },

        fromEffects.CartEffects,
        provideMockActions(() => actions$),
      ],
    });
    mockFormDataStorageService = TestBed.inject(
      FormDataStorageService as Type<FormDataStorageService>
    );
    effects = TestBed.inject(
      fromEffects.CartEffects as Type<fromEffects.CartEffects>
    );
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
        userId: OCC_USER_ID_ANONYMOUS,
        cartId: cartId,
        productCode,
        ...mockCartModification,
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.addOptionalProduct$).toBeObservable(expected);
    });
  });

  describe('startBundle$', () => {
    //   it('should be able to start bundle with form data', () => {
    //     formDataId = 'formDataId';
    //     const action = new fromActions.StartBundle({
    //       userId: OCC_USER_ID_ANONYMOUS,
    //       cartId: cartId,
    //       productCode: productCode,
    //       bundleTemplateId: bundleTemplateId,
    //       quantity: quantity,
    //       pricingData: pricingData,
    //     });
    //     const loadCartCompletion = new CartActions.LoadCart({
    //       userId: OCC_USER_ID_ANONYMOUS,
    //       cartId: cartId,
    //       extraData: {
    //         active: true,
    //       },
    //     });
    //     const updateQuoteCompletion = new fromQuoteActions.UpdateQuote({
    //       userId: OCC_USER_ID_ANONYMOUS,
    //       cartId: cartId,
    //       quoteContent: insuranceQuote,
    //     });
    //     const addEntrycompletion = new CartActions.CartAddEntrySuccess({
    //       userId: OCC_USER_ID_ANONYMOUS,
    //       cartId: cartId,
    //       productCode,
    //       ...mockCartModification,
    //     });
    //     actions$ = hot('-a', { a: action });
    //     const expected = cold('-(bcd)', {
    //       b: loadCartCompletion,
    //       c: updateQuoteCompletion,
    //       d: addEntrycompletion,
    //     });
    //     expect(effects.startBundle$).toBeObservable(expected);
    //   });
    // it('should be able to start bundle without form data', () => {
    //   formDataId = undefined;
    //   const action = new fromActions.StartBundle({
    //     userId: OCC_USER_ID_ANONYMOUS,
    //     cartId: cartId,
    //     productCode: productCode,
    //     bundleTemplateId: bundleTemplateId,
    //     quantity: quantity,
    //     pricingData: pricingData,
    //   });
    //   const loadCartCompletion = new CartActions.LoadCart({
    //     userId: OCC_USER_ID_ANONYMOUS,
    //     cartId: cartId,
    //     extraData: {
    //       active: true,
    //     },
    //   });
    //   const addEntrycompletion = new CartActions.CartAddEntrySuccess({
    //     userId: OCC_USER_ID_ANONYMOUS,
    //     cartId: cartId,
    //     productCode,
    //     ...mockCartModification,
    //   });
    //   actions$ = hot('-a', { a: action });
    //   const expected = cold('-(bc)', {
    //     b: loadCartCompletion,
    //     c: addEntrycompletion,
    //   });
    //   expect(effects.startBundle$).toBeObservable(expected);
    // });
    // it('should be able to start bundle for current user without form data', () => {
    //   formDataId = undefined;
    //   const action = new fromActions.StartBundle({
    //     userId: OCC_USER_ID_CURRENT,
    //     cartId: cartId,
    //     productCode: productCode,
    //     bundleTemplateId: bundleTemplateId,
    //     quantity: quantity,
    //     pricingData: pricingData,
    //   });
    //
    //   const loadCartCompletion = new CartActions.LoadCart({
    //     userId: OCC_USER_ID_CURRENT,
    //     cartId: cartId,
    //     extraData: {
    //       active: true,
    //     },
    //   });
    //   const addEntrycompletion = new CartActions.CartAddEntrySuccess({
    //     userId: OCC_USER_ID_CURRENT,
    //     cartId: cartId,
    //     productCode,
    //     ...mockCartModification,
    //   });
    //   actions$ = hot('-a', { a: action });
    //   const expected = cold('-(bc)', {
    //     b: loadCartCompletion,
    //     c: addEntrycompletion,
    //   });
    //   expect(effects.startBundle$).toBeObservable(expected);
    // });
    // it('should be able to process cart increment', () => {
    //   const action = new fromActions.AddOptionalProduct({
    //     cartId: cartId,
    //   });
    //   const completion = new CartActions.CartProcessesIncrement(cartId);
    //   actions$ = hot('-a', { a: action });
    //   const expected = cold('-(b)', {
    //     b: completion,
    //   });
    //   expect(effects.processesIncrement$).toBeObservable(expected);
    // });
  });
});
