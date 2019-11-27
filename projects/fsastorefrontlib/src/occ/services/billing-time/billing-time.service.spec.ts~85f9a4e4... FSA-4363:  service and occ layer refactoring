import { HttpClientModule, HttpRequest } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
import { OccBillingTimeAdapter } from './occ-billing-time.adapter';
import { OccConfig } from '@spartacus/core';

const productCodes: string[] = ['product1', 'product2'];

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

describe('OccBillingTimeAdapter', () => {
  let adapter: OccBillingTimeAdapter;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [
        OccBillingTimeAdapter,
        { provide: OccConfig, useValue: MockOccModuleConfig },
      ],
    });

    adapter = TestBed.get(OccBillingTimeAdapter);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getBillingTimes', () => {
    it('get billing times', async(() => {
      adapter.getBillingTimes(productCodes).subscribe();
      httpMock.expectOne((req: HttpRequest<any>) => {
        return (
          req.url === '/billing-times' &&
          req.params.append('productCodes', productCodes.toString()) &&
          req.method === 'GET'
        );
      }, `GET method and url`);
    }));
  });
});
