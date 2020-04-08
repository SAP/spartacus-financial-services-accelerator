import { Component, DebugElement, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { FieldConfig } from '../../core';
import { CssClass, DynamicFormsConfig } from '../../core/config/form-config';
import { OccMockFormService } from '../../occ/services/occ-mock-form.service';
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
  radioLabel: 'testRadioInputLabel',
};

class MockOccFormService {}

const mockField: FieldConfig = {
  type: 'radio',
  name: 'testGroup',
  label: 'What time did it happen?',
};

const mockFormGroup = new FormGroup({
  testGroup: new FormControl(),
});

const mockDynamicFormsConfig: DynamicFormsConfig = {
  dynamicForms: {
    cssClass: mockCssClass,
    components: {
      radio: {
        component: RadioComponent,
      },
    },
  },
};

describe('RadioComponent', () => {
  let component: RadioComponent;
  let fixture: ComponentFixture<RadioComponent>;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RadioComponent,
        MockErrorNoticeComponent,
        MockLabelComponent,
      ],
      imports: [ReactiveFormsModule],
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
    fixture = TestBed.createComponent(RadioComponent);
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
    expect(component.config.type).toEqual('radio');
  });

  it('should render radio component', () => {
    const radioComponent = el.query(By.css('.testRadioInputLabel'))
      .nativeElement;
    expect(radioComponent).toBeTruthy();
  });
});
