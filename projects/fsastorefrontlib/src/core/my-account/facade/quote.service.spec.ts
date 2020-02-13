import { TestBed, inject } from '@angular/core/testing';
import * as fromReducer from './../store/reducers';
import { Store, StoreModule } from '@ngrx/store';
import { Type } from '@angular/core';
import { reducerProvider, reducerToken } from './../store/reducers/index';
import { QuoteService } from './quote.service';
import { AuthService, CartActions, OCC_USER_ID_CURRENT } from '@spartacus/core';
import { FormDataService } from '@fsa/dynamicforms';
import { of, Observable } from 'rxjs';
import * as fromAction from './../store/actions';
import { FSCartService } from '../../cart/facade/fs-cart.service';

const userId = OCC_USER_ID_CURRENT;
const cartId = '0000001';
const formId = 'formId';
const formDefinitionId = 'formDefinitionId';

const mockFormData = {
  id: formId,
  formDefinition: {
    formId: formDefinitionId,
  },
};

const cartWithOneEntry = {
  deliveryOrderGroups: [
    {
      entries: [
        {
          product: {
            defaultCategory: {
              code: 'testCategory',
            },
          },
        },
      ],
    },
  ],
};

const cartWithoutEntries = {
  deliveryOrderGroups: [],
};

class MockAuthService {
  getOccUserId(): Observable<string> {
    return of(OCC_USER_ID_CURRENT);
  }
}

class MockFormDataService {
  formData;
  getFormData() {
    return of(this.formData);
  }

  setFormDataToLocalStorage() {}
}

const mockCart = {
  deliveryOrderGroups: [
    {
      entries: [
        {
          formDataData: [
            {
              id: 'formDataId',
              formDefinition: {
                formId: 'formDefinitionId',
              },
            },
          ],
          product: {
            defaultCategory: {
              code: 'category',
            },
          },
        },
      ],
    },
  ],
  insuranceQuote: {
    quoteDetails: {
      entry: [{ key: 'formId', value: 'testFormId' }],
    },
  },
};

class MockCartService {
  cart;
  getActive() {
    return of(this.cart);
  }
}

describe('QuoteServiceTest', () => {
  let service: QuoteService;
  let store: Store<fromReducer.UserState>;
  let cartService: MockCartService;
  let formDataService: MockFormDataService;
  let authService: MockAuthService;

  beforeEach(() => {
    authService = new MockAuthService();
    cartService = new MockCartService();
    formDataService = new MockFormDataService();

    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('assets', reducerToken),
      ],
      providers: [
        QuoteService,
        reducerProvider,
        { provide: FSCartService, useValue: cartService },
        { provide: FormDataService, useValue: formDataService },
        { provide: AuthService, useValue: authService },
      ],
    });

    service = TestBed.get(QuoteService as Type<QuoteService>);
    cartService = TestBed.get(FSCartService as Type<FSCartService>);
    store = TestBed.get(Store as Type<Store<fromReducer.UserState>>);

    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should QuoteService is injected', inject(
    [QuoteService],
    (quoteService: QuoteService) => {
      expect(quoteService).toBeTruthy();
    }
  ));

  it('should be able to load quotes', () => {
    service.loadQuotes();
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromAction.LoadQuotes({ userId: userId })
    );
  });

  it('should be able to check if quotes are loaded', () => {
    store.dispatch(
      new fromAction.LoadQuotesSuccess({
        cartId: cartId,
      })
    );
    let loaded;
    service
      .getQuotesLoaded()
      .subscribe(response => {
        loaded = response;
      })
      .unsubscribe();
    expect(loaded).toEqual(true);
  });

  it('should be able to loade quotes', () => {
    store.dispatch(
      new fromAction.LoadQuotesSuccess({
        cartId: cartId,
      })
    );
    let loaded;
    service
      .getQuotes()
      .subscribe(response => {
        loaded = response;
      })
      .unsubscribe();
    expect(loaded).toEqual({
      cartId: cartId,
    });
  });

  it('should be able to bind quote', () => {
    service.bindQuote(cartId);
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromAction.BindQuote({ userId: userId, cartId: cartId })
    );
  });

  it('should be able to retrieve quote with full cart', () => {
    cartService.cart = mockCart;
    formDataService.formData = mockFormData;
    service.retrieveQuote({ cartCode: cartId });
    expect(store.dispatch).toHaveBeenCalledWith(
      new CartActions.LoadCart({ cartId: cartId, userId: userId })
    );
  });

  it('should be able to retrieve quote with empty cart', () => {
    cartService.cart = cartWithoutEntries;
    service.retrieveQuote({ cartCode: cartId });
    expect(store.dispatch).toHaveBeenCalledWith(
      new CartActions.LoadCart({ cartId: cartId, userId: userId })
    );
  });

  it('should be able to retrieve quote with entries without forms', () => {
    cartService.cart = cartWithOneEntry;
    service.retrieveQuote({ cartCode: cartId });
    expect(store.dispatch).toHaveBeenCalledWith(
      new CartActions.LoadCart({ cartId: cartId, userId: userId })
    );
  });
});
