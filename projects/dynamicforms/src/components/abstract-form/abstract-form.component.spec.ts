import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  AbstractControl,
} from '@angular/forms';
import { LanguageService } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { UserPrefillResolver } from '../../core';
import { DynamicFormsConfig } from '../../core/config/form-config';
import { FieldConfig } from '../../core/models/form-config.interface';
import { AbstractFormComponent } from './abstract-form.component';
import { FormService } from './../../core/services/form/form.service';

class MockLanguageService {
  getActive() {
    return of('en');
  }
}

const enLabel = 'En test string';
const defaultLabel = 'Test string';
const mockCssClass = 'testClass';

const targetValue = 'titleCode';

const mockField: FieldConfig = {
  fieldType: 'abstract',
  name: 'testTitle',
  label: {
    default: 'testLabel',
  },
  prefillValue: {
    targetObject: 'user',
    targetValue: targetValue,
  },
  validations: [
    {
      name: 'testComparisonField',
      arguments: [{ value: 'shouldBeGreater' }],
    },
  ],
};

const titleCode: Observable<any> = of('mr');

class MockUserPrefillResolver {
  getPrefillValue() {
    return titleCode;
  }
}

const mockFormGroup = new FormGroup({
  testTitle: new FormControl(),
});

class MockFormService {
  getFormControlForCode(): AbstractControl {
    return mockFormGroup;
  }
}

const mockDynamicFormsConfig: DynamicFormsConfig = {
  dynamicForms: {
    prefill: {
      user: {
        prefillResolver: UserPrefillResolver,
      },
    },
  },
};

describe('AbstractFormComponent', () => {
  let component: AbstractFormComponent;
  let fixture: ComponentFixture<AbstractFormComponent>;
  let mockLanguageService: LanguageService;
  let formService: FormService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [AbstractFormComponent],
        imports: [ReactiveFormsModule],
        providers: [
          { provide: LanguageService, useClass: MockLanguageService },
          { provide: DynamicFormsConfig, useValue: mockDynamicFormsConfig },
          { provide: UserPrefillResolver, useClass: MockUserPrefillResolver },
          { provide: FormService, useClass: MockFormService },
        ],
      }).compileComponents();
      mockLanguageService = TestBed.inject(LanguageService);
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AbstractFormComponent);
    component = fixture.componentInstance;
    formService = TestBed.inject(FormService);
    component.group = mockFormGroup;
    component.config = mockField;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create component without prefill resolver', () => {
    mockField.prefillValue.targetObject = 'undefined';
    component.config = mockField;
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('should set default label and css class', () => {
    mockField.label.default = defaultLabel;
    mockField.cssClass = mockCssClass;
    component.config = mockField;
    component.ngOnInit();
    expect(component.hostComponentClass).toEqual('col-12 testClass');
    expect(component.label).toEqual(defaultLabel);
  });

  it('should set english label', () => {
    mockField.label.default = enLabel;
    component.config = mockField;
    component.ngOnInit();
    expect(component.label).toEqual(enLabel);
  });
});
