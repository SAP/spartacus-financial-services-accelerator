import { Component, DebugElement, Input } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  UntypedFormControl,
  UntypedFormGroup,
  ReactiveFormsModule,
  AbstractControl,
} from '@angular/forms';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import {
  CurrencyService,
  I18nTestingModule,
  LanguageService,
} from '@spartacus/core';
import { DynamicFormsConfig } from '../../core/config/form-config';
import { FieldConfig } from '../../core/models/form-config.interface';
import { FormService } from './../../core/services/form/form.service';
import { CurrencyComponent } from './currency.component';

const mockField: FieldConfig = {
  fieldType: 'currency',
  name: 'testCurrency',
  label: {
    default: 'testLabel',
    en: 'Test Input Label',
  },
};

const formControl = new UntypedFormControl('formValue');

const mockFormGroup = new UntypedFormGroup({
  testCurrency: new UntypedFormControl(),
});

const mockDynamicFormsConfig: DynamicFormsConfig = {
  dynamicForms: {},
};

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

class MockFormService {
  getFormControlForCode(): AbstractControl {
    return formControl;
  }
}

class MockCurrencyService {
  getActive() {
    return of('EUR');
  }
}

describe('CurrencyComponent', () => {
  let component: CurrencyComponent;
  let fixture: ComponentFixture<CurrencyComponent>;
  let formService: FormService;
  let el: DebugElement;
  let currencyService: CurrencyService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [CurrencyComponent, MockErrorNoticeComponent],
        imports: [ReactiveFormsModule, I18nTestingModule],
        providers: [
          { provide: LanguageService, useClass: MockLanguageService },
          {
            provide: DynamicFormsConfig,
            useValue: mockDynamicFormsConfig,
          },
          { provide: FormService, useClass: MockFormService },
          { provide: CurrencyService, useClass: MockCurrencyService },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyComponent);
    formService = TestBed.inject(FormService);
    component = fixture.componentInstance;
    component.group = mockFormGroup;
    component.config = mockField;
    el = fixture.debugElement;
    fixture.detectChanges();

    currencyService = TestBed.inject(CurrencyService);
    spyOn(currencyService, 'getActive').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check components type', () => {
    expect(component.config).toBe(mockField);
    expect(component.config.fieldType).toEqual('currency');
  });

  it('should render currency component', () => {
    const currencyComponent = el.query(
      By.css('input[type="text"]')
    ).nativeElement;
    expect(currencyComponent).toBeTruthy();
  });
});
