import { Component, Input } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { DocumentFile, FileService } from '@spartacus/dynamicforms';
import { I18nTestingModule } from '@spartacus/core';
import { DocumentsOverviewComponent } from './documents-overview.component';
import { of } from 'rxjs';

const blob1 = new Blob([''], { type: 'application/pdf' });
blob1['lastModifiedDate'] = '';
blob1['name'] = 'testFile1';
blob1['code'] = 'DOC00002012';
const mockDocument1 = <DocumentFile>blob1;

const blob2 = new Blob([''], { type: 'image/jpeg' });
blob2['lastModifiedDate'] = '';
blob2['name'] = 'testFile2';
blob2['code'] = 'DOC00002011';
const mockDocument2 = <DocumentFile>blob2;

const mockFiles: DocumentFile[] = [mockDocument1, mockDocument2];

class MockFileService {
  getFiles() {
    return of(mockFiles);
  }
}

@Component({
  template: '',
  selector: 'cx-fs-documents-table',
})
class MockDocumentsTableComponent {
  @Input()
  documentSource: any;
}

describe('DocumentsOverviewComponent', () => {
  let component: DocumentsOverviewComponent;
  let fixture: ComponentFixture<DocumentsOverviewComponent>;
  let mockFileService: FileService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule],
        declarations: [DocumentsOverviewComponent, MockDocumentsTableComponent],
        providers: [{ provide: FileService, useClass: MockFileService }],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    mockFileService = TestBed.inject(FileService);
    spyOn(mockFileService, 'getFiles').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get documents uploaded by customer', () => {
    const documentsUploadedByCustomer = component.getDocumentsBySource(
      mockFiles,
      false
    );
    expect(documentsUploadedByCustomer[0]).toBe(undefined);
  });

  it('should get documents received from external system', () => {
    const documentsUploadedByCustomer = component.getDocumentsBySource(
      mockFiles,
      true
    );
    expect(documentsUploadedByCustomer[0]).toBe(undefined);
  });
});
