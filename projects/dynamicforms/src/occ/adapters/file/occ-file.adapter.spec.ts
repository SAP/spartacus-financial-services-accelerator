import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {
  ConverterService,
  OccEndpointsService,
  OCC_USER_ID_CURRENT,
} from '@spartacus/core';
import { OccFileAdapter } from '../form';

const blob1 = new Blob([''], { type: 'application/pdf' });
const mockFileCode = 'mockCode';
blob1['lastModifiedDate'] = '';
blob1['name'] = 'testFile1';
const mockFile = <File>blob1;

class MockOccEndpointsService {
  getUrl(endpoint: string, _urlParams?: object, _queryParams?: object) {
    return this.getEndpoint(endpoint);
  }
  getEndpoint(url: string) {
    return url;
  }
}

describe('OccFileAdapter', () => {
  let occFileAdapter: OccFileAdapter;
  let httpMock: HttpTestingController;
  let converter: ConverterService;
  let occEnpointsService: OccEndpointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccFileAdapter,
        { provide: OccEndpointsService, useClass: MockOccEndpointsService },
        {
          provide: OccEndpointsService,
          useClass: MockOccEndpointsService,
        },
      ],
    });

    occFileAdapter = TestBed.inject(OccFileAdapter);
    httpMock = TestBed.inject(HttpTestingController);
    converter = TestBed.inject(ConverterService);
    occEnpointsService = TestBed.inject(OccEndpointsService);

    spyOn(occEnpointsService, 'getUrl').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });
  it('should be able to upload file', () => {
    occFileAdapter.uploadFile(OCC_USER_ID_CURRENT, mockFile).subscribe();
    const mockReq = httpMock.expectOne(req => {
      return req.method === 'POST';
    });
    expect(occEnpointsService.getUrl).toHaveBeenCalledWith('uploadFile', {
      userId: OCC_USER_ID_CURRENT,
    });
    expect(mockReq.cancelled).toBeFalsy();
    mockReq.flush('');
  });

  it('should be able to remove file', () => {
    occFileAdapter
      .removeFileForUserAndCode(OCC_USER_ID_CURRENT, mockFileCode)
      .subscribe(result => expect(result).toEqual(''));
    const mockReq = httpMock.expectOne(req => {
      return req.method === 'DELETE';
    });
    expect(occEnpointsService.getUrl).toHaveBeenCalledWith('removeFile', {
      userId: OCC_USER_ID_CURRENT,
      fileCode: mockFileCode,
    });
    expect(mockReq.cancelled).toBeFalsy();
    mockReq.flush('');
  });
});
