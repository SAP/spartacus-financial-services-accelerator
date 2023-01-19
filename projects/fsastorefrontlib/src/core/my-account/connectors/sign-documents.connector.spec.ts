import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import createSpy = jasmine.createSpy;
import {
  SignDocumentsAdapter,
  SignDocumentsConnector,
} from '@spartacus/fsa-storefront';

class MockSignDocumentsAdapter implements SignDocumentsAdapter {
  signDocuments = createSpy(
    'SignDocumentsAdapter.signDocuments'
  ).and.callFake((userId, documentCodes, signStatus) =>
    of('signDocuments' + userId + documentCodes + signStatus)
  );
}

const userId = 'userId';
const documentCodes = 'DOC0000001,DOC0000002';
const signStatus = true;

describe('SignDocumentsConnector', () => {
  let signDocumentsConnector: SignDocumentsConnector;
  let signDocumentsAdapter: SignDocumentsAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: SignDocumentsAdapter,
          useClass: MockSignDocumentsAdapter,
        },
      ],
    });

    signDocumentsConnector = TestBed.inject(SignDocumentsConnector);
    signDocumentsAdapter = TestBed.inject(SignDocumentsAdapter);
  });

  it('should be created', () => {
    expect(signDocumentsConnector).toBeTruthy();
  });

  it('should call adapter for signDocuments', () => {
    signDocumentsConnector.signDocuments(userId, documentCodes, signStatus);
    expect(signDocumentsAdapter.signDocuments).toHaveBeenCalledWith(
      userId,
      documentCodes,
      signStatus
    );
  });
});
