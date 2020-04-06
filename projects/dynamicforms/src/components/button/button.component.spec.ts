import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from './button.component';
import { Observable, of } from 'rxjs';
import { OccMockFormService } from '../../occ/services/occ-mock-form.service';
import { FormConfig, CssClass } from '../../core/config/form-config';
import { FieldConfig } from '../../core';

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
  type: 'button',
  name: 'testGroup',
  label: 'Test button',
  group: {
    fieldConfigs: [
      {
        type: 'button',
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
    button: {
      component: ButtonComponent,
    },
  },
};

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;
  let mockOccFormService: MockOccFormService;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonComponent],
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
    fixture = TestBed.createComponent(ButtonComponent);
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
    expect(component.config.type).toEqual('button');
  });

  it('should render button component', () => {
    const buttonEl = el.query(By.css('.dynamic-field')).nativeElement;
    expect(buttonEl).toBeTruthy();
  });
});
