import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  GlobalMessage,
  GlobalMessageService,
  I18nTestingModule,
  LanguageService,
  OCC_USER_ID_CURRENT,
  UserIdService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { DynamicFormsConfig } from '../../core/config/form-config';
import { FieldConfig } from '../../core/models/form-config.interface';
import { FileService } from '../../core/services/file/file.service';
import { FormService } from './../../core/services/form/form.service';
import { UploadComponent } from './upload.component';
import { FormDataService } from '../../core';

@Component({
  // eslint-disable-next-line
  selector: 'cx-error-notice',
  template: '',
})
class MockErrorNoticeComponent {
  @Input() warn;
  @Input() parentConfig;
}

const mockInProgressHttpResponse = {
  body: {
    code: '00007012',
    downloadUrl: '/medias/testFile1.pdf',
  },
  loaded: 100,
  total: 200,
  type: 1,
};

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

const mockFormGroup = new FormGroup({
  testUpload: new FormControl('', Validators.required),
});

const blob1 = new Blob([''], { type: 'application/pdf' });
blob1['lastModifiedDate'] = '';
blob1['name'] = 'testFile1';
blob1['code'] = 'DOC00002012';
const mockFile = <File>blob1;

const blob2 = new Blob([''], { type: 'image/jpeg' });
blob2['lastModifiedDate'] = '';
blob2['name'] = 'testFile2';
blob2['code'] = 'DOC00002011';
const mockFile2 = <File>blob2;

const blob3 = new Blob([''], { type: 'application/xml' });

const mockManipulatedTarget = {
  target: {
    files: [mockFile, mockFile2],
    multiple: true,
    accept: 'image/png',
    value: 'test',
  },
};

const mockNotSupportedFile = {
  target: {
    files: [<File>blob3],
    multiple: true,
    accept: 'application/pdf,image/jpeg',
    value: 'test',
  },
};

const formData = {
  formDataId: 'id',
  content: '{"relevantFiles":["DOC00002012","DOC00002011"]}',
};

const mockEvent = {
  target: {
    files: [mockFile, mockFile2],
    multiple: true,
    accept: 'application/pdf,image/jpeg',
    value: 'test',
  },
};

const mockFiles = {
  documents: [
    {
      code: 'DOC00002012',
    },
  ],
};

const mockDynamicFormsConfig: DynamicFormsConfig = {
  dynamicForms: {},
};

class MockFileUpladService {
  uploadFile(_file: File) {
    return of(mockInProgressHttpResponse);
  }
  getFiles(codes) {
    return of(mockFiles);
  }
  setFileInStore(_body: any) {}
  getUploadedDocuments() {
    return of();
  }
  resetFiles() {}
  removeFileForCode() {}
  removeAllFiles() {}
}

class MockLanguageService {
  getActive() {
    return of('en');
  }
}

class MockFormService {
  getFormControlForCode(): AbstractControl {
    return formControl;
  }
}
class MockFormDataService {
  getFormData(): Observable<any> {
    return of(formData);
  }
}
class MockUserIdService {
  getUserId(): Observable<string> {
    return of(OCC_USER_ID_CURRENT);
  }
}
class MockGlobalMessageService {
  add(_message: GlobalMessage): void {}
}

describe('UploadComponent', () => {
  let formService: FormService;
  let component: UploadComponent;
  let fixture: ComponentFixture<UploadComponent>;
  let mockfileUpladService: FileService;
  let mockUserIdService: UserIdService;
  let mockGlobalMessageService: GlobalMessageService;
  let mockFormDataService: FormDataService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [UploadComponent, MockErrorNoticeComponent],
        imports: [ReactiveFormsModule, I18nTestingModule],
        providers: [
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
          { provide: FormDataService, useClass: MockFormDataService },
          { provide: UserIdService, useClass: MockUserIdService },
          { provide: GlobalMessageService, useClass: MockGlobalMessageService },
        ],
      }).compileComponents();
      fixture = TestBed.createComponent(UploadComponent);
      formService = TestBed.inject(FormService);
      mockfileUpladService = TestBed.inject(FileService);
      mockUserIdService = TestBed.inject(UserIdService);
      mockGlobalMessageService = TestBed.inject(GlobalMessageService);
      mockFormDataService = TestBed.inject(FormDataService);
    })
  );

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
    expect(component.fileList.length).toEqual(2);
  });

  it('should not upload file with not supported types', () => {
    component.ngOnInit();
    component.handleFiles(mockNotSupportedFile);
    expect(component.uploadControl.value).toBe(null);
    expect(component.uploadControl.valid).toBeFalsy();
    expect(component.fileList.length).toEqual(0);
  });

  it('should reset upload control if there is no files', () => {
    spyOn(mockfileUpladService, 'getFiles').and.returnValue(of({}));
    component.ngOnInit();
    expect(component.uploadControl.value).toBe(null);
  });

  it('should not select files when accept is manipulated', () => {
    component.ngOnInit();
    component.handleFiles(mockManipulatedTarget);
    expect(component.uploadControl.value).toBe(null);
  });

  it('should start upload files', () => {
    component.uploadFiles(mockEvent.target.files);
    spyOn(mockfileUpladService, 'uploadFile').and.callThrough();
    expect(component.individualProgress[0]).toEqual(50);
  });

  it('should display bytes when value is less than 1024', () => {
    mockField.maxFileSize = 30;
    component.handleFiles(mockEvent);
    expect(component.convertFileSize(mockField.maxFileSize)).toBe('30 Bytes');
  });

  it('should remove single file', () => {
    component.handleFiles(mockEvent);
    component.removeFile(0, mockField);
    expect(component.fileList.length).toEqual(1);
  });

  it('should remove all files', () => {
    component.handleFiles(mockEvent);
    component.removeAll(mockField);
    expect(component.fileList.length).toEqual(0);
  });
});
