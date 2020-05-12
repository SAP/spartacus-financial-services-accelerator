import { Directive, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BehaviorSubject, of } from 'rxjs';
import { DynamicFormsConfig } from '../../config';
import { YFormData } from '../../models';
import {
  FieldConfig,
  FormDefinition,
} from '../../models/form-config.interface';
import { FormBuilderService } from '../../services/builder/form-builder.service';
import { FormDataService } from '../../services/data/form-data.service';
import { DynamicFormComponent } from './dynamic-form.component';

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
    components: {},
  },
};

const mockFormGroup = new FormGroup({
  testGroupCode: new FormControl('', Validators.required),
});

const mocFormGroupNested = new FormGroup({
  testGroupNested: new FormControl('', Validators.required),
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
  label: {
    en: 'What time did it happen?',
  },
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

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DynamicFormComponent);
    component = fixture.componentInstance;
    component.config = config;
    component.formData = of(formData);
    fixture.detectChanges();
  }));

  it('should create form with defintion but without data', () => {
    component.formData = undefined;
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('should not create form if config is not defined', () => {
    spyOn(mockFormBuilderService, 'createForm').and.callThrough();
    component.config = undefined;
    component.ngOnInit();
    expect(mockFormBuilderService.createForm).not.toHaveBeenCalled();
  });

  it('should change control touched property to true', () => {
    component.formData = undefined;
    component.ngOnInit();
    expect(component.form.controls.testGroupCode.touched).toEqual(true);
  });

  it('should change control touched property to true when form has nested formGroup', () => {
    mockFormGroup.addControl('testNestedControl', mocFormGroupNested);
    component.formData = undefined;
    component.ngOnInit();
    console.log(component.form.controls.testNestedControl.touched);
    expect(component.form.controls.testGroupCode.touched).toEqual(true);
  });

  it('should submit in case form content is not defined', () => {
    component.form.controls.testGroupCode.setValue('test string');
    spyOn(component.submit, 'emit').and.callThrough();
    formData.content = undefined;
    component.ngOnInit();
    expect(component.submit.emit).toHaveBeenCalled();
  });
});
