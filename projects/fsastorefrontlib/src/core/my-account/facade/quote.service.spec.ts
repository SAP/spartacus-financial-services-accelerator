import { inject, TestBed } from '@angular/core/testing';
import {
  FormDataService,
  FormDataStorageService,
} from '@spartacus/dynamicforms';
import { Store, StoreModule } from '@ngrx/store';
import {
  CommandService,
  EventService,
  OCC_USER_ID_CURRENT,
  QueryService,
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
import { QuoteConnector } from '../../../core/my-account/connectors/quote.connector';
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
  quoteId: 'testQuote',
};
const insuranceQuote1: any = {
  cartCode: 'test001',
  defaultCategory: {
    code: 'testCategory1',
  },
  quoteId: 'test001',
};
const insuranceQuote2: any = {
  cartCode: 'test002',
  defaultCategory: {
    code: 'testCategory1',
  },
  quoteId: 'test002',
};

const quoteCodes = ['test001', 'test002'];
const quoteForComparison = {
  carts: [insuranceQuote1, insuranceQuote2],
};

const insuranceQuotes = {
  insuranceQuotes: [insuranceQuote1, insuranceQuote2],
};

const quoteDetails: any = {
  quoteDetails: {
    entry: [
      {
        key: 'updateQuoteKey1',
        value: 'testValue1',
      },
      {
        key: 'updateQuoteKey2',
        value: 'testValue2',
      },
    ],
  },
};

class MockQuoteConnector {
  getQuotes() {
    return of(insuranceQuotes);
  }
  updateQuote() {
    return of(quoteDetails);
  }
  invokeQuoteAction() {
    return of(insuranceQuote1);
  }
  getQuote() {
    return of(insuranceQuote1);
  }
  compareQuotes() {
    return of(quoteForComparison);
  }
}

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

class MockEventService implements Partial<EventService> {
  get(): Observable<any> {
    return of();
  }
  dispatch() {}
}

describe('QuoteServiceTest', () => {
  let service: QuoteService;
  let store: Store<StateWithMyAccount>;
  let cartService: FSCartService;
  let formDataService: MockFormDataService;
  let userIdService: UserIdService;
  let mockFormDataStorageService: FormDataStorageService;
  let routingService: RoutingService;
  let mockQuoteConnector: MockQuoteConnector;
  // let queryService: QueryService;
  let eventService: EventService;

  beforeEach(() => {
    formDataService = new MockFormDataService();
    let mockQuoteConnector: MockQuoteConnector;
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('assets', reducerToken),
      ],
      providers: [
        QuoteService,
        reducerProvider,
        QueryService,
        CommandService,
        { provide: FSCartService, useClass: MockCartService },
        { provide: FormDataService, useValue: formDataService },
        { provide: UserIdService, useClass: MockUserIdService },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: QuoteConnector, useValue: mockQuoteConnector },
        {
          provide: EventService,
          useClass: MockEventService,
        },
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
    eventService = TestBed.inject(EventService);

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
    service['retrieveQuote'](mockQuote);
    userIdService
      .getUserId()
      .subscribe(data => {
        expect(data).toEqual(mockQuote.userId);
      })
      .unsubscribe();
  });

  it('should be able to load quote details', () => {
    service.loadQuoteDetails(mockQuote.quoteId, userId);
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromAction.LoadQuoteDetails({
        userId: userId,
        quoteId: mockQuote.quoteId,
      })
    );
  });

  it('should be able to load quote details', () => {
    store.dispatch(new fromAction.LoadQuoteDetailsSuccess(mockQuote));
    let loadedQuoteDetails;
    service
      .getQuoteDetails()
      .subscribe(response => (loadedQuoteDetails = response))
      .unsubscribe();
    expect(loadedQuoteDetails).toEqual(mockQuote);
  });

  it('should be able to load quote comparison', () => {
    service.loadQuotesComparison(quoteCodes, userId);
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromAction.LoadQuoteComparison({
        cartCodes: quoteCodes,
        userId: userId,
      })
    );
  });

  it('should be able to load quote comparison', () => {
    store.dispatch(
      new fromAction.LoadQuoteComparisonSuccess(quoteForComparison)
    );
    let loadedQuoteComparison;
    service
      .getQuotesComparison()
      .subscribe(response => (loadedQuoteComparison = response))
      .unsubscribe();
    expect(loadedQuoteComparison).toEqual(quoteForComparison);
  });

  it('should set qute for compare', () => {
    service.setQuoteForCompare(insuranceQuote1);
    let quoteForCompare;
    service.quoteForCompare$
      .subscribe(response => (quoteForCompare = response))
      .unsubscribe();
    expect(quoteForCompare).toEqual(insuranceQuote1);
  });

  it('should retrieve quote checkout', () => {
    service.retrieveQuoteCheckout(mockQuote).subscribe().unsubscribe();
    expect(routingService.go).toHaveBeenCalledWith({ cxRoute: 'quoteReview' });
    const unbindQuote = {
      ...mockQuote,
      state: {
        code: 'UNBIND',
      },
    };
    service.retrieveQuoteCheckout(unbindQuote).subscribe().unsubscribe();
    expect(routingService.go).toHaveBeenCalledWith({ cxRoute: 'addOptions' });
  });
});
