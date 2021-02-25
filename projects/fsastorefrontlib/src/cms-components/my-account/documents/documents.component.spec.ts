import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { FileService } from '@spartacus/dynamicforms';
import { I18nTestingModule } from '@spartacus/core';
import { DocumentsComponent } from './documents.component';
import { of } from 'rxjs';

const mockDocument = {
  code: 'TestDocument',
  name: 'Test Document',
  creationTime: '2021-02-24T13:13:54+0000',
};

const mockFiles = {
  documents: [
    {
      mockDocument,
    },
  ],
};

class MockFileService {
  getFiles() {
    return of(mockFiles);
  }
  getDocument() {
    return of(mockDocument);
  }
}
describe('DocumentsComponent', () => {
  let component: DocumentsComponent;
  let fixture: ComponentFixture<DocumentsComponent>;
  let mockFileService: FileService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule],
        declarations: [DocumentsComponent],
        providers: [{ provide: FileService, useClass: MockFileService }],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    mockFileService = TestBed.inject(FileService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should download document', () => {
    spyOn(mockFileService, 'getDocument').and.callThrough();
    component.downloadDocument(mockDocument);
    expect(mockFileService.getDocument).toHaveBeenCalledWith(mockDocument);
  });

  it('should get referred insurance objects', () => {
    const mockPolicyNumber = 'testPolicy';
    const mockClaimNumber = 'testClaim';
    const testDocument = {
      code: 'TestDocument',
      name: 'Test Document',
      creationTime: '2021-02-24T13:13:54+0000',
      insurancePolicy: {
        policyNumber: mockPolicyNumber,
      },
      claim: {
        claimNumber: mockClaimNumber,
      },
    };
    expect(component.getReferredInsuranceObjects(testDocument)).toEqual([
      mockPolicyNumber,
      mockClaimNumber,
    ]);
  });
});
