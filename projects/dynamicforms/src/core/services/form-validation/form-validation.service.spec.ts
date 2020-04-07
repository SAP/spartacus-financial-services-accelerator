import { TestBed } from '@angular/core/testing';
import { FormValidationService } from './form-validation.service';
import { defaultFormConfig } from './../../config/default-form-config';
import { DynamicFormsConfig } from '../../config/form-config';
import { FieldConfig } from '../../models/form-config.interface';

const fieldName = 'testField';
const fieldType = 'input';
const minValue = 'minValue';
const notExist = 'notExist';

const field: FieldConfig = {
  name: fieldName,
  type: fieldType,
  validations: [
    {
      name: minValue,
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
    expect(service.getValidatorsForField(field).length).toEqual(1);
  });

  it('should not return validators for field in case they are not defined', () => {
    expect(
      service.getValidatorsForField({
        name: fieldName,
        type: fieldType,
      }).length
    ).toEqual(0);
  });

  it('should return validator without arguments', () => {
    expect(
      service.getValidatorsForField({
        name: fieldName,
        type: fieldType,
        validations: [
          {
            name: minValue,
          },
        ],
      }).length
    ).toEqual(1);
  });

  it('should not return validator if it does not exist in config', () => {
    expect(
      service.getValidatorsForField({
        name: fieldName,
        type: fieldType,
        validations: [
          {
            name: notExist,
          },
        ],
      }).length
    ).toEqual(0);
  });
});
