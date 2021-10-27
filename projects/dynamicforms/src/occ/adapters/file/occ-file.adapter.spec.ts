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
const mockFileType = 'mockType';
blob1['lastModifiedDate'] = '';
blob1['name'] = 'testFile1';
const mockFile = <File>blob1;

class MockOccEndpointsService {
  buildUrl(endpoint: string, _urlParams?: object, _queryParams?: object) {
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
  let occEndpointsService: OccEndpointsService;

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
    occEndpointsService = TestBed.inject(OccEndpointsService);

    spyOn(occEndpointsService, 'buildUrl').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });
  it('should be able to upload file', () => {
    occFileAdapter.uploadFile(OCC_USER_ID_CURRENT, mockFile).subscribe();
    const mockReq = httpMock.expectOne(req => {
      return req.method === 'POST';
    });
    expect(occEndpointsService.buildUrl).toHaveBeenCalledWith('uploadFile', {
      urlParams: {
        userId: OCC_USER_ID_CURRENT,
      },
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
    expect(occEndpointsService.buildUrl).toHaveBeenCalledWith('removeFile', {
      urlParams: {
        userId: OCC_USER_ID_CURRENT,
        fileCode: mockFileCode,
      },
    });
    expect(mockReq.cancelled).toBeFalsy();
    mockReq.flush('');
  });

  it('should be able to get file', () => {
    occFileAdapter
      .getFileForCodeAndType(OCC_USER_ID_CURRENT, mockFileCode, mockFileType)
      .subscribe();
    const mockReq = httpMock.expectOne(req => {
      return req.method === 'GET';
    });
    expect(occEndpointsService.buildUrl).toHaveBeenCalledWith('getFile', {
      urlParams: {
        userId: OCC_USER_ID_CURRENT,
        fileCode: mockFileCode,
      },
    });
    expect(mockReq.cancelled).toBeFalsy();
    mockReq.flush('');
  });

  it('should be able to get files', () => {
    occFileAdapter
      .getFilesForUser(OCC_USER_ID_CURRENT, Array.from(mockFileCode))
      .subscribe();
    const mockReq = httpMock.expectOne(req => {
      return req.method === 'GET';
    });
    expect(occEndpointsService.buildUrl).toHaveBeenCalledWith('getFiles', {
      urlParams: {
        userId: OCC_USER_ID_CURRENT,
      },
    });
    expect(mockReq.cancelled).toBeFalsy();
    mockReq.flush('');
  });
});
