import { Component, DebugElement, Input, Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { I18nTestingModule } from '@spartacus/core';
import { FieldConfig } from '../../core';
import { CssClass, DynamicFormsConfig } from '../../core/config/form-config';
import { OccMockFormService } from '../../occ/services/occ-mock-form.service';
import { SelectComponent } from './select.component';

@Component({
  // tslint:disable
  selector: 'cx-error-notice',
  template: '',
})
class MockErrorNoticeComponent {
  @Input() warn;
  @Input() parentConfig;
}

@Component({
  // tslint:disable
  selector: 'cx-label',
  template: '',
})
class MockLabelComponent {
  @Input() config;
  @Input() cssLabelClass;
}

const mockCssClass: CssClass = {
  form: '',
};

const dependentOptions = [
  {
    name: 'TestName',
    label: 'TestLabel',
  },
  {
    name: 'TestName2',
    label: 'TestLabel2',
  },
];

class MockOccFormService {
  setInitialFormControlValues() {
    return dependentOptions;
  }

  getDropdownValues() {
    return dependentOptions;
  }

  getNodes() {
    return dependentOptions;
  }
}

const mockField: FieldConfig = {
  type: 'select',
  name: 'testGroup',
  label: 'What time did it happen?',
  depends: ['dependentTestField'],
  jsonField: 'testGroup.dependentTestField',
};

const mockFormGroup = new FormGroup({
  dependentTestField: new FormControl(),
  testGroup: new FormControl(),
});

const mockDynamicFormsConfig: DynamicFormsConfig = {
  dynamicForms: {
    cssClass: mockCssClass,
    components: {
      select: {
        component: SelectComponent,
      },
    },
  },
};

describe('SelectComponent', () => {
  let component: SelectComponent;
  let fixture: ComponentFixture<SelectComponent>;
  let mockOccFormService: OccMockFormService;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SelectComponent,
        MockErrorNoticeComponent,
        MockLabelComponent,
      ],
      imports: [ReactiveFormsModule, I18nTestingModule],
      providers: [
        { provide: OccMockFormService, useClass: MockOccFormService },
        {
          provide: DynamicFormsConfig,
          useValue: mockDynamicFormsConfig,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectComponent);
    mockOccFormService = TestBed.get(OccMockFormService as Type<
      OccMockFormService
    >);
    component = fixture.componentInstance;
    component.group = mockFormGroup;
    component.config = mockField;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check components type', () => {
    expect(component.config).toBe(mockField);
    expect(component.config.type).toEqual('select');
  });

  it('should set form control values', () => {
    component.setFormControlValues('testGroup');
    expect(component.config.options).toEqual(dependentOptions);
  });

  it('should render select component', () => {
    const selectComponent = el.query(By.css('select')).nativeElement;
    expect(selectComponent).toBeTruthy();
  });
});
