import { Component, DebugElement, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  AbstractControl,
} from '@angular/forms';
import { By } from '@angular/platform-browser';
import { I18nTestingModule, LanguageService } from '@spartacus/core';
import { of } from 'rxjs';
import { DynamicFormsConfig } from '../../core/config/form-config';
import { FieldConfig } from '../../core/models/form-config.interface';
import { FormService } from './../../core/services/form/form.service';
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

class MockLanguageService {
  getActive() {
    return of('en');
  }
}

const mockField: FieldConfig = {
  fieldType: 'time',
  name: 'testTime',
  label: {
    en: 'What time did it happen?',
  },
};

const formControl = new FormControl('formValue');

class MockFormService {
  getFormControlForCode(): AbstractControl {
    return formControl;
  }
}

const mockFormGroup = new FormGroup({
  testTime: new FormControl(),
});

const mockDynamicFormsConfig: DynamicFormsConfig = {
  dynamicForms: {},
};

describe('TimeComponent', () => {
  let component: TimeComponent;
  let fixture: ComponentFixture<TimeComponent>;
  let formService: FormService;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TimeComponent, MockErrorNoticeComponent],
      imports: [ReactiveFormsModule, I18nTestingModule],
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
    fixture = TestBed.createComponent(TimeComponent);
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
    expect(component.config.fieldType).toEqual('time');
  });

  it('should render time component', () => {
    const timeComponent = el.query(By.css('input[type="time"]')).nativeElement;
    expect(timeComponent).toBeTruthy();
  });
});
