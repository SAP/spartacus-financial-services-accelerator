import { inject, TestBed } from '@angular/core/testing';
import {
  FormDataService,
  FormDataStorageService,
} from '@spartacus/dynamicforms';
import { Store, StoreModule } from '@ngrx/store';
import { AuthService, OCC_USER_ID_CURRENT } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { FSCartService } from '../../cart/facade/cart.service';
import { StateWithMyAccount } from '../store/my-account-state';
import { QuoteActionType } from './../../../occ/occ-models/occ.models';
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
  loadFormData(): void {}
}

class MockFormDataStorageService {
  setFormDataToLocalStorage() {}
}

const mockCart = {
  deliveryOrderGroups: [
    {
      entries: [
        {
          formData: [
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
  let cartService: FSCartService;
  let formDataService: MockFormDataService;
  let authService: MockAuthService;
  let mockFormDataStorageService: FormDataStorageService;

  beforeEach(() => {
    authService = new MockAuthService();
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
        { provide: AuthService, useValue: authService },
        {
          provide: FormDataStorageService,
          useClass: MockFormDataStorageService,
        },
      ],
    });

    service = TestBed.inject(QuoteService);
    cartService = TestBed.inject(FSCartService);
    store = TestBed.inject(Store);
    mockFormDataStorageService = TestBed.inject(FormDataStorageService);

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
});
