import { Component, DebugElement, Input, Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { By } from '@angular/platform-browser';
import { I18nTestingModule, LanguageService } from '@spartacus/core';
import { of } from 'rxjs';
import { DynamicFormsConfig } from '../../core';
import { FieldConfig } from '../../core/models/form-config.interface';
import { OccFormService } from '../../occ/services/occ-form.service';
import { FormService } from './../../core/services/form/form.service';
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

class MockOccFormService {
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

const mockField: FieldConfig = {
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
  let occFormService: OccFormService;
  let formService: FormService;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DynamicSelectComponent, MockErrorNoticeComponent],
      imports: [ReactiveFormsModule, I18nTestingModule],
      providers: [
        { provide: OccFormService, useClass: MockOccFormService },
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
    occFormService = TestBed.get(OccFormService as Type<OccFormService>);
    formService = TestBed.get(FormService as Type<FormService>);
    component = fixture.componentInstance;
    component.group = mockFormGroup;
    component.config = mockField;
    el = fixture.debugElement;
    fixture.detectChanges();
    spyOn(occFormService, 'getValuesFromAPI').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not call external API', () => {
    mockField.apiValue = undefined;
    fixture.detectChanges();
    expect(occFormService.getValuesFromAPI).not.toHaveBeenCalled();
  });

  it('should call external API without parameter', () => {
    fixture.detectChanges();
  });

  it('should call external API with parameter when value changes', () => {
    spyOn(component, 'assignResultToOptions').and.stub();
    mockField.apiValue = { url: testUrl };
    formControl.setValue('testValue2');
    fixture.detectChanges();
    expect(component.assignResultToOptions).toHaveBeenCalled();
  });

  it('should render select component', () => {
    const selectComponent = el.query(By.css('select')).nativeElement;
    expect(selectComponent).toBeTruthy();
  });
});
