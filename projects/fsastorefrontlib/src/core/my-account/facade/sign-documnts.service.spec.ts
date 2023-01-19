import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { SignDocumentsConnector } from '../connectors';
import { SignDocumentsService } from '@spartacus/fsa-storefront';

const userId = 'userId';
const documentCodes = 'DOC0000001,DOC0000002';
const signStatus = true;

describe('SignDocumentsServiceTest', () => {
  let signDocumentsService: SignDocumentsService;
  let signDocumentsConnectorSpy: jasmine.SpyObj<SignDocumentsConnector>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('SignDocumentsConnector', [
      'signDocuments',
    ]);

    TestBed.configureTestingModule({
      providers: [
        SignDocumentsService,
        { provide: SignDocumentsConnector, useValue: spy },
      ],
    });

    signDocumentsService = TestBed.inject(SignDocumentsService);
    signDocumentsConnectorSpy = TestBed.inject(
      SignDocumentsConnector
    ) as jasmine.SpyObj<SignDocumentsConnector>;
  });

  it('should check if all services are injected', () => {
    expect(signDocumentsService).toBeTruthy();
    expect(signDocumentsConnectorSpy).toBeTruthy();
  });

  it('should check if signDocuments is called', () => {
    const stubValue = of('test');
    signDocumentsConnectorSpy.signDocuments.and.returnValue(stubValue);

    expect(
      signDocumentsService.signDocuments(userId, documentCodes, signStatus)
    ).toBe(stubValue);

    expect(signDocumentsConnectorSpy.signDocuments.calls.count()).toBe(1);

    expect(
      signDocumentsConnectorSpy.signDocuments.calls.mostRecent().returnValue
    ).toBe(stubValue);
  });
});
