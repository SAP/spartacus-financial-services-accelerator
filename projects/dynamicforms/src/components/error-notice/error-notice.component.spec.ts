import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { I18nTestingModule, LanguageService } from '@spartacus/core';
import { OccMockFormService } from '../../occ/services/occ-mock-form.service';
import { DynamicFormsConfig, CssClass } from '../../core/config/form-config';
import { ErrorNoticeComponent } from './error-notice.component';
import { of } from 'rxjs';

const mockCssClass: CssClass = {
  validatorMessageWrapper: 'testErrorClass',
};

class MockOccFormService {}

class MockLanguageService {
  getActive() {
    return of('en');
  }
}

const mockParentConfig = {
  error: {
    default: 'test string',
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
    component.parentConfig = mockParentConfig;
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
    expect(component.errorMessage).toEqual('test string');
  });

  it('should set english error message', () => {
    component.parentConfig.error.en = 'En test string';
    component.ngOnInit();
    expect(component.errorMessage).toEqual('En test string');
  });
});
