import { Component, Input, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { OccMockFormService } from '../../occ/services/occ-mock-form.service';
import { FormConfig, CssClass } from '../../core/config/form-config';
import { FieldConfig } from '../../core';

import { RadioComponent } from './radio.component';

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
  formTitle: 'testTitle',
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
  type: 'radio',
  name: 'testGroup',
  label: 'What time did it happen?',
  group: {
    fieldConfigs: [
      {
        type: 'radio',
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
    radio: {
      component: RadioComponent,
    },
  },
};

describe('RadioComponent', () => {
  let component: RadioComponent;
  let fixture: ComponentFixture<RadioComponent>;
  let mockOccFormService: MockOccFormService;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RadioComponent, MockErrorNoticeComponent],
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
    fixture = TestBed.createComponent(RadioComponent);
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
    expect(component.config.type).toEqual('radio');
  });

  it('should render radio component', () => {
    const radioComponent = el.query(By.css('.dynamic-field')).nativeElement;
    expect(radioComponent).toBeTruthy();
  });
});
