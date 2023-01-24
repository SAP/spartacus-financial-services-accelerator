import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { DocumentConnector } from '../connectors';
import { DocumentService } from '@spartacus/fsa-storefront';

const userId = 'userId';
const documentCodes = 'DOC0000001,DOC0000002';
const signStatus = true;

describe('DocumentServiceTest', () => {
  let documentService: DocumentService;
  let documentConnectorSpy: jasmine.SpyObj<DocumentConnector>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('DocumentConnector', ['signDocuments']);

    TestBed.configureTestingModule({
      providers: [
        DocumentService,
        { provide: DocumentConnector, useValue: spy },
      ],
    });

    documentService = TestBed.inject(DocumentService);
    documentConnectorSpy = TestBed.inject(DocumentConnector) as jasmine.SpyObj<
      DocumentConnector
    >;
  });

  it('should check if all services are injected', () => {
    expect(documentService).toBeTruthy();
    expect(documentConnectorSpy).toBeTruthy();
  });

  it('should check if signDocuments is called', () => {
    const stubValue = of('test');
    documentConnectorSpy.signDocuments.and.returnValue(stubValue);

    expect(
      documentService.signDocuments(userId, documentCodes, signStatus)
    ).toBe(stubValue);

    expect(documentConnectorSpy.signDocuments.calls.count()).toBe(1);

    expect(
      documentConnectorSpy.signDocuments.calls.mostRecent().returnValue
    ).toBe(stubValue);
  });
});
