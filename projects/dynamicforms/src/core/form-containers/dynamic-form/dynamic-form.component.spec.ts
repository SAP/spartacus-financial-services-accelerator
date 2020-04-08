import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicFormComponent } from './dynamic-form.component';
import { Directive, Input } from '@angular/core';
import {
  FieldConfig,
  FormDefinition,
} from '../../models/form-config.interface';
import { FormGroup, ReactiveFormsModule, FormControl } from '@angular/forms';
import { FormBuilderService } from '../../services/builder/form-builder.service';
import { BehaviorSubject, of } from 'rxjs';
import { FormDataService } from '../../services/data/form-data.service';
import { YFormData } from '../../models';
import { DynamicFormsConfig } from '../../config';

@Directive({
  // tslint:disable
  selector: '[cxFormComponent]',
  inputs: ['config', 'group'],
})
export class MockDynamicFieldDirective {
  @Input()
  config: FieldConfig;
  @Input()
  group: FormGroup;
}

const mockDynamicFormsConfig: DynamicFormsConfig = {
  dynamicForms: {
    cssClass: {},
    components: {},
  },
};

const mockFormGroup = new FormGroup({
  testGroupCode: new FormControl('testValue'),
});

export class MockFormBuilderService {
  createForm() {
    return mockFormGroup;
  }
}

const formData: YFormData = {
  id: 'test-formData',
  type: 'DATA',
  content:
    '{"testContent":{"tripDestination":"Europe","tripStartDate":"2022-02-02"}}',
};

const mockField: FieldConfig = {
  type: 'datepicker',
  name: 'testDatePicker',
  label: 'What time did it happen?',
};

const config: FormDefinition = {
  formGroups: [
    {
      groupCode: 'testGroupCode',
      fieldConfigs: [mockField],
    },
  ],
  formId: 'testFormID',
};

export class MockFormDataService {
  getSubmittedForm() {
    return new BehaviorSubject(formData);
  }
}

describe('DynamicFormComponent', () => {
  let component: DynamicFormComponent;
  let fixture: ComponentFixture<DynamicFormComponent>;
  let mockFormBuilderService: MockFormBuilderService;
  let mockFormDataService: MockFormDataService;

  beforeEach(async(() => {
    mockFormBuilderService = new MockFormBuilderService();
    mockFormDataService = new MockFormDataService();
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [DynamicFormComponent, MockDynamicFieldDirective],
      providers: [
        {
          provide: FormBuilderService,
          useValue: mockFormBuilderService,
        },
        {
          provide: FormDataService,
          useValue: mockFormDataService,
        },
        {
          provide: DynamicFormsConfig,
          useValue: mockDynamicFormsConfig,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.formData = of(formData);
    component.config = config;
    component.ngOnInit();
    console.log(mockFormGroup);
    mockFormGroup.get('testGroupCode').value;
    component.form = mockFormGroup;
    expect(component).toBeTruthy();
  });
});
