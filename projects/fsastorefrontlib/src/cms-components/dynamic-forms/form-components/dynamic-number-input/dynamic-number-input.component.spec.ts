import { Component, DebugElement, Input } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { By } from '@angular/platform-browser';
import {
  DynamicFormsConfig,
  FieldConfig,
  FormService,
} from '@spartacus/dynamicforms';
import {
  CurrencyService,
  I18nTestingModule,
  LanguageService,
} from '@spartacus/core';
import { of } from 'rxjs';
import { DynamicNumberInputComponent } from './dynamic-number-input.component';
import { OccDynamicNumberInputService } from '../../../../occ/services/dynamic-number-input/occ-dynamic-number-input.service';
import { DynamicFormsCategoryService } from '../../services/dynamic-forms-category.service';

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

const apiValues = {
  values: [
    {
      name: 'TestName',
      label: 'TestLabel',
    },
    {
      name: 'TestName2',
      label: 'TestLabel2',
    },
  ],
};

class MockOccDynamicNumberInputService {
  getValuesFromAPI() {
    return of(apiValues);
  }
}

let formControl = new FormControl('formValue');

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

 let mockField: FieldConfig = {
  fieldType: 'input',
  name: 'testInput',
};

class MockDynamicFormsCategoryService {
  configureApiValueForCategory(_mockField) {}
}

const testUrl = 'testUrl';

const mockFormGroup = new FormGroup({
  testInput: new FormControl(),
});

const mockDynamicFormsConfig: DynamicFormsConfig = {
  dynamicForms: {},
};

describe('DynamicNumberInputComponent', () => {
  let component: DynamicNumberInputComponent;
  let fixture: ComponentFixture<DynamicNumberInputComponent>;
  let occDynamicNumberInputService: OccDynamicNumberInputService;
  let formService: FormService;
  let el: DebugElement;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [DynamicNumberInputComponent, MockErrorNoticeComponent],
        imports: [ReactiveFormsModule, I18nTestingModule],
        providers: [
          {
            provide: OccDynamicNumberInputService,
            useClass: MockOccDynamicNumberInputService,
          },
          { provide: LanguageService, useClass: MockLanguageService },
          {
            provide: DynamicFormsConfig,
            useValue: mockDynamicFormsConfig,
          },
          { provide: FormService, useClass: MockFormService },
          { provide: CurrencyService, useClass: MockCurrencyService },
          {
            provide: DynamicFormsCategoryService,
            useClass: MockDynamicFormsCategoryService,
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicNumberInputComponent);
    occDynamicNumberInputService = TestBed.inject(OccDynamicNumberInputService);
    formService = TestBed.inject(FormService);
    component = fixture.componentInstance;
    component.group = mockFormGroup;
    mockField = {
      fieldType: 'input',
      name: 'testInput',
      label: {
        default: 'testLabel',
        en: 'TestLabel',
      },
      apiValue: {
        url: testUrl,
      },
    };
    component.config = mockField;
    el = fixture.debugElement;
    fixture.detectChanges();
    spyOn(occDynamicNumberInputService, 'getValuesFromAPI').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not call external API', () => {
    mockField.apiValue = undefined;
    component.ngOnInit();
    fixture.detectChanges();
    expect(
      occDynamicNumberInputService.getValuesFromAPI
    ).not.toHaveBeenCalled();
  });

  it('should call external API without parameter', () => {
    spyOn(component, 'assignResultToMinMax').and.callThrough();
    mockField.apiValue.param = undefined;
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.assignResultToMinMax).toHaveBeenCalled();
  });

  it('should render select component', () => {
    const inputComponent = el.query(By.css('input')).nativeElement;
    expect(inputComponent).toBeTruthy();
  });
});
