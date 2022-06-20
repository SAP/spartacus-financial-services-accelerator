import { HttpClientModule, HttpRequest } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { waitForAsync, TestBed } from '@angular/core/testing';
import { OccEndpointsService } from '@spartacus/core';
import { QuoteActionType } from '../../occ-models';
import { OccQuoteAdapter } from './occ-quote.adapter';
import { Models } from '../../../model/quote.model';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

const userId = '123';
const cartId = '123';
const quoteId = '123';
const quoteContent = {};
const cartCodes = ['test001', 'test002'];

const quotesEndpoint = 'quotes';
const updateQuoteEndpoint = 'updateQuote';
const quoteActionEndpoint = 'quoteAction';
const quoteEndpoint = 'quote';
const compareQuotesEndpoint = 'compareQuotes';

class MockOccEndpointsService {
  buildUrl(endpoint: string, _urlParams?: object, _queryParams?: object) {
    return this.getEndpoint(endpoint);
  }
  getEndpoint(url: string) {
    return url;
  }
}

describe('OccQuoteAdapter', () => {
  let adapter: OccQuoteAdapter;
  let httpMock: HttpTestingController;
  let occEndpointService: OccEndpointsService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [
        OccQuoteAdapter,
        { provide: OccEndpointsService, useClass: MockOccEndpointsService },
      ],
    });

    adapter = TestBed.inject(OccQuoteAdapter);
    httpMock = TestBed.inject(HttpTestingController);
    occEndpointService = TestBed.inject(OccEndpointsService);
    spyOn(occEndpointService, 'buildUrl').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getQuotes', () => {
    it(
      'should fetch user Quotes',
      waitForAsync(() => {
        adapter.getQuotes(userId).subscribe();
        httpMock.expectOne((req: HttpRequest<any>) => {
          return req.url === quotesEndpoint && req.method === 'GET';
        }, `GET method and url`);
        expect(occEndpointService.buildUrl).toHaveBeenCalledWith(
          quotesEndpoint,
          {
            urlParams: {
              userId,
            },
          }
        );
      })
    );
    it(
      'should throw error when fetching user Quotes',
      waitForAsync(() => {
        let body: Models.InsuranceQuote[] | undefined;
        adapter
          .getQuotes(userId)
          .pipe(catchError((error: any) => throwError(error)))
          .subscribe(
            _result => {},
            _error => {}
          );
        const mockReq = httpMock.expectOne(req => {
          return req.method === 'GET';
        });
        mockReq.flush('', { status: 400, statusText: 'Error' });
        expect(body).toBeUndefined();
      })
    );
  });

  describe('updateQuote', () => {
    it(
      'should update user Quote',
      waitForAsync(() => {
        adapter.updateQuote(userId, cartId, quoteContent).subscribe();
        httpMock.expectOne((req: HttpRequest<any>) => {
          return req.url === updateQuoteEndpoint && req.method === 'PATCH';
        }, `PATCH method and url`);
        expect(occEndpointService.buildUrl).toHaveBeenCalledWith(
          updateQuoteEndpoint,
          {
            urlParams: {
              userId,
              cartId,
            },
          }
        );
      })
    );
    it(
      'should throw error when updating user Quote',
      waitForAsync(() => {
        let body: Models.InsuranceQuote[] | undefined;
        adapter
          .updateQuote(userId, cartId, quoteContent)
          .pipe(catchError((error: any) => throwError(error)))
          .subscribe(
            _result => {},
            _error => {}
          );
        const mockReq = httpMock.expectOne(req => {
          return req.method === 'PATCH';
        });
        mockReq.flush('', { status: 400, statusText: 'Error' });
        expect(body).toBeUndefined();
      })
    );
  });

  describe('bind quote', () => {
    it(
      'should bind user Quote',
      waitForAsync(() => {
        adapter
          .invokeQuoteAction(userId, cartId, QuoteActionType.BIND, null)
          .subscribe();
        httpMock.expectOne((req: HttpRequest<any>) => {
          return req.url === quoteActionEndpoint && req.method === 'POST';
        }, `POST method and url`);
        expect(occEndpointService.buildUrl).toHaveBeenCalledWith(
          quoteActionEndpoint,
          {
            urlParams: {
              userId,
              cartId,
            },
          }
        );
      })
    );
    it(
      'should throw error when binding user Quote',
      waitForAsync(() => {
        let body: Models.InsuranceQuote[] | undefined;
        adapter
          .invokeQuoteAction(userId, cartId, QuoteActionType.BIND, null)
          .pipe(catchError((error: any) => throwError(error)))
          .subscribe(
            _result => {},
            _error => {}
          );
        const mockReq = httpMock.expectOne(req => {
          return req.method === 'POST';
        });
        mockReq.flush('', { status: 400, statusText: 'Error' });
        expect(body).toBeUndefined();
      })
    );
  });

  describe('getQuote', () => {
    it(
      'should fetch Quote',
      waitForAsync(() => {
        adapter.getQuote(userId, quoteId).subscribe();
        httpMock.expectOne((req: HttpRequest<any>) => {
          return req.url === quoteEndpoint && req.method === 'GET';
        }, `GET method and url`);
        expect(occEndpointService.buildUrl).toHaveBeenCalledWith(
          quoteEndpoint,
          {
            urlParams: {
              userId,
              quoteId,
            },
          }
        );
      })
    );
    it(
      'should throw error when fetching single Quote',
      waitForAsync(() => {
        let body: Models.InsuranceQuote[] | undefined;
        adapter
          .getQuote(userId, quoteId)
          .pipe(catchError((error: any) => throwError(error)))
          .subscribe(
            _result => {},
            _error => {}
          );
        const mockReq = httpMock.expectOne(req => {
          return req.method === 'GET';
        });
        mockReq.flush('', { status: 400, statusText: 'Error' });
        expect(body).toBeUndefined();
      })
    );
  });

  describe('compareQuotes', () => {
    it(
      'should compare quotes',
      waitForAsync(() => {
        adapter.compareQuotes(cartCodes, userId).subscribe();
        httpMock.expectOne((req: HttpRequest<any>) => {
          return req.url === compareQuotesEndpoint && req.method === 'GET';
        }, `GET method and url`);
        expect(occEndpointService.buildUrl).toHaveBeenCalledWith(
          compareQuotesEndpoint,
          {
            urlParams: {
              userId,
            },
          }
        );
      })
    );
    it(
      'should throw error when comparing Quotes',
      waitForAsync(() => {
        let body: Models.InsuranceQuote[] | undefined;
        adapter
          .compareQuotes(cartCodes, userId)
          .pipe(catchError((error: any) => throwError(error)))
          .subscribe(
            _result => {},
            _error => {}
          );
        const mockReq = httpMock.expectOne(req => {
          return req.method === 'GET';
        });
        mockReq.flush('', { status: 400, statusText: 'Error' });
        expect(body).toBeUndefined();
      })
    );
  });
});
