import { CartActions, OCC_USER_ID_CURRENT } from '@spartacus/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of, throwError } from 'rxjs';
import * as fromActions from '../actions';
import * as fromEffects from './quote.effect';
import * as fromUserReducers from './../../store/reducers/index';
import { QuoteConnector } from '../../services/quote/connectors/quote.connector';

const insuranceQuote1: any = {
  cartCode: 'test001',
  defaultCategory: {
    code: 'testCategory1',
  },
  quoteId: 'test001',
  quoteStatus: 'unfinished',
};
const insuranceQuote2: any = {
  cartCode: 'test002',
  defaultCategory: {
    code: 'testCategory1',
  },
  quoteId: 'test002',
  quoteStatus: 'unfinished',
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
const updateQuotePayload: any = {
  userId: OCC_USER_ID_CURRENT,
  cartId: 'test001',
  quoteContent: {
    quoteDetails: quoteDetails,
  },
};
const insuranceQuotes = {
  insuranceQuotes: [insuranceQuote1, insuranceQuote2],
};

class MockOccQuoteAdapter {
  getQuotes() {
    return of(insuranceQuotes);
  }
  updateQuote() {
    return of(quoteDetails);
  }
  bindQuote() {
    return of(insuranceQuote1);
  }
}

describe('Quote Effects', () => {
  let actions$: Observable<fromActions.QuoteAction>;
  let effects: fromEffects.QuoteEffects;
  let mockOccQuoteAdapter: MockOccQuoteAdapter;

  beforeEach(() => {
    mockOccQuoteAdapter = new MockOccQuoteAdapter();
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('assets', fromUserReducers.getReducers()),
      ],
      providers: [
        { provide: QuoteConnector, useValue: mockOccQuoteAdapter },
        fromEffects.QuoteEffects,
        provideMockActions(() => actions$),
      ],
    });
    effects = TestBed.get(fromEffects.QuoteEffects as Type<
      fromEffects.QuoteEffects
    >);
  });

  describe('loadQuotes$', () => {
    it('should return quotes', () => {
      const action = new fromActions.LoadQuotes({
        userId: OCC_USER_ID_CURRENT,
      });
      const completion = new fromActions.LoadQuotesSuccess(insuranceQuotes);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.loadQuotes$).toBeObservable(expected);
    });

    it('should fail to return quotes', () => {
      spyOn(mockOccQuoteAdapter, 'getQuotes').and.returnValue(
        throwError('Error')
      );
      const action = new fromActions.LoadQuotes({
        userId: OCC_USER_ID_CURRENT,
      });
      const completion = new fromActions.LoadQuotesFail(
        JSON.stringify('Error')
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.loadQuotes$).toBeObservable(expected);
    });
  });

  describe('updateQuote$', () => {
    it('should update quote', () => {
      const action = new fromActions.UpdateQuote(updateQuotePayload);
      const completion = new fromActions.UpdateQuoteSuccess(quoteDetails);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.updateQuote$).toBeObservable(expected);
    });

    it('should fail to update quote', () => {
      spyOn(mockOccQuoteAdapter, 'updateQuote').and.returnValue(
        throwError('Error')
      );
      const action = new fromActions.UpdateQuote(updateQuotePayload);
      const completion = new fromActions.UpdateQuoteFail(
        JSON.stringify('Error')
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.updateQuote$).toBeObservable(expected);
    });
  });

  describe('bindQuote$', () => {
    it('should bind quote', () => {
      const action = new fromActions.BindQuote({
        userId: OCC_USER_ID_CURRENT,
        cartId: 'test001',
      });
      const completion = new CartActions.LoadCart({
        userId: OCC_USER_ID_CURRENT,
        cartId: 'test001',
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.bindQuote$).toBeObservable(expected);
    });

    it('should fail to bind quote', () => {
      spyOn(mockOccQuoteAdapter, 'bindQuote').and.returnValue(
        throwError('Error')
      );
      const action = new fromActions.BindQuote({
        userId: OCC_USER_ID_CURRENT,
        cartId: 'test001',
      });
      const completion = new fromActions.UpdateQuoteFail(
        JSON.stringify('Error')
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.bindQuote$).toBeObservable(expected);
    });
  });
});
