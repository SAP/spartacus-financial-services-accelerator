import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LanguageService } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { UserPrefillResolver } from '../../core';
import { DynamicFormsConfig } from '../../core/config/form-config';
import { FieldConfig } from '../../core/models/form-config.interface';
import { AbstractFormComponent } from './abstract-form.component';

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
  label: {},
  prefillValue: {
    targetObject: 'user',
    targetValue: targetValue,
  },
};

const titleCode: Observable<any> = of('mr');

class MockUserPrefillResolver {
  getFieldValue() {
    return titleCode;
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

const mockFormGroup = new FormGroup({
  testTitle: new FormControl(),
});

describe('AbstractFormComponent', () => {
  let component: AbstractFormComponent;
  let fixture: ComponentFixture<AbstractFormComponent>;
  let mockLanguageService: LanguageService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AbstractFormComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: LanguageService, useClass: MockLanguageService },
        { provide: DynamicFormsConfig, useValue: mockDynamicFormsConfig },
        { provide: UserPrefillResolver, useClass: MockUserPrefillResolver },
      ],
    }).compileComponents();
    mockLanguageService = TestBed.inject(LanguageService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbstractFormComponent);
    component = fixture.componentInstance;
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
