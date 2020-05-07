import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Input, Component, DebugElement, Type } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { DynamicSelectComponent } from './dynamic-select.component';
import { FieldConfig } from '../../core/models/form-config.interface';
import { DynamicFormsConfig } from '../../core';
import { OccMockFormService } from '../../occ/services/occ-mock-form.service';
import { I18nTestingModule, LanguageService } from '@spartacus/core';

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

const mockField: FieldConfig = {
  type: 'select',
  name: 'testSelect',
  label: {
    en: 'TestLabel',
  },
  options: [],
  depends: ['dependentTestField'],
  apiUrl: 'testUrl',
};

const mockFormGroup = new FormGroup({
  dependentTestField: new FormControl(),
  testSelect: new FormControl(),
});

const mockDynamicFormsConfig: DynamicFormsConfig = {
  dynamicForms: {},
};

describe('SelectComponent', () => {
  let component: DynamicSelectComponent;
  let fixture: ComponentFixture<DynamicSelectComponent>;
  let mockOccFormService: OccMockFormService;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DynamicSelectComponent, MockErrorNoticeComponent],
      imports: [ReactiveFormsModule, I18nTestingModule],
      providers: [
        { provide: OccMockFormService, useClass: MockOccFormService },
        { provide: LanguageService, useClass: MockLanguageService },
        {
          provide: DynamicFormsConfig,
          useValue: mockDynamicFormsConfig,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicSelectComponent);
    mockOccFormService = TestBed.get(OccMockFormService as Type<
      OccMockFormService
    >);
    component = fixture.componentInstance;
    component.group = mockFormGroup;
    component.config = mockField;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not call external API', () => {
    spyOn(mockOccFormService, 'getValuesFromAPI').and.stub();
    mockField.apiUrl = undefined;
    fixture.detectChanges();
    expect(mockOccFormService.getValuesFromAPI).not.toHaveBeenCalled();
  });

  it('should render select component', () => {
    const selectComponent = el.query(By.css('select')).nativeElement;
    expect(selectComponent).toBeTruthy();
  });
});
