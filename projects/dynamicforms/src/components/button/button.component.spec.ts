import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { OccMockFormService } from '../../occ/services/occ-mock-form.service';
import { DynamicFormsConfig, CssClass } from '../../core/config/form-config';
import { FieldConfig } from '../../core';
import { ButtonComponent } from './button.component';

const mockCssClass: CssClass = {
  form: '',
};

class MockOccFormService {}

const mockField: FieldConfig = {
  type: 'button',
  name: 'testButton',
  label: 'Test button',
};

const mockFormGroup = new FormGroup({
  testButton: new FormControl(),
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

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonComponent],
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
    fixture = TestBed.createComponent(ButtonComponent);
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
    const buttonEl = el.query(By.css('button')).nativeElement;
    expect(buttonEl).toBeTruthy();
  });
});
