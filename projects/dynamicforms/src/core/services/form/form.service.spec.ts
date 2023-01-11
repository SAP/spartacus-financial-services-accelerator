import { TestBed } from '@angular/core/testing';
import {
  UntypedFormControl,
  UntypedFormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { FormService } from './form.service';

const mockFormGroup = new UntypedFormGroup({
  testField1: new UntypedFormControl('6'),
  testField2: new UntypedFormControl('8'),
});

describe('FormService', () => {
  let service: FormService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [FormService],
    });
    service = TestBed.inject(FormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get form control', () => {
    const result = service.getFormControlForCode('testField2', mockFormGroup);
    expect(result).toBe(mockFormGroup.controls['testField2']);
  });

  it('should get form control in nested form group', () => {
    const formGroup = new UntypedFormGroup({
      testField1: new UntypedFormControl('6'),
      nestedGroup: new UntypedFormGroup({
        testField2: new UntypedFormControl(),
        testField3: new UntypedFormControl(),
      }),
    });
    const result = service.getFormControlForCode('testField3', formGroup);
    expect(result).toBe(formGroup.controls['nestedGroup'].get('testField3'));
  });

  it('should not find form control', () => {
    const formGroup = new UntypedFormGroup({
      testField1: new UntypedFormControl('6'),
      nestedGroup: new UntypedFormGroup({
        testField2: new UntypedFormControl(),
        testField3: new UntypedFormControl(),
      }),
    });
    const result = service.getFormControlForCode(
      'notExistingControl',
      formGroup
    );
    expect(result).toBe(undefined);
  });
});
