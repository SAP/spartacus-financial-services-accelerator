import { Component, Input, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { OccMockFormService } from '../../occ/services/occ-mock-form.service';
import { DynamicFormsConfig, CssClass } from '../../core/config/form-config';
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

const mockCssClass: CssClass = {
  form: '',
};

class MockOccFormService {}

const mockField: FieldConfig = {
  type: 'textarea',
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
      textarea: {
        component: TextAreaComponent,
      },
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
          provide: DynamicFormsConfig,
          useValue: mockDynamicFormsConfig,
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
    const TextAreaComponent = el.query(By.css('textarea')).nativeElement;
    expect(TextAreaComponent).toBeTruthy();
  });
});
