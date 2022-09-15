import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { FileService } from '@spartacus/dynamicforms';
import { of } from 'rxjs';
import { DocumentsTableComponent } from './documents-table.component';

const mockDocument = {
  code: 'TestDocument',
  name: 'Test Document',
  mime: 'application/pdf',
  creationTime: '2021-02-24T13:13:54+0000',
};

class MockFileService {
  getDocument() {
    return of(mockDocument);
  }
}

describe('DocumentsTableComponent', () => {
  let component: DocumentsTableComponent;
  let fixture: ComponentFixture<DocumentsTableComponent>;
  let mockFileService: FileService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule],
        declarations: [DocumentsTableComponent],
        providers: [{ provide: FileService, useClass: MockFileService }],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentsTableComponent);
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

  it('should check if document is valid', () => {
    expect(component.isDocumentValid(mockDocument)).toBe(true);
  });
});
