import { HttpRequest } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { waitForAsync, TestBed } from '@angular/core/testing';
import { OccEndpointsService } from '@spartacus/core';
import { OccDynamicNumberInputService } from './occ-dynamic-number-input.service';

const mockDynamicNumberInputPath = '/dynamic-number-input/contribution';
const baseEndpoint = 'baseEndpoint';

const cachedUrl = baseEndpoint + mockDynamicNumberInputPath;
const cachedValue = 'mockedCachedValue';

const externalAPI = 'https://example.com/countries';

class MockOccEndpointsService {
  getBaseUrl() {
    return baseEndpoint;
  }
}

describe('OccDynamicNumberInputService', () => {
  let occDynamicNumberInputService: OccDynamicNumberInputService;
  let httpMock: HttpTestingController;
  let occEndpointService: OccEndpointsService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccDynamicNumberInputService,
        { provide: OccEndpointsService, useClass: MockOccEndpointsService },
      ],
    });
    occDynamicNumberInputService = TestBed.inject(OccDynamicNumberInputService);
    httpMock = TestBed.inject(HttpTestingController);
    occEndpointService = TestBed.inject(OccEndpointsService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('OccDynamicNumberInputService', () => {
    it(
      'should get values from value list API call',
      waitForAsync(() => {
        occDynamicNumberInputService
          .getValuesFromAPI(mockDynamicNumberInputPath)
          .subscribe();
        httpMock.expectOne((req: HttpRequest<any>) => {
          return (
            req.url === baseEndpoint + mockDynamicNumberInputPath &&
            req.method === 'GET'
          );
        }, `GET method and url`);
      })
    );
  });

  describe('OccDynamicNumberInputService', () => {
    it(
      'should get input from external API',
      waitForAsync(() => {
        occDynamicNumberInputService.getValuesFromAPI(externalAPI).subscribe();
        httpMock.expectOne((req: HttpRequest<any>) => {
          return req.url === externalAPI && req.method === 'GET';
        }, `GET method and url`);
      })
    );
  });

  describe('OccDynamicNumberInputService', () => {
    it(
      'should get input from API call',
      waitForAsync(() => {
        occDynamicNumberInputService
          .getValuesFromAPI(mockDynamicNumberInputPath)
          .subscribe();
        httpMock.expectOne((req: HttpRequest<any>) => {
          return (
            req.url === baseEndpoint + mockDynamicNumberInputPath &&
            req.method === 'GET'
          );
        }, `GET method and url`);
      })
    );
  });

  describe('OccDynamicNumberInputService', () => {
    it(
      'should get input from cache',
      waitForAsync(() => {
        const dynamicNumberInputCache = new Map();
        dynamicNumberInputCache.set(cachedUrl, cachedValue);
        occDynamicNumberInputService.dynamicNumberInputCache = dynamicNumberInputCache;
        let cachedResult;
        occDynamicNumberInputService
          .getValuesFromAPI(mockDynamicNumberInputPath)
          .subscribe(result => {
            cachedResult = result;
          })
          .unsubscribe();
        expect(cachedResult).toEqual(cachedValue);
      })
    );
  });
});
