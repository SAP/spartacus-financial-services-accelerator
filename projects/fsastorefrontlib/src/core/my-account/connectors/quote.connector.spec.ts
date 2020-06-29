import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { QuoteActionType } from './../../../occ/occ-models/occ.models';
import { QuoteAdapter } from './quote.adapter';
import { QuoteConnector } from './quote.connector';
import createSpy = jasmine.createSpy;

class MockQuoteAdapter implements QuoteAdapter {
  getQuotes = createSpy('QuoteAdapter.getQuotes').and.callFake(userId =>
    of('getQuotes' + userId)
  );
  updateQuote = createSpy('QuoteAdapter.updateQuote').and.callFake(
    (userId, cart, quote) => of('updateQuote' + userId + cart + quote)
  );
  invokeQuoteAction = createSpy('QuoteAdapter.invokeQuoteAction').and.callFake(
    (userId, policyId, contractId) =>
      of('invokeQuoteAction' + userId + policyId + contractId)
  );
}
const user = 'user';
const cartId = 'cartId';

describe('QuoteConnector', () => {
  let quoteConnector: QuoteConnector;
  let quoteAdapter: QuoteAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: QuoteAdapter, useClass: MockQuoteAdapter }],
    });

    quoteConnector = TestBed.inject(QuoteConnector);
    quoteAdapter = TestBed.inject(QuoteAdapter);
  });

  it('should be created', () => {
    expect(quoteConnector).toBeTruthy();
  });
  it('should call adapter for getQuotes', () => {
    quoteConnector.getQuotes(user);
    expect(quoteAdapter.getQuotes).toHaveBeenCalledWith(user);
  });
  it('should call adapter for updateQuote', () => {
    quoteConnector.updateQuote(user, cartId, {});
    expect(quoteAdapter.updateQuote).toHaveBeenCalledWith(user, cartId, {});
  });
  it('should call adapter for bindQuote', () => {
    quoteConnector.invokeQuoteAction(user, cartId, QuoteActionType.BIND);
    expect(quoteAdapter.invokeQuoteAction).toHaveBeenCalledWith(
      user,
      cartId,
      QuoteActionType.BIND
    );
  });
});
