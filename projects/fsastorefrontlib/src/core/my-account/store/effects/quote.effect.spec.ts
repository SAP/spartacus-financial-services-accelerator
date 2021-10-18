import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { CartActions, OCC_USER_ID_CURRENT } from '@spartacus/core';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of, throwError } from 'rxjs';
import { QuoteConnector } from '../../connectors/quote.connector';
import * as fromActions from '../actions';
import * as fromUserReducers from './../../store/reducers/index';
import * as fromEffects from './quote.effect';

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
const quoteForComparison = {
  carts: [insuranceQuote1, insuranceQuote2],
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

describe('Quote Effects', () => {
  let actions$: Observable<fromActions.QuoteAction>;
  let effects: fromEffects.QuoteEffects;
  let mockQuoteConnector: MockQuoteConnector;

  beforeEach(() => {
    mockQuoteConnector = new MockQuoteConnector();
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('assets', fromUserReducers.getReducers()),
      ],
      providers: [
        { provide: QuoteConnector, useValue: mockQuoteConnector },
        fromEffects.QuoteEffects,
        provideMockActions(() => actions$),
      ],
    });
    effects = TestBed.inject(fromEffects.QuoteEffects);
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
      spyOn(mockQuoteConnector, 'getQuotes').and.returnValue(
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
      spyOn(mockQuoteConnector, 'updateQuote').and.returnValue(
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
      const action = new fromActions.QuoteProcessAction({
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
      spyOn(mockQuoteConnector, 'invokeQuoteAction').and.returnValue(
        throwError('Error')
      );
      const action = new fromActions.QuoteProcessAction({
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

  describe('loadQuoteDetails$', () => {
    it('should return quote details', () => {
      const action = new fromActions.LoadQuoteDetails({
        userId: OCC_USER_ID_CURRENT,
        quoteId: 'test001',
      });
      const completion = new fromActions.LoadQuoteDetailsSuccess(
        insuranceQuote1
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.loadQuoteDetails$).toBeObservable(expected);
    });

    it('should fail to return quote details', () => {
      spyOn(mockQuoteConnector, 'getQuote').and.returnValue(
        throwError('Error')
      );
      const action = new fromActions.LoadQuoteDetails({
        userId: OCC_USER_ID_CURRENT,
        quoteId: 'test001',
      });
      const completion = new fromActions.LoadQuoteDetailsFail(
        JSON.stringify('Error')
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.loadQuoteDetails$).toBeObservable(expected);
    });
  });

  describe('loadQuoteComparison$', () => {
    it('should return quotes for comparison', () => {
      const action = new fromActions.LoadQuoteComparison({
        cartCodes: ['test001', 'test002'],
        userId: OCC_USER_ID_CURRENT,
      });
      const completion = new fromActions.LoadQuoteComparisonSuccess(
        quoteForComparison
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.loadQuoteComparison$).toBeObservable(expected);
    });

    it('should fail to return quotes for comparison', () => {
      spyOn(mockQuoteConnector, 'compareQuotes').and.returnValue(
        throwError('Error')
      );
      const action = new fromActions.LoadQuoteComparison({
        cartCodes: ['test001', 'test002'],
        userId: OCC_USER_ID_CURRENT,
      });
      const completion = new fromActions.LoadQuoteComparisonFail(
        JSON.stringify('Error')
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.loadQuoteComparison$).toBeObservable(expected);
    });
  });
});
