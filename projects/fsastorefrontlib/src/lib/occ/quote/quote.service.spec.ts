import { HttpClientModule, HttpRequest } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
import { OccQuoteService } from './quote.service';
import { OccConfig } from '@spartacus/core';

const userId = '123';

const usersEndpoint = '/users';
const quotesEndpoint = '/insurance-quotes';

const MockOccModuleConfig: OccConfig = {
  site: {
    baseSite: ''
  },
  backend: {
    occ: {
      baseUrl: '',
      prefix: ''
    }
  }
};

describe('OccQuoteService', () => {
  let service: OccQuoteService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [
        OccQuoteService,
        { provide: OccConfig, useValue: MockOccModuleConfig }
      ]
    });

    service = TestBed.get(OccQuoteService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getQuotes', () => {
    it('should fetch user Quotes', async(() => {
      service.getQuotes(userId).subscribe();
      httpMock.expectOne((req: HttpRequest<any>) => {
        return (
          req.url === usersEndpoint + `/${userId}` + quotesEndpoint &&
          req.method === 'GET'
        );
      }, `GET method and url`);
    }));
  });
});
