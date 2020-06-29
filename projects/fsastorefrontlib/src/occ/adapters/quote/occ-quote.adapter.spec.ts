import { HttpClientModule, HttpRequest } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
import { OccEndpointsService } from '@spartacus/core';
import { QuoteActionType } from '../../occ-models';
import { OccQuoteAdapter } from './occ-quote.adapter';

const userId = '123';
const cartId = '123';
const quoteContent = {};

const quotesEndpoint = 'quotes';
const updateQuoteEndpoint = 'updateQuote';
const quoteActionEndpoint = 'quoteAction';
const quoteUpdateEndpoint = 'quoteUpdate';

class MockOccEndpointsService {
  getUrl(endpoint: string, _urlParams?: object, _queryParams?: object) {
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
    spyOn(occEndpointService, 'getUrl').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getQuotes', () => {
    it('should fetch user Quotes', async(() => {
      adapter.getQuotes(userId).subscribe();
      httpMock.expectOne((req: HttpRequest<any>) => {
        return req.url === quotesEndpoint && req.method === 'GET';
      }, `GET method and url`);
      expect(occEndpointService.getUrl).toHaveBeenCalledWith(quotesEndpoint, {
        userId,
      });
    }));
  });

  describe('updateQuote', () => {
    it('should update user Quote', async(() => {
      adapter.updateQuote(userId, cartId, quoteContent).subscribe();
      httpMock.expectOne((req: HttpRequest<any>) => {
        return req.url === updateQuoteEndpoint && req.method === 'PATCH';
      }, `PATCH method and url`);
      expect(occEndpointService.getUrl).toHaveBeenCalledWith(
        updateQuoteEndpoint,
        {
          userId,
          cartId,
        }
      );
    }));
  });

  describe('bind quote', () => {
    it('should bind user Quote', async(() => {
      adapter
        .invokeQuoteAction(userId, cartId, QuoteActionType.BIND)
        .subscribe();
      httpMock.expectOne((req: HttpRequest<any>) => {
        return req.url === quoteActionEndpoint && req.method === 'POST';
      }, `POST method and url`);
      expect(occEndpointService.getUrl).toHaveBeenCalledWith(
        quoteActionEndpoint,
        {
          userId,
          cartId,
        }
      );
    }));
  });

  describe('update insured objects on quote', () => {
    it('should update insured objects on quote', async(() => {
      adapter.updateInsuredObjects(userId, cartId, {}).subscribe();
      httpMock.expectOne((req: HttpRequest<any>) => {
        return req.url === quoteUpdateEndpoint && req.method === 'POST';
      }, `POST method and url`);
      expect(occEndpointService.getUrl).toHaveBeenCalledWith(
        quoteUpdateEndpoint,
        {
          userId,
          cartId,
        }
      );
    }));
  });
});
