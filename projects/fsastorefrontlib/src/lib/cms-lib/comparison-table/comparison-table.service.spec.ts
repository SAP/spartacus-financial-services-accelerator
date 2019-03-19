import { TestBed } from '@angular/core/testing';

import { ComparisonTableService } from './comparison-table.service';

describe('ComparisonTableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ComparisonTableService = TestBed.get(ComparisonTableService);
    expect(service).toBeTruthy();
  });
});
