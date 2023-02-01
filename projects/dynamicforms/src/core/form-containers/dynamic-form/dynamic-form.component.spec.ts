import { Directive, Input } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  UntypedFormControl,
  UntypedFormGroup,
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
import { FormComponentService } from '../../../components/form-component.service';

@Directive({
  // eslint-disable-next-line
  selector: '[cxFormComponent]',
})
export class MockDynamicFieldDirective {
  @Input() config: FieldConfig;
  @Input() group: UntypedFormGroup;
}

const mockDynamicFormsConfig: DynamicFormsConfig = {
  dynamicForms: {
    components: {},
  },
};

let mockFormGroup;

const mocFormGroupNested = new UntypedFormGroup({
  testGroupNested: new UntypedFormControl('', Validators.required),
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
  fieldType: 'datepicker',
  name: 'testDatePicker',
  label: {
    default: 'testLabel',
    en: 'What time did it happen?',
  },
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

export class MockFormComponentService {
  isPopulatedFormInvalidSource = new BehaviorSubject<boolean>(true);
  isPopulatedFormInvalid = of(false);
}

describe('DynamicFormComponent', () => {
  let component: DynamicFormComponent;
  let fixture: ComponentFixture<DynamicFormComponent>;
  let mockFormBuilderService: MockFormBuilderService;
  let mockFormDataService: MockFormDataService;
  let mockFormComponentService: MockFormComponentService;

  beforeEach(
    waitForAsync(() => {
      mockFormBuilderService = new MockFormBuilderService();
      mockFormDataService = new MockFormDataService();
      mockFormComponentService = new MockFormComponentService();
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
            provide: FormComponentService,
            useValue: mockFormComponentService,
          },
          {
            provide: DynamicFormsConfig,
            useValue: mockDynamicFormsConfig,
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(
    waitForAsync(() => {
      fixture = TestBed.createComponent(DynamicFormComponent);
      component = fixture.componentInstance;
      component.config = config;
      component.formData = of(formData);
      mockFormGroup = new UntypedFormGroup({
        testGroupCode: new UntypedFormControl('', Validators.required),
      });
      fixture.detectChanges();
    })
  );

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
    expect(component.form.controls.testGroupCode.touched).toEqual(true);
  });

  it('should submit in case form content is not defined', () => {
    component.form.controls.testGroupCode.setValue('test string');
    //eslint-disable-next-line
    spyOn(component.submit, 'emit').and.callThrough();
    formData.content = undefined;
    component.ngOnInit();
    //eslint-disable-next-line
    expect(component.submit.emit).toHaveBeenCalled();
  });
});
