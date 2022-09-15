import { HttpRequest } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { waitForAsync, TestBed } from '@angular/core/testing';
import { OccEndpointsService } from '@spartacus/core';
import { OccValueListService } from './occ-value-list.service';

const mockValueListPath = '/valueList/vehicleModel';
const mockParentListCode = 'audi';
const baseEndpoint = 'baseEndpoint';

const cachedUrl = baseEndpoint + mockValueListPath;
const cachedValue = 'mockedCachedValue';

const externalAPI = 'https://example.com/countries';

class MockOccEndpointsService {
  getBaseUrl() {
    return baseEndpoint;
  }
}

describe('OccValueListService', () => {
  let occValueListService: OccValueListService;
  let httpMock: HttpTestingController;
  let occEndpointService: OccEndpointsService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccValueListService,
        { provide: OccEndpointsService, useClass: MockOccEndpointsService },
      ],
    });
    occValueListService = TestBed.inject(OccValueListService);
    httpMock = TestBed.inject(HttpTestingController);
    occEndpointService = TestBed.inject(OccEndpointsService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('OccValueListService', () => {
    it(
      'should get values from value list API call',
      waitForAsync(() => {
        occValueListService.getValuesFromAPI(mockValueListPath).subscribe();
        httpMock.expectOne((req: HttpRequest<any>) => {
          return (
            req.url === baseEndpoint + mockValueListPath && req.method === 'GET'
          );
        }, `GET method and url`);
      })
    );
  });

  describe('OccValueListService', () => {
    it(
      'should get values from external API',
      waitForAsync(() => {
        occValueListService.getValuesFromAPI(externalAPI).subscribe();
        httpMock.expectOne((req: HttpRequest<any>) => {
          return req.url === externalAPI && req.method === 'GET';
        }, `GET method and url`);
      })
    );
  });

  describe('OccValueListService', () => {
    it(
      'should get values from value list API call with parent item',
      waitForAsync(() => {
        occValueListService
          .getValuesFromAPI(mockValueListPath, mockParentListCode)
          .subscribe();
        httpMock.expectOne((req: HttpRequest<any>) => {
          return (
            req.url ===
              baseEndpoint +
                mockValueListPath +
                '?parentListItemCode=' +
                mockParentListCode && req.method === 'GET'
          );
        }, `GET method and url`);
      })
    );
  });

  describe('OccValueListService', () => {
    it(
      'should get values from cache',
      waitForAsync(() => {
        const valueListCache = new Map();
        valueListCache.set(cachedUrl, cachedValue);
        occValueListService.valueListsCache = valueListCache;
        let cachedResult;
        occValueListService
          .getValuesFromAPI(mockValueListPath)
          .subscribe(result => {
            cachedResult = result;
          })
          .unsubscribe();
        expect(cachedResult).toEqual(cachedValue);
      })
    );
  });
});
