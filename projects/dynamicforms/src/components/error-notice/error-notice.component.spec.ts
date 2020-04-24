import { DebugElement, Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { I18nTestingModule, LanguageService } from '@spartacus/core';
import { of } from 'rxjs';
import { CssClass, DynamicFormsConfig } from '../../core/config/form-config';
import { FieldConfig } from '../../core/models';
import { OccMockFormService } from '../../occ/services/occ-mock-form.service';
import { ErrorNoticeComponent } from './error-notice.component';

const mockCssClass: CssClass = {
  validatorMessageWrapper: 'testErrorClass',
};

class MockOccFormService { }

class MockLanguageService {
  getActive() {
    return of();
  }
}

const enErrorMessage = 'En test string';
const defaultErrorMessage = 'Test string';

const mockParentConfig: FieldConfig = {
  type: 'error',
  error: {
    default: defaultErrorMessage,
    en: enErrorMessage
  },
};

const mockFormGroup = new FormGroup({
  testGroup: new FormControl(),
});

const mockDynamicFormsConfig: DynamicFormsConfig = {
  dynamicForms: {
    cssClass: mockCssClass,
    components: {},
  },
};

describe('ErrorNoticeComponent', () => {
  let component: ErrorNoticeComponent;
  let fixture: ComponentFixture<ErrorNoticeComponent>;
  let el: DebugElement;
  let mockLanguageService: LanguageService;
  let occMockFormService: OccMockFormService;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [ErrorNoticeComponent],
      imports: [ReactiveFormsModule, I18nTestingModule],
      providers: [
        { provide: OccMockFormService, useClass: MockOccFormService },
        {
          provide: LanguageService,
          useClass: MockLanguageService,
        },
        {
          provide: DynamicFormsConfig,
          useValue: mockDynamicFormsConfig,
        },
      ],
    }).compileComponents();
    mockLanguageService = TestBed.get(LanguageService as Type<LanguageService>);
    occMockFormService = TestBed.get(OccMockFormService as Type<OccMockFormService>);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorNoticeComponent);
    component = fixture.componentInstance;
    component.group = mockFormGroup;
    component.parentConfig = mockParentConfig;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render textarea component', () => {
    const errorComponent = el.query(By.css('.testErrorClass')).nativeElement;
    expect(errorComponent).toBeTruthy();
  });

  it('should set default errorMessage', () => {
    spyOn(mockLanguageService, 'getActive').and.returnValue(of('fr'));
    component.ngOnInit();
    component.ngOnDestroy();
    expect(component.errorMessage).toEqual(defaultErrorMessage);
  });

  it('should set english error message', () => {
    spyOn(mockLanguageService, 'getActive').and.returnValue(of('en'));
    component.ngOnInit();
    component.ngOnDestroy();
    expect(component.errorMessage).toEqual(enErrorMessage);
  });
});
