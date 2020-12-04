import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import {
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
  // tslint:disable
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

const mockDynamicFormsConfig: DynamicFormsConfig = {
  dynamicForms: {},
};

class MockFileUpladService {
  uploadFile(_file: File) {
    return of(mockInProgressHttpResponse);
  }
  getFiles(codes) {
    return of();
  }
  setFileInStore(_body: any) {}
  getUploadedDocuments() {
    return of();
  }
  resetFiles() {}
  removeFileForCode() {}
  removeAllFiles() {}
}

class MockOccValueListService {}
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

describe('UploadComponent', () => {
  let formService: FormService;
  let component: UploadComponent;
  let fixture: ComponentFixture<UploadComponent>;
  let mockfileUpladService: FileService;
  let mockUserIdService: UserIdService;

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
        ],
      }).compileComponents();
      fixture = TestBed.createComponent(UploadComponent);
      formService = TestBed.inject(FormService);
      mockfileUpladService = TestBed.inject(FileService);
      mockUserIdService = TestBed.inject(UserIdService);
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
    fixture.detectChanges();
    expect(component.fileList.length).toEqual(2);
  });

  it('should not select files when accept is manipulated', () => {
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
