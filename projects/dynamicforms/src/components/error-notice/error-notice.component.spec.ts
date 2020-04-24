import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { I18nTestingModule, LanguageService } from '@spartacus/core';
import { OccMockFormService } from '../../occ/services/occ-mock-form.service';
import { DynamicFormsConfig } from '../../core/config/form-config';
import { ErrorNoticeComponent } from './error-notice.component';
import { of } from 'rxjs';
import { FieldConfig } from '../../core/models';

class MockOccFormService {}

class MockLanguageService {
  getActive() {
    return of('en');
  }
}

const fieldType = 'inut';
const defaultErrorMessage = 'Test string';
const enErrorMessage = 'En test string';

const defaultFieldConfig: FieldConfig = {
  type: fieldType,
  error: {
    default: defaultErrorMessage,
  },
};

const localizedFieldConfig: FieldConfig = {
  type: fieldType,
  error: {
    en: enErrorMessage,
  },
};

const mockFormGroup = new FormGroup({
  testGroup: new FormControl(),
});

const mockDynamicFormsConfig: DynamicFormsConfig = {
  dynamicForms: {},
};

describe('ErrorNoticeComponent', () => {
  let component: ErrorNoticeComponent;
  let fixture: ComponentFixture<ErrorNoticeComponent>;
  let el: DebugElement;
  let mockLanguageService: MockLanguageService;

  beforeEach(async(() => {
    mockLanguageService = new MockLanguageService();

    TestBed.configureTestingModule({
      declarations: [ErrorNoticeComponent],
      imports: [ReactiveFormsModule, I18nTestingModule],
      providers: [
        { provide: OccMockFormService, useClass: MockOccFormService },
        {
          provide: LanguageService,
          useValue: mockLanguageService,
        },
        {
          provide: DynamicFormsConfig,
          useValue: mockDynamicFormsConfig,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorNoticeComponent);
    component = fixture.componentInstance;
    component.group = mockFormGroup;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set default errorMessage', () => {
    component.parentConfig = defaultFieldConfig;
    component.ngOnInit();
    expect(component.errorMessage).toEqual(defaultErrorMessage);
  });

  it('should set english error message', () => {
    component.parentConfig = localizedFieldConfig;
    component.ngOnInit();
    expect(component.errorMessage).toEqual(enErrorMessage);
  });

  it('should render error component', () => {
    const errorComponent = el.query(By.css('.px-4')).nativeElement;
    expect(errorComponent).toBeTruthy();
  });
});
