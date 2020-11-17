import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  AbstractControl,
} from '@angular/forms';
import { LanguageService } from '@spartacus/core';
import { of } from 'rxjs';
import { DynamicFormsConfig } from '../../core/config/form-config';
import { FieldConfig } from '../../core/models/form-config.interface';
import { ButtonComponent } from './button.component';
import { FormService } from './../../core/services/form/form.service';

class MockLanguageService {
  getActive() {
    return of('en');
  }
}

const mockField: FieldConfig = {
  fieldType: 'button',
  name: 'testButton',
  label: {
    en: 'Test button',
  },
};

const mockFormGroup = new FormGroup({
  testButton: new FormControl(),
});

const mockDynamicFormsConfig: DynamicFormsConfig = {
  dynamicForms: {},
};

const formControl = new FormControl('formValue');

class MockFormService {
  getFormControlForCode(): AbstractControl {
    return formControl;
  }
}

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;
  let el: DebugElement;
  let formService: FormService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: LanguageService, useClass: MockLanguageService },
        {
          provide: DynamicFormsConfig,
          useValue: mockDynamicFormsConfig,
        },
        { provide: FormService, useClass: MockFormService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    formService = TestBed.inject(FormService);
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
    expect(component.config.fieldType).toEqual('button');
  });

  it('should render button component', () => {
    const buttonEl = el.query(By.css('button')).nativeElement;
    expect(buttonEl).toBeTruthy();
  });
});
