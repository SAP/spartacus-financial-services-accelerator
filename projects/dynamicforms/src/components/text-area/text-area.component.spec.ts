import { Component, Input, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { OccMockFormService } from '../../occ/services/occ-mock-form.service';
import { FormConfig, CssClass } from '../../core/config/form-config';
import { FieldConfig } from '../../core';

import { TextAreaComponent } from './text-area.component';

@Component({
  // tslint:disable
  selector: 'cx-error-notice',
  template: '',
})
class MockErrorNoticeComponent {
  @Input() warn;
  @Input() parentConfig;
}

const mockData: Observable<any> = of({});

const mockCssClass: CssClass = {
  form: '',
};

class MockOccFormService {
  setInitialFormControlValues() {
    return mockData;
  }

  getDropdownValues() {
    return mockData;
  }

  getNodes() {
    return mockData;
  }
}
const mockField: FieldConfig = {
  type: 'textarea',
  name: 'testGroup',
  label: 'What time did it happen?',
  group: {
    fieldConfigs: [
      {
        type: 'textarea',
      },
    ],
    groupCode: 'testGroup',
  },
};

const mockFormGroup = new FormGroup({
  testGroup: new FormControl(),
});

const mockFormConfig: FormConfig = {
  cssClass: mockCssClass,
  components: {
    textarea: {
      component: TextAreaComponent,
    },
  },
};

describe('TextAreaComponent', () => {
  let component: TextAreaComponent;
  let fixture: ComponentFixture<TextAreaComponent>;
  let mockOccFormService: MockOccFormService;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TextAreaComponent, MockErrorNoticeComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: OccMockFormService, useValue: mockOccFormService },
        {
          provide: FormConfig,
          useValue: mockFormConfig,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextAreaComponent);
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
    expect(component.config.type).toEqual('textarea');
  });

  it('should render textarea component', () => {
    const component = el.query(By.css('.dynamic-field')).nativeElement;
    expect(component).toBeTruthy();
  });
});
