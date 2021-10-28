import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ConverterService, OccEndpointsService } from '@spartacus/core';
import { OccFSUserAdapter } from './occ-user.adapter';

class MockOccEndpointsService {
  buildUrl(endpoint: string, _urlParams?: object, _queryParams?: object) {
    return this.getEndpoint(endpoint);
  }
  getEndpoint(url: string) {
    return url;
  }
}

describe('OccFSUserAdapter', () => {
  let occUserAdapter: OccFSUserAdapter;
  let httpMock: HttpTestingController;
  let converter: ConverterService;
  let occEnpointsService: OccEndpointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccFSUserAdapter,
        { provide: OccEndpointsService, useClass: MockOccEndpointsService },
        {
          provide: OccEndpointsService,
          useClass: MockOccEndpointsService,
        },
      ],
    });

    occUserAdapter = TestBed.inject(OccFSUserAdapter);
    httpMock = TestBed.inject(HttpTestingController);
    converter = TestBed.inject(ConverterService);
    occEnpointsService = TestBed.inject(OccEndpointsService);

    spyOn(occEnpointsService, 'buildUrl').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });
  describe('remove user account: ', () => {
    it('should be able to close user account', () => {
      occUserAdapter
        .close('testUserId')
        .subscribe(result => expect(result).toEqual(''));

      const mockReq = httpMock.expectOne(req => {
        return req.method === 'DELETE';
      });

      expect(occEnpointsService.buildUrl).toHaveBeenCalledWith('disableUser', {
        urlParams: {
          userId: 'testUserId',
        },
      });
      expect(mockReq.cancelled).toBeFalsy();
      mockReq.flush('');
    });
  });
});
