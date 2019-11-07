import { TestBed } from '@angular/core/testing';

import { FormDataService } from './form-data.service';

const mockFormData = {
  general: 'generalSection',
  driver: 'driverSection',
  button: 'submit',
};

const mockFilteredData = {
  general: 'generalSection',
  driver: 'driverSection',
};

describe('FormDataService', () => {
  let service: FormDataService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormDataService],
    });

    service = TestBed.get(FormDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should filter data', () => {
    expect(service.filterData(mockFormData)).toEqual(mockFilteredData);
  });
});
