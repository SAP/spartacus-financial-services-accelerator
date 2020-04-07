import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { I18nTestingModule } from '@spartacus/core';
import { OccMockFormService } from '../../occ/services/occ-mock-form.service';
import { DynamicFormsConfig, CssClass } from '../../core/config/form-config';
import { FieldConfig } from '../../core';
import { ErrorNoticeComponent } from './error-notice.component';
import { ButtonComponent } from './../button/button.component';

const mockCssClass: CssClass = {
  form: '',
  validatorMessageWrapper: 'testErrorClass',
};

class MockOccFormService {}

const mockField: FieldConfig = {
  type: 'button',
  name: 'testGroup',
  label: 'Test button',
};

const mockFormGroup = new FormGroup({
  testGroup: new FormControl(),
});

const mockDynamicFormsConfig: DynamicFormsConfig = {
  dynamicForms: {
    cssClass: mockCssClass,
    components: {
      button: {
        component: ButtonComponent,
      },
    },
  },
};

describe('ErrorNoticeComponent', () => {
  let component: ErrorNoticeComponent;
  let fixture: ComponentFixture<ErrorNoticeComponent>;
  let mockOccFormService: MockOccFormService;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ErrorNoticeComponent],
      imports: [ReactiveFormsModule, I18nTestingModule],
      providers: [
        { provide: OccMockFormService, useValue: mockOccFormService },
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
    mockOccFormService = new MockOccFormService();
    component.group = mockFormGroup;
    component.config = mockField;
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
});
