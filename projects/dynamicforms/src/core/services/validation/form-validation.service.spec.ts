import { TestBed } from '@angular/core/testing';

import { FormValidationService } from './form-validation.service';

describe('FormValidationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormValidationService = TestBed.get(FormValidationService);
    expect(service).toBeTruthy();
  });
});
