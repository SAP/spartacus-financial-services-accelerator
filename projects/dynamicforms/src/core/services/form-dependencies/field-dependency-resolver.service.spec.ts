import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { of } from 'rxjs';
import { DynamicFormsConfig } from '../../config/form-config';
import {
  ControlDependency,
  FieldConfig,
} from '../../models/form-config.interface';
import { FormService } from '../form/form.service';
import { defaultFormConfig } from './../../config/default-form-config';
import { FormValidationService } from './../form-validation/form-validation.service';
import { FieldDependencyResolverService } from './field-dependency-resolver.service';

const fieldType = 'input';
const minValue = 'minValue';

const dependencyConditions: ControlDependency[] = [
  {
    controlName: 'testField2',
    conditions: [
      {
        name: minValue,
        arguments: [
          {
            value: '5',
          },
        ],
      },
    ],
  },
];

const testField1: FieldConfig = {
  name: 'testField1',
  type: fieldType,
  dependsOn: dependencyConditions,
};

const testField2: FieldConfig = {
  name: 'testField2',
  type: fieldType,
};

const mockFormGroup = new FormGroup({
  testField1: new FormControl('6'),
  testField2: new FormControl('8'),
});

class MockFormValidationService {
  getValidatorForFunction() {
    return Validators.min(1);
  }
}

class MockFormService {
  getFormControlForCode() {
    return mockFormGroup.controls['testField2'];
  }
}

describe('FieldDependencyResolverService', () => {
  let service: FieldDependencyResolverService;
  let mockFormValidationService: FormValidationService;
  let mockFormService: FormService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [
        FieldDependencyResolverService,
        { provide: DynamicFormsConfig, useValue: defaultFormConfig },
        {
          provide: FormValidationService,
          useClass: MockFormValidationService,
        },
        {
          provide: FormService,
          useClass: MockFormService,
        },
      ],
    });
    mockFormValidationService = TestBed.get(FormValidationService as Type<
      FormValidationService
    >);
    mockFormService = TestBed.get(FormService as Type<FormService>);
    service = TestBed.get(FieldDependencyResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should resolve form control dependency', () => {
    Object.defineProperty(mockFormGroup.get('testField2'), 'valueChanges', {
      value: of('6'),
    });
    const dependentFormControl = mockFormGroup.controls['testField1'];

    service.resolveFormControlDependencies(
      dependencyConditions,
      dependentFormControl,
      mockFormGroup
    );
    expect(dependentFormControl.disabled).toBe(false);
  });
});
