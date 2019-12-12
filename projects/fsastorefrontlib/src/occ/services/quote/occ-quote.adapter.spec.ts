import { HttpClientModule, HttpRequest } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
import { OccQuoteAdapter } from './occ-quote.adapter';
import { OccConfig } from '@spartacus/core';

const userId = '123';
const cartId = '123';
const quoteContent = {};

const usersEndpoint = '/users';
const quotesEndpoint = '/insurance-quotes';
const cartsEndpoint = '/carts';

const MockOccModuleConfig: OccConfig = {
  context: {
    baseSite: [''],
  },
  backend: {
    occ: {
      baseUrl: '',
      prefix: '',
    },
  },
};

describe('OccQuoteAdapter', () => {
  let adapter: OccQuoteAdapter;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [
        OccQuoteAdapter,
        { provide: OccConfig, useValue: MockOccModuleConfig },
      ],
    });

    adapter = TestBed.get(OccQuoteAdapter);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getQuotes', () => {
    it('should fetch user Quotes', async(() => {
      adapter.getQuotes(userId).subscribe();
      httpMock.expectOne((req: HttpRequest<any>) => {
        return (
          req.url === usersEndpoint + `/${userId}` + quotesEndpoint &&
          req.method === 'GET'
        );
      }, `GET method and url`);
    }));
  });

  describe('updateQuote', () => {
    it('should update user Quote', async(() => {
      adapter.updateQuote(userId, cartId, quoteContent).subscribe();
      httpMock.expectOne((req: HttpRequest<any>) => {
        return (
          req.url ===
            usersEndpoint +
              `/${userId}` +
              cartsEndpoint +
              `/${cartId}` +
              quotesEndpoint && req.method === 'PATCH'
        );
      }, `PATCH method and url`);
    }));
  });
});
