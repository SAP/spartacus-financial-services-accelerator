import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import createSpy = jasmine.createSpy;
import { DocumentAdapter, DocumentConnector } from '@spartacus/fsa-storefront';

class MockDocumentAdapter implements DocumentAdapter {
  signDocuments = createSpy('DocumentAdapter.signDocuments').and.callFake(
    (userID, documentIds, documentSignStatus) =>
      of('signDocuments' + userID + documentIds + documentSignStatus)
  );
}

const userId = 'userId';
const documentCodes = 'DOC0000001,DOC0000002';
const signStatus = true;

describe('DocumentConnector', () => {
  let documentConnector: DocumentConnector;
  let documentAdapter: DocumentAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: DocumentAdapter,
          useClass: MockDocumentAdapter,
        },
      ],
    });

    documentConnector = TestBed.inject(DocumentConnector);
    documentAdapter = TestBed.inject(DocumentAdapter);
  });

  it('should be created', () => {
    expect(documentConnector).toBeTruthy();
  });

  it('should call adapter for signDocuments', () => {
    documentConnector.signDocuments(userId, documentCodes, signStatus);
    expect(documentAdapter.signDocuments).toHaveBeenCalledWith(
      userId,
      documentCodes,
      signStatus
    );
  });
});
