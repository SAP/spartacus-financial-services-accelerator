import { TestBed } from '@angular/core/testing';
import {
  UntypedFormControl,
  UntypedFormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { of } from 'rxjs';
import { DynamicFormsConfig } from '../../config/form-config';
import { FieldConfig } from '../../models/form-config.interface';
import { FormService } from '../form/form.service';
import { defaultFormConfig } from './../../config/default-form-config';
import { FormValidationService } from './../form-validation/form-validation.service';
import { FieldDependencyResolverService } from './field-dependency-resolver.service';

const fieldType = 'input';
const minValue = 'minValue';

const testField1: FieldConfig = {
  name: 'testField1',
  fieldType: fieldType,
  dependsOn: {
    hide: true,
    controls: [
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
    ],
  },
};

const testField2: FieldConfig = {
  name: 'testField2',
  fieldType: fieldType,
  dependsOn: {
    hide: true,
    controls: [
      {
        controlName: 'testField3',
        conditions: [
          {
            name: minValue,
            arguments: [
              {
                value: '7',
              },
            ],
          },
        ],
      },
    ],
  },
};

const testField3: FieldConfig = {
  name: 'testField3',
  fieldType: fieldType,
};

const mockFormGroup = new UntypedFormGroup({
  testField1: new UntypedFormControl(''),
  testField2: new UntypedFormControl(''),
  testField3: new UntypedFormControl(''),
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
    mockFormValidationService = TestBed.inject(FormValidationService);
    mockFormService = TestBed.inject(FormService);
    service = TestBed.inject(FieldDependencyResolverService);
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
      testField1,
      dependentFormControl,
      mockFormGroup
    );
    expect(dependentFormControl.disabled).toBe(false);
  });
});
