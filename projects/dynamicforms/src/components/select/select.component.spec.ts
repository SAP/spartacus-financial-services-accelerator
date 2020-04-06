import { Component, Input, DebugElement, Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { OccMockFormService } from '../../occ/services/occ-mock-form.service';
import { FormConfig, CssClass } from '../../core/config/form-config';
import { FieldConfig } from '../../core';

import { SelectComponent } from './select.component';
import { I18nTestingModule } from '@spartacus/core';

@Component({
  // tslint:disable
  selector: 'cx-error-notice',
  template: '',
})
class MockErrorNoticeComponent {
  @Input() warn;
  @Input() parentConfig;
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
const dependentTestField: FieldConfig = {
  type: 'select',
  name: 'dependentTestField',
  label: 'Dependent Test Field',
  group: {
    fieldConfigs: [
      {
        type: 'select',
      },
    ],
    groupCode: 'testGroup',
  },
};
const mockField: FieldConfig = {
  type: 'select',
  name: 'testGroup',
  label: 'What time did it happen?',
  group: {
    fieldConfigs: [
      {
        type: 'select',
        options: [
          { name: 'MONTHLY', label: 'Monthly' },
          { name: 'YEARLY', label: 'Yearly' },
        ],
      },
    ],
    groupCode: 'testGroup',
  },
  depends: ['dependentTestField'],
  jsonField: 'testGroup.dependentTestField',
};

const mockFormGroup = new FormGroup({
  dependentTestField: new FormControl(),
  testGroup: new FormControl(),
});

const mockFormConfig: FormConfig = {
  cssClass: mockCssClass,
  components: {
    select: {
      component: SelectComponent,
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
      declarations: [SelectComponent, MockErrorNoticeComponent],
      imports: [ReactiveFormsModule, I18nTestingModule],
      providers: [
        { provide: OccMockFormService, useClass: MockOccFormService },
        {
          provide: FormConfig,
          useValue: mockFormConfig,
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
    mockOccFormService = new MockOccFormService();
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
    const selectComponent = el.query(By.css('.dynamic-field')).nativeElement;
    expect(selectComponent).toBeTruthy();
  });
});
