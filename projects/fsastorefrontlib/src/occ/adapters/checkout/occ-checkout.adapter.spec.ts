import { HttpClientModule, HttpRequest } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { waitForAsync, TestBed } from '@angular/core/testing';
import { OccEndpointsService } from '@spartacus/core';
import { OccCheckoutAdapter } from './occ-checkout.adapter';

const userId = 'userId';
const cartId = 'cartId';
const identificationType = 'video_identification';

const userIdentificationEndpoint = 'userIdentification';

class MockOccEndpointsService {
  buildUrl(endpoint: string, _urlParams?: object, _queryParams?: object) {
    return this.getEndpoint(endpoint);
  }
  getEndpoint(url: string) {
    return url;
  }
}

describe('OccCheckoutAdapter', () => {
  let service: OccCheckoutAdapter;
  let httpMock: HttpTestingController;
  let occEndpointService: OccEndpointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [
        OccCheckoutAdapter,
        { provide: OccEndpointsService, useClass: MockOccEndpointsService },
      ],
    });

    service = TestBed.inject(OccCheckoutAdapter);
    httpMock = TestBed.inject(HttpTestingController);
    occEndpointService = TestBed.inject(OccEndpointsService);
    spyOn(occEndpointService, 'buildUrl').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('setIdentificationType', () => {
    it(
      'should set user identification type',
      waitForAsync(() => {
        service
          .setIdentificationType(identificationType, cartId, userId)
          .subscribe();
        httpMock.expectOne((req: HttpRequest<any>) => {
          return (
            req.url === userIdentificationEndpoint && req.method === 'PATCH'
          );
        }, `PATCH method and url`);
        expect(occEndpointService.buildUrl).toHaveBeenCalledWith(
          userIdentificationEndpoint,
          {
            userId,
            cartId,
          }
        );
      })
    );
  });
});
