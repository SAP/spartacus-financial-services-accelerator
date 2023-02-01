import { Component, DebugElement, Input } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  AbstractControl,
  UntypedFormControl,
  UntypedFormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { By } from '@angular/platform-browser';
import { I18nTestingModule, LanguageService } from '@spartacus/core';
import { of } from 'rxjs';
import { FormDateConfig } from '../../core';
import { DynamicFormsConfig } from '../../core/config/form-config';
import { FieldConfig } from '../../core/models/form-config.interface';
import { FormService } from './../../core/services/form/form.service';
import { DatePickerComponent } from './datepicker.component';

@Component({
  // eslint-disable-next-line
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
  fieldType: 'datepicker',
  name: 'testDatePicker',
  label: {
    default: 'testLabel',
    en: 'TestLabel',
  },
};

const formControl = new UntypedFormControl('formValue');

class MockFormService {
  getFormControlForCode(): AbstractControl {
    return formControl;
  }
}

const mockFormGroup = new UntypedFormGroup({
  testDatePicker: new UntypedFormControl(),
});

const mockDynamicFormsConfig: DynamicFormsConfig = {
  dynamicForms: {},
};

describe('DatePickerComponent', () => {
  let component: DatePickerComponent;
  let fixture: ComponentFixture<DatePickerComponent>;
  let formService: FormService;
  let el: DebugElement;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [DatePickerComponent, MockErrorNoticeComponent],
        imports: [ReactiveFormsModule, I18nTestingModule],
        providers: [
          { provide: LanguageService, useClass: MockLanguageService },
          {
            provide: DynamicFormsConfig,
            useValue: mockDynamicFormsConfig,
          },
          { provide: FormService, useClass: MockFormService },
          {
            provide: FormDateConfig,
            useValue: { date: { format: 'yyyy-mm-dd' } },
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(DatePickerComponent);
    formService = TestBed.inject(FormService);
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
    expect(component.config.fieldType).toEqual('datepicker');
  });

  it('should render datepicker component', () => {
    const heading = el.query(By.css('input[type="date"]')).nativeElement;
    expect(heading).toBeTruthy();
  });
});
