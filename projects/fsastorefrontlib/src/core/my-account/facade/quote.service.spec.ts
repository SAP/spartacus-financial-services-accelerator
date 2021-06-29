import { inject, TestBed } from '@angular/core/testing';
import {
  FormDataService,
  FormDataStorageService,
} from '@spartacus/dynamicforms';
import { Store, StoreModule } from '@ngrx/store';
import {
  OCC_USER_ID_CURRENT,
  RoutingService,
  UserIdService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { FSCartService } from '../../cart/facade/cart.service';
import { StateWithMyAccount } from '../store/my-account-state';
import {
  FSProduct,
  QuoteActionType,
} from './../../../occ/occ-models/occ.models';
import * as fromAction from './../store/actions';
import { reducerProvider, reducerToken } from './../store/reducers/index';
import { QuoteService } from './quote.service';
import createSpy = jasmine.createSpy;

const userId = OCC_USER_ID_CURRENT;
const cartId = '0000001';
const mockProduct: FSProduct = {
  code: 'testProduct',
  defaultCategory: {
    code: 'testDefaultCategory',
    name: 'test category',
  },
};
const mockCart: any = {
  code: 'testCode',
  guid: 'testUid',
  deliveryOrderGroups: [
    {
      quantity: 1,
    },
  ],
  insuranceQuote: {
    state: {
      code: 'UNBIND',
    },
    quoteDetails: {
      entry: [
        {
          key: 'formId',
          value: 'testValue1',
        },
        {
          key: 'updateQuoteKey2',
          value: 'testValue2',
        },
      ],
    },
  },
  entries: [
    {
      product: mockProduct,
      formData: [
        {
          id: 'testId',
          formDefinition: {
            formId: 'testFormId',
            content: '{"relevantFiles":["DOC00002012","DOC00002011"]}',
          },
        },
      ],
    },
  ],
  totalItems: 0,
  totalPrice: {
    currencyIso: 'USD',
    value: 10.0,
  },
};
const mockQuote = {
  state: { code: 'BIND' },
  cartCode: 'testCode',
  userId: userId,
};

class MockUserIdService {
  getUserId(): Observable<string> {
    return of(OCC_USER_ID_CURRENT);
  }
}

class MockFormDataService {
  getFormData() {
    return of(mockCart.entries[0].formData[0]);
  }
  loadFormData(): void {}
}

class MockFormDataStorageService {
  setFormDataToLocalStorage() {}
}

class MockRoutingService {
  go = createSpy();
}

class MockCartService {
  getActive() {
    return of(mockCart);
  }
  loadCart() {}
}

describe('QuoteServiceTest', () => {
  let service: QuoteService;
  let store: Store<StateWithMyAccount>;
  let cartService: FSCartService;
  let formDataService: MockFormDataService;
  let userIdService: UserIdService;
  let mockFormDataStorageService: FormDataStorageService;
  let routingService: RoutingService;

  beforeEach(() => {
    formDataService = new MockFormDataService();

    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('assets', reducerToken),
      ],
      providers: [
        QuoteService,
        reducerProvider,
        { provide: FSCartService, useClass: MockCartService },
        { provide: FormDataService, useValue: formDataService },
        { provide: UserIdService, useClass: MockUserIdService },
        { provide: RoutingService, useClass: MockRoutingService },
        {
          provide: FormDataStorageService,
          useClass: MockFormDataStorageService,
        },
      ],
    });

    service = TestBed.inject(QuoteService);
    cartService = TestBed.inject(FSCartService);
    store = TestBed.inject(Store);
    userIdService = TestBed.inject(UserIdService);
    mockFormDataStorageService = TestBed.inject(FormDataStorageService);
    routingService = TestBed.inject(RoutingService);

    spyOn(store, 'dispatch').and.callThrough();
    spyOn(mockFormDataStorageService, 'setFormDataToLocalStorage').and.stub();
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
      new fromAction.LoadQuotesSuccess([
        {
          cartId: cartId,
        },
      ])
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

  it('should be able to load quotes', () => {
    store.dispatch(
      new fromAction.LoadQuotesSuccess([
        {
          cartId: cartId,
        },
      ])
    );
    let loaded;
    service
      .getQuotes()
      .subscribe(response => {
        loaded = response;
      })
      .unsubscribe();
    expect(loaded).toEqual([
      {
        cartId: cartId,
      },
    ]);
  });

  it('should be able to bind quote', () => {
    service.bindQuote(cartId);
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromAction.QuoteProcessAction({
        userId: userId,
        cartId: cartId,
        action: QuoteActionType.BIND,
      })
    );
  });

  it('should be able to underwrite quote', () => {
    service.underwriteQuote(cartId);
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromAction.QuoteProcessAction({
        userId: userId,
        cartId: cartId,
        action: QuoteActionType.UNDERWRITING,
      })
    );
  });

  it('should be able to update quote', () => {
    const priceAttributes = 'testPrice';
    service.updateQuote(cartId, priceAttributes);
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromAction.QuoteProcessAction({
        userId: userId,
        cartId: cartId,
        action: QuoteActionType.UPDATE,
        body: priceAttributes,
      })
    );
  });

  it('should be able to retrieve quotes', () => {
    service.retrieveQuote(mockQuote);
    userIdService
      .getUserId()
      .subscribe(data => {
        expect(data).toEqual(mockQuote.userId);
      })
      .unsubscribe();
  });
});
