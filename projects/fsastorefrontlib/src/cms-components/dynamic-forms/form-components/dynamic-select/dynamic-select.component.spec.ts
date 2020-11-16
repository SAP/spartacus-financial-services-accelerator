import { Component, DebugElement, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
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
} from '@fsa/dynamicforms';
import { I18nTestingModule, LanguageService } from '@spartacus/core';
import { OccValueListService } from '../../../../occ/services/value-list/occ-value-list.service';
import { of } from 'rxjs';
import { DynamicSelectComponent } from './dynamic-select.component';

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

class MockOccValueListService {
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

const testUrl = 'testUrl';

let mockField: FieldConfig;

const mockFormGroup = new FormGroup({
  dependentTestField: new FormControl(),
  testSelect: new FormControl(),
});

const mockDynamicFormsConfig: DynamicFormsConfig = {
  dynamicForms: {},
};

describe('DynamicSelectComponent', () => {
  let component: DynamicSelectComponent;
  let fixture: ComponentFixture<DynamicSelectComponent>;
  let occValueListService: OccValueListService;
  let formService: FormService;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DynamicSelectComponent, MockErrorNoticeComponent],
      imports: [ReactiveFormsModule, I18nTestingModule],
      providers: [
        { provide: OccValueListService, useClass: MockOccValueListService },
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
    fixture = TestBed.createComponent(DynamicSelectComponent);
    occValueListService = TestBed.inject(OccValueListService);
    formService = TestBed.inject(FormService);
    component = fixture.componentInstance;
    component.group = mockFormGroup;
    mockField = {
      fieldType: 'select',
      name: 'testSelect',
      label: {
        en: 'TestLabel',
      },
      options: [],
      apiValue: {
        url: testUrl,
        param: 'dependentTestField',
      },
    };
    component.config = mockField;
    el = fixture.debugElement;
    fixture.detectChanges();
    spyOn(occValueListService, 'getValuesFromAPI').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not call external API', () => {
    mockField.apiValue = undefined;
    component.ngOnInit();
    fixture.detectChanges();
    expect(occValueListService.getValuesFromAPI).not.toHaveBeenCalled();
  });

  it('should call external API with parameter when value changes', () => {
    spyOn(component, 'assignResultToOptions').and.callThrough();
    formControl.setValue('testValue2');
    fixture.detectChanges();
    expect(component.assignResultToOptions).toHaveBeenCalled();
  });

  it('should call external API without parameter', () => {
    spyOn(component, 'assignResultToOptions').and.callThrough();
    mockField.apiValue.param = undefined;
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.assignResultToOptions).toHaveBeenCalled();
  });

  it('should render select component', () => {
    const selectComponent = el.query(By.css('select')).nativeElement;
    expect(selectComponent).toBeTruthy();
  });
});
