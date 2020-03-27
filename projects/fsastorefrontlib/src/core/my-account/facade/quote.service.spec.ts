import { Type } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';
import { FormDataService } from '@fsa/dynamicforms';
import { Store, StoreModule } from '@ngrx/store';
import { AuthService, OCC_USER_ID_CURRENT } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { FSCartService } from '../../cart/facade/cart.service';
import { StateWithMyAccount } from '../store/my-account-state';
import * as fromAction from './../store/actions';
import { reducerProvider, reducerToken } from './../store/reducers/index';
import { QuoteService } from './quote.service';

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
  loadCart() {}
}

describe('QuoteServiceTest', () => {
  let service: QuoteService;
  let store: Store<StateWithMyAccount>;
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
    store = TestBed.get(Store as Type<Store<StateWithMyAccount>>);

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
    const spy = spyOn(cartService, 'loadCart');
    cartService.cart = mockCart;
    formDataService.formData = mockFormData;
    service.retrieveQuote({ cartCode: cartId });
    expect(spy).toHaveBeenCalled();
  });

  it('should be able to retrieve quote with empty cart', () => {
    const spy = spyOn(cartService, 'loadCart');
    cartService.cart = cartWithoutEntries;
    service.retrieveQuote({ cartCode: cartId });
    expect(spy).toHaveBeenCalled();
  });

  it('should be able to retrieve quote with entries without forms', () => {
    const spy = spyOn(cartService, 'loadCart');
    cartService.cart = cartWithOneEntry;
    service.retrieveQuote({ cartCode: cartId });
    expect(spy).toHaveBeenCalled();
  });
});
