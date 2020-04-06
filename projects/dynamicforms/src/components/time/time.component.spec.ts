import { Component, Input, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { OccMockFormService } from '../../occ/services/occ-mock-form.service';
import { FormConfig, CssClass } from '../../core/config/form-config';
import { FieldConfig } from '../../core';
import { TimeComponent } from './time.component';

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
  type: 'time',
  name: 'testGroup',
  label: 'What time did it happen?',
  group: {
    fieldConfigs: [
      {
        type: 'time',
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
    time: {
      component: TimeComponent,
    },
  },
};

describe('TimeComponent', () => {
  let component: TimeComponent;
  let fixture: ComponentFixture<TimeComponent>;
  let mockOccFormService: MockOccFormService;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TimeComponent, MockErrorNoticeComponent],
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
    fixture = TestBed.createComponent(TimeComponent);
    mockOccFormService = new MockOccFormService();
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
    expect(component.config.type).toEqual('time');
  });

  it('should render time component', () => {
    const timeComponent = el.query(By.css('.dynamic-field')).nativeElement;
    expect(timeComponent).toBeTruthy();
  });
});
