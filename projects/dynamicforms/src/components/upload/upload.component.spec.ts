import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  AbstractControl,
} from '@angular/forms';
import { of } from 'rxjs';
import { I18nTestingModule, LanguageService } from '@spartacus/core';
import { DynamicFormsConfig } from '../../core/config/form-config';
import { FieldConfig } from '../../core/models/form-config.interface';
import { OccValueListService } from '../../occ/services/occ-value-list.service';
import { FormService } from './../../core/services/form/form.service';
import { FileService } from '../../core/services/file/file.service';

import { UploadComponent } from './upload.component';

@Component({
  // tslint:disable
  selector: 'cx-error-notice',
  template: '',
})
class MockErrorNoticeComponent {
  @Input() warn;
  @Input() parentConfig;
}

const mockCompletedHttpResponse = {
  body: {
    code: '00007012',
    downloadUrl: '/medias/testFile1.pdf',
  },
  ok: true,
  type: 4,
};

const mockInProgressHttpResponse = {
  body: {
    code: '00007012',
    downloadUrl: '/medias/testFile1.pdf',
  },
  loaded: 100,
  total: 200,
  type: 1,
};

class MockFileUpladService {
  uploadFile(_file: File) {
    return of(mockInProgressHttpResponse);
  }
  setFileInStore(_body: any) {}
  getUploadedDocuments() {
    return of();
  }
  resetFiles() {}
}

class MockOccValueListService {}
class MockLanguageService {
  getActive() {
    return of('en');
  }
}
const mockField: FieldConfig = {
  label: {
    en: 'Test Upload',
    de: 'Test Upload',
  },
  name: 'testUpload',
  fieldType: 'upload',
  required: true,
  multiple: true,
  maxUploads: 4,
  accept: ['application/pdf', 'image/jpeg'],
  maxFileSize: 1048576,
};

const formControl = new FormControl('formValue');

class MockFormService {
  getFormControlForCode(): AbstractControl {
    return formControl;
  }
}

const mockFormGroup = new FormGroup({
  testUpload: new FormControl(),
});

const blob1 = new Blob([''], { type: 'application/pdf' });
blob1['lastModifiedDate'] = '';
blob1['name'] = 'testFile1';
const mockFile = <File>blob1;

const blob2 = new Blob([''], { type: 'image/jpeg' });
blob2['lastModifiedDate'] = '';
blob2['name'] = 'testFile2';
const mockFile2 = <File>blob2;

const mockManipulatedTarget = {
  target: {
    accept: '*',
  },
};

const mockEvent = {
  target: {
    files: [mockFile, mockFile2],
    multiple: true,
    accept: 'application/pdf,image/jpeg',
    value: 'test',
  },
};

const mockDynamicFormsConfig: DynamicFormsConfig = {
  dynamicForms: {},
};

describe('UploadComponent', () => {
  let formService: FormService;
  let component: UploadComponent;
  let fixture: ComponentFixture<UploadComponent>;
  let mockfileUpladService: FileService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UploadComponent, MockErrorNoticeComponent],
      imports: [ReactiveFormsModule, I18nTestingModule],
      providers: [
        { provide: OccValueListService, useClass: MockOccValueListService },
        { provide: LanguageService, useClass: MockLanguageService },
        {
          provide: DynamicFormsConfig,
          useValue: mockDynamicFormsConfig,
        },
        {
          provide: FileService,
          useClass: MockFileUpladService,
        },
        { provide: FormService, useClass: MockFormService },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(UploadComponent);
    formService = TestBed.inject(FormService);
    mockfileUpladService = TestBed.inject(FileService);
  }));

  beforeEach(() => {
    component = fixture.componentInstance;
    component.group = mockFormGroup;
    component.config = mockField;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select files', () => {
    component.ngOnInit();
    component.handleFiles(mockEvent);
    fixture.detectChanges();
    expect(component.fileList.length).toEqual(2);
  });

  it('should not select files when accept is manipulated', () => {
    component.handleFiles(mockManipulatedTarget);
    expect(component.uploadControl.value).toBe(null);
  });

  it('should remove individual files', () => {
    component.handleFiles(mockEvent);
    component.removeFile(0, mockEvent.target.files);
    expect(component.fileList.length).toBe(1);
    component.removeFile(0, mockEvent.target.files);
    expect(component.fileList.length).toBe(0);
  });

  it('should remove all Files', () => {
    component.handleFiles(mockEvent);
    component.removeAll(mockEvent.target);
    expect(component.fileList.length).toEqual(0);
  });

  it('should start upload files', () => {
    component.uploadFiles(mockEvent.target.files);
    spyOn(mockfileUpladService, 'uploadFile').and.callThrough();
    expect(component.progress).toEqual(50);
  });

  it('should display bytes when value is less than 1024', () => {
    mockField.maxFileSize = 30;
    component.handleFiles(mockEvent);
    expect(component.convertFileSize(mockField.maxFileSize)).toBe('30 Bytes');
  });
});
