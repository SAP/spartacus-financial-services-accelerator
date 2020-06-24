import { HttpClientModule, HttpRequest } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
import { OccEndpointsService } from '@spartacus/core';
import { OccDocumentAdapter } from './occ-document-adapter';

const userId = 'userId';
const documentId = 'documentId';

const documentsEndpoint = 'documents';

class MockOccEndpointsService {
  getUrl(endpoint: string, _urlParams?: object, _queryParams?: object) {
    return this.getEndpoint(endpoint);
  }
  getEndpoint(url: string) {
    return url;
  }
}

describe('OccDocumentAdapter', () => {
  let adapter: OccDocumentAdapter;
  let httpMock: HttpTestingController;
  let occEndpointService: OccEndpointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [
        OccDocumentAdapter,
        { provide: OccEndpointsService, useClass: MockOccEndpointsService },
      ],
    });

    adapter = TestBed.get(OccDocumentAdapter);
    httpMock = TestBed.get(HttpTestingController);
    occEndpointService = TestBed.get(OccEndpointsService);
    spyOn(occEndpointService, 'getUrl').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getDocument', () => {
    it('should get document', async(() => {
      adapter.getDocument(userId, documentId).subscribe();
      httpMock.expectOne((req: HttpRequest<any>) => {
        return (
          req.url === documentsEndpoint &&
          req.params.append('userId', userId) &&
          req.params.append('documentId', documentId) &&
          req.method === 'GET'
        );
      }, `POST method and url`);
      expect(occEndpointService.getUrl).toHaveBeenCalledWith(
        documentsEndpoint,
        {
          userId,
          documentId,
        }
      );
    }));
  });
});
