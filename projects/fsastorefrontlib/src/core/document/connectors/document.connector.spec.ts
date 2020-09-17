import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { OCC_USER_ID_CURRENT } from '@spartacus/core';
import { of } from 'rxjs';
import createSpy = jasmine.createSpy;
import { DocumentAdapter } from './document.adapter';
import { DocumentConnector } from './document.connector';

class MockDocumentAdapter implements DocumentAdapter {
  getDocument = createSpy(
    'DocumentAdapter.getDocument'
  ).and.callFake((userId, documentId) =>
    of('getDocument' + userId + documentId)
  );
}

const user = OCC_USER_ID_CURRENT;
const document = 'doc001';

describe('DocumentConnector', () => {
  let documentConnector: DocumentConnector;
  let documentAdapter: DocumentAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: DocumentAdapter, useClass: MockDocumentAdapter }],
    });

    documentConnector = TestBed.get(
      DocumentConnector as Type<DocumentConnector>
    );
    documentAdapter = TestBed.get(DocumentAdapter as Type<DocumentAdapter>);
  });

  it('should be created', () => {
    expect(documentConnector).toBeTruthy();
  });

  it('should call adapter for getDocument', () => {
    documentConnector.getDocument(user, document);
    expect(documentAdapter.getDocument).toHaveBeenCalledWith(user, document);
  });
});
