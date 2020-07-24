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

let testForm;

const mocFormGroupNested = new FormGroup({
  testGroupNested: new FormControl('', Validators.required),
});
export class MockFormBuilderService {
  createForm() {
    return testForm;
  }
}

const formData: YFormData = {
  id: 'test-formData',
  type: 'DATA',
  content: '{"testGroupName":{"tripDestination":"Europe"}}',
};

const config: FormDefinition = {
  formGroups: [],
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
    testForm = new FormGroup({});
    let countryControl = new FormControl('', Validators.required);
    let nestedGroup = new FormGroup({ tripDestination: countryControl });
    testForm.addControl('testGroupName', nestedGroup);
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

  it('should change control touched property to true since one field is epmty', () => {
    component.ngOnInit();
    expect(
      component.form.controls.testGroupName.get('tripDestination').touched
    ).toEqual(true);
  });

  it('should submit in case form content is defined', () => {
    component.form.controls.testGroupName
      .get('tripDestination')
      .setValue('test string');
    spyOn(component.submit, 'emit').and.callThrough();
    formData.content = undefined;
    component.ngOnInit();
    expect(component.submit.emit).toHaveBeenCalled();
  });

  it('should map data to controll when control value is undefined', () => {
    component.ngOnInit();
    let countryField = component.form.controls.testGroupName.get(
      'tripDestination'
    );
    expect(countryField.value).toEqual('Europe');
  });
});
