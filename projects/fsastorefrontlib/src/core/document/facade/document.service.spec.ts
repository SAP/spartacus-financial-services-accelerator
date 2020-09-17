import { Type } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';
import { AuthService, OCC_USER_ID_CURRENT } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { DocumentService } from './document.service';
import { DocumentConnector } from '../connectors/document.connector';

const documentId = 'DOC00001';

class MockAuthService {
  getOccUserId(): Observable<string> {
    return of(OCC_USER_ID_CURRENT);
  }
}

const mockDocument = {
  code: documentId,
};

class MockDocumentConnector {
  getDocument() {
    return of(mockDocument);
  }
}

describe('DocumentServiceTest', () => {
  let service: DocumentService;
  let authService: MockAuthService;
  let documentConnector: MockDocumentConnector;

  beforeEach(() => {
    authService = new MockAuthService();

    TestBed.configureTestingModule({
      imports: [],
      providers: [
        DocumentService,
        { provide: AuthService, useValue: authService },
        { provide: DocumentConnector, useClass: MockDocumentConnector },
      ],
    });
    service = TestBed.get(DocumentService as Type<DocumentService>);
    documentConnector = TestBed.get(
      DocumentConnector as Type<DocumentConnector>
    );
  });

  it('should check if DocumentService is injected', inject(
    [DocumentService],
    (documentService: DocumentService) => {
      expect(documentService).toBeTruthy();
    }
  ));

  it('shuld be able to fetch document', () => {
    let result;
    service
      .getDocumentById(documentId)
      .subscribe(document => {
        result = document;
      })
      .unsubscribe();
    expect(result).toEqual(mockDocument);
  });
});
