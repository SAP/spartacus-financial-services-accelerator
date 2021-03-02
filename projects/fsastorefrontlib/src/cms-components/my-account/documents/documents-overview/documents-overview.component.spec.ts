import { Component, Input } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { FileService } from '@spartacus/dynamicforms';
import { I18nTestingModule } from '@spartacus/core';
import { DocumentsOverviewComponent } from './documents-overview.component';
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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
