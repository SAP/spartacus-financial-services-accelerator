import { Component, DebugElement, Input } from '@angular/core';
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

class MockOccValueListService {}
class MockLanguageService {
  getActive() {
    return of('en');
  }
}
const mockField: FieldConfig = {
  label: {
    en: 'Testing',
    de: 'Testing',
  },
  name: 'testing',
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
  testing: new FormControl(),
});
const mockFile = new File([''], 'filename', { type: 'application/pdf' });

const mockEvent = {
  target: {
    files: [mockFile],
    multiple: true,
    accept: 'application/pdf,image/jpeg',
  },
};

const mockDynamicFormsConfig: DynamicFormsConfig = {
  dynamicForms: {},
};

describe('UploadComponent', () => {
  let formService: FormService;
  let el: DebugElement;
  let component: UploadComponent;
  let fixture: ComponentFixture<UploadComponent>;

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
        { provide: FormService, useClass: MockFormService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadComponent);
    formService = TestBed.inject(FormService);
    component = fixture.componentInstance;
    component.group = mockFormGroup;
    component.config = mockField;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select files', () => {
    component.ngOnInit();
    component.handleFiles(mockEvent);
    fixture.detectChanges();
    expect(component.fileList.length).toEqual(1);
  });

  it('should not select files when accept is manipulated', () => {
    const mockEventAcceptManipulated = {
      target: {
        accept: '*',
      },
    };
    component.handleFiles(mockEventAcceptManipulated);
    expect(component.uploadControl.value).toBe(null);
  });

  it('should remove a file', () => {
    const mockIndex = 0;
    const target = {
      value: 'test',
    };
    component.handleFiles(mockEvent);
    component.removeFile(mockIndex, target);
    expect(component.fileList.length).toEqual(0);
  });

  it('should remove all Files', () => {
    const target = {
      value: 'test',
    };
    component.handleFiles(mockEvent);
    component.removeAll(target);
    expect(component.fileList.length).toEqual(0);
  });

  it('should not select files when accept is not defined', () => {
    mockField.maxFileSize = 30;
    component.handleFiles(mockEvent);
    expect(component.convertFileSize(mockField.maxFileSize)).toBe('30 Bytes');
  });
});
