import { TestBed } from '@angular/core/testing';
import { FormValidationService } from './form-validation.service';
import { defaultFormConfig } from './../../config/default-form-config';
import { DynamicFormsConfig } from '../../config';
import { FieldConfig } from '../../models';

const field: FieldConfig = {
  name: 'testField',
  type: 'input',
  validations: [
    {
      name: 'minValue',
      arguments: [
        {
          value: '10',
        },
      ],
    },
  ],
};

describe('FormValidationService', () => {
  let service: FormValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FormValidationService,
        { provide: DynamicFormsConfig, useValue: defaultFormConfig },
      ],
    });

    service = TestBed.get(FormValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return list of validators for field', () => {
    service.getValidatorsForField(field);
    expect(service.getValidatorsForField(field).length).toEqual(1);
  });
});
